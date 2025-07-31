import React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Typography, Box, styled, Rating } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import {
  OfferCameraIcon,
  OfferStarIcon,
  BetSaveLogoImg,
} from "../../constants/images";
import { FaStar } from "react-icons/fa";

interface MoreInfoDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  description: string;
  depositBonus: string;
  termsAndConditions: string;
  image: string;
  offerRate: number;
  title: string;
}

export const MoreInfoDialog: React.FC<MoreInfoDialogProps> = ({
  open,
  setOpen,
  description,
  depositBonus,
  termsAndConditions,
  image,
  offerRate,
  title,
}) => {
  return (
    <StyledDialog
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={SlideTransition}
    >
      {/* Header Section */}
      <HeaderContainer>
        <HeaderSection>
          <BrandLogoWrapper>
            <BrandLogo src={image} alt="camera" />
          </BrandLogoWrapper>

          <BrandLogoContainer>
            <BrandTitle>{title}</BrandTitle>
            <RatingBox>
              <StarsContainer>
                <Rating
                  name="half-rating-read"
                  value={offerRate}
                  precision={0.5}
                  readOnly
                />
              </StarsContainer>
              <RatingText>{offerRate} / 5</RatingText>
            </RatingBox>
          </BrandLogoContainer>
        </HeaderSection>
      </HeaderContainer>
      <DialogContainer>
        <CloseButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </CloseButton>

        {/* Description Section */}
        <ContentSection>
          <SectionTitle>Description</SectionTitle>
          <DescriptionText>{description}</DescriptionText>
        </ContentSection>

        {/* Deposit Bonus Section */}
        <DepositBonusSection>
          <BonusLeft>
            <BonusTitle>Deposit Bonus</BonusTitle>
            <BonusAmount>{depositBonus}</BonusAmount>
          </BonusLeft>
          <BonusRight>
            <PartnerTitle>BetSave</PartnerTitle>
            <PartnerText>Partner</PartnerText>
          </BonusRight>
        </DepositBonusSection>

        <Divider />

        {/* Terms And Conditions Section */}
        <TermsSection>
          <SectionTitle>Terms And Conditions</SectionTitle>
          <TermsText dangerouslySetInnerHTML={{ __html: termsAndConditions }} />
        </TermsSection>
      </DialogContainer>

      {/* Footer */}
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
  );
};

// Styled Components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  width: "100%",
  height: "100%",
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
  padding: 0,
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
  width: "100%",
  height: "100%",
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

const ContentSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#fff",
  fontWeight: 700,
}));

const DescriptionText = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#8A8D98",
  lineHeight: 1.5,
}));

const DepositBonusSection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: "16px 0",
}));

const BonusLeft = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
}));

const BonusRight = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  alignItems: "flex-end",
}));

const BonusTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#fff",
  fontWeight: 700,
}));

const BonusAmount = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#8A8D98",
}));

const PartnerTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#fff",
  fontWeight: 700,
}));

const PartnerText = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#8A8D98",
}));

const Divider = styled(Box)(({ theme }) => ({
  height: "1px",
  backgroundColor: "#31364A",
  width: "100%",
}));

const TermsSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));

const TermsList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}));

const TermItem = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "8px",
  alignItems: "flex-start",
}));

const TermNumber = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#fff",
  fontWeight: 600,
  minWidth: "20px",
}));

const TermText = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#8A8D98",
  lineHeight: 1.4,
  flex: 1,
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

const FooterItem = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#8A8D98",
  fontWeight: 500,
}));

const FooterDivider = styled(Box)(({ theme }) => ({
  height: "1px",
  backgroundColor: "#31364A",
  width: "100%",
  marginTop: "8px",
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

const TermsText = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#8A8D98",
  lineHeight: 1.4,
}));
