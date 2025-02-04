import { Box, Rating, styled, Typography } from '@mui/material';
import Bet365Logo from '../../assets/bet365-logo.png';
import LockIcon from '../../assets/lock.png';
import { BetSaveTooltip } from '../../components/tooltip';

export const BookMaker = () => {
  return (
    <Container>
      <BookMakerTitleContainer>
        <BookMakerTitle>Bookmaker</BookMakerTitle>
        <BookMakerSubTitle>All Partnered sites</BookMakerSubTitle>
      </BookMakerTitleContainer>
      <BookMakerItemContainer>
        <BookMakerItem percent={30} rate={5} />
        <BookMakerItem percent={60} rate={4.3} />
        <BookMakerItem percent={20} rate={2.6} />
        <BookMakerItem percent={90} rate={3.8} />
        <BookMakerItem percent={90} rate={3.6} />
        <BookMakerItem percent={90} rate={2.7} />
        <BookMakerItem percent={90} rate={4} />
        <BookMakerItem percent={90} rate={5} />
        <BookMakerItem percent={50} rate={3.8} isComing />
        <BookMakerItem percent={50} rate={1.4} isComing />
      </BookMakerItemContainer>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}));

const BookMakerTitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
}));

const BookMakerTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: '#fff',
  fontWeight: 'normal',
}));

const BookMakerSubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: '#627691',
}));

const BookMakerItemContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  marginTop: '20px',
  flexWrap: 'wrap',
  [theme.breakpoints.down(840)]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  [theme.breakpoints.down(768)]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.down(560)]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.down(380)]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
}));

interface BookMakerItemProps {
  percent: number;
  rate: number;
  isComing?: boolean;
}

const BookMakerItem = (props: BookMakerItemProps) => {
  const { percent, rate, isComing } = props;
  return (
    <BookMakerItemWrapper>
      {isComing && (
        <BookMakerTrasparent>
          <LockImg src={LockIcon} alt="lock-icon" />
          <LockText>Coming Soon </LockText>
        </BookMakerTrasparent>
      )}
      <ItemBadge>+{percent}%</ItemBadge>
      <ItemImg src={Bet365Logo} alt="item-img" />
      <RatingContainer>
        <RatingTitle>Rating {rate}</RatingTitle>
        <BetRating value={rate} precision={0.5} readOnly />
      </RatingContainer>
    </BookMakerItemWrapper>
  );
};

const BookMakerItemWrapper = styled(Box)(({ theme }) => ({
  width: '165px',
  height: '240px',
  borderRadius: '15px',
  background:
    'radial-gradient(circle at 50% 115%, rgba(14, 247, 169, 0.3) 0%, #0F3D3E 10% 10%, #141c30)',
  boxShadow: '0px 2px 3px 0px rgba(14, 247, 169,0.75)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',
  position: 'relative',
  gap: '64px',
  padding: '20px',
  [theme.breakpoints.down(840)]: {
    width: '100%',
  },
}));

const ItemBadge = styled(Box)(({ theme }) => ({
  padding: '4px 8px',
  fontSize: '12px',
  color: '#1ae5a1',
  width: 'fit-content',
  borderRadius: '7px',
  backgroundColor: '#102A33',
  position: 'absolute',
  right: '12px',
  top: '12px',
}));

const ItemTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  color: '#13B17F',
  fontWeight: '700',
  span: {
    color: '#F5DB1F',
  },
}));

const RatingContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '5px',
}));

const RatingTitle = styled(Typography)(({ theme }) => ({
  color: '#fff',
  fontSize: '18px',
}));

const ItemImg = styled('img')(({ theme }) => ({
  width: '105px',
  height: 'auto',
}));

const BetRating = styled(Rating)(({ theme }) => ({
  fontSize: '20px',
  color: '#fffc00',
}));

const BookMakerTrasparent = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  opacity: '1',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '15px',
  padding: '20px',
  backdropFilter: 'blur(10px)',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
}));

const LockImg = styled('img')(({ theme }) => ({
  width: '45px',
  height: 'auto',
}));

const LockText = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: '#fff',
  textAlign: 'center',
}));
