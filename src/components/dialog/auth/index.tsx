import {
  Box,
  Dialog,
  IconButton,
  styled,
  Button,
  InputBase,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  BetSaveLogoImg,
  BetsaveSupermanPng,
  GoogleIcon,
  StreamIcon,
  FacebookIcon,
} from "../../../constants/images";
import { IoClose } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import { ForgotPasswordDialog } from "./ForgotPassword";

interface DialogProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  isLogin: boolean;
}

export const AuthDialog = (props: DialogProps) => {
  const { isOpen, setOpen, isLogin } = props;
  const [isSignIn, setIsSignIn] = useState(isLogin);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowForgotPassword(false);
  };

  return (
    <>
      <StyledDialog open={isOpen && !showForgotPassword} onClose={handleClose}>
        <DialogContent>
          <AuthImage src={BetsaveSupermanPng} alt="auth-image" />
          <AuthContainer>
            <AuthHeader>
              <AuthLogo src={BetSaveLogoImg} alt="auth-logo" />
              <AuthCloseButton onClick={handleClose}>
                <IoClose />
              </AuthCloseButton>
            </AuthHeader>
            <AuthMobileImage src={BetsaveSupermanPng} alt="auth-image" />
            <AuthTitle>Welcome back! Time to earn cashback</AuthTitle>
            <AuthButtonGroup>
              <StyledButtonGroup variant="contained">
                <SwitchButton
                  active={isSignIn}
                  onClick={() => setIsSignIn(true)}
                >
                  Sign In
                </SwitchButton>
                <SwitchButton
                  active={!isSignIn}
                  onClick={() => setIsSignIn(false)}
                >
                  Create Account
                </SwitchButton>
              </StyledButtonGroup>
            </AuthButtonGroup>
            <AuthForm>
              <StyledInput placeholder="Enter your e-mail" />
              <PasswordInputWrapper>
                <StyledInput
                  placeholder="Enter your password"
                  type={isPasswordVisible ? "text" : "password"}
                />
                <PasswordToggle
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <IoEyeOutline />
                </PasswordToggle>
              </PasswordInputWrapper>
              {!isSignIn && (
                <TermsCheckbox
                  control={
                    <StyledCheckbox
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                  }
                  label="I confirm that I have read, understood, and accepted the BETSAVE Terms & Conditions. By checking this box, I also confirm that I am at least 18 years old."
                />
              )}
              <ActionRow>
                {isSignIn ? (
                  <>
                    <LoginButton>Log In</LoginButton>
                    <ForgotPassword onClick={handleForgotPasswordClick}>
                      Forgot your password?
                    </ForgotPassword>
                  </>
                ) : (
                  <LoginButton disabled={!termsAccepted}>
                    Create Account
                  </LoginButton>
                )}
              </ActionRow>
            </AuthForm>
            <SocialSection>
              <SocialDivider>Social network</SocialDivider>
              <SocialButtonGroup>
                <SocialButton>
                  <SocialIcon src={GoogleIcon} alt="google" />
                </SocialButton>
                <SocialButton>
                  <SocialIcon src={StreamIcon} alt="stream" />
                </SocialButton>
                <SocialButton>
                  <SocialIcon src={FacebookIcon} alt="facebook" />
                </SocialButton>
              </SocialButtonGroup>
            </SocialSection>
          </AuthContainer>
        </DialogContent>
      </StyledDialog>

      <ForgotPasswordDialog
        isOpen={showForgotPassword}
        onClose={handleClose}
        onBack={() => setShowForgotPassword(false)}
      />
    </>
  );
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "17px",
    maxWidth: "none",
    margin: "16px",
  },
}));

const DialogContent = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: "7px",
  backgroundColor: "#141C30",
  padding: "12px",
  display: "flex",
  justifyContent: "center",
  gap: "12px",
  [theme.breakpoints.down(840)]: {
    flexDirection: "column",
    width: "540px",
  },
  [theme.breakpoints.down(640)]: {
    width: "90vw",
  },
  [theme.breakpoints.down(480)]: {
    padding: "4px",
  },
}));

const AuthImage = styled("img")(({ theme }) => ({
  width: "400px",
  height: "auto",
  objectFit: "cover",
  borderRadius: "7px",
  [theme.breakpoints.down(1024)]: {
    width: "360px",
  },
  [theme.breakpoints.down(840)]: {
    display: "none",
  },
}));

const AuthMobileImage = styled("img")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down(840)]: {
    display: "block",
    width: "100%",
    height: "240px",
    borderRadius: "7px",
    objectFit: "cover",
  },
}));

const AuthContainer = styled(Box)(({ theme }) => ({
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  width: "400px",
  [theme.breakpoints.down(840)]: {
    width: "100%",
  },
}));

const AuthHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down(840)]: {
    marginBottom: "16px",
  },
}));

const AuthLogo = styled("img")(({ theme }) => ({
  width: "105px",
  height: "auto",
  [theme.breakpoints.down(480)]: {
    width: "90px",
  },
}));

const AuthCloseButton = styled(IconButton)(({ theme }) => ({
  width: "32px",
  height: "32px",
  backgroundColor: "#172236",
  borderRadius: "8px",
}));

