import { Box, Button, styled } from '@mui/material';
import { RewardBar } from '../progressbar/RewardBar';

interface CardProps {
  goal: number; // when can you claim
  current: number; // current status
  earn: number; // how much you will earn
}

export const ReferRewardClaimCard = (props: CardProps) => {
  const { goal, current, earn } = props;
  const percent = Number(((current / goal) * 100).toFixed(0));
  return (
    <Container>
      <ReferLabel>Refer {goal} Friend</ReferLabel>
      <BarContainer>
        <RewardBar value={percent} unit="$" earn={earn} />
      </BarContainer>
      <ClaimButton disabled={percent !== 100}>Claim Rewards Now</ClaimButton>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 'auto',
}));

const ReferLabel = styled(Box)(({ theme }) => ({
  borderRadius: '12px 12px 0px 0px',
  backgroundColor: '#121929',
  color: '#fff',
  padding: '8px 24px',
  fontSize: '14px',
}));

const BarContainer = styled(Box)(({ theme }) => ({
  borderRadius: '12px',
  width: '-webkit-fill-available',
  height: '110px',
  backgroundColor: '#121929',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
}));

const ClaimButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  width: '100%',
  height: '42px',
  backgroundColor: '#1AE5A1',
  color: '#102A33',
  fontSize: '18px',
  fontWeight: 'bold',
  textTransform: 'none',
  marginTop: '10px',
  ':disabled': {
    backgroundColor: '#172034',
    color: '#627691',
    cursor: 'not-allowed',
    pointerEvents: 'inherit',
  },
}));
