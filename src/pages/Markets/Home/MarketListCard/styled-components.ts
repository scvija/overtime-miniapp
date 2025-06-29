import styled, { CSSProperties } from 'styled-components';
import { FlexDivColumn, FlexDivColumnCentered, FlexDivRow, FlexDivStart } from 'styles/common';

export const Wrapper = styled(FlexDivColumn)<{
    hideGame: boolean;
    isResolved: boolean;
    selected: boolean;
    isMarketSelected: boolean;
    isOverdrop: boolean;
    floatingOddsTitles?: boolean;
}>`
    margin-top: ${(props) => (props.floatingOddsTitles && !props.isMarketSelected ? '30px' : '0')};
    position: relative;
    z-index: 1;
    width: 100%;
    display: ${(props) => (props.hideGame ? 'none' : '')};
    ${(props) => (props.isOverdrop ? `border: 1px solid ${props.theme.overdrop.borderColor.tertiary};` : '')}
    border-radius: 5px;
    background-color: ${(props) =>
        props.selected
            ? props.theme.background.quaternary
            : props.isResolved || props.isMarketSelected
            ? props.theme.background.secondary
            : props.theme.background.quinary};
    color: ${(props) =>
        props.selected ? props.theme.oddsContainerBackground.tertiary : props.theme.textColor.primary};
`;

export const MainContainer = styled(FlexDivRow)<{
    isGameOpen: boolean;
    isBoosted?: boolean;
    hasTournamentName?: boolean;
}>`
    position: relative;
    width: 100%;
    padding: ${(props) =>
        props.isBoosted ? '20px 12px 10px 12px' : props.hasTournamentName ? '0 12px 10px 12px' : '10px 12px'};
    cursor: ${(props) => (props.isGameOpen ? 'default' : 'pointer')};
    @media (max-width: 950px) {
        flex-direction: ${(props) => (props.isGameOpen ? 'column' : 'row')};
        padding: ${(props) => (props.hasTournamentName ? '0 8px 4px 8px' : '8px 8px 4px 8px')};
    }
`;

export const MatchInfoContainer = styled(FlexDivColumn)`
    cursor: pointer;
    min-width: 180px;
    max-width: 180px;
    margin-right: 5px;
    @media (max-width: 950px) {
        max-width: 100%;
    }
`;

export const MatchInfo = styled(FlexDivStart)<{
    selected: boolean;
    marginTop?: string;
}>`
    z-index: 2;
    ${(props) => props.marginTop && `margin-top: ${props.marginTop};`}
    color: ${(props) =>
        props.selected ? props.theme.oddsContainerBackground.tertiary : props.theme.textColor.quinary};
    i {
        color: ${(props) =>
            props.selected ? props.theme.oddsContainerBackground.tertiary : props.theme.textColor.quinary};
    }
`;

export const GameOfLabel = styled.span<{ selected?: boolean; isLive?: boolean; isLeagueInfoVisible?: boolean }>`
    color: ${(props) => (props.selected ? 'inherit' : props.theme.overdrop.textColor.primary)};
    font-size: 10px;
    position: absolute;
    top: 6px;
    left: ${(props) => (props.isLeagueInfoVisible ? '48px' : '12px')};
    text-transform: uppercase;
    @media (max-width: 600px) {
        top: 10px;
        text-align: center;
        left: ${(props) => (props.isLive ? '55px' : '0')};
        right: 0px;
    }
`;

export const MatchInfoLabel = styled.label<{ selected?: boolean }>`
    color: ${(props) => (props.selected ? props.theme.textColor.tertiary : 'inherit')};
    font-size: 12px;
    font-weight: 600;
    line-height: 14px;
    text-transform: uppercase;
    width: fit-content;
    margin-right: 2px;
    white-space: nowrap;
    z-index: 2;
    @media (max-width: 950px) {
        font-size: 11px;
    }
`;

