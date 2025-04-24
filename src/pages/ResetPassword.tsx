import { Box, Button, InputBase, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authService } from "../api/services/authService";
import { BetSaveLogoImg } from "../constants/images";
import { useNotification } from "../provider/notification";

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { notifySuccess } = useNotification();

  useEffect(() => {
    console.log({ token });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid reset link");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      setIsLoading(true);
      await authService.resetPassword(token, password);
      notifySuccess("Password reset successfully");
      navigate("/login");
    } catch (error: any) {
      setError(error.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <FormContainer>
          <HeaderSection>
            <Logo src={BetSaveLogoImg} alt="logo" />
            <Title>Reset Password</Title>
            <Subtitle>Enter your new password below</Subtitle>
          </HeaderSection>
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <Input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </InputWrapper>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </SubmitButton>
          </Form>
        </FormContainer>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  width: "100%",
  padding: "20px",
  [theme.breakpoints.down(450)]: {
    padding: "0px",
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  width: "100%",
  maxWidth: "500px",
  [theme.breakpoints.down(540)]: {
    maxWidth: "100%",
  },
}));

const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#172236",
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "0px 0px 0px 1px #2E334AB2",
  [theme.breakpoints.down(540)]: {
    padding: "24px",
    borderRadius: "12px",
  },
  [theme.breakpoints.down(450)]: {
    padding: "20px",
    borderRadius: "10px",
  },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "32px",
  [theme.breakpoints.down(450)]: {
    marginBottom: "24px",
  },
}));

const Logo = styled("img")(({ theme }) => ({
  width: "120px",
  height: "auto",
  marginBottom: "24px",
  [theme.breakpoints.down(450)]: {
    width: "100px",
    marginBottom: "20px",
  },
  [theme.breakpoints.down(320)]: {
    width: "90px",
    marginBottom: "16px",
  },
}));

const Title = styled(Box)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: "700",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "8px",
  [theme.breakpoints.down(450)]: {
    fontSize: "28px",
    gap: "8px",
  },
  [theme.breakpoints.down(320)]: {
    fontSize: "24px",
    gap: "6px",
  },
}));

const StarIcon = styled(Box)(({ theme }) => ({
  width: "32px",
  height: "32px",
  backgroundColor: "#1AE5A1",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px",
  [theme.breakpoints.down(450)]: {
    width: "28px",
    height: "28px",
    padding: "6px",
    borderRadius: "6px",
  },
  [theme.breakpoints.down(320)]: {
    width: "24px",
    height: "24px",
    padding: "5px",
    borderRadius: "5px",
  },
}));

const StarImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "contain",
}));

const Subtitle = styled(Box)(({ theme }) => ({
  fontSize: "16px",
  color: "#8A8D98",
  textAlign: "center",
  [theme.breakpoints.down(450)]: {
    fontSize: "14px",
  },
  [theme.breakpoints.down(320)]: {
    fontSize: "13px",
  },
}));

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  [theme.breakpoints.down(450)]: {
    gap: "12px",
  },
  [theme.breakpoints.down(320)]: {
    gap: "10px",
  },
}));

const InputWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
}));

const Input = styled(InputBase)(({ theme }) => ({
  backgroundColor: "#141C30",
  borderRadius: "8px",
  padding: "12px 16px",
  color: "#fff",
  width: "100%",
  border: "1px solid #2E334AB2",
  fontSize: "16px",
  "&:hover": {
    borderColor: "#1AE5A1",
  },
  "&:focus": {
    borderColor: "#1AE5A1",
  },
  "& input": {
    "&::placeholder": {
      color: "#6B7280",
      opacity: 1,
    },
  },
  [theme.breakpoints.down(450)]: {
    padding: "10px 14px",
    fontSize: "15px",
    borderRadius: "6px",
  },
  [theme.breakpoints.down(320)]: {
    padding: "8px 12px",
    fontSize: "14px",
    borderRadius: "5px",
  },
}));

const ErrorMessage = styled(Box)(({ theme }) => ({
  color: "#FF4D4F",
  fontSize: "14px",
  textAlign: "center",
  padding: "8px",
  backgroundColor: "rgba(255, 77, 79, 0.1)",
  borderRadius: "8px",
  [theme.breakpoints.down(450)]: {
    fontSize: "13px",
    padding: "6px",
  },
  [theme.breakpoints.down(320)]: {
    fontSize: "12px",
    padding: "5px",
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1AE5A1",
  color: "#141C30",
  padding: "12px",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  textTransform: "none",
  marginTop: "8px",
  "&:hover": {
    backgroundColor: "#15cc8f",
  },
  "&:disabled": {
    backgroundColor: "#1c2a42",
    color: "#6B7280",
  },
  [theme.breakpoints.down(450)]: {
    padding: "10px",
    fontSize: "15px",
    borderRadius: "6px",
  },
  [theme.breakpoints.down(320)]: {
    padding: "8px",
    fontSize: "14px",
    borderRadius: "5px",
  },
}));
