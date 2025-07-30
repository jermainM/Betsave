import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Typography, Box, styled } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import {
  OfferCameraIcon,
  OfferGameIcon,
  OfferGiftIcon,
  OfferCasinoIcon,
  OfferLockIcon,
  OfferSlotsIcon,
  OfferStarIcon,
  OfferPeopleIcon,
  BetSaveLogoImg,
  BetfuryLogoIcon,
} from "../../constants/images";
import { FaStar } from "react-icons/fa";
import { MoreInfoDialog } from "./MoreInfoDialog";

interface NewOfferDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isPromotional?: boolean;
}

export const NewOfferDialog: React.FC<NewOfferDialogProps> = ({
  open,
  setOpen,
  isPromotional = false,
}) => {
  const [moreInfoOpen, setMoreInfoOpen] = useState(false);

  return (
    <>
      <StyledDialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        TransitionComponent={SlideTransition}
      >
        {/* Header Section */}
        <HeaderContainer>
          <HeaderSection>
            <BrandLogoWrapper>
              <BrandLogo src={OfferCameraIcon} alt="camera" />
            </BrandLogoWrapper>

            <BrandLogoContainer>
              <BrandTitle>BETFURY</BrandTitle>
              <RatingBox>
                <StarsContainer>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Star key={i}>
                      <FaStar />
                    </Star>
                  ))}
                  <HalfStar>
                    <FaStar />
                  </HalfStar>
                </StarsContainer>
                <RatingText>4.6 / 5</RatingText>
              </RatingBox>
            </BrandLogoContainer>
          </HeaderSection>
        </HeaderContainer>
        <DialogContainer>
          <CloseButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </CloseButton>

          {/* Main Offer Section */}
          <MainOfferSection>
            <OfferContainer>
              <OfferContent>
                <GiftIcon src={OfferGiftIcon} alt="gift" />
                <ExclusiveText>EXCLUSIVE BONUS</ExclusiveText>
              </OfferContent>
              <BonusText>100% DEPOSIT BONUS UP TO $10,000</BonusText>
            </OfferContainer>
            <LogoBox>
              <LogoImage src={BetfuryLogoIcon} alt="Betfury Logo" />
            </LogoBox>
          </MainOfferSection>

          {/* Cashback Section */}
          <CashbackSection>
            <CashbackText>Cashback: Up to 12.5% on Net Losses</CashbackText>
          </CashbackSection>

          {isPromotional && (
            <RewardSection>
              <RewardTitle>Rewards</RewardTitle>
              <RewardDescription>
                Get rewarded along the way. Unlock payouts as you complete each
                step.
              </RewardDescription>
              <RewardItemsContainer>
                <RewardItem>
                  <RewardAmount>$0.50</RewardAmount>
                  <RewardText>Sign up and KYC</RewardText>
                </RewardItem>
                <RewardItem>
                  <RewardAmount>$20.00</RewardAmount>
                  <RewardText>Minimum $100 USD Deposit</RewardText>
                </RewardItem>
              </RewardItemsContainer>
            </RewardSection>
          )}

          {/* Game Categories */}
          <GameCategoriesSection>
            <CategoryButton>
              <CategoryIcon src={OfferSlotsIcon} alt="slots" />
              <CategoryText>Slots</CategoryText>
            </CategoryButton>
            <CategoryButton>
              <CategoryIcon src={OfferCasinoIcon} alt="casino" />
              <CategoryText>Live Casino</CategoryText>
            </CategoryButton>
            <CategoryButton>
              <CategoryIcon src={OfferLockIcon} alt="crypto" />
              <CategoryText>Crypto Friendly</CategoryText>
            </CategoryButton>
          </GameCategoriesSection>

          {/* Rating Breakdown */}
          <RatingBreakdownSection>
            <RatingItem>
              <RatingIcon src={OfferStarIcon} alt="bonuses" />
              <RatingLabel>Bonuses:</RatingLabel>
              <RatingScore>9</RatingScore>
              <RatingStar>
                <FaStar />
              </RatingStar>
            </RatingItem>
            <RatingItem>
              <RatingIcon src={OfferGameIcon} alt="game variety" />
              <RatingLabel>Game Variety:</RatingLabel>
              <RatingScore>9.1</RatingScore>
              <RatingStar>
                <FaStar />
              </RatingStar>
            </RatingItem>
            <RatingItem>
              <RatingIcon src={OfferPeopleIcon} alt="bonuses" />
              <RatingLabel>Bonuses:</RatingLabel>
              <RatingScore>9.3</RatingScore>
              <RatingStar>
                <FaStar />
              </RatingStar>
            </RatingItem>
          </RatingBreakdownSection>

          {/* Action Buttons */}
          <ActionButtonsSection>
            <StartEarningButton>Start Earning</StartEarningButton>
            <MoreInfoButton onClick={() => setMoreInfoOpen(true)}>
              More Information
            </MoreInfoButton>
          </ActionButtonsSection>

          {/* Footer */}
        </DialogContainer>
        <FooterSection>
          <FooterLogo src={BetSaveLogoImg} alt="BetSave" />
          <FooterInfo>
            <FooterItem>T&C's apply</FooterItem>
            <FooterItem>Min $10 Deposit</FooterItem>
            <FooterItem>KYC Req</FooterItem>
          </FooterInfo>
          <FooterDivider />
          <FooterBottom>
            <CopyrightText>© 2025 Betsave. All rights reserved.</CopyrightText>
            <AgeText>18+ Only.</AgeText>
          </FooterBottom>
        </FooterSection>
      </StyledDialog>

      {/* More Info Dialog */}
      <MoreInfoDialog open={moreInfoOpen} setOpen={setMoreInfoOpen} />
    </>
  );
};

