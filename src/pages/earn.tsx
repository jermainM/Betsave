import { useState } from 'react';
import { East, Star } from '@mui/icons-material';
import { Box, Button, styled, Typography } from '@mui/material';

import { CategoryCard } from '../components/card/CategoryCard';
import { ReasonCard } from '../components/card/ReasonCard';
import { FAQItem } from '../components/Faq';
import FeaturedPartners from '../components/marquee/Partners';
import { STATIC_DATA } from '../constants/static-data';

import { EarnCashbackCard } from '../components/card/EarnCashCard';
import { LayerImage } from '../layout';
import {
  GreenCashbackIcon,
  GreenHorseRaceIcon,
  GreenMaxmizeWinIcon,
  HorseIcon,
  HorseImg,
  LayerImg1,
  TrophyIcon,
  TrustmaryIcon,
} from '../constants/images';

export const EarnMoney = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <EarnMoneyContainer>
      <LayerImage src={LayerImg1} alt="layour-image" />
      <Heading variant="h1">
        Get Up to 10% Cashback with Betsave in Just
        <span> 15 Minutes</span>
      </Heading>
      <SubHeading>
        Bet on sports or horse races and earn up to 10% cashback on NGR with our
        trusted partners.
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
      <SignUpButton>Sign Up Now</SignUpButton>

      <FeaturedPartnerContainer>
        <FeaturedPartnerTitle>Featured Partners</FeaturedPartnerTitle>
        <FeaturedPartners />
      </FeaturedPartnerContainer>

      <CategoryContainer>
        <CategoryTitle>Categories</CategoryTitle>
        <CategorySubtitle>
          Replace the six categories with cashback-related ones tailored to your
          business
        </CategorySubtitle>
        <CategoryCardContainer>
          {STATIC_DATA.categories.map((item, idx) => (
            <CategoryCard
              img={item.img}
              title={item.title}
              content={item.content}
              action={item.action}
              link={item.link}
              key={idx}
            />
          ))}
        </CategoryCardContainer>
      </CategoryContainer>

      <MarketImageContainer>
        <MarketBarContainer>
          <MarketBarWrapper>
            <MarketIcon src={GreenMaxmizeWinIcon} alt="market-icon" />
            <EastIcon />
            <MarketIcon src={GreenHorseRaceIcon} alt="market-icon" />
            <EastIcon />
            <MarketIcon src={GreenCashbackIcon} alt="market-icon" />
          </MarketBarWrapper>
        </MarketBarContainer>
        <MarketItemContainer>
          <MarketItemActionContainer>
            <MarketItemText>
              <span>$1M+ Cashback</span> for Sports & Horse Bettors!
            </MarketItemText>
            <MarketActionButton>Start Earning Now</MarketActionButton>
          </MarketItemActionContainer>
          <MarketItemImage src={HorseImg} alt="horse-img" />
        </MarketItemContainer>
      </MarketImageContainer>

      <EarnCashbackContainer>
        <EarnCashbackTitle>How to Earn Cashback</EarnCashbackTitle>
        <EarnCashbackSubTitle>
          Three simple steps to start earning cashback on every sports and horse
          racing bet you place.
        </EarnCashbackSubTitle>
        <EarnCashbackContent>
          {STATIC_DATA.earnCashback.map((item, idx) => (
            <EarnCashbackCard
              img={item.img}
              icon={item.icon}
              title={item.title}
              content={item.content}
              key={idx}
            />
          ))}
        </EarnCashbackContent>
        <EarnCashbackAction>
          <EarnCashbackActionSubText>
            Join thousands of bettors earning rewards daily, sign up free!
          </EarnCashbackActionSubText>
          <EarnCashbackButton endIcon={<East />}>
            Start Earning Now
          </EarnCashbackButton>
        </EarnCashbackAction>
      </EarnCashbackContainer>

      <ReasonContainer>
        <ReasonTitle>
          Why Bettors Love Us <span>Here’s why:</span>
        </ReasonTitle>
        <ReasonSubtitle>
          We’re dedicated to helping you maximize rewards based on your NGR
        </ReasonSubtitle>
        <ReasonCardContainer>
          {STATIC_DATA.reason.map((item, idx) => (
            <ReasonCard
              img={item.img}
              title={item.title}
              content={item.content}
              link={item.link}
              key={idx}
            />
          ))}
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
  fontSize: '48px',
  color: '#fff',
  fontWeight: 'bold',
  textAlign: 'center',
  width: '700px',
  span: {
    color: '#1ae5a1',
  },
  [theme.breakpoints.down(1024)]: {
    fontSize: '36px',
    width: '640px',
  },
  [theme.breakpoints.down(640)]: {
    fontSize: '28px',
    width: '100%',
    padding: '0px 20px',
  },
  [theme.breakpoints.down(520)]: {
    fontSize: '24px',
  },

  [theme.breakpoints.down(350)]: {
    fontSize: '20px',
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
    fontSize: '16px',
  },

  [theme.breakpoints.down(490)]: {
    fontSize: '14px',
  },
}));

const ReviewContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  flexDirection: 'column',
  marginTop: '20px',
  marginBottom: '10px',
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

const EarnCashbackContent = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px',
  [theme.breakpoints.down(1024)]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
  marginTop: '30px',
}));

const EarnCashbackAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '30px',
  gap: '4px',
  [theme.breakpoints.down(640)]: {
    margin: '0',
  },
}));

const EarnCashbackActionSubText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#627691',
  textAlign: 'center',
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
  [theme.breakpoints.down(420)]: {
    fontSize: '14px',
    padding: '16px 32px',
  },
}));

const ReasonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'center',
  marginTop: '70px',
  width: '100%',
}));

const ReasonTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  color: '#fff',
  fontWeight: 'bold',
  textAlign: 'center',
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
  [theme.breakpoints.down(1064)]: {
    flexDirection: 'column',
  },
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
  [theme.breakpoints.down(640)]: {
    width: '100%',
  },
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

const FeaturedPartnerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  alignItems: 'center',
  width: '100%',
  marginTop: '70px',
}));

const FeaturedPartnerTitle = styled(Box)(({ theme }) => ({
  fontSize: '24px',
  color: '#fff',
  fontWeight: 'bold',
}));

const MarketImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));

const MarketBarContainer = styled(Box)(({ theme }) => ({
  height: '72px',
  padding: '10px',
  background: 'linear-gradient(90deg, #0D1422, #141c30, #0D1422)',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '45px',
  borderRadius: '15px',
}));

const MarketBarWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '125px',
  [theme.breakpoints.down(960)]: {
    gap: '80px',
  },
  [theme.breakpoints.down(640)]: {
    gap: '42px',
  },
  [theme.breakpoints.down(480)]: {
    gap: '24px',
  },
}));

const MarketIcon = styled('img')(({ theme }) => ({
  width: '64px',
  height: 'auto',
  [theme.breakpoints.down(960)]: {
    width: '54px',
  },
}));

const EastIcon = styled(East)(({ theme }) => ({
  fontSize: '36px',
  [theme.breakpoints.down(960)]: {
    fontSize: '28px',
  },
  [theme.breakpoints.down(640)]: {
    fontSize: '20px',
  },
}));

const MarketItemContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '320px',
  borderRadius: '25px',
  // background: 'linear-gradient(90deg, #0D1422, #141c30, #0D1422)',
  background: `
          linear-gradient(90deg, #0D1422 0%, #141C30 60%, transparent 100%),
          radial-gradient(circle at 75% 100%, rgba(14, 247, 169, 0.3) 0%, rgba(20, 28, 48, 0) 36%)
        `,
  backgroundBlendMode: 'overlay',
  marginTop: '32px',
  padding: '32px',
  overflow: 'hidden',
  position: 'relative',
  [theme.breakpoints.down(1024)]: {
    height: '240px',
  },
  [theme.breakpoints.down(768)]: {
    height: '480px',
    alignItems: 'center',
    flexDirection: 'column',
  },
  [theme.breakpoints.down(480)]: {
    height: '360px',
  },
  // [theme.breakpoints.down(640)]: {

  // },
}));

const MarketItemActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '420px',
  marginTop: '20px',
  zIndex: 2,
  [theme.breakpoints.down(1024)]: {
    width: '320px',
  },
  [theme.breakpoints.down(768)]: {
    width: '420px',
  },
  [theme.breakpoints.down(640)]: {
    width: '100%',
  },
}));

const MarketItemText = styled(Typography)(({ theme }) => ({
  fontSize: '36px',
  color: '#fff',
  fontWeight: 'bold',
  span: {
    color: '#1ae5a1',
  },
  [theme.breakpoints.down(1024)]: {
    fontSize: '28px',
  },
  [theme.breakpoints.down(768)]: {
    textAlign: 'center',
    fontSize: '32px',
  },
  [theme.breakpoints.down(640)]: {
    fontSize: '28px',
  },
  [theme.breakpoints.down(480)]: {
    fontSize: '24px',
  },
  [theme.breakpoints.down(380)]: {
    fontSize: '18px',
  },
}));

const MarketActionButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '42px',
  backgroundColor: '#1ae5a1',
  color: '#000',
  fontSize: '16px',
  fontWeight: 'bold',
  textTransform: 'none',
  marginTop: '20px',
  [theme.breakpoints.down(1024)]: {
    marginTop: '10px',
  },
  [theme.breakpoints.down(420)]: {
    height: '36px',
    fontSize: '14px',
  },
}));

const MarketItemImage = styled('img')(({ theme }) => ({
  width: '540px',
  height: 'auto',
  position: 'absolute',
  right: 0,
  zIndex: 1,
  [theme.breakpoints.down(1024)]: {
    width: '420px',
  },
  [theme.breakpoints.down(768)]: {
    width: '480px',
    position: 'static',
    marginTop: '35px',
  },
  [theme.breakpoints.down(480)]: {
    width: '320px',
    marginTop: '20px',
  },
}));
