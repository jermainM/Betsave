import { Box, Button, Divider, styled, Typography } from '@mui/material';
import { StyledBadge } from '../components/badge';
import { BetaCardSlider } from '../components/swiper/BetaCard';
import { Star } from '@mui/icons-material';
import { SignUpCard } from '../components/card/SignUpCard';

import EarnIcon from '../assets/earn.png';
import TrustmaryIcon from '../assets/Trustmary.png';
import TimerIcon from '../assets/timer.png';
import WalletIcon from '../assets/wallet.png';
import UserIcon from '../assets/user-profile.png';
import PlaceBetIcon from '../assets/place-bets.png';
import Beauty1Img from '../assets/beauty1.png';
import PlaceBetImg from '../assets/bet-bg.png';
import MoneyBackImg from '../assets/money-back.png';
import { useState } from 'react';
import { CashbackSlider } from '../components/swiper/Cashback';
import { WhyChooseSwiper } from '../components/swiper/WhyChoose';
import { FAQItem } from '../components/Faq';
import { LayerImage } from '../layout';
import LayourImg from '../assets/layer.png';

export const Landing = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container>
      <LayerImage src={LayourImg} alt="layour-image" />
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
      <CashbackContainer>
        <CashbackItem
          img={TimerIcon}
          text="10m30s"
          subText="Average time until users receive their first cashback."
        />
        <CustomVerticalDivider orientation="vertical" />
        <CustomVHorizDivider orientation="horizontal" />
        <CashbackItem
          img={WalletIcon}
          text="$75.40"
          subText="Average cashback earned by users yesterday"
        />
        <CustomVerticalDivider orientation="vertical" />
        <CustomVHorizDivider orientation="horizontal" />
        <CashbackItem
          text="$5,000,000+"
          subText="Total cashback paid to our users."
        />
      </CashbackContainer>
      <HowitworksContainer>
        <HowitworksText>How It Works</HowitworksText>
        <HowitworksContent>
          <HowitworksAction>
            <HowitworksActionTitle>
              “Bet, Earn & Repeat It’s That Simple" <span>Here’s How--</span>
            </HowitworksActionTitle>
            <GetstartedButton
              variant="contained"
              sx={{ backgroundColor: '#1ae5a1', marginTop: '20px' }}
            >
              Get Started Now
            </GetstartedButton>
            <Howitworks device={'mobile'}>
              <HowitworksItem
                icon={UserIcon}
                title="1. Sign Up"
                text="Create a free account and choose from our partnered sportsbooks and racing platforms"
                img={Beauty1Img}
              />
              <HowitworksItem
                icon={PlaceBetIcon}
                title="2. Place Your Bets"
                text="Place bets like you normally do - we'll take care of the rest."
                img={PlaceBetImg}
              />
              <HowitworksItem
                icon={WalletIcon}
                title="3. Get Cashback"
                text="Recive up to 7% cashback on your betting activity each month, directly to your account."
                img={MoneyBackImg}
              />
            </Howitworks>
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
          </HowitworksAction>
          <Howitworks device={'desktop'}>
            <HowitworksItem
              icon={UserIcon}
              title="1. Sign Up"
              text="Create a free account and choose from our partnered sportsbooks and racing platforms"
              img={Beauty1Img}
            />
            <HowitworksItem
              icon={PlaceBetIcon}
              title="2. Place Your Bets"
              text="Place bets like you normally do - we'll take care of the rest."
              img={PlaceBetImg}
            />
            <HowitworksItem
              icon={WalletIcon}
              title="3. Get Cashback"
              text="Recive up to 7% cashback on your betting activity each month, directly to your account."
              img={MoneyBackImg}
            />
          </Howitworks>
        </HowitworksContent>
      </HowitworksContainer>

      <WhyChooseUsContainer>
        <WhyChooseUsText>Why Choose Us?</WhyChooseUsText>
        <WhyChooseSwiper />
        <WhyChooseReview>
          <WhyChooseReviewText>
            See our <span>150,000+</span> reviews on
            <WhyChooseTrustMaryLogo>
              <Img src={TrustmaryIcon} alt="logo" sx={{ width: '12px' }} />
              trustmary
            </WhyChooseTrustMaryLogo>
          </WhyChooseReviewText>
          <LearnMoreButton>Learn More</LearnMoreButton>
        </WhyChooseReview>
      </WhyChooseUsContainer>

      <CashbackStructureContainer>
        <CashbacktructureText>Cashback Structure</CashbacktructureText>
        <CashbackSlider />
      </CashbackStructureContainer>

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
        <LearnMoreButton>Find More Answers</LearnMoreButton>
      </FAQContainer>
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
  [theme.breakpoints.down(540)]: {
    fontSize: '36px',
  },

  [theme.breakpoints.down(480)]: {
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
  justifyContent: 'center',
  marginTop: '50px',
  width: '100%',
  [theme.breakpoints.down(1140)]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  [theme.breakpoints.down(1024)]: {
    marginTop: '20px',
  },
}));

const ReviewContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '76px',
  [theme.breakpoints.down(1140)]: {
    alignItems: 'center',
    gap: '42px',
  },
  [theme.breakpoints.down(640)]: {
    width: '100%',
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

const CashbackContainer = styled(Box)(({ theme }) => ({
  borderRadius: '15px',
  backgroundColor: '#141c30',
  padding: '28px 48px',
  display: 'flex',
  width: '100%',
  marginTop: '110px',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  [theme.breakpoints.down(1024)]: {
    padding: '24px 32px',
    gap: '20px',
  },
  [theme.breakpoints.down(640)]: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '60px',
  },
}));

interface CashbackItemProps {
  img?: string;
  text: string;
  subText: string;
}

const CashbackItem = (props: CashbackItemProps) => {
  const { img, text, subText } = props;
  return (
    <CashbackItemConainer>
      <Cashback>
        {img && <CashbackImg src={img} alt="cashback-item-img" />}
        {text}
      </Cashback>
      <CashbackText>{subText}</CashbackText>
    </CashbackItemConainer>
  );
};

const CashbackItemConainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '240px',
  alignItems: 'center',
}));

const Cashback = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#fff',
  [theme.breakpoints.down(840)]: {
    fontSize: '24px',
  },
  [theme.breakpoints.down(640)]: {
    fontSize: '32px',
  },
}));

const CashbackImg = styled('img')(({ theme }) => ({
  width: '28px',
  height: '28px',
  [theme.breakpoints.down(840)]: {
    width: '24px',
    height: '24px',
  },
  [theme.breakpoints.down(640)]: {
    width: '28px',
    height: '28px',
  },
}));

const CashbackText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#627691',
  textAlign: 'center',
}));

const CustomVerticalDivider = styled(Divider)(({ theme }) => ({
  color: '#a9a9b0',
  width: '1px',
  height: '120px',
  [theme.breakpoints.down(640)]: {
    display: 'none',
  },
}));

const CustomVHorizDivider = styled(Divider)(({ theme }) => ({
  color: '#a9a9b0',
  width: '100%',
  height: '1px',
  display: 'none',
  [theme.breakpoints.down(640)]: {
    display: 'block',
  },
}));

const HowitworksContainer = styled(Box)(({ theme }) => ({
  marginTop: '110px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '60px',
  width: '100%',
  [theme.breakpoints.down(640)]: {
    marginTop: '70px',
  },
}));

const HowitworksText = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  color: '#fff',
  fontWeight: 'bold',
  textAlign: 'center',
  [theme.breakpoints.down(640)]: {
    fontSize: '24px',
  },
}));

const HowitworksContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '40px',
  [theme.breakpoints.down(840)]: {
    width: '504px',
  },

  [theme.breakpoints.down(640)]: {
    width: '100%',
  },
}));

const HowitworksAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  width: '100%',
  [theme.breakpoints.down(840)]: {
    alignItems: 'center',
  },
}));

const HowitworksActionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '42px',
  color: '#fff',
  fontWeight: 'bold',
  width: '450px',
  span: {
    color: '#1ae5a1',
  },
  [theme.breakpoints.down(1140)]: {
    fontSize: '36px',
    width: '390px',
  },
  [theme.breakpoints.down(915)]: {
    width: '320px',
    fontSize: '32px',
  },
  [theme.breakpoints.down(840)]: {
    width: '100%',
    fontSize: '42px',
    textAlign: 'center',
  },
  [theme.breakpoints.down(480)]: {
    fontSize: '32px',
  },
  [theme.breakpoints.down(390)]: {
    fontSize: '26px',
  },
}));

const GetstartedButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  width: '100%',
  color: '0d1321',
  fontSize: '16px',
  fontWeight: 'bold',
  height: '50px',
  borderRadius: '10px',
  [theme.breakpoints.down(390)]: {
    height: '42px',
    fontSize: '14px',
  },
}));

const Howitworks = styled(Box)<{ device: 'mobile' | 'desktop' }>(
  ({ theme, device }) => ({
    display: device === 'desktop' ? 'flex' : 'none',
    flexDirection: 'column',
    gap: '60px',
    width: 'min-content',
    [theme.breakpoints.down(840)]: {
      display: device === 'mobile' ? 'flex' : 'none',
      width: '100%',
    },
  })
);

interface HowitworksItemProps {
  icon: string;
  title: string;
  text: string;
  img: string;
}

const HowitworksItem = (props: HowitworksItemProps) => {
  const { icon, title, text, img } = props;
  return (
    <HowitworksItemContainer>
      <HowitworksTitle>
        <HowitworksIcon src={icon} alt="how-it-works-icon" />
        {title}
      </HowitworksTitle>
      <HowitworksItemText>{text}</HowitworksItemText>
      <HowitworksImage src={img} alt="how-it-works-img" />
    </HowitworksItemContainer>
  );
};

const HowitworksItemContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}));

const HowitworksTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
}));

const HowitworksItemText = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#627691',
  fontWeight: 'bold',
}));

const HowitworksIcon = styled('img')(({ theme }) => ({
  width: '16px',
  height: '16px',
}));

const HowitworksImage = styled('img')(({ theme }) => ({
  width: '520px',
  height: 'auto',
  borderRadius: '20px',
  [theme.breakpoints.down(1140)]: {
    width: '460px',
  },
  [theme.breakpoints.down(960)]: {
    width: '400px',
  },
  [theme.breakpoints.down(840)]: {
    width: '100%',
  },
}));

const WhyChooseUsContainer = styled(Box)(({ theme }) => ({
  marginTop: '110px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '60px',
  width: '100%',
  [theme.breakpoints.down(640)]: {
    marginTop: '70px',
  },
}));

const WhyChooseUsText = HowitworksText;

const WhyChooseReview = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: '40px',
  gap: '20px',
  flexDirection: 'column',
  [theme.breakpoints.down(640)]: {
    marginTop: '10px',
  },
}));

const WhyChooseReviewText = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#627691',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  span: {
    color: '#fff',
  },
  [theme.breakpoints.down(480)]: {
    fontSize: '12px',
  },
}));

const WhyChooseTrustMaryLogo = styled(Box)(({ theme }) => ({
  color: '#fff',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  [theme.breakpoints.down(480)]: {
    fontSize: '12px',
  },
}));

const LearnMoreButton = styled(Button)(({ theme }) => ({
  color: '#0d1321',
  borderRadius: '10px',
  backgroundColor: '#1ae5a1',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 'bold',
  marginTop: '18px',
  width: '185px',
  height: '45px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const CashbackStructureContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '54px',
  marginTop: '110px',
  width: '100%',
  [theme.breakpoints.down(640)]: {
    marginTop: '70px',
  },
}));

const CashbacktructureText = WhyChooseUsText;

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

const FAQTitle = WhyChooseUsText;

const FAQItemWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '20px',
  width: '100%',
}));
