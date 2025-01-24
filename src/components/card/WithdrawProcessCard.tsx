import {
  Box,
  LinearProgress,
  linearProgressClasses,
  styled,
  Typography,
} from '@mui/material';

interface CardProps {
  title: string;
  img: string;
  progress: number;
}

export const WithdrawProcessCard = (props: CardProps) => {
  const { title, img, progress } = props;
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardImg />
      <BorderLinearProgress variant="determinate" value={progress} />
      <ProgressValue
        sx={{
          color:
            progress === 100 ? '#1AE5A1' : progress === 0 ? '#627691' : '#fff',
          textAlign: progress === 100 ? 'center' : 'right',
        }}
      >
        {progress === 100 ? 'Withdraw now' : `${progress.toFixed(2)}%`}
      </ProgressValue>
    </CardContainer>
  );
};

const CardContainer = styled(Box)(({ theme }) => ({
  borderRadius: '10px',
  backgroundColor: '#171e31',
  width: '211px',
  padding: '8px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  [theme.breakpoints.down(470)]: {
    width: '100%',
  },
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#fff',
  width: '100%',
  textAlign: 'center',
}));

const CardImg = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '130px',
  borderRadius: '10px',
  backgroundColor: '#627691',
}));

const ProgressValue = styled(Typography)(({ theme }) => ({
  width: '100%',
  fontSize: '12px',
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: 6,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#627691',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: value === 100 ? '#1AE5A1' : '#fff',
  },
}));
