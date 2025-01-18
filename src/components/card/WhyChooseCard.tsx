import { Box, styled, Typography } from '@mui/material';
import MaximizeIcon from '../../assets/maximize.png';

interface WhyChooseCardProps {
  img: string;
  title: string;
  content: string;
}

export const WhyChooseCard = (props: WhyChooseCardProps) => {
  const { img, title, content } = props;
  return (
    <WhyChooseCardContainer>
      <WhyChooseCardImg src={img} alt="why-choose-card" />
      <WhyChooseCardTitle>{title}</WhyChooseCardTitle>
      <WhyChooseCardContent>{content}</WhyChooseCardContent>
    </WhyChooseCardContainer>
  );
};

const WhyChooseCardContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '36px 42px',
  borderRadius: '15px',
  backgroundColor: '#141c30',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '24px',
  [theme.breakpoints.down(1280)]: {
    padding: '24px 32px',
    width: '100%',
    gap: '16px',
  },
}));

const WhyChooseCardImg = styled('img')(({ theme }) => ({
  width: '115px',
  height: 'auto',
  [theme.breakpoints.down(960)]: {
    width: '80px',
  },
}));

const WhyChooseCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '22px',
  color: '#fff',
  fontWeight: 'bold',
  [theme.breakpoints.down(960)]: {
    fontSize: '18px',
    textAlign: 'center',
  },
}));

const WhyChooseCardContent = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#627691',
  textAlign: 'center',
  [theme.breakpoints.down(960)]: {
    fontSize: '14px',
  },
}));
