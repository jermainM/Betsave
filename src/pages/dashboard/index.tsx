import { useSelector } from 'react-redux';
import { Box, styled } from '@mui/material';

import { RootState } from '../../store';
import { Cashback } from './cashback';
import { MyOffers } from './myoffers';
import { Withdraw } from './withdraw';
import { LeaderBoard } from './leaderboard';
import { Affiliates } from './affiliates';
import { Referrals } from './referrals';

export const Dashboard = () => {
  const activeItem = useSelector((state: RootState) => state.navbar.activeItem);
  return (
    <DashboardContainer>
      {activeItem === 0 && <MyOffers />}
      {activeItem === 2 && <Cashback />}
      {activeItem === 3 && <Withdraw />}
      {activeItem === 4 && <LeaderBoard />}
      {/* {activeItem === 6 && <Affiliates />} */}
      {activeItem === 6 && <Referrals />}
    </DashboardContainer>
  );
};

const DashboardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  padding: '20px 0px',
  marginTop: '20px',
}));
