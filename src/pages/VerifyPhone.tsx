import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormHelperText,
  InputBase,
  styled,
  Typography,
} from "@mui/material";
import { BetSaveLogoImg, BetsaveSupermanPng } from "../constants/images";
import { authService } from "../api/services/authService";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../store/slices/sessionSlice";
import { fetchIP } from "../utils/fetchIP";

interface LocationState {
  phone: string;
  country: string;
}

const VerifyPhone = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [signupData, setSignupData] = useState<any>(null);
  const [device, setDevice] = useState({
    ipAddress: "",
  });
  const fetchData = async () => {
    try {
      const ipAddress = await fetchIP();
      setDevice({
        ipAddress: ipAddress,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Get data from session storage
    fetchData();
    const storedData = sessionStorage.getItem("signupData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setSignupData(parsedData);
    } else {
      // No data available, redirect back to signup
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    // Countdown timer for resend button
    let timer: NodeJS.Timeout;
    if (resendDisabled && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendDisabled, countdown]);

  const handleVerifyPhone = useCallback(async () => {
    if (!signupData?.phone) return;
    console.log("handleVerifyPhone");
    try {
      const response = await authService.verifyPhoneNumber({
        phone: signupData.phone,
      });

      if (response.success) {
        // Show success message
        setError("Verification code sent successfully!");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Failed to send verification code"
      );
    }
  }, [signupData]);

  useEffect(() => {
    if (signupData?.phone) {
      handleVerifyPhone();
    }
  }, [signupData, handleVerifyPhone]);

  const handleResendCode = useCallback(async () => {
    if (!signupData?.phone) return;

    setResendDisabled(true);
    setCountdown(60);
    setError("");

    try {
      const response = await authService.verifyPhoneNumber({
        phone: signupData.phone,
      });

      if (response.success) {
        // Show success message
        setError("Verification code resent successfully!");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Failed to resend verification code"
      );
    }
  }, [signupData]);

  const handleVerifyCode = useCallback(async () => {
    if (!verificationCode) {
      setError("Please enter the verification code");
      return;
    }

    if (!signupData?.phone) {
      setError("Phone number not found. Please try again.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // const response = await authService.verifyPhoneNumber({
      //   phone: signupData.phone,
      // });

      // if (response.success) {
      const response = await authService.signup({
        ...signupData,
        ipAddress: device.ipAddress,
        referralCode: localStorage.getItem("referralCode"),
      });
      if (response.success) {
        dispatch(
          setAuthenticated({
            user: response.data.user,
            tokens: response.data.tokens,
          })
        );
        navigate("/dashboard");
      }
      // }
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Failed to resend verification code"
      );
    }
  }, [verificationCode, signupData, dispatch, navigate]);

  return (
    <PageContainer>
      <AuthContainer>
        <AuthHeader>
          <AuthLogo
            src={BetSaveLogoImg}
            alt="auth-logo"
            onClick={() => navigate("/")}
          />
        </AuthHeader>
        <AuthMobileImage src={BetsaveSupermanPng} alt="auth-image" />
        <AuthTitle>Verify Your Phone</AuthTitle>
        <AuthSubtitle>
          We've sent a verification code to{" "}
          <PhoneHighlight>{signupData?.phone}</PhoneHighlight>
        </AuthSubtitle>
        <AuthForm>
          <Box>
            <StyledInput
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              error={
                !!error && error !== "Verification code resent successfully!"
              }
            />
            {error && (
              <FormHelperText
                error={error !== "Verification code resent successfully!"}
              >
                {error}
              </FormHelperText>
            )}
          </Box>
          <ActionRow>
            <VerifyButton onClick={handleVerifyCode} disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify Phone"}
            </VerifyButton>
            <ResendButton onClick={handleResendCode} disabled={resendDisabled}>
              {resendDisabled ? `Resend Code (${countdown}s)` : "Resend Code"}
            </ResendButton>
          </ActionRow>
          <BackButton onClick={() => navigate("/")}>Back to Sign Up</BackButton>
        </AuthForm>
      </AuthContainer>
    </PageContainer>
  );
};

export default VerifyPhone;

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#141C30",
  padding: "20px",
  margin: "50px 0px",
  [theme.breakpoints.down(840)]: {
    flexDirection: "column",
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
    marginBottom: "20px",
  },
}));

const AuthContainer = styled(Box)(({ theme }) => ({
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  width: "500px",
  [theme.breakpoints.down(840)]: {
    width: "100%",
  },
}));

const AuthHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
}));

const AuthLogo = styled("img")(({ theme }) => ({
  width: "105px",
  height: "auto",
  cursor: "pointer",
  [theme.breakpoints.down(480)]: {
    width: "90px",
  },
}));

const AuthTitle = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: "700",
  color: "#fff",
  marginBottom: "12px",
  [theme.breakpoints.down(1024)]: {
    fontSize: "28px",
  },
  [theme.breakpoints.down(840)]: {
    fontSize: "24px",
  },
  [theme.breakpoints.down(560)]: {
    fontSize: "20px",
  },
}));

const AuthSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#8A8D98",
  marginBottom: "24px",
  [theme.breakpoints.down(840)]: {
    fontSize: "14px",
  },
}));

const PhoneHighlight = styled("span")({
  color: "#1AE5A1",
  fontWeight: "600",
});

const AuthForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
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

const ActionRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  [theme.breakpoints.down(480)]: {
    flexDirection: "column",
    width: "100%",
  },
}));

const VerifyButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1AE5A1",
  color: "#141C30",
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
  [theme.breakpoints.down(480)]: {
    width: "100%",
    padding: "8px",
  },
}));

const ResendButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#172236",
  color: "#fff",
  padding: "12px",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  textTransform: "none",
  textWrap: "nowrap",
  minWidth: "160px",
  border: "1px solid #2E334AB2",
  "&:hover": {
    backgroundColor: "#1c2a42",
  },
  "&.Mui-disabled": {
    backgroundColor: "#172236",
    color: "#8A8D98",
    opacity: 0.7,
  },
  [theme.breakpoints.down(480)]: {
    width: "100%",
    padding: "8px",
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  color: "#8A8D98",
  textTransform: "none",
  fontSize: "14px",
  padding: "8px",
  marginTop: "8px",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#1AE5A1",
  },
}));
