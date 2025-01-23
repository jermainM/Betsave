import { Box, styled } from '@mui/material';
import { Cashback } from './cashback';

export const Dashboard = () => {
  return (
    <DashboardContainer>
      <Cashback />
    </DashboardContainer>
  );
};

const DashboardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  padding: '20px 0px',
  marginTop: '20px',
}));