export const TournamentNameLabel = styled.label<{
    isBoosted?: boolean;
    isLeagueInfoVisible?: boolean;
    selected?: boolean;
}>`
    color: ${(props) => (props.selected ? props.theme.textColor.tertiary : props.theme.textColor.quinary)};
    padding-left: ${(props) => (props.isLeagueInfoVisible ? '48px' : '12px')};
    padding-top: ${(props) => (props.isBoosted ? '16px' : '10px')};
    font-size: 10px;
    font-weight: 400;
    line-height: 14px;
    text-transform: uppercase;
    width: fit-content;
    margin-right: 2px;
    white-space: nowrap;
    z-index: 2;
    @media (max-width: 950px) {
        padding-left: ${(props) => (props.isLeagueInfoVisible ? '36px' : '8px')};
        padding-top: 8px;
    }
`;

export const LeagueFlag = styled.img<{ hasTournamentName?: boolean }>`
    width: 24px;
    height: 24px;
    margin-top: ${(props) => (props.hasTournamentName ? '-11px' : '-5px')};
    margin-left: 1px;
    margin-right: 11px;
    cursor: pointer;
    @media (max-width: 950px) {
        margin-left: 0px;
        margin-right: 4px;
    }
`;

export const TeamsInfoContainer = styled(FlexDivRow)<{ isPlayerPropsMarket?: boolean }>`
    align-items: center;
    margin-top: ${(props) => (props.isPlayerPropsMarket ? '0' : '8px')};
    flex: 1;
    @media (max-width: 950px) {
        flex-wrap: wrap;
    }
`;

export const TeamLogosContainer = styled(FlexDivRow)<{
    isColumnView: boolean;
    isTwoPositionalMarket: boolean;
    isOneSideMarket: boolean;
}>`
    flex-direction: ${(props) => (props.isColumnView ? 'column' : 'row')};
    align-items: center;
    gap: ${(props) => (props.isColumnView ? (props.isTwoPositionalMarket ? '2px' : '10px') : '0px')};
    justify-content: space-around;
    @media (min-width: 950px) {
        height: ${(props) => (!props.isOneSideMarket ? '100%' : 'auto')};
    }
`;

export const ClubLogo = styled.img<{ awayTeam?: boolean; isColumnView: boolean; isFutures: boolean }>`
    height: ${(props) => props.height || (props.isFutures ? '30px' : props.isColumnView ? '26px' : '24px')};
    width: ${(props) => props.width || (props.isFutures ? '30px' : props.isColumnView ? '26px' : '24px')};
    margin-left: ${(props) => (props.awayTeam && !props.isColumnView ? '-10px' : '0')};
    z-index: ${(props) => (props.awayTeam ? '1' : '2')};
`;

export const TeamNamesContainer = styled(FlexDivColumn)<{
    isColumnView: boolean;
    isTwoPositionalMarket: boolean;
    isGameOpen: boolean;
}>`
    margin-left: 10px;
    gap: ${(props) => (props.isColumnView ? (props.isTwoPositionalMarket ? '5px' : '10px') : '0px')};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    @media (min-width: 950px) {
        justify-content: space-around;
        height: 100%;
    }
    @media (max-width: 950px) {
        flex-direction: ${(props) => (props.isGameOpen ? 'row' : 'column')};
        overflow: initial;
        max-width: calc(100% - 48px); // when long team names sub width of logos (38px) and margin (10px)
    }
`;

export const TeamNameLabel = styled.span<{ isColumnView: boolean; isMarketSelected: boolean; isLive: boolean }>`
    font-weight: 600;
    font-size: 12px;
    line-height: ${(props) => (props.isColumnView ? '25px' : '18px')};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: ${(props) => (props.isMarketSelected ? (props.isLive ? '100px' : '130px') : '100%')};
    @media (max-width: 950px) {
        width: fit-content;
        margin-right: 5px;
    }
`;

