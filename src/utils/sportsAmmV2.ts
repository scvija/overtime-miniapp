import { GAS_ESTIMATION_BUFFER, ZERO_ADDRESS } from 'constants/network';
import { SupportedNetwork } from 'types/network';
import { ViemContract } from 'types/viem';
import { Address, Client, encodeFunctionData } from 'viem';
import { estimateGas } from 'viem/actions';
import { TradeData } from '../types/markets';
import { executeBiconomyTransaction } from './smartAccount/biconomy/biconomy';

// Default gas limits for different transaction types when estimation fails
const DEFAULT_GAS_LIMITS = {
    TRADE: 1800000n,
    TRADE_SYSTEM_BET: 2400000n,
    FREE_BET_TRADE: 2100000n,
    FREE_BET_SYSTEM_BET: 2700000n,
};

export const getSportsAMMV2Transaction: any = async (
    collateralAddress: string,
    isDefaultCollateral: boolean,
    isEth: boolean,
    networkId: SupportedNetwork,
    sportsAMMV2Contract: ViemContract,
    freeBetHolderContract: ViemContract,
    tradeData: TradeData[],
    buyInAmount: bigint,
    expectedQuote: bigint,
    referral: string | null,
    additionalSlippage: bigint,
    isAA: boolean,
    isFreeBet: boolean,
    client: Client,
    isSystemBet: boolean,
    systemBetDenominator: number,
    gasLimit?: bigint,
    isFarcasterWallet?: boolean
): Promise<any> => {
    const referralAddress = referral || ZERO_ADDRESS;

    const getGasOptions = async (encodedData: Address, contractAddress: Address, value: bigint = 0n) => {
        // Determine appropriate fallback gas limit based on transaction type
        let fallbackGas: bigint;
        if (isFreeBet) {
            fallbackGas = isSystemBet ? DEFAULT_GAS_LIMITS.FREE_BET_SYSTEM_BET : DEFAULT_GAS_LIMITS.FREE_BET_TRADE;
        } else {
            fallbackGas = isSystemBet ? DEFAULT_GAS_LIMITS.TRADE_SYSTEM_BET : DEFAULT_GAS_LIMITS.TRADE;
        }

        if (gasLimit) {
            return { value, gas: gasLimit };
        }

        // If Farcaster wallet, immediately return fallback gas, skip estimation
        if (isFarcasterWallet) {
            console.warn('Farcaster wallet detected, using fallback gas limit directly.');
            return { value, gas: fallbackGas };
        }
        
        try {
            const estimation = await estimateGas(client, {
                to: contractAddress,
                data: encodedData,
                value,
            });
            return { value, gas: BigInt(Math.ceil(Number(estimation) * GAS_ESTIMATION_BUFFER)) };
        } catch (error) {
            console.warn('Gas estimation failed, using fallback gas limit:', error);
            return { value, gas: fallbackGas };
        }
    };

    if (isFreeBet && freeBetHolderContract) {
        if (isSystemBet) {
            const encodedData = encodeFunctionData({
                abi: freeBetHolderContract.abi,
                functionName: 'tradeSystemBet',
                args: [
                    tradeData,
                    buyInAmount,
                    expectedQuote,
                    additionalSlippage,
                    referralAddress,
                    collateralAddress,
                    systemBetDenominator,
                ],
            });

            if (!isAA) {
                const gasOptions = await getGasOptions(encodedData, freeBetHolderContract.address as Address);
                return freeBetHolderContract.write.tradeSystemBet(
                    [
                        tradeData,
                        buyInAmount,
                        expectedQuote,
                        additionalSlippage,
                        referralAddress,
                        collateralAddress,
                        systemBetDenominator,
                    ],
                    gasOptions
                );
            }
                return await executeBiconomyTransaction({
                    networkId,
                    contract: freeBetHolderContract,
                    methodName: 'tradeSystemBet',
                    collateralAddress: collateralAddress as any,
                    data: [
                        tradeData,
                        buyInAmount,
                        expectedQuote,
                        additionalSlippage,
                        referralAddress,
                        collateralAddress,
                        systemBetDenominator,
                    ],
                });
        } else {
            const encodedData = encodeFunctionData({
                abi: freeBetHolderContract.abi,
                functionName: 'trade',
                args: [tradeData, buyInAmount, expectedQuote, additionalSlippage, referralAddress, collateralAddress],
            });

            if (!isAA) {
                const gasOptions = await getGasOptions(encodedData, freeBetHolderContract.address as Address);
                return freeBetHolderContract.write.trade(
                    [tradeData, buyInAmount, expectedQuote, additionalSlippage, referralAddress, collateralAddress],
                    gasOptions
                );
            } else {
                return await executeBiconomyTransaction({
                    collateralAddress: collateralAddress as Address,
                    networkId,
                    contract: freeBetHolderContract,
                    methodName: 'trade',
                    data: [
                        tradeData,
                        buyInAmount,
                        expectedQuote,
                        additionalSlippage,
                        referralAddress,
                        collateralAddress,
                    ],
                });
            }
        }
    }

    if (sportsAMMV2Contract) {
    if (isSystemBet) {
        const encodedData = encodeFunctionData({
            abi: sportsAMMV2Contract.abi,
            functionName: 'tradeSystemBet',
            args: [
                tradeData,
                buyInAmount,
                expectedQuote,
                additionalSlippage,
                referralAddress,
                collateralAddress,
                isEth,
                systemBetDenominator,
            ],
        });

        if (!isAA) {
                const gasOptions = await getGasOptions(encodedData, sportsAMMV2Contract.address as Address, isEth ? buyInAmount : 0n);
            return sportsAMMV2Contract.write.tradeSystemBet(
                [
                    tradeData,
                    buyInAmount,
                    expectedQuote,
                    additionalSlippage,
                    referralAddress,
                    isDefaultCollateral ? ZERO_ADDRESS : collateralAddress,
                    isEth,
                    systemBetDenominator,
                ],
                    gasOptions
            );
            }
            return await executeBiconomyTransaction({
                networkId,
                collateralAddress: collateralAddress as any,
                contract: sportsAMMV2Contract,
                methodName: 'tradeSystemBet',
                data: [
                    tradeData,
                    buyInAmount,
                    expectedQuote,
                    additionalSlippage,
                    referralAddress,
                    isDefaultCollateral ? ZERO_ADDRESS : collateralAddress,
                    isEth,
                    systemBetDenominator,
                ],
                value: isEth ? buyInAmount : BigInt(0),
            });
    } else {
        const encodedData = encodeFunctionData({
            abi: sportsAMMV2Contract.abi,
            functionName: 'trade',
            args: [
                tradeData,
                buyInAmount,
                expectedQuote,
                additionalSlippage,
                referralAddress,
                isDefaultCollateral ? ZERO_ADDRESS : collateralAddress,
                isEth,
            ],
        });

        if (!isAA) {
                const gasOptions = await getGasOptions(encodedData, sportsAMMV2Contract.address as Address, isEth ? buyInAmount : 0n);
            return sportsAMMV2Contract.write.trade(
                [
                    tradeData,
                    buyInAmount,
                    expectedQuote,
                    additionalSlippage,
                    referralAddress,
                    isDefaultCollateral ? ZERO_ADDRESS : collateralAddress,
                    isEth,
                ],
                    gasOptions
            );
        } else {
            return await executeBiconomyTransaction({
                networkId,
                collateralAddress: collateralAddress as any,
                contract: sportsAMMV2Contract,
                methodName: 'trade',
                data: [
                    tradeData,
                    buyInAmount,
                    expectedQuote,
                    additionalSlippage,
                    referralAddress,
                    isDefaultCollateral ? ZERO_ADDRESS : collateralAddress,
                    isEth,
                ],
                value: isEth ? buyInAmount : BigInt(0),
            });
        }
    }
    }
    console.error("getSportsAMMV2Transaction: No valid contract path executed.");
    throw new Error("Transaction could not be prepared.");
};

export const getSportsAMMV2QuoteMethod: any = (
    collateralAddress: string,
    isDefaultCollateral: boolean,
    sportsAMMV2Contract: ViemContract,
    tradeData: TradeData[],
    buyInAmount: bigint,
    isSystemBet: boolean,
    systemBetDenominator: number
) => {
    return isSystemBet
        ? sportsAMMV2Contract.read.tradeQuoteSystem([
              tradeData,
              buyInAmount,
              isDefaultCollateral ? ZERO_ADDRESS : collateralAddress,
              false,
              systemBetDenominator,
          ])
        : sportsAMMV2Contract.read.tradeQuote([
              tradeData,
              buyInAmount,
              isDefaultCollateral ? ZERO_ADDRESS : collateralAddress,
              false,
          ]);
};
