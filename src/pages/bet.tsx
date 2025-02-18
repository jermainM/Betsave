import { useState } from 'react';
import { Box, Button, styled, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';

import { WithdrawCard } from '../components/card/WithdrawCard';
import { LayerImage } from '../layout';

import { STATIC_DATA } from '../constants/static-data';
import { EarnCashbackCard } from '../components/card/EarnCashCard';
import { FAQItem } from '../components/Faq';
import {
  CashoutIcon,
  GiftcardIcon,
  LayerImg2,
  TrustmaryIcon,
} from '../constants/images';

export const BetSmart = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <BetSmartContainer>
      <LayerImage src={LayerImg2} alt="layour-image" />
      <Heading variant="h1">
        Bet Smart & Earn Big <span>Get Cash Back</span>
      </Heading>
      <SubHeading>
        Receive up to 10% cashback on your sports and racing bets. Sign up today
        and start earning while you play.
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

      <WithdrawCardContainer>
        <WithdrawCardWrapper>
          <WithdrawCardTitle>
            <Img src={CashoutIcon} alt={'withdraw-card-icon'} />
            Withdraw Cash
          </WithdrawCardTitle>
          <WithdrawCardsItemContainer>
            {Array.from({ length: 12 }, (_, idx) => (
              <WithdrawCard />
            ))}
          </WithdrawCardsItemContainer>
        </WithdrawCardWrapper>

        <WithdrawCardWrapper>
          <WithdrawCardTitle>
            <Img src={GiftcardIcon} alt={'withdraw-card-icon'} />
            Withdraw Giftcards
          </WithdrawCardTitle>
          <WithdrawCardsItemContainer>
            {Array.from({ length: 16 }, (_, idx) => (
              <WithdrawCard />
            ))}
          </WithdrawCardsItemContainer>
        </WithdrawCardWrapper>
      </WithdrawCardContainer>

      <EarnCashbackContainer>
        <EarnCashbackTitle>How It Works</EarnCashbackTitle>
        <EarnCashbackSubTitle>
          Unlock your favorite gift cards in just three simple steps! Follow our
          step by step guide below and make it yours today!
        </EarnCashbackSubTitle>
        <EarnCashbackContent>
          {STATIC_DATA.giftcard.map((item, idx) => (
            <EarnCashbackCard
              isFull={true}
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
            Sign up now to withdraw your earned coins easily.
          </EarnCashbackActionSubText>
          <EarnCashbackButton>Sign Up Now</EarnCashbackButton>
        </EarnCashbackAction>
      </EarnCashbackContainer>

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
    </BetSmartContainer>
  );
};

const BetSmartContainer = styled(Box)(({ theme }) => ({
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
  width: '660px',
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
  [theme.breakpoints.down(540)]: {
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
  width: '660px',
  [theme.breakpoints.down(1024)]: {
    fontSize: '16px',
    width: '550px',
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

const WithdrawCardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '30px',
  marginTop: '70px',
}));

const WithdrawCardWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  [theme.breakpoints.down(640)]: {
    alignItems: 'center',
  },
}));

const WithdrawCardTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  color: '#fff',
  fontSize: '18px',
  fontWeight: 'bold',
}));

const WithdrawCardsItemContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  flexWrap: 'wrap',
  [theme.breakpoints.down(640)]: {
    justifyContent: 'center',
  },
}));

const EarnCashbackContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center',
  marginTop: '110px',
}));

const EarnCashbackTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  color: '#fff',
  fontWeight: 'bold',
}));

const EarnCashbackSubTitle = styled(Typography)(({ theme }) => ({
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

const EarnCashbackContent = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px',
  marginTop: '30px',
  [theme.breakpoints.down(1024)]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
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
