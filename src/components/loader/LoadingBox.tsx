import { Box, Typography, styled } from "@mui/material";
import { keyframes } from "@emotion/react";

interface LoadingBoxProps {
  text?: string;
  size?: "small" | "medium" | "large";
}

export const LoadingBox = ({
  text = "Loading offers...",
  size = "medium",
}: LoadingBoxProps) => {
  return (
    <LoadingContainer size={size}>
      <PulseRing />
      <SpinnerRing />
      <GradientRing />
      <LoadingText>{text}</LoadingText>
      <FloatingDots>
        <Dot delay={0} />
        <Dot delay={0.2} />
        <Dot delay={0.4} />
      </FloatingDots>
    </LoadingContainer>
  );
};

// Keyframe animations
const pulse = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.8;
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const gradientSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-8px);
    opacity: 1;
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(26, 229, 161, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(26, 229, 161, 0.6), 0 0 60px rgba(26, 229, 161, 0.3);
  }
`;

const LoadingContainer = styled(Box)<{ size: string }>(({ theme, size }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  width: size === "small" ? "200px" : size === "large" ? "320px" : "250px",
  height: size === "small" ? "200px" : size === "large" ? "320px" : "300px",
  background:
    "linear-gradient(135deg, rgba(26, 229, 161, 0.05) 0%, rgba(68, 8, 102, 0.05) 100%)",
  borderRadius: "20px",
  border: "1px solid rgba(26, 229, 161, 0.2)",
  animation: `${glow} 2s ease-in-out infinite`,
  [theme.breakpoints.down(640)]: {
    width: size === "small" ? "150px" : size === "large" ? "300px" : "250px",
    height: size === "small" ? "150px" : size === "large" ? "300px" : "250px",
  },
}));

const PulseRing = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  border: "2px solid rgba(26, 229, 161, 0.3)",
  animation: `${pulse} 2s ease-in-out infinite`,
  [theme.breakpoints.down(640)]: {
    width: "60px",
    height: "60px",
  },
}));

const SpinnerRing = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  border: "3px solid transparent",
  borderTop: "3px solid #1AE5A1",
  borderRight: "3px solid rgba(26, 229, 161, 0.5)",
  animation: `${spin} 1s linear infinite`,
  [theme.breakpoints.down(640)]: {
    width: "45px",
    height: "45px",
  },
}));

const GradientRing = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  background:
    "conic-gradient(from 0deg, transparent, rgba(26, 229, 161, 0.3), transparent)",
  animation: `${gradientSpin} 3s linear infinite`,
  [theme.breakpoints.down(640)]: {
    width: "75px",
    height: "75px",
  },
}));

const LoadingText = styled(Typography)(({ theme }) => ({
  position: "absolute",
  bottom: "20px",
  color: "#1AE5A1",
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "1px",
  textAlign: "center",
  textShadow: "0 0 10px rgba(26, 229, 161, 0.5)",
  [theme.breakpoints.down(640)]: {
    fontSize: "12px",
    bottom: "15px",
  },
}));

const FloatingDots = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  gap: "8px",
}));

const Dot = styled(Box)<{ delay: number }>(({ theme, delay }) => ({
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  background: "#1AE5A1",
  animation: `${float} 1.5s ease-in-out infinite`,
  animationDelay: `${delay}s`,
  boxShadow: "0 0 10px rgba(26, 229, 161, 0.5)",
  [theme.breakpoints.down(640)]: {
    width: "4px",
    height: "4px",
  },
}));
