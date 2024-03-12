import QUERY_KEYS from 'constants/queryKeys';
import { useQuery, UseQueryOptions } from 'react-query';
import { NetworkId } from 'thales-utils';

export type LeaderboardByGuessedCorrectlyResponse = {
    walletAddress: string;
    volume: number;
    baseVolume: number;
    bonusVolume: number;
    totalCorrectedPredictions: number;
    rank: number;
    rewards: string;
}[];

const useLeaderboardByGuessedCorrectlyQuery = (
    networkId: NetworkId,
    options?: UseQueryOptions<LeaderboardByGuessedCorrectlyResponse | undefined>
) => {
    return useQuery<LeaderboardByGuessedCorrectlyResponse | undefined>(
        QUERY_KEYS.MarchMadness.Competition.LeaderboardByNumberOfCorrectPredictions(networkId),
        async () => {
            try {
                const rawResponse = await fetch(`https://api.thalesmarket.io/march-madness/1/${networkId}`);
                const response = JSON.parse(await rawResponse.text());

                return response;
            } catch (e) {
                console.log('E ', e);
                return;
            }
        },
        {
            ...options,
        }
    );
};

export default useLeaderboardByGuessedCorrectlyQuery;