// Styled Components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "17px",
    backgroundColor: "#151A30",
    backgroundImage: "none",
    color: "#fff",
    maxWidth: "none",
    width: "450px",
    padding: 0,
    position: "relative",
    maxHeight: "90vh",
    overflow: "hidden",
    [theme.breakpoints.down(540)]: {
      width: "100%",
      margin: "24px",
    },
  },
}));

const DialogContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "16px 20px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  overflowY: "auto",
  maxHeight: "calc(90vh - 32px)",
  [theme.breakpoints.down(450)]: {
    gap: "12px",
    padding: "12px 16px",
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 16,
  right: 16,
  color: "#627691",
  zIndex: 2,
  padding: "2px",
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#fff",
    transform: "scale(1.1)",
  },
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  background: "linear-gradient(0deg, #151A30 0%, #151A30 20%, #1a2e3a 100%)",
  padding: "16px",
  marginBottom: "8px",
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "8px",
}));

const BrandLogoWrapper = styled(Box)(({ theme }) => ({
  width: "45px",
  height: "45px",
  backgroundColor: "#31364A",
  borderRadius: "8px",
  padding: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const BrandLogo = styled("img")(({ theme }) => ({
  width: "24px",
  height: "24px",
  objectFit: "contain",
}));

const BrandLogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}));

const BrandTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "18px",
  color: "#fff",
}));

const RatingBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  marginLeft: "auto",
}));

const StarsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const Star = styled("span")(({ theme }) => ({
  color: "#FFD600",
  fontSize: "16px",
  marginLeft: "1px",
  display: "flex",
  alignItems: "center",
  "&:first-of-type": {
    marginLeft: 0,
  },
}));

const HalfStar = styled(Star)(({ theme }) => ({
  opacity: 0.3,
  display: "flex",
  alignItems: "center",
}));

const RatingText = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#8A8D98",
  fontWeight: 600,
  marginTop: "1px",
}));

const MainOfferSection = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #0f1a2a 0%, #1a3e4a 50%, #17a777 100%)",
  borderRadius: "12px",
  padding: "20px",
  position: "relative",
  height: "280px",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at 20% 80%, rgba(26, 229, 161, 0.1) 0%, transparent 50%)",
    pointerEvents: "none",
  },
  display: "flex",
  alignItems: "center",
  gap: "12px",
}));

const OfferContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));

const OfferContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "12px",
}));

const GiftIcon = styled("img")(({ theme }) => ({
  width: "24px",
  height: "24px",
}));

const ExclusiveText = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#FFD600",
  fontWeight: 600,
}));

const BonusText = styled(Typography)(({ theme }) => ({
  fontSize: "22px",
  color: "#fff",
  fontWeight: 700,
  marginBottom: "16px",
  lineHeight: 1.4,
}));

const LogoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "flex-end",
  width: "120px",
  height: "120px",
}));

const LogoImage = styled("img")(({ theme }) => ({
  width: "120px",
  height: "120px",
  objectFit: "contain",
}));

