import { Box, Button, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";

interface ChallengeCardProps {
  initialTimer: number;
}

export const ChallengeCard = (props: ChallengeCardProps) => {
  const { initialTimer } = props;

  const [timer, setTimer] = useState(initialTimer);

  useEffect(() => {
    if (timer <= 0) return; // Stop if timer reaches zero

    const intervalId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount or update
  }, [timer]);

  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;

  return (
    <ChallengeCardContainer>
      <TimerContainer>
        <Timer value={hours} unit="hours" />
        <TimerDivider>:</TimerDivider>
        <Timer value={minutes} unit="minutes" />
        <TimerDivider>:</TimerDivider>
        <Timer value={seconds} unit="seconds" />
      </TimerContainer>
      <CardImg />
      <CardContent>
        <LabelContainer>
          <BadgePercent value={20} completed={timer === 0 ? 1 : 0} />
          <MobileTimerContainer>
            <Timer value={hours} unit="hours" />
            <TimerDivider>:</TimerDivider>
            <Timer value={minutes} unit="minutes" />
            <TimerDivider>:</TimerDivider>
            <Timer value={seconds} unit="seconds" />
          </MobileTimerContainer>
        </LabelContainer>
        <CardText sx={{ color: timer === 0 ? "#627691" : "#fff" }}>
          Place 10 bets this week for 2x cashback!
        </CardText>
        <JoinButton
          sx={{
            color: timer === 0 ? "#627691" : "#0d1321",
            backgroundColor: timer === 0 ? "#171e31" : "#1AE5A1",
          }}
        >
          {timer === 0 ? "Completed" : "Join Challenge"}
        </JoinButton>
      </CardContent>
    </ChallengeCardContainer>
  );
};

const ChallengeCardContainer = styled(Box)(({ theme }) => ({
  width: "auto",
  // margin: '0px 20px 20px 0px',
  padding: "20px",
  borderRadius: "15px",
  backgroundColor: "#0f1629",
  display: "flex",
  alignItems: "center",
  gap: "32px",
  position: "relative",
  [theme.breakpoints.down(1400)]: {
    gap: "20px",
    padding: "16px",
  },
  [theme.breakpoints.down(1366)]: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "20px",
    gap: "32px",
  },

  [theme.breakpoints.down(768)]: {
    flexDirection: "row",
    alignItems: "center",
  },

  [theme.breakpoints.down(680)]: {
    gap: "20px",
    padding: "16px",
  },

  [theme.breakpoints.down(570)]: {
    flexDirection: "column",
    alignItems: "flex-start",
    margin: "0px",
  },
}));

const CardImg = styled(Box)(({ theme }) => ({
  width: "220px",
  minWidth: "220px",
  height: "220px",
  borderRadius: "15px",
  backgroundColor: "#171e31",

  [theme.breakpoints.down(1540)]: {
    width: "180px",
    minWidth: "180px",
    height: "180px",
  },

  [theme.breakpoints.down(1366)]: {
    width: "100%",
    minWidth: "250px",
    height: "250px",
  },

  [theme.breakpoints.down(768)]: {
    width: "250px",
  },
  [theme.breakpoints.down(680)]: {
    width: "220px",
    minWidth: "220px",
    height: "220px",
  },
  [theme.breakpoints.down(570)]: {
    width: "100%",
    minWidth: "250px",
    height: "250px",
  },
}));

const CardContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

const LabelContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const BadgePercent = (props: { value: number; completed: number }) => {
  const { value, completed } = props;
  return (
    <BadgePercentContainer value={value} completed={completed}>
      {value > 0 ? `+${value}` : value}%
    </BadgePercentContainer>
  );
};

const BadgePercentContainer = styled(Box)<{ value: number; completed: number }>(
  ({ theme, value, completed }) => ({
    padding: "4px 8px",
    fontSize: "14px",
    width: "fit-content",
    borderRadius: "5px",
    backgroundColor:
      completed === 1 ? "#171e31" : value > 0 ? "#102A33" : "#271C2D",
    color: completed === 1 ? "#627691" : value > 0 ? "#1ae5a1" : "#ff5a65",
  }),
);

const CardText = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "24px",
  width: "260px",
  [theme.breakpoints.down(1560)]: {
    fontSize: "22px",
    width: "240px",
  },
  [theme.breakpoints.down(1400)]: {
    fontSize: "20px",
    width: "220px",
  },
  [theme.breakpoints.down(1366)]: {
    fontSize: "32px",
    width: "100%",
    textAlign: "center",
  },
  [theme.breakpoints.down(1240)]: {
    fontSize: "26px",
  },

  [theme.breakpoints.down(768)]: {
    width: "310px",
    fontSize: "28px",
    textAlign: "left",
  },

  [theme.breakpoints.down(680)]: {
    fontSize: "22px",
    width: "240px",
  },

  [theme.breakpoints.down(570)]: {
    fontSize: "32px",
    width: "100%",
    textAlign: "center",
  },

  [theme.breakpoints.down(480)]: {
    fontSize: "28px",
  },

  [theme.breakpoints.down(380)]: {
    fontSize: "22px",
  },
}));

const JoinButton = styled(Button)(({ theme }) => ({
  width: "160px",
  height: "42px",
  fontSize: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "none",
  fontWeight: "bold",
  borderRadius: "9px",
  [theme.breakpoints.down(1366)]: {
    width: "100%",
    height: "42px",
  },
  [theme.breakpoints.down(768)]: {
    fontSize: "20px",
  },

  [theme.breakpoints.down(380)]: {
    fontSize: "18px",
  },
}));

const TimerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "4px",
  position: "absolute",
  top: "10px",
  right: "10px",
  [theme.breakpoints.down(1366)]: {
    display: "none",
  },
  [theme.breakpoints.down(768)]: {
    display: "flex",
  },
  [theme.breakpoints.down(570)]: {
    display: "none",
  },
}));

const MobileTimerContainer = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "4px",
  [theme.breakpoints.down(1366)]: {
    display: "flex",
  },
  [theme.breakpoints.down(768)]: {
    display: "none",
  },
  [theme.breakpoints.down(570)]: {
    display: "flex",
  },
}));

interface TimerProps {
  value: number;
  unit: string;
}

const Timer = (props: TimerProps) => {
  const { value, unit } = props;
  return (
    <TimerContent>
      <TimerWrapper>
        {value < 10 ? `0${value}` : value}
        <TimerIcon>
          <FaClock />
        </TimerIcon>
      </TimerWrapper>
      {unit}
    </TimerContent>
  );
};

const TimerContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textTransform: "uppercase",
  fontSize: "10px",
  color: "#627691",
  fontWeight: "bold",
  gap: "3px",
  width: "50px",
  [theme.breakpoints.down(1366)]: {
    fontSize: "12px",
  },
}));

const TimerWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "36px",
  height: "38px",
  fontSize: "14px",
  backgroundColor: "#171e31",
  color: "#627691",
  borderRadius: "7px",
  position: "relative",
  overflow: "hidden",
  fontWeight: "bold",
  paddingTop: "6px",
  [theme.breakpoints.down(1366)]: {
    width: "40px",
    height: "42px",
    fontSize: "16px",
  },
}));

const TimerIcon = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  color: "#627691",
  position: "absolute",
  bottom: "-12px",
  [theme.breakpoints.down(1366)]: {
    fontSize: "16px",
  },
}));

const TimerDivider = styled(Box)(({ theme }) => ({
  color: "#627691",
  paddingTop: "10px",
  fontSize: "14px",
  fontWeight: "bold",
}));
