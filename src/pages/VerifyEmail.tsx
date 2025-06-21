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
import { setAuthenticated } from "../store/slices/sessionSlice";
import { useDispatch } from "react-redux";
import { fetchIP } from "../utils/fetchIP";

interface LocationState {
  email: string;
  firstname: string;
  lastname: string;
  country: string;
  password: string;
}

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [userData, setUserData] = useState<LocationState | null>(null);
  const dispatch = useDispatch();

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
    fetchData();
    // Get user data from location state or session storage
    const state = location.state as LocationState;
    if (state?.email) {
      setUserData(state);
    } else {
      // Try to get from session storage
      const storedData = sessionStorage.getItem("signupData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserData({
          email: parsedData.email,
          firstname: parsedData.firstname,
          lastname: parsedData.lastname,
          country: parsedData.country,
          password: parsedData.password,
        });
      } else {
        // No data available, redirect back to signup
        navigate("/");
      }
    }
  }, [location, navigate]);

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

  const handleResendCode = useCallback(async () => {
    if (!userData?.email) return;

    setResendDisabled(true);
    setCountdown(60);
    setError("");

    try {
      const response = await authService.verifyEmail({
        email: userData.email,
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
  }, [userData]);

  const handleVerifyCode = useCallback(async () => {
    if (!verificationCode) {
      setError("Please enter the verification code");
      return;
    }

    if (!userData?.email) {
      setError("Email not found. Please try again.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await authService.verifyEmailCode({
        email: userData.email,
        code: verificationCode,
      });

      if (response.success) {
        // Redirect to phone verification page
        // navigate("/verify-phone", {
        //   state: {
        //     email: userData.email,
        //     firstname: userData.firstname,
        //     lastname: userData.lastname,
        //   },
        // });

        const response = await authService.signup({
          ...userData,
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
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  }, [verificationCode, userData, navigate]);

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
        <AuthTitle>Verify Your Email</AuthTitle>
        <AuthSubtitle>
          We've sent a verification code to{" "}
          <EmailHighlight>{userData?.email}</EmailHighlight>
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
              {isLoading ? "Verifying..." : "Verify Email"}
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

export default VerifyEmail;

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

const EmailHighlight = styled("span")({
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
