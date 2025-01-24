import { Box, styled } from '@mui/material';
import { Cashback } from './cashback';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { MyOffers } from './myoffers';

export const Dashboard = () => {
  const activeItem = useSelector((state: RootState) => state.navbar.activeItem);
  return (
    <DashboardContainer>
      {activeItem === 0 && <Cashback />}
      {activeItem === 1 && <MyOffers />}
    </DashboardContainer>
  );
};

const DashboardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  padding: '20px 0px',
  marginTop: '20px',
}));
