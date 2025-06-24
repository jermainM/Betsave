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
        <FooterContent>
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
            <CopyRightText>© 2025 BetSave | All Rights Reserved</CopyRightText>
          </AboutFooter>
          <FooterActionCotainer>
            <FooterActionItem>
              <FooterActionTitle>Platform</FooterActionTitle>
              <FooterActionContent>
                <FooterActionContentItem>VIP Program</FooterActionContentItem>
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
                <FooterActionContentItem>Cookie Policy</FooterActionContentItem>
              </FooterActionContent>
            </FooterActionItem>
            <FooterActionItem>
              <FooterActionTitle>Support</FooterActionTitle>
              <FooterActionContent>
                <FooterActionContentItem>Live Support</FooterActionContentItem>
                <FooterActionContentItem>FAQ</FooterActionContentItem>
                <FooterActionContentItem>
                  Business Inquiries
                </FooterActionContentItem>
              </FooterActionContent>
            </FooterActionItem>
          </FooterActionCotainer>
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
        </FooterContent>
        <FooterBottom>
          <p>
            BetSave Ltd is a registered company in Cyprus under registration
            number HE 476914. Registered office: Aitolon 25, P. Angelides House,
            Agios Andreas, 1101, Nicosia, Cyprus.
          </p>
          <p>
            Disclaimer: BetSave is not a gambling operator and does not provide
            or facilitate any form of gaming services. We operate solely as a
            cashback and marketing platform, offering rewards based on tracked
            activity with our partnered online casinos. All gameplay services
            are provided directly by third-party operators. Users must be 18+
            and comply with the terms of our partners.
          </p>
        </FooterBottom>
        <MobileFooter>
          <MobileLogoImg src={BetSaveLogoImg} alt="betsave-logo" />
          <CopyRightText>© 2025 BetSave | All Rights Reserved</CopyRightText>
          <MobileLanguageChoose>
            Language
            <MobileLanguageButton endIcon={<ExpandMore />}>
              <FlagImg src={EnglishIcon} alt="english-icon" />
              English
            </MobileLanguageButton>
          </MobileLanguageChoose>
          <MobileFooterAction>
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
            <MobileFooterReview>
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
            </MobileFooterReview>
          </MobileFooterAction>
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
  padding: "32px",
  borderRadius: "15px",
  backgroundColor: "#0f1629",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "40px",
  [theme.breakpoints.down(960)]: {
    flexDirection: "column-reverse",
  },
}));

const FooterContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "20px",
  [theme.breakpoints.down(960)]: {
    display: "none",
  },
}));

const AboutFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
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

const CopyRightText = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  color: "#4d5a84",
  textAlign: "center",
}));

const FooterActionCotainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
}));

const FooterActionItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}));

const FooterActionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: "#fff",
}));

const FooterActionContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}));

const FooterActionContentItem = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: "#666d91",
  cursor: "pointer",
  textDecoration: "none",
  "&:hover": {
    color: "#fff",
  },
}));

const FooterCommunity = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
}));

const FooterCommunityContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "4px",
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
  padding: "12px 8px",
  gap: "8px",
}));

const FlagImg = styled("img")(({ theme }) => ({
  width: "24px",
  height: "auto",
}));

const MobileFooter = styled(Box)(({ theme }) => ({
  display: "none",
  flexDirection: "column",
  alignItems: "center",
  gap: "24px",
  width: "100%",
  [theme.breakpoints.down(960)]: {
    display: "flex",
  },
}));

const MobileLogoImg = styled("img")(({ theme }) => ({
  width: "180px",
  height: "auto",
}));

const MobileLanguageChoose = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "14px",
  color: "#fff",
}));

const MobileLanguageButton = styled(Button)(({ theme }) => ({
  fontSize: "14px",
  backgroundColor: "#171e31",
  color: "#627691",
  height: "24px",
  display: "flex",
  alignItems: "center",
  textTransform: "none",
  padding: "18px 14px",
  gap: "8px",
  borderRadius: "20px",
}));

const MobileFooterAction = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "20px",
}));

const MobileFooterButtonAction = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  [theme.breakpoints.down(540)]: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 2fr)",
    gap: "16px",
  },
}));

const MobileFooterButton = styled(Button)(({ theme }) => ({
  fontSize: "12px",
  borderRadius: "20px",
  backgroundColor: "#141c30",
  padding: "6px",
  textTransform: "none",
  width: "100px",
  color: "#627691",
}));

const MobileFooterReview = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
}));

const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "#627691",
  "&:hover": {
    color: "#fff",
  },
}));

const FooterBottom = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  p: {
    fontSize: "12px",
    color: "#627691",
    textAlign: "center",
    margin: "0px",
    [theme.breakpoints.down(960)]: {
      textAlign: "left",
    },
  },
}));
