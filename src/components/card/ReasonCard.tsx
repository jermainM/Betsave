import { Box, styled, Typography } from '@mui/material';
import SeamslessIcon from '../../assets/maximize.png';
import { ArrowRightAlt } from '@mui/icons-material';

export const ReasonCard = () => {
  return (
    <ReasonCardContainer>
      <Img src={SeamslessIcon} alt="reason-icon" />
      <ReasonCardTitle>Highest Cashback Rates</ReasonCardTitle>
      <ReasonCardContent>
        Earn up to 7% cashback on your sports and horce racing bets.
      </ReasonCardContent>
      <ReasonCardAction>
        Learn More <ArrowRightAlt />{' '}
      </ReasonCardAction>
    </ReasonCardContainer>
  );
};

const ReasonCardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  alignItems: 'center',
  width: '100%',
  padding: '30px',
  borderRadius: '20px',
  backgroundColor: '#141c30',
}));

const Img = styled('img')(({ theme }) => ({
  width: '54px',
  height: 'auto',
}));

const ReasonCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  color: '#fff',
  fontWeight: 'bold',
  [theme.breakpoints.down(1280)]: {
    fontSize: '18px',
  },
}));

const ReasonCardContent = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#627691',
  textAlign: 'center',
  [theme.breakpoints.down(1280)]: {
    fontSize: '14px',
  },
}));

const ReasonCardAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '16px',
  fontWeight: '500',
  color: '#1AE5A1',
  cursor: 'pointer',
  [theme.breakpoints.down(1280)]: {
    fontSize: '14px',
  },
}));