export const MarketsCountWrapper = styled(FlexDivColumnCentered).withConfig({
    shouldForwardProp: (prop) => prop !== 'isHidden',
})<{ isHidden?: boolean; isPlayerPropsMarket?: boolean }>`
    visibility: ${(props) => (props.isHidden ? 'hidden' : 'visible')};
    max-width: 35px;
    margin-left: 5px;
    font-weight: 600;
    font-size: 13.5px;
    line-height: 16px;
    color: ${(props) => props.theme.textColor.quinary};
    text-align: center;
    cursor: pointer;
    margin-top: ${(props) => (props.isPlayerPropsMarket ? '0' : '20px')};
    @media (max-width: 950px) {
        max-width: initial;
        position: absolute;
        top: 0;
        right: 0;
        font-size: 12px;
        margin-top: 0px;
        line-height: 14px;
        padding: 8px;
    }
`;

export const ExternalArrow = styled.i`
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 12px;
    color: ${(props) => props.theme.textColor.quinary};
    cursor: pointer;
`;

export const Arrow = styled.i`
    font-size: 14px;
    color: ${(props) => props.theme.textColor.quinary};
    cursor: pointer;
`;

export const FireContainer = styled(FlexDivColumnCentered)`
    font-weight: 600;
    position: absolute;
    top: 7px;
    right: 7px;
    @media (max-width: 600px) {
        flex-direction: row;
        top: 5px;
        right: 44px;
    }
`;

export const Fire = styled.i`
    color: ${(props) => props.theme.overdrop.textColor.primary};
    font-size: 20px;
    display: flex;
    justify-content: center;
`;

export const FireText = styled.span`
    color: ${(props) => props.theme.overdrop.textColor.primary};
    white-space: pre;
    font-size: 9px;
    @media (max-width: 600px) {
        display: flex;
        align-items: center;
    }
`;

export const liveBlinkStyle: CSSProperties = {
    width: 25,
    height: 25,
    position: 'absolute',
    top: -5,
};

export const liveBlinkStyleMobile: CSSProperties = {
    width: 23,
    height: 23,
    position: 'absolute',
    top: -5,
};

export const LiveIndicatorContainer = styled(FlexDivStart)`
    position: relative;
    align-items: flex-start;
    color: ${(props) => props.theme.textColor.primary};
    margin-right: 10px;
    margin-left: -7px;
    & > label {
        text-transform: none;
        margin-left: 25px;
    }
    & + label {
        text-transform: none;
    }
`;

export const Blink = styled.span`
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-transform: uppercase;
    white-space: nowrap;
    margin-right: 10px;
    color: ${(props) => props.theme.textColor.quinary};
    animation: blinker 1.5s step-start infinite;
    font-weight: 600;
    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }
    @media (max-width: 950px) {
        font-size: 11px;
    }
`;

export const CurrentResultContainer = styled(FlexDivColumn)<{
    isColumnView: boolean;
}>`
    margin-left: 5px;
    margin-right: 5px;
    flex: initial;
    @media (min-width: 950px) {
        justify-content: space-around;
        height: 100%;
    }
    @media (max-width: 950px) {
        flex-direction: row;
    }
`;

export const SecondaryResultsWrapper = styled(FlexDivRow)`
    gap: 5px;
    justify-content: start;
    flex-grow: 3;
    flex: initial;
    margin-left: 5px;
    margin-right: 5px;
    @media (max-width: 950px) {
        flex-basis: 100%;
    }
    @media (max-width: 375px) {
        flex-basis: 100%;
        flex: auto;
    }
`;

export const PeriodResultContainer = styled(FlexDivColumn)<{
    isColumnView: boolean;
    selected: boolean;
}>`
    gap: ${(props) => (props.isColumnView ? '3px' : '0px')};
    color: ${(props) => (props.selected ? props.theme.textColor.septenary : props.theme.textColor.quinary)};
    flex-grow: 0;
    @media (min-width: 950px) {
        justify-content: space-around;
        height: 100%;
    }
    @media (max-width: 950px) {
        flex-direction: row;
    }
`;

export const ResultLabel = styled.span<{ isColumnView: boolean; isMarketSelected: boolean }>`
    font-weight: 600;
    font-size: 12px;
    line-height: ${(props) => (props.isColumnView ? '25px' : '18px')};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: fit-content;
`;
