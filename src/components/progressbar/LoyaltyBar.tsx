import { styled } from '@mui/material/styles';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { Box, Typography } from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#0d1321',
    backgroundImage:
      'linear-gradient(45deg, hsla(0, 0%, 100%, .15) 25%, transparent 0, transparent 50%, hsla(0, 0%, 100%, .15) 0, hsla(0, 0%, 100%, .15) 75%, transparent 0, transparent)',
    backgroundSize: '2rem 2rem',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#1AE5A1',
  },
}));

interface LoyaltyBarProps {
  value: number;
  unit: string;
}

export const LoyaltyBar = (props: LoyaltyBarProps) => {
  const { value, unit } = props;
  return (
    <LoyaltyBarContainer>
      <LevelLabelContainer>
        <LevelLabel type="current">0{unit}</LevelLabel>
        <LevelLabel type="max">
          100
          {unit}
        </LevelLabel>
      </LevelLabelContainer>
      <BorderLinearProgress variant="determinate" value={value} />
      <ProgressLabelContainer>
        <ProgressLabel value={value} limit={0}>
          Bronze
        </ProgressLabel>
        <ProgressLabel value={value} limit={(100 / 3) * 1}>
          Silver
        </ProgressLabel>
        <ProgressLabel value={value} limit={(100 / 3) * 2}>
          Gold
        </ProgressLabel>
        <ProgressLabel value={value} limit={100}>
          Platinum
        </ProgressLabel>
      </ProgressLabelContainer>
    </LoyaltyBarContainer>
  );
};

const LoyaltyBarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
}));

const LevelLabelContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const LevelLabel = styled(Typography)<{ type: string }>(({ theme, type }) => ({
  fontSize: '12px',
  color: type === 'max' ? '#fff' : '#102A33',
  textWrap: 'nowrap',
  backgroundColor: type === 'max' ? '#1f293d' : '#1AE5A1',
  border: '4px solid #172034',
  padding: '2px 8px',
  borderRadius: '8px',
  fontWeight: type === 'max' ? 'normal' : 'bold',
  zIndex: type === 'max' ? 1 : 2,
  width: 'fit-content',
}));

const ProgressLabelContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const ProgressLabel = styled(Box)<{ value: number; limit: number }>(
  ({ theme, value, limit }) => ({
    fontSize: '12px',
    fontWeight: 'bold',
    color: value >= limit ? '#102A33' : '#fff',
    backgroundColor: value >= limit ? '#1AE5A1' : '#1f293d',
    border: value >= limit ? '0px solid #1AE5A1' : '4px solid #172034',
    padding: '2px 8px',
    borderRadius: value >= limit ? '4px' : '8px',
  })
);
