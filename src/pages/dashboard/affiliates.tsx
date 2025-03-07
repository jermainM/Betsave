import { useState } from "react";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { Box, Button, styled, Typography } from "@mui/material";
import { SignUpDialog } from "../../components/dialog/SignUp";

import {
  MoreProfitImg,
  ThunderBallImg,
  ClockFlagImg,
  SunLightImg,
  NetImg,
} from "../../constants/images";

export const Affiliates = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  return (
    <Container>
      <MarketingBoxContainer>
        <ButtonContainer>
          <BackButton>
            <KeyboardArrowLeft fontSize="small" />
            Back
          </BackButton>
          <Label>Affiliates</Label>
        </ButtonContainer>
        <MarketingCard>
          <MarketingCardAction>
            <MarketingCardTitle>
              Earn with Betsave: Join Our Cashback Affiliate Program!
            </MarketingCardTitle>
            <MarketingCardContent>
              Save on sports & horse racing bets with Betsave! Earn commissions
              on referrals with our 3-tier program. Start earning today!
            </MarketingCardContent>
            <ActionButton onClick={() => handleClickOpen()}>
              Start Now
            </ActionButton>
          </MarketingCardAction>
          <MarketingCardImg src={MoreProfitImg} alt="marketing-img" />
          <EffectImg src={SunLightImg} alt="effect-img" />
        </MarketingCard>
      </MarketingBoxContainer>
      <Explanation>
        <ExplanationTitle>How the Affiliate Program Works</ExplanationTitle>
        <ExplanationSubTitle>
          Save on sports & horse racing bets with Betsave! Earn commissions on
          referrals with our 3-tier program. Start earning today.
        </ExplanationSubTitle>
        <DetailsContainer>
          <DetailsCardContainer>
            <DetailsCard
              id={1}
              title={"Share Your Link"}
              content={
                "Join our affiliate program and receive a unique referral link. Use it to invite sports and racing bettors to Betsave."
              }
            />
            <DetailsCard
              id={2}
              title={"Referrals Earn Cashback"}
              content={
                "When users sign up and place bets using your referral link, they’ll earn cashback on their bets while you earn commissions."
              }
            />
            <DetailsCard
              id={3}
              title={"Grow Your Earnings"}
              content={
                "The more your referrals bet, the higher your earnings. Climb through our 3-tier system to unlock higher commission rates."
              }
            />
          </DetailsCardContainer>
          <DetailsImageContainer>
            <DetailsImg src={ThunderBallImg} alt="thunder-ball" />
            <VectorImg src={NetImg} alt="vector-img" />
          </DetailsImageContainer>
        </DetailsContainer>
      </Explanation>
      <TiersContainer>
        <TierTitle>Affiliate Tiers</TierTitle>
        <TierSubTitle>
          Earn up to 30% commissions through Betsave’s 3-tier affiliate program.
          The more your referrals bet, the higher your earnings.
        </TierSubTitle>
        <AffiliateCardContainer>
          <AffiliateCard idx={1} generate={"$0 - $999"} commission={10} />
          <AffiliateCard idx={2} generate={"$1,000 - $4,999"} commission={20} />
          <AffiliateCard idx={3} generate={"$5,000+"} commission={30} />
        </AffiliateCardContainer>
      </TiersContainer>

      <JoinNowContainer>
        <JoinNowImageContainer>
          <JoinNowImg src={ClockFlagImg} alt="join-now-image" />
          <Vector1Img src={NetImg} alt="vertor1-img" />
        </JoinNowImageContainer>
        <JoinNowContent>
          <JoinNowTitle>
            Join Betsave and Unlock Your Earning Potential!
          </JoinNowTitle>
          <JoinNowSubTitle>
            Start earning generous commissions by referring bettors to Betsave.{" "}
            <br />
            Help them save money on their bets while you grow your income
            through our tiered affiliate program. It's a win-win!
          </JoinNowSubTitle>
          <ActionButton onClick={() => handleClickOpen()}>
            Join Now
          </ActionButton>
        </JoinNowContent>
      </JoinNowContainer>

      <SignUpDialog isOpen={isDialogOpen} setOpen={setDialogOpen} />
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  width: "100%",
}));

const MarketingBoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));

const BackButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#171e31",
  borderRadius: "7px",
  border: "1px solid #627691",
  color: "#627691",
  padding: "6px 10px 6px 6px",
  textTransform: "none",
  height: "28px",
  fontSize: "14px",
}));

const Label = styled(Typography)(({ theme }) => ({
  color: "#627691",
  fontSize: "14px",
  fontWeight: "bold",
}));

const MarketingCard = styled(Box)(({ theme }) => ({
  padding: "48px 50px",
  width: "100%",
  display: "flex",
  borderRadius: "15px",
  position: "relative",
  overflow: "hidden",
  background:
    "radial-gradient(circle at 72% 146%, rgba(14, 247, 169, 0.6) 0%, #141c30 56%)",
  [theme.breakpoints.down(640)]: {
    height: "480px",
  },
  [theme.breakpoints.down(540)]: {
    justifyContent: "center",
  },
  [theme.breakpoints.down(480)]: {
    padding: "48px 32px",
  },
}));

