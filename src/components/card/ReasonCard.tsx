import { Box, styled, Typography } from '@mui/material';
import { ArrowRightAlt } from '@mui/icons-material';

interface ReasonCardProps {
  img: string;
  title: string;
  content: string;
  link: string;
}

export const ReasonCard = (props: ReasonCardProps) => {
  const { img, title, content, link } = props;
  return (
    <ReasonCardContainer>
      <Img src={img} alt="reason-icon" />
      <ReasonCardTitle>{title}</ReasonCardTitle>
      <ReasonCardContent>{content}</ReasonCardContent>
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
  [theme.breakpoints.down(420)]: {
    padding: '24px',
  },
}));

const Img = styled('img')(({ theme }) => ({
  width: '54px',
  height: '54px',
  objectFit: 'contain',
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