const CashbackSection = styled(Box)(({ theme }) => ({
  background: "#21262E",
  borderRadius: "10px",
  border: "1px solid #585B22",
  padding: "12px 16px",
  textAlign: "center",
}));

const CashbackText = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#FFFC00",
  fontWeight: 400,
}));

const GameCategoriesSection = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "12px",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down(450)]: {
    gap: "6px",
  },
}));

const CategoryButton = styled(Button)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "4px 12px",
  borderRadius: "20px",
  backgroundColor: "#080F29",
  border: "1px solid #222940",
  color: "#8A8D98",
  textTransform: "none",
  minWidth: "auto",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#222940",
    borderColor: "#222940",
    color: "#fff",
    transform: "translateY(-2px)",
  },
  [theme.breakpoints.down(540)]: {
    padding: "4px 8px",
  },
}));

const CategoryIcon = styled("img")(({ theme }) => ({
  width: "20px",
  height: "fit-content",
  objectFit: "none",
}));

const CategoryText = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 500,
  textWrap: "nowrap",
  [theme.breakpoints.down(540)]: {
    fontSize: "12px",
  },
}));

const RatingBreakdownSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "16px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #1a2e3a 0%, #0f1a2a 100%)",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "12px",
    padding: "1px",
    background: "linear-gradient(132.67deg, #14624B 7.33%, #222940 60.93%)",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    pointerEvents: "none",
  },
}));

const RatingItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
}));

const RatingIcon = styled("img")(({ theme }) => ({
  width: "24px",
  height: "24px",
}));

const RatingLabel = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#8A8D98",
  fontWeight: 500,
  flex: 1,
}));

const RatingScore = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#fff",
  fontWeight: 600,
}));

const RatingStar = styled("span")(({ theme }) => ({
  color: "#FFD600",
  fontSize: "16px",
  marginLeft: "4px",
  display: "flex",
  alignItems: "center",
}));

const ActionButtonsSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));

const StartEarningButton = styled(Button)(({ theme }) => ({
  background: "#1AE5A1",
  color: "#171e30",
  fontWeight: 600,
  fontSize: "18px",
  borderRadius: "10px",
  fontFamily: "SpaceGrotesk",
  textTransform: "none",
  padding: "8px 24px",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "#15c88c",
    transform: "translateY(-2px)",
  },
}));

const MoreInfoButton = styled(Button)(({ theme }) => ({
  background: "transparent",
  color: "#fff",
  fontWeight: 600,
  fontFamily: "SpaceGrotesk",
  fontSize: "18px",
  borderRadius: "10px",
  textTransform: "none",
  padding: "8px 24px",
  border: "1px solid #1AE5A1",
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: "#15c88c",
    transform: "translateY(-2px)",
  },
}));

const FooterSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  marginTop: "12px",
  borderTopLeftRadius: "24px",
  borderTopRightRadius: "24px",
  background: "linear-gradient(135deg, #174448 0%, #0f1a2a 100%)",
  padding: "20px 16px 16px 16px",
}));

const FooterLogo = styled("img")(({ theme }) => ({
  width: "138px",
  height: "27px",
  objectFit: "contain",
}));

const FooterInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "16px",
  justifyContent: "center",
}));

const FooterDivider = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "1px",
  background: "#31364A",
  margin: "8px 0",
}));

const FooterItem = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#8A8D98",
  fontWeight: 500,
}));

const FooterBottom = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: "#8A8D98",
  fontWeight: 500,
}));

const AgeText = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#8A8D98",
  fontWeight: 500,
}));

// Smooth slide transition
const SlideTransition = React.forwardRef<HTMLDivElement, TransitionProps>(
  function Transition(props, ref) {
    const { children, in: inProp, ...other } = props;
    return (
      <div
        ref={ref}
        style={{
          transform: inProp ? "translateY(0)" : "translateY(20px)",
          opacity: inProp ? 1 : 0,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        {...other}
      >
        {children}
      </div>
    );
  }
);

const RewardSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));

const RewardTitle = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  color: "#fff",
  fontWeight: 700,
}));

const RewardDescription = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#8A8D98",
  fontWeight: 400,
}));

const RewardItemsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));

const RewardItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "8px",
  border: "1px solid #222940",
  padding: "8px",
  gap: "12px",
}));

const RewardAmount = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "90px",
  height: "30px",
  backgroundColor: "rgba(26, 229, 161, 0.1)",
  borderRadius: "5px",
  color: "#1AE5A1",
}));

const RewardText = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#8A8D98",
}));
