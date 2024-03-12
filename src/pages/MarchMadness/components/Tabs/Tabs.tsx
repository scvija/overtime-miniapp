import queryString from 'query-string';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getIsWalletConnected } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { getIsMintingStarted } from 'utils/marchMadness';
import { history } from 'utils/routes';

export enum MarchMadTabs {
    HOME = 'home',
    BRACKETS = 'brackets',
    LEADERBOARD = 'leaderboard',
}

type TabsProps = {
    selectedTab: MarchMadTabs;
    setSelectedTab: (tab: MarchMadTabs) => void;
};

const Tabs: React.FC<TabsProps> = ({ selectedTab, setSelectedTab }) => {
    const { t } = useTranslation();
    const location = useLocation();

    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));

    const tabClickHandler = (tab: MarchMadTabs) => {
        if (tab === MarchMadTabs.BRACKETS && !isWalletConnected) {
            return;
        }
        history.push({
            pathname: location.pathname,
            search: queryString.stringify({
                tab,
            }),
        });
        setSelectedTab(tab);
    };

    const isMintingStarted = getIsMintingStarted();

    return (
        <Container>
            <Tab
                active={selectedTab === MarchMadTabs.HOME}
                isClickable={true}
                onClick={() => tabClickHandler(MarchMadTabs.HOME)}
            >
                {selectedTab === MarchMadTabs.HOME}
                {t('march-madness.tabs.home')}
            </Tab>
            <Tab
                active={selectedTab === MarchMadTabs.BRACKETS}
                isClickable={isWalletConnected && isMintingStarted}
                onClick={() => isMintingStarted && tabClickHandler(MarchMadTabs.BRACKETS)}
            >
                {t('march-madness.tabs.brackets')}
                <ComingSoon>soon</ComingSoon>
            </Tab>
            <Tab
                active={selectedTab === MarchMadTabs.LEADERBOARD}
                isClickable={isMintingStarted}
                onClick={() => isMintingStarted && tabClickHandler(MarchMadTabs.LEADERBOARD)}
            >
                {t('march-madness.tabs.leaderboard')}
                <ComingSoon>soon</ComingSoon>
            </Tab>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    max-width: 494px;
    display: flex;
    flex-direction: row;
    margin: 20px auto;
    justify-content: space-around;
    border-bottom: 2px solid ${(props) => props.theme.marchMadness.borderColor.senary};
    @media (max-width: 800px) {
        padding-top: 30px;
    }
`;

const Tab = styled.div<{ active: boolean; isClickable: boolean }>`
    position: relative;
    text-transform: uppercase;
    cursor: ${(props) => (props.isClickable ? 'pointer' : 'default')};
    opacity: ${(props) => (props.isClickable ? '1' : '0.4')};
    font-family: 'Oswald' !important;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 32px;
    color: ${(props) =>
        props.active ? props.theme.marchMadness.textColor.senary : props.theme.marchMadness.textColor.primary};
`;

const ComingSoon = styled.div`
    position: absolute;
    top: -14px;
    right: -20px;

    font-size: 10px;
    color: ${(props) => props.theme.marchMadness.textColor.primary};
    white-space: nowrap;
`;

export default Tabs;
