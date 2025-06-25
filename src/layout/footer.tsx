import { Box, Button, IconButton, styled, Typography } from "@mui/material";
import { ExpandMore, Star } from "@mui/icons-material";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BiLogoTelegram } from "react-icons/bi";
import { BiLogoDiscordAlt } from "react-icons/bi";
import { LuMessageCircleMore } from "react-icons/lu";
import {
  BetSaveLogoImg,
  EnglishIcon,
  TrustmaryIcon,
} from "../constants/images";
import { Link, useNavigate } from "react-router-dom";

export const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        {/* Main Footer Content */}
        <FooterMainSection>
          <FooterTopRow>
            <AboutFooter>
              <LogoImg src={BetSaveLogoImg} alt="beta-save-logo" />
              <ReviewDetails>
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
              </ReviewDetails>
            </AboutFooter>

            <FooterLinksSection>
              <FooterActionCotainer>
                <FooterActionItem>
                  <FooterActionTitle>Platform</FooterActionTitle>
                  <FooterActionContent>
                    <FooterActionContentItem>
                      VIP Program
                    </FooterActionContentItem>
                    <FooterActionContentItem>
                      Responsible Gambling
                    </FooterActionContentItem>
                    <FooterActionContentItem>
                      Refer a friend
                    </FooterActionContentItem>
                  </FooterActionContent>
                </FooterActionItem>
                <FooterActionItem>
                  <FooterActionTitle>About</FooterActionTitle>
                  <FooterActionContent>
                    <FooterActionContentItem>Blog</FooterActionContentItem>
                    <NavLink
                      to="https://betsave.gitbook.io/untitled/terms-and-conditions"
                      target="_blank"
                    >
                      <FooterActionContentItem>
                        Terms & Conditions
                      </FooterActionContentItem>
                    </NavLink>
                    <NavLink
                      to="https://betsave.gitbook.io/untitled/privacy-policy"
                      target="_blank"
                    >
                      <FooterActionContentItem>
                        Privacy Policy
                      </FooterActionContentItem>
                    </NavLink>
                    <FooterActionContentItem>
                      Cookie Policy
                    </FooterActionContentItem>
                  </FooterActionContent>
                </FooterActionItem>
                <FooterActionItem>
                  <FooterActionTitle>Support</FooterActionTitle>
                  <FooterActionContent>
                    <FooterActionContentItem>
                      Live Support
                    </FooterActionContentItem>
                    <FooterActionContentItem>FAQ</FooterActionContentItem>
                    <FooterActionContentItem>
                      Business Inquiries
                    </FooterActionContentItem>
                  </FooterActionContent>
                </FooterActionItem>
              </FooterActionCotainer>
            </FooterLinksSection>

            <FooterCommunity>
              <FooterActionTitle>Community</FooterActionTitle>
              <FooterCommunityContainer>
                <Link to="https://x.com/betsaveio" target="_blank">
                  <FooterCommunityItem icon={<FaXTwitter />} />
                </Link>
                <Link to="https://www.facebook.com/betsaveio" target="_blank">
                  <FooterCommunityItem icon={<FaFacebookF />} />
                </Link>
                <Link to="https://www.instagram.com/betsaveio" target="_blank">
                  <FooterCommunityItem icon={<RiInstagramFill />} />
                </Link>
                <Link to="https://t.me/betsave_community" target="_blank">
                  <FooterCommunityItem icon={<BiLogoTelegram />} />
                </Link>
                <Link to="https://discord.gg/uxPBNvCx" target="_blank">
                  <FooterCommunityItem icon={<BiLogoDiscordAlt />} />
                </Link>
                <Link to="https://messenger.com/t/betsaveio" target="_blank">
                  <FooterCommunityItem icon={<LuMessageCircleMore />} />
                </Link>
              </FooterCommunityContainer>
              <LanguageChoose>
                <LanguageButton endIcon={<ExpandMore />}>
                  <FlagImg src={EnglishIcon} alt="english-icon" />
                  English
                </LanguageButton>
              </LanguageChoose>
            </FooterCommunity>
          </FooterTopRow>
        </FooterMainSection>

        {/* Legal Section */}
        <FooterLegalSection>
          <LegalContent>
            <LegalCard>
              <LegalTitle>Company Information</LegalTitle>
              <LegalText>
                BetSave Ltd is a registered company in Cyprus under registration
                number HE 476914. Registered office: Aitolon 25, P. Angelides
                House, Agios Andreas, 1101, Nicosia, Cyprus.
              </LegalText>
            </LegalCard>
            <LegalCard>
              <LegalTitle>Important Disclaimer</LegalTitle>
              <LegalText>
                BetSave is not a gambling operator and does not provide or
                facilitate any form of gaming services. We operate solely as a
                cashback and marketing platform, offering rewards based on
                tracked activity with our partnered online casinos. All gameplay
                services are provided directly by third-party operators. Users
                must be 18+ and comply with the terms of our partners.
              </LegalText>
            </LegalCard>
          </LegalContent>
        </FooterLegalSection>

        {/* Copyright Section */}
        <FooterCopyrightSection>
          <CopyrightContent>
            <CopyRightText>© 2025 BetSave | All Rights Reserved</CopyRightText>
          </CopyrightContent>
        </FooterCopyrightSection>

        {/* Mobile Footer */}
        <MobileFooter>
          <MobileHeader>
            <MobileLogoImg src={BetSaveLogoImg} alt="betsave-logo" />
            <MobileLanguageChoose>
              <LanguageLabel>Language</LanguageLabel>
              <MobileLanguageButton endIcon={<ExpandMore />}>
                <FlagImg src={EnglishIcon} alt="english-icon" />
                English
              </MobileLanguageButton>
            </MobileLanguageChoose>
          </MobileHeader>

          <MobileSocialSection>
            <MobileSocialTitle>Follow Us</MobileSocialTitle>
            <MobileFooterButtonAction>
              <MobileFooterButton startIcon={<FaXTwitter />}>
                Twitter
              </MobileFooterButton>
              <MobileFooterButton startIcon={<RiInstagramFill />}>
                Instagram
              </MobileFooterButton>
              <MobileFooterButton startIcon={<FaFacebookF />}>
                Facebook
              </MobileFooterButton>
              <MobileFooterButton startIcon={<BiLogoDiscordAlt />}>
                Discord
              </MobileFooterButton>
            </MobileFooterButtonAction>
          </MobileSocialSection>

          <MobileReviewSection>
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
          </MobileReviewSection>

          <MobileLegalSection>
            <MobileLegalCard>
              <MobileLegalTitle>Company Info</MobileLegalTitle>
              <MobileLegalText>
                BetSave Ltd is a registered company in Cyprus under registration
                number HE 476914. Registered office: Aitolon 25, P. Angelides
                House, Agios Andreas, 1101, Nicosia, Cyprus.
              </MobileLegalText>
            </MobileLegalCard>
            <MobileLegalCard>
              <MobileLegalTitle>Disclaimer</MobileLegalTitle>
              <MobileLegalText>
                BetSave is not a gambling operator and does not provide or
                facilitate any form of gaming services. We operate solely as a
                cashback and marketing platform, offering rewards based on
                tracked activity with our partnered online casinos. All gameplay
                services are provided directly by third-party operators. Users
                must be 18+ and comply with the terms of our partners.
              </MobileLegalText>
            </MobileLegalCard>
          </MobileLegalSection>

          <MobileCopyright>
            <CopyRightText>© 2025 BetSave | All Rights Reserved</CopyRightText>
          </MobileCopyright>
        </MobileFooter>
      </FooterContainer>
    </FooterWrapper>
  );
};

const FooterWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const FooterContainer = styled(Box)(({ theme }) => ({
  margin: "20px 0px",
  marginTop: "70px",
  padding: "0px",
  borderRadius: "15px",
  backgroundColor: "#0f1629",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

const FooterMainSection = styled(Box)(({ theme }) => ({
  padding: "40px 32px",
  borderBottom: "1px solid #1a2332",
}));

const FooterTopRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "40px",
  [theme.breakpoints.down(960)]: {
    display: "none",
  },
}));

const AboutFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  minWidth: "250px",
}));

const LogoImg = styled("img")(({ theme }) => ({
  width: "95px",
  height: "auto",
}));

const ReviewDetails = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}));

const ReviewText = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#627691",
  fontWeight: "bold",
  span: {
    color: "#fff",
  },
}));

const TrustMaryContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "2px",
}));

const TrustMaryLogo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "bold",
}));

const Img = styled("img")(({ theme }) => ({
  width: "18px",
  height: "18px",
}));

const StarIcon = styled(Star)(({ theme }) => ({
  color: "yellow",
  width: "18px",
  height: "18px",
}));

const FooterLinksSection = styled(Box)(({ theme }) => ({
  flex: "1",
  display: "flex",
  justifyContent: "center",
}));

const FooterActionCotainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "60px",
}));

const FooterActionItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));

const FooterActionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#fff",
  fontWeight: "600",
  marginBottom: "4px",
}));

const FooterActionContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const FooterActionContentItem = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  color: "#666d91",
  cursor: "pointer",
  textDecoration: "none",
  transition: "color 0.2s ease",
  "&:hover": {
    color: "#fff",
  },
}));

const FooterCommunity = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
  minWidth: "200px",
}));

const FooterCommunityContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "8px",
}));

const FooterCommunityItem = (props: { icon: React.ReactNode }) => {
  return (
    <FooterCommunityItemContainer size="small">
      {props.icon}
    </FooterCommunityItemContainer>
  );
};

const FooterCommunityItemContainer = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#171e31",
  color: "#666d91",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#1f2937",
    color: "#fff",
    transform: "translateY(-2px)",
  },
}));

const LanguageChoose = styled(Box)(({ theme }) => ({}));

const LanguageButton = styled(Button)(({ theme }) => ({
  fontSize: "14px",
  backgroundColor: "#171e31",
  color: "#627691",
  height: "17px",
  display: "flex",
  alignItems: "center",
  textTransform: "none",
  padding: "12px 16px",
  gap: "8px",
  borderRadius: "8px",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#1f2937",
    color: "#fff",
  },
}));

const FlagImg = styled("img")(({ theme }) => ({
  width: "24px",
  height: "auto",
}));

const FooterLegalSection = styled(Box)(({ theme }) => ({
  padding: "32px",
  borderBottom: "1px solid #1a2332",
  [theme.breakpoints.down(960)]: {
    display: "none",
  },
}));

const LegalContent = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "32px",
  maxWidth: "1200px",
  margin: "0 auto",
}));

const LegalCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));

const LegalTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#fff",
  fontWeight: "600",
}));

const LegalText = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  color: "#627691",
  lineHeight: "1.6",
}));

const FooterCopyrightSection = styled(Box)(({ theme }) => ({
  padding: "20px 32px",
  [theme.breakpoints.down(960)]: {
    display: "none",
  },
}));

const CopyrightContent = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

const CopyRightText = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  color: "#4d5a84",
  textAlign: "center",
}));

const MobileFooter = styled(Box)(({ theme }) => ({
  display: "none",
  flexDirection: "column",
  padding: "24px 20px",
  gap: "32px",
  [theme.breakpoints.down(960)]: {
    display: "flex",
  },
}));

const MobileHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
}));

const MobileLogoImg = styled("img")(({ theme }) => ({
  width: "160px",
  height: "auto",
}));

const MobileLanguageChoose = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "14px",
  color: "#fff",
}));

const LanguageLabel = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#fff",
  fontWeight: "500",
}));

const MobileLanguageButton = styled(Button)(({ theme }) => ({
  fontSize: "14px",
  backgroundColor: "#171e31",
  color: "#627691",
  height: "24px",
  display: "flex",
  alignItems: "center",
  textTransform: "none",
  padding: "12px 16px",
  gap: "8px",
  borderRadius: "20px",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#1f2937",
    color: "#fff",
  },
}));

const MobileSocialSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
}));

const MobileSocialTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#fff",
  fontWeight: "600",
}));

const MobileFooterButtonAction = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "12px",
  width: "100%",
}));

const MobileFooterButton = styled(Button)(({ theme }) => ({
  fontSize: "12px",
  borderRadius: "12px",
  backgroundColor: "#171e31",
  padding: "12px 8px",
  textTransform: "none",
  color: "#627691",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#1f2937",
    color: "#fff",
    transform: "translateY(-1px)",
  },
}));

const MobileReviewSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  padding: "20px",
  backgroundColor: "#0a0f1a",
  borderRadius: "12px",
}));

const MobileLegalSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

const MobileLegalCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  padding: "16px",
  backgroundColor: "#0a0f1a",
  borderRadius: "12px",
}));

const MobileLegalTitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#fff",
  fontWeight: "600",
}));

const MobileLegalText = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: "#627691",
  lineHeight: "1.5",
}));

const MobileCopyright = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  paddingTop: "16px",
  borderTop: "1px solid #1a2332",
}));

const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "#627691",
  "&:hover": {
    color: "#fff",
  },
}));
