import { Box, Button, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoImg } from "../constants/images";

export const ComingSoon = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set launch date to 30 days from now
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Container>
      <ContentWrapper>
        <Logo src={LogoImg} alt="betsave-logo" />
        <Title>Coming Soon</Title>
        <Subtitle>
          We're working hard to bring you the ultimate betting experience. Stay
          tuned!
        </Subtitle>

        <TimerContainer>
          <TimeBox>
            <TimeValue>{timeLeft.days}</TimeValue>
            <TimeLabel>Days</TimeLabel>
          </TimeBox>
          <TimeBox>
            <TimeValue>{timeLeft.hours}</TimeValue>
            <TimeLabel>Hours</TimeLabel>
          </TimeBox>
          <TimeBox>
            <TimeValue>{timeLeft.minutes}</TimeValue>
            <TimeLabel>Minutes</TimeLabel>
          </TimeBox>
          <TimeBox>
            <TimeValue>{timeLeft.seconds}</TimeValue>
            <TimeLabel>Seconds</TimeLabel>
          </TimeBox>
        </TimerContainer>

        <NotifyButton onClick={() => navigate("/")}>Back to Home</NotifyButton>
      </ContentWrapper>

      <BackgroundAnimation>
        <Circle />
        <Circle />
        <Circle />
      </BackgroundAnimation>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #0D1321 0%, #1F2937 100%)",
  position: "relative",
  overflow: "hidden",
  padding: "20px",
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "40px",
  maxWidth: "800px",
  width: "100%",
  zIndex: 2,
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    gap: "30px",
  },
}));

const Logo = styled("img")(({ theme }) => ({
  width: "200px",
  height: "auto",
  marginBottom: "20px",
  [theme.breakpoints.down("sm")]: {
    width: "150px",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "64px",
  fontWeight: "700",
  color: "#fff",
  background: "linear-gradient(45deg, #1AE5A1, #00B4D8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: "gradient 3s ease infinite",
  "@keyframes gradient": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "48px",
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  color: "#627691",
  maxWidth: "600px",
  lineHeight: 1.5,
  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
  },
}));

const TimerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  marginTop: "20px",
  [theme.breakpoints.down("sm")]: {
    gap: "10px",
  },
}));

const TimeBox = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "15px",
  padding: "20px",
  minWidth: "120px",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    background: "rgba(255, 255, 255, 0.08)",
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "80px",
    padding: "15px",
  },
}));

const TimeValue = styled(Typography)(({ theme }) => ({
  fontSize: "36px",
  fontWeight: "700",
  color: "#1AE5A1",
  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
  },
}));

const TimeLabel = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#627691",
  marginTop: "5px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
  },
}));

const NotifyButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #1AE5A1, #00B4D8)",
  color: "#fff",
  padding: "15px 40px",
  borderRadius: "30px",
  fontSize: "18px",
  fontWeight: "600",
  textTransform: "none",
  transition: "all 0.3s ease",
  marginTop: "20px",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 20px rgba(26, 229, 161, 0.2)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "12px 30px",
    fontSize: "16px",
  },
}));

const BackgroundAnimation = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 1,
}));

const Circle = styled(Box)(({ theme }) => ({
  position: "absolute",
  borderRadius: "50%",
  background:
    "linear-gradient(45deg, rgba(26, 229, 161, 0.1), rgba(0, 180, 216, 0.1))",
  animation: "float 8s ease-in-out infinite",
  "&:nth-of-type(1)": {
    width: "300px",
    height: "300px",
    top: "10%",
    left: "10%",
    animationDelay: "0s",
  },
  "&:nth-of-type(2)": {
    width: "200px",
    height: "200px",
    top: "60%",
    right: "15%",
    animationDelay: "2s",
  },
  "&:nth-of-type(3)": {
    width: "150px",
    height: "150px",
    bottom: "10%",
    left: "20%",
    animationDelay: "4s",
  },
  "@keyframes float": {
    "0%": {
      transform: "translateY(0) rotate(0deg)",
    },
    "50%": {
      transform: "translateY(-20px) rotate(180deg)",
    },
    "100%": {
      transform: "translateY(0) rotate(360deg)",
    },
  },
}));