const MarketingCardAction = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "17px",
  width: "300px",
  zIndex: 3,
  [theme.breakpoints.down(540)]: {
    alignItems: "center",
    width: "100%",
  },
}));

const MarketingCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  color: "#fff",
  fontWeight: "bold",
  [theme.breakpoints.down(540)]: {
    textAlign: "center",
  },
  [theme.breakpoints.down(480)]: {
    fontSize: "20px",
  },
}));

const MarketingCardContent = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#627691",
  [theme.breakpoints.down(540)]: {
    textAlign: "center",
  },
  [theme.breakpoints.down(480)]: {
    fontSize: "12px",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  padding: "14px 20px",
  textTransform: "none",
  backgroundColor: "#1AE5A1",
  color: "#000",
  fontSize: "14px",
  fontWeight: "bold",
  width: "110px",
  height: "42px",
  borderRadius: "7px",
}));

const Explanation = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "17px",
  alignItems: "center",
  marginTop: "100px",
  width: "100%",
}));

const ExplanationTitle = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
}));

const ExplanationSubTitle = styled(Typography)(({ theme }) => ({
  color: "#627691",
  fontSize: "14px",
  textAlign: "center",
}));

const DetailsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
  marginTop: "40px",
  [theme.breakpoints.down(1340)]: {
    flexDirection: "column",
  },
}));

const DetailsCardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const DetailsImageContainer = styled(Box)(({ theme }) => ({
  width: "650px",
  height: "380px",
  borderRadius: "15px",
  backgroundColor: "#0f1629",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  background:
    "radial-gradient(circle at 50% 106%, rgba(14, 247, 169, 0.6) 0%, #141c30 66%)",
  overflow: "hidden",
  [theme.breakpoints.down(1340)]: {
    width: "100%",
  },
  [theme.breakpoints.down(572)]: {
    height: "320px",
  },

  [theme.breakpoints.down(450)]: {
    height: "280x",
  },
}));

const DetailsImg = styled("img")(({ theme }) => ({
  width: "540px",
  height: "auto",
  position: "absolute",
  bottom: "-40px",
  zIndex: 1,
  [theme.breakpoints.down(572)]: {
    width: "480px",
  },
  [theme.breakpoints.down(450)]: {
    width: "420px",
  },
}));

const VectorImg = styled("img")(({ theme }) => ({
  width: "540px",
  height: "auto",
  position: "absolute",
  zIndex: 0,
  bottom: 0,
}));

interface DetailsCardProps {
  id: number;
  title: string;
  content: string;
}

const DetailsCard = (props: DetailsCardProps) => {
  const { id, title, content } = props;
  return (
    <DetailsCardWrapper>
      <DetailsCardIndex idx={id}>{id}</DetailsCardIndex>
      <DetailsCardDescription>
        <DetailsCardTitle>{title}</DetailsCardTitle>
        <DetailsCardContent>{content}</DetailsCardContent>
      </DetailsCardDescription>
    </DetailsCardWrapper>
  );
};

const DetailsCardWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: "15px",
  backgroundColor: "#0f1629",
  display: "flex",
  gap: "17px",
  padding: "20px",
}));

const DetailsCardIndex = styled(Box)<{ idx: number }>(({ theme, idx }) => ({
  minWidth: "30px",
  width: "30px",
  height: "30px",
  borderRadius: "7px",
  fontSize: "14px",
  fontWeight: "bold",
  color: idx === 1 ? "#000" : "#fff",
  backgroundColor: idx === 1 ? "#1AE5A1" : idx === 2 ? "#e519e5" : "#19a1e5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const DetailsCardDescription = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));

const DetailsCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: "#fff",
  fontWeight: "bold",
}));

const DetailsCardContent = styled(Typography)(({ theme }) => ({
  color: "#627691",
  fontSize: "14px",
}));

const TiersContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: "70px",
  display: "flex",
  flexDirection: "column",
  gap: "17px",
}));

const TierTitle = ExplanationTitle;

const TierSubTitle = ExplanationSubTitle;

const AffiliateCardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "40px",
  gap: "20px",
  [theme.breakpoints.down(768)]: {
    flexDirection: "column",
    alignItems: "centetr",
  },
}));

interface AffiliateCardProps {
  idx: number;
  generate: string;
  commission: number;
}

const AffiliateCard = (props: AffiliateCardProps) => {
  const { idx, generate, commission } = props;
  return (
    <AffiliateCardWrapper>
      <IdxNumber idx={idx}>{idx}</IdxNumber>
      <CardDivider idx={idx} />
      <CardData name="Generate" value={generate} />
      <CardData name="Commission" value={`${commission.toFixed(2)}%`} />
    </AffiliateCardWrapper>
  );
};

