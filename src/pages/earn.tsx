import { Star } from '@mui/icons-material';
import { Box, Button, styled, Typography } from '@mui/material';

import TrustmaryIcon from '../assets/Trustmary.png';
import { CategoryCard } from '../components/card/CategoryCard';
import { ReasonCard } from '../components/card/ReasonCard';
import { FAQItem } from '../components/Faq';
import { useState } from 'react';

export const EarnMoney = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <EarnMoneyContainer>
      <Heading variant="h1">
        “Earn money with Betsave in the next <span>15 minutes</span>”
      </Heading>
      <SubHeading>
        Bet on sports or horse races and earn up to 7% cashback with our trusted
        partners
      </SubHeading>
      <ReviewContainer>
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
      </ReviewContainer>

      <CategoryContainer>
        <CategoryTitle>Categories</CategoryTitle>
        <CategorySubtitle>
          Replace the six categories with cashback-related ones tailored to your
          business
        </CategorySubtitle>
        <CategoryCardContainer>
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </CategoryCardContainer>
      </CategoryContainer>

      <EarnCashbackContainer>
        <EarnCashbackTitle>How to Earn Cashback</EarnCashbackTitle>
        <EarnCashbackSubTitle>
          Three simple steps to start earning cashback on every sports and horse
          racing bet you place.
        </EarnCashbackSubTitle>
        <EarnCashbackContent></EarnCashbackContent>
        <EarnCashbackAction>
          <EarnCashbackActionSubText>
            Join thousands of bettors earning rewards daily, sign up free!
          </EarnCashbackActionSubText>
          <EarnCashbackButton>Start Earning Now</EarnCashbackButton>
        </EarnCashbackAction>
      </EarnCashbackContainer>

      <ReasonContainer>
        <ReasonTitle>
          “Why Bettors Love Us” <span>Here’s why:</span>
        </ReasonTitle>
        <ReasonSubtitle>
          We’re dedicated to helping you maximize rewards on every bet you
          place.
        </ReasonSubtitle>
        <ReasonCardContainer>
          <ReasonCard />
          <ReasonCard />
          <ReasonCard />
        </ReasonCardContainer>
        <ReviewContainer>
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
        </ReviewContainer>
        <SignUpButton>Sign Up Now</SignUpButton>
      </ReasonContainer>

      <FAQContainer>
        <FAQTitle>Frequently Asked Questions</FAQTitle>
        <FAQItemWrapper>
          <FAQItem
            expanded={expanded === 'panel1'}
            handleChange={handleChange('panel1')}
            title="How do I receive cashback?"
            content="Cashback is credited to your account in coin monthly based on your betting activity. To redeem your coinds into cash, simply cashout and enjoy!"
          />
          <FAQItem
            expanded={expanded === 'panel2'}
            handleChange={handleChange('panel2')}
            title="How do I receive cashback?"
            content="Cashback is credited to your account in coin monthly based on your betting activity. To redeem your coinds into cash, simply cashout and enjoy!"
          />
          <FAQItem
            expanded={expanded === 'panel3'}
            handleChange={handleChange('panel3')}
            title="How do I receive cashback?"
            content="Cashback is credited to your account in coin monthly based on your betting activity. To redeem your coinds into cash, simply cashout and enjoy!"
          />
        </FAQItemWrapper>
      </FAQContainer>
    </EarnMoneyContainer>
  );
};

const EarnMoneyContainer = styled(Box)(({ theme }) => ({
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

const SubHeading = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: '#627691',
  marginTop: '20px',
  textAlign: 'center',
  [theme.breakpoints.down(1024)]: {
    fontSize: '16px',
  },

  [theme.breakpoints.down(768)]: {
    width: '450px',
  },

  [theme.breakpoints.down(640)]: {
    width: '100%',
  },
}));

const ReviewContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  flexDirection: 'column',
  marginTop: '20px',
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

const Img = styled('img')(({ theme }) => ({
  width: '20px',
  height: 'auto',
}));

const CategoryContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  flexDirection: 'column',
  marginTop: '70px',
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  color: '#fff',
  fontWeight: 'bold',
}));

const CategorySubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: '#627691',
  textAlign: 'center',
  width: '540px',
  [theme.breakpoints.down(1024)]: {
    fontSize: '16px',
  },

  [theme.breakpoints.down(768)]: {
    width: '450px',
  },

  [theme.breakpoints.down(640)]: {
    width: '100%',
  },
}));

const CategoryCardContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '10px',
  marginTop: '40px',
  [theme.breakpoints.down(1024)]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.down(768)]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
}));

const EarnCashbackContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center',
  marginTop: '70px',
}));

const EarnCashbackTitle = CategoryTitle;
const EarnCashbackSubTitle = CategorySubtitle;

const EarnCashbackContent = styled(Box)(({ theme }) => ({}));

const EarnCashbackAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '70px',
  gap: '4px',
}));

const EarnCashbackActionSubText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#627691',
}));

const EarnCashbackButton = styled(Button)(({ theme }) => ({
  color: '#0d1321',
  borderRadius: '10px',
  backgroundColor: '#1ae5a1',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  marginTop: '18px',
  height: '45px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px 72px',
}));

const ReasonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'center',
  marginTop: '70px',
}));

const ReasonTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  color: '#fff',
  fontWeight: 'bold',
  span: {
    color: '#1ae5a1',
  },
}));

const ReasonSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#627691',
  width: '320px',
  textAlign: 'center',
}));

const ReasonCardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  marginTop: '40px',
}));

const SignUpButton = styled(Button)(({ theme }) => ({
  color: '#0d1321',
  borderRadius: '10px',
  backgroundColor: '#1ae5a1',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  marginTop: '18px',
  height: '45px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '390px',
}));

const FAQContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  alignItems: 'center',
  marginTop: '110px',
  width: '100%',
  [theme.breakpoints.down(640)]: {
    marginTop: '70px',
  },
}));

const FAQTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  color: '#fff',
  fontWeight: 'bold',
  textAlign: 'center',
  [theme.breakpoints.down(640)]: {
    fontSize: '24px',
  },
}));

const FAQItemWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '20px',
  width: '100%',
}));
