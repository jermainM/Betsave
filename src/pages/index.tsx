import { Box, styled, Typography } from '@mui/material';
import { StyledBadge } from '../components/badge';
import { BetaCardSlider } from '../components/slider/betacard';
import { Star } from '@mui/icons-material';
import { SignUpCard } from '../components/card/SignUpCard';

import EarnIcon from '../assets/earn.png';
import TrustmaryIcon from '../assets/Trustmary.png';

export const Landing = () => {
  return (
    <Container>
      <Heading variant="h1">
        <span>“Earn Cashback</span> on Every Bet You Place”
      </Heading>
      <SmallHeadingContainer>
        <SmallHeadingItem>
          <IconWrapper>
            <Icon src={EarnIcon} alt="earn-icon" />
          </IconWrapper>
          <p>
            Cashback rewards up to <span>7%</span>
          </p>
        </SmallHeadingItem>
        <SmallHeadingItem>
          <IconWrapper>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ horizontal: 'left' }}
              variant="dot"
            />
          </IconWrapper>
          <p>
            <span>190</span> Offers available now
          </p>
        </SmallHeadingItem>
      </SmallHeadingContainer>
      <CardGroupContainer>
        <ReviewContainer>
          <BetaCardSlider />
          <ReviewWrapper>
            <ReviewText>
              See our <span>150.000+</span> reviews on
            </ReviewText>
            <TrustMaryContainer>
              <TrustMaryLogo>
                <Img src={TrustmaryIcon} alt="logo" />
                trustmary
              </TrustMaryLogo>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </TrustMaryContainer>
          </ReviewWrapper>
        </ReviewContainer>
        <SignUpCard />
      </CardGroupContainer>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  marginTop: '70px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: '54px',
  color: '#fff',
  fontWeight: 'bold',
  textAlign: 'center',
  width: '700px',
  span: {
    color: '#1ae5a1',
  },
  [theme.breakpoints.down(1024)]: {
    fontSize: '42px',
    width: '550px',
  },
  [theme.breakpoints.down(640)]: {
    fontSize: '42px',
    width: '100%',
    padding: '0px 20px',
  },
  [theme.breakpoints.down(500)]: {
    fontSize: '36px',
  },

  [theme.breakpoints.down(450)]: {
    fontSize: '32px',
  },

  [theme.breakpoints.down(420)]: {
    fontSize: '28px',
  },
}));

const SmallHeadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '60px',
  marginTop: '36px',
  [theme.breakpoints.down(640)]: {
    gap: '16px',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '24px',
  height: 'auto',
  [theme.breakpoints.down(1024)]: {
    width: '20px',
  },
  [theme.breakpoints.down(640)]: {
    width: '16px',
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Icon = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

const Img = styled('img')(({ theme }) => ({
  width: '20px',
  height: 'auto',
}));

const SmallHeadingItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  fontSize: '20px',
  color: '#627691',
  p: {
    margin: '0',
  },
  span: {
    color: '#fff',
  },
  [theme.breakpoints.down(1024)]: {
    gap: '16px',
    fontSize: '16px',
  },
}));

const CardGroupContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '80px',
  justifyContent: 'space-between',
  marginTop: '50px',

  [theme.breakpoints.down(1140)]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  [theme.breakpoints.down(1024)]: {
    marginTop: '20px',
  },
  [theme.breakpoints.down(768)]: {
    width: '100%',
  },
}));

const ReviewContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '76px',
  width: '100%',
  [theme.breakpoints.down(1140)]: {
    alignItems: 'center',
    gap: '42px',
  },
}));

const ReviewWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  [theme.breakpoints.down(1140)]: {
    alignItems: 'center',
  },
}));

const ReviewText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#627691',
  fontWeight: 'bold',
  span: {
    color: '#fff',
  },
}));

const TrustMaryContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  [theme.breakpoints.down(450)]: {
    gap: '8px',
  },
}));

const TrustMaryLogo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: '#fff',
  fontSize: '20px',
  fontWeight: 'bold',
  [theme.breakpoints.down(450)]: {
    fontSize: '16px',
  },
}));

const StarIcon = styled(Star)(({ theme }) => ({
  color: 'yellow',
  width: '24px',
  height: '24px',
  [theme.breakpoints.down(450)]: {
    width: '18px',
    height: '18px',
  },
}));