const AffiliateCardWrapper = styled(Box)(({ theme }) => ({
  borderRadius: "15px",
  padding: "15px 25px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#0f1629",
  width: "100%",
  height: "100%",
  [theme.breakpoints.down(1380)]: {
    padding: "15px",
  },
  [theme.breakpoints.down(768)]: {
    maxWidth: "380px",
  },
}));

const IdxNumber = styled(Box)<{ idx: number }>(({ theme, idx }) => ({
  width: "45px",
  height: "45px",
  borderRadius: "7px",
  fontSize: "24px",
  fontWeight: "bold",
  backgroundColor: idx === 1 ? "#1AE5A1" : "#627691",
  color: idx === 1 ? "#000" : "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down(1380)]: {
    width: "36px",
    height: "36px",
    fontSize: "18px",
  },
}));

const CardDivider = styled(Box)<{ idx: number }>(({ theme, idx }) => ({
  width: "1px",
  height: "70px",
  backgroundColor: idx === 1 ? "#1AE5A1" : "#627691",
}));

interface CardDataProps {
  name: string;
  value: string;
}

const CardData = (props: CardDataProps) => {
  const { name, value } = props;
  return (
    <CardDataContainer>
      <CardDataName>{name}</CardDataName>
      <CardDataValue>{value}</CardDataValue>
    </CardDataContainer>
  );
};

const CardDataContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  [theme.breakpoints.down(1380)]: {
    gap: "4px",
  },
}));

const CardDataName = styled(Typography)(({ theme }) => ({
  color: "#627691",
  fontSize: "16px",
  [theme.breakpoints.down(1380)]: {
    fontSize: "14px",
  },
}));

const CardDataValue = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "16px",
  width: "90px",
  [theme.breakpoints.down(1380)]: {
    fontSize: "14px",
    width: "70px",
  },
}));

const JoinNowContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "60px",
  [theme.breakpoints.down(1096)]: {
    justifyContent: "center",
  },
  [theme.breakpoints.down(768)]: {
    flexDirection: "column-reverse",
    alignItems: "center",
  },
}));

const JoinNowImageContainer = styled(Box)(({ theme }) => ({
  width: "480px",
  height: "300px",
  borderRadius: "15px",
  backgroundColor: "#0f1629",
  display: "flex",
  justifyContent: "center",
  background:
    "radial-gradient(circle at 50% 106%, rgba(14, 247, 169, 0.6) 0%, #141c30 66%)",
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.down(1340)]: {
    width: "100%",
  },
  [theme.breakpoints.down(1096)]: {
    width: "450px",
  },
  [theme.breakpoints.down(768)]: {
    width: "100%",
  },
}));

const JoinNowImg = styled("img")(({ theme }) => ({
  width: "540px",
  height: "auto",
  zIndex: 1,
  position: "absolute",
  left: "0",
  bottom: "-70px",
  [theme.breakpoints.down(768)]: {
    left: "inherit",
  },
  [theme.breakpoints.down(540)]: {
    width: "480px",
  },
}));

const Vector1Img = styled("img")(({ theme }) => ({
  width: "540px",
  height: "auto",
  bottom: "0",
  zIndex: 0,
  position: "absolute",
}));

const JoinNowContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  minWidth: "470px",
  width: "470px",
  justifyContent: "center",
  [theme.breakpoints.down(1280)]: {
    minWidth: "320px",
    width: "320px",
  },
  [theme.breakpoints.down(768)]: {
    width: "100%",
    alignItems: "center",
  },
  [theme.breakpoints.down(520)]: {
    width: "100%",
    minWidth: "0px",
  },
}));

const JoinNowTitle = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "27px",
  fontWeight: "bold",
  [theme.breakpoints.down(1280)]: {
    fontSize: "24px",
  },
  [theme.breakpoints.down(768)]: {
    textAlign: "center",
  },
  [theme.breakpoints.down(420)]: {
    fontSize: "24px",
  },
}));

const JoinNowSubTitle = styled(Typography)(({ theme }) => ({
  color: "#627691",
  fontSize: "14px",
  [theme.breakpoints.down(1280)]: {
    fontSize: "12px",
  },
  [theme.breakpoints.down(768)]: {
    textAlign: "center",
  },
  [theme.breakpoints.down(420)]: {
    fontSize: "12px",
  },
}));

const MarketingCardImg = styled("img")(({ theme }) => ({
  width: "540px",
  height: "auto",
  position: "absolute",
  right: "80px",
  bottom: "-40px",
  zIndex: 2,
  [theme.breakpoints.down(1024)]: {
    width: "420px",
  },
  [theme.breakpoints.down(768)]: {
    right: "10px",
  },
}));

const EffectImg = styled("img")(({ theme }) => ({
  width: "640px",
  height: "auto",
  position: "absolute",
  right: "0px",
  bottom: "0",
  zIndex: 0,
  opacity: "0.05",
  [theme.breakpoints.down(1024)]: {
    width: "540px",
  },
  [theme.breakpoints.down(768)]: {
    right: "-60px",
  },
}));
