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
  FormHelperText,
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
import { useState, useCallback, useEffect } from "react";
import { ForgotPasswordDialog } from "./ForgotPassword";
import { authService } from "../../../api/services/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../../../store/slices/sessionSlice";

interface DialogProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  isLogin: boolean;
}

interface FormData {
  email: string;
  password: string;
  acceptTerms: boolean;
}

interface FormErrors {
  email: string;
  password: string;
  acceptTerms: string;
}

export const AuthDialog = ({ isOpen, setOpen, isLogin }: DialogProps) => {
  const [isSignIn, setIsSignIn] = useState(isLogin);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
    acceptTerms: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsSignIn(isLogin);
  }, [isLogin]);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        email: "",
        password: "",
        acceptTerms: false,
      });
      setErrors({
        email: "",
        password: "",
        acceptTerms: "",
      });
    }
  }, [isOpen, isSignIn]);

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validatePassword = useCallback((password: string): boolean => {
    return password.length >= 8;
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {
      email: "",
      password: "",
      acceptTerms: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!isSignIn && !formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the Terms & Conditions";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  }, [formData, isSignIn, validateEmail, validatePassword]);

  const handleInputChange = useCallback(
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;

      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [errors]
  );

  const handleForgotPasswordClick = useCallback(() => {
    setShowForgotPassword(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setShowForgotPassword(false);
    setFormData({
      email: "",
      password: "",
      acceptTerms: false,
    });
    setErrors({
      email: "",
      password: "",
      acceptTerms: "",
    });
  }, [setOpen]);

  const handleAuth = useCallback(async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = isSignIn
        ? await authService.login(formData.email, formData.password)
        : await authService.signup(formData.email, formData.password);

      dispatch(
        setAuthenticated({
          user: response.data.user,
          tokens: response.data.tokens,
        })
      );
      handleClose();
      navigate("/dashboard");
    } catch (error) {
      console.error(`${isSignIn ? "Login" : "Signup"} failed:`, error);
      setErrors((prev) => ({
        ...prev,
        email: "Invalid email or password",
        password: "Invalid email or password",
      }));
    } finally {
      setIsLoading(false);
    }
  }, [formData, isSignIn, validateForm, dispatch, handleClose, navigate]);

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
                  active={isSignIn ? 1 : 0}
                  onClick={() => setIsSignIn(true)}
                >
                  Sign In
                </SwitchButton>
                <SwitchButton
                  active={!isSignIn ? 1 : 0}
                  onClick={() => setIsSignIn(false)}
                >
                  Create Account
                </SwitchButton>
              </StyledButtonGroup>
            </AuthButtonGroup>
            <AuthForm>
              <Box>
                <StyledInput
                  placeholder="Enter your e-mail"
                  onChange={handleInputChange("email")}
                  value={formData.email}
                  name="email"
                  error={!!errors.email}
                />
                {errors.email && (
                  <FormHelperText error>{errors.email}</FormHelperText>
                )}
              </Box>
              <Box>
                <PasswordInputWrapper>
                  <StyledInput
                    placeholder="Enter your password"
                    type={isPasswordVisible ? "text" : "password"}
                    onChange={handleInputChange("password")}
                    value={formData.password}
                    name="password"
                    error={!!errors.password}
                  />
                  <PasswordToggle
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <IoEyeOutline />
                  </PasswordToggle>
                </PasswordInputWrapper>
                {errors.password && (
                  <FormHelperText error>{errors.password}</FormHelperText>
                )}
              </Box>
              {!isSignIn && (
                <>
                  <TermsCheckbox
                    control={
                      <StyledCheckbox
                        checked={formData.acceptTerms}
                        onChange={handleInputChange("acceptTerms")}
                      />
                    }
                    label="I confirm that I have read, understood, and accepted the BETSAVE Terms & Conditions. By checking this box, I also confirm that I am at least 18 years old."
                  />
                  {errors.acceptTerms && (
                    <FormHelperText error>{errors.acceptTerms}</FormHelperText>
                  )}
                </>
              )}
              <ActionRow>
                {isSignIn ? (
                  <>
                    <LoginButton onClick={handleAuth} disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Log In"}
                    </LoginButton>
                    <ForgotPassword onClick={handleForgotPasswordClick}>
                      Forgot your password?
                    </ForgotPassword>
                  </>
                ) : (
                  <LoginButton
                    disabled={!formData.acceptTerms || isLoading}
                    onClick={handleAuth}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
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
    height: "210px",
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

const SwitchButton = styled(Button)<{ active: number }>(
  ({ active, theme }) => ({
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    textTransform: "none",
    textWrap: "nowrap",
    backgroundColor: active === 1 ? "#1AE5A1" : "#172236",
    color: active === 1 ? "#141C30" : "#fff",
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
  color: "#fff",
  width: "100%",
  "& input": {
    padding: "12px 16px",
    [theme.breakpoints.down(1024)]: {
      padding: "10px 16px",
    },
    [theme.breakpoints.down(840)]: {
      padding: "6px 10px",
      fontSize: "14px",
      borderRadius: "4px",
    },
    "&::placeholder": {
      color: "#6B7280",
      opacity: 1,
    },
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
  marginTop: "12px",
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