const AuthTitle = styled(Box)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: "700",
  color: "#fff",
  gap: "8px",
  width: "360px",
  [theme.breakpoints.down(1024)]: {
    fontSize: "28px",
    width: "320px",
  },
  [theme.breakpoints.down(840)]: {
    fontSize: "24px",
    width: "100%",
    marginTop: "16px",
  },
  [theme.breakpoints.down(560)]: {
    fontSize: "20px",
  },
}));

const AuthButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  marginTop: "24px",
  width: "fit-content",
  padding: "4px",
  border: "1px solid #2E334AB2",
  borderRadius: "8px",
  [theme.breakpoints.down(1024)]: {
    marginTop: "12px",
  },
}));

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  width: "100%",
  "& .MuiButtonGroup-grouped:not(:last-of-type)": {
    borderColor: "transparent",
  },
}));

const SwitchButton = styled(Button)<{ active: boolean }>(
  ({ active, theme }) => ({
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    textTransform: "none",
    textWrap: "nowrap",
    backgroundColor: active ? "#1AE5A1" : "#172236",
    color: active ? "#141C30" : "#fff",
    minWidth: "140px !important",
    "&:hover": {
      backgroundColor: active ? "#15cc8f" : "#1c2a42",
    },
    [theme.breakpoints.down(1024)]: {
      padding: "10px 16px",
      fontSize: "14px",
    },
    [theme.breakpoints.down(390)]: {
      minWidth: "100px !important",
    },
  })
);

const ActionRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  [theme.breakpoints.down(480)]: {
    flexDirection: "column",
    width: "100%",
  },
}));

const AuthForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  marginTop: "24px",
  width: "100%",
  [theme.breakpoints.down(1024)]: {
    marginTop: "12px",
  },
  [theme.breakpoints.down(840)]: {
    gap: "12px",
  },
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: "#172236",
  borderRadius: "8px",
  padding: "12px 16px",
  color: "#fff",
  width: "100%",
  "& input": {
    "&::placeholder": {
      color: "#6B7280",
      opacity: 1,
    },
  },
  [theme.breakpoints.down(1024)]: {
    padding: "10px 16px",
  },
  [theme.breakpoints.down(840)]: {
    padding: "6px 10px",
    fontSize: "14px",
    borderRadius: "4px",
  },
}));

const PasswordInputWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
}));

const PasswordToggle = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#6B7280",
  [theme.breakpoints.down(480)]: {
    right: "6px",
    width: "32px",
    height: "32px",
    svg: {
      width: "20px",
      height: "20px",
    },
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1AE5A1",
  color: "#fff",
  padding: "12px",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  textTransform: "none",
  textWrap: "nowrap",
  minWidth: "160px",
  "&:hover": {
    backgroundColor: "#15cc8f",
  },
  "&.Mui-disabled": {
    backgroundColor: "#172236",
    color: "#8A8D98",
    opacity: 1,
  },
  [theme.breakpoints.down(1024)]: {},
  [theme.breakpoints.down(840)]: {},
  [theme.breakpoints.down(480)]: {
    width: "100%",
    padding: "8px",
  },
}));

const ForgotPassword = styled(Button)(({ theme }) => ({
  color: "#8A8D98",
  textTransform: "none",
  fontSize: "14px",
  padding: "12px 24px",
  width: "100%",
  border: "1px solid #2E334AB2",
  [theme.breakpoints.down(840)]: {
    padding: "10px 16px",
    width: "fit-content",
  },
  [theme.breakpoints.down(480)]: {
    width: "100%",
  },
}));

const SocialSection = styled(Box)(({ theme }) => ({
  marginTop: "24px",
  width: "100%",
}));

const SocialDivider = styled(Box)(({ theme }) => ({
  color: "#8A8D98",
  fontSize: "14px",
  textAlign: "center",
  position: "relative",
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    top: "50%",
    width: "calc(50% - 70px)",
    height: "1px",
    backgroundColor: "#8A8D98",
  },
  "&::before": {
    left: 0,
  },
  "&::after": {
    right: 0,
  },
}));

const SocialButtonGroup = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "12px",
  marginTop: "16px",
  width: "100%",
  [theme.breakpoints.down(840)]: {
    gap: "8px",
    marginTop: "8px",
  },
}));

const SocialButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#172236",
  borderRadius: "8px",
  padding: "12px",
  height: "48px",
  "&:hover": {
    backgroundColor: "#1c2a42",
  },
  [theme.breakpoints.down(480)]: {
    height: "40px",
    padding: "8px",
  },
}));

const SocialIcon = styled("img")(({ theme }) => ({
  width: "32px",
  height: "auto",
  objectFit: "none",
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: "#1AE5A1",
  "&.Mui-checked": {
    color: "#1AE5A1",
  },
  padding: "0 8px 0 0",
  "& .MuiSvgIcon-root": {
    width: "24px",
    height: "24px",
  },
}));

const TermsCheckbox = styled(FormControlLabel)(({ theme }) => ({
  margin: 0,
  alignItems: "flex-start",
  "& .MuiFormControlLabel-label": {
    fontSize: "14px",
    color: "#8A8D98",
    lineHeight: "1.4",
    marginTop: "2px",
    [theme.breakpoints.down(560)]: {
      fontSize: "12px",
    },
  },
}));
