import { useSelector } from 'react-redux';
import { Box, styled } from '@mui/material';

import { RootState } from '../../store';
import { Cashback } from './cashback';
import { MyOffers } from './myoffers';
import { Withdraw } from './withdraw';
import { LeaderBoard } from './leaderboard';

export const Dashboard = () => {
  const activeItem = useSelector((state: RootState) => state.navbar.activeItem);
  return (
    <DashboardContainer>
      {activeItem === 0 && <Cashback />}
      {activeItem === 2 && <MyOffers />}
      {activeItem === 3 && <Withdraw />}
      {activeItem === 4 && <LeaderBoard />}
    </DashboardContainer>
  );
};

const DashboardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  padding: '20px 0px',
  marginTop: '20px',
}));
