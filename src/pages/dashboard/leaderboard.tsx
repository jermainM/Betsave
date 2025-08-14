import { Box, styled, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { formatEarningWithCommas } from "../../utils/number";
import { LeaderBoardTable } from "../../components/table/leaderboard";

import {
  TempUserIcon,
  Rank1Img,
  Rank2Img,
  Rank3Img,
  GreenLeaderboardPng,
} from "../../constants/images";
import { transactionService } from "../../api/services/transactionService";
import { useEffect, useState, useCallback } from "react";

export const LeaderBoard = () => {
  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => transactionService.getLeaderBoardData(),
  });

  const { data: monthlyScheduling, isLoading: monthlySchedulingLoading } =
    useQuery({
      queryKey: ["monthly-scheduling"],
      queryFn: () => transactionService.getMonthlyScheduling(),
    });

  const [totalPrize, setTotalPrize] = useState(0);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [remainingMs, setRemainingMs] = useState(0);

  useEffect(() => {
    const data = leaderboard?.data;
    if (data?.length > 0) {
      let total = 0;
      data?.forEach((item: any) => {
        total += Number(item.totalAmount);
      });
      setTotalPrize(total);
    }
  }, [leaderboard]);

  // Initialize countdown from API data
  useEffect(() => {
    if (monthlyScheduling?.data?.timeUntilNextRun) {
      const initialMs = parseInt(monthlyScheduling.data.timeUntilNextRun);
      setRemainingMs(initialMs);
    }
  }, [monthlyScheduling?.data?.timeUntilNextRun]);

  // Countdown timer logic
  const calculateTimeLeft = useCallback(() => {
    if (remainingMs <= 0) {
      setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

    setCountdown({ days, hours, minutes, seconds });
  }, [remainingMs]);

  useEffect(() => {
    if (remainingMs > 0) {
      calculateTimeLeft();

      const timer = setInterval(() => {
        setRemainingMs((prev) => {
          const newMs = prev - 1000; // Decrease by 1 second (1000ms)
          return newMs > 0 ? newMs : 0;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [remainingMs, calculateTimeLeft]);
  return (
    <LeaderBoardContainer>
      <Heading>
        <HeadingTitleContainer>
          <HeadingTitle>
            <HeadingTitleIcon>
              <img src={GreenLeaderboardPng} alt="title-icon" />
            </HeadingTitleIcon>
            Leaderboard
          </HeadingTitle>
          <HeadingContent>
            Compete for the top spot! Earn the most rewards and secure your
            place in the weekly top 10
          </HeadingContent>
        </HeadingTitleContainer>
      </Heading>
      <Scoreboard>
        <StatsGrid>
          <PrizeCard>
            <PrizeHeader>
              <PrizeLabel>Monthly Prize Pool</PrizeLabel>
              <PrizeIcon>🏆</PrizeIcon>
            </PrizeHeader>
            <PrizeAmount>
              ${formatEarningWithCommas(Number(totalPrize))}
            </PrizeAmount>
            <PrizeSubtext>Total rewards up for grabs</PrizeSubtext>
          </PrizeCard>

          <TimerCard>
            <TimerHeader>
              <TimerTitle>Race Ends In</TimerTitle>
              {remainingMs <= 0 && <EndedBadge>RACE ENDED!</EndedBadge>}
            </TimerHeader>
            <AwesomeTimer>
              <TimeUnitContainer>
                <TimeUnit>
                  <TimeValue
                    isUrgent={countdown.days === 0 && countdown.hours < 24}
                  >
                    {countdown.days.toString().padStart(2, "0")}
                  </TimeValue>
                  <TimeLabel>DAYS</TimeLabel>
                </TimeUnit>
                <TimeSeparator>:</TimeSeparator>
                <TimeUnit>
                  <TimeValue
                    isUrgent={countdown.days === 0 && countdown.hours < 12}
                  >
                    {countdown.hours.toString().padStart(2, "0")}
                  </TimeValue>
                  <TimeLabel>HOURS</TimeLabel>
                </TimeUnit>
                <TimeSeparator>:</TimeSeparator>
                <TimeUnit>
                  <TimeValue
                    isUrgent={
                      countdown.days === 0 &&
                      countdown.hours === 0 &&
                      countdown.minutes < 30
                    }
                  >
                    {countdown.minutes.toString().padStart(2, "0")}
                  </TimeValue>
                  <TimeLabel>MINUTES</TimeLabel>
                </TimeUnit>
                <TimeSeparator>:</TimeSeparator>
                <TimeUnit>
                  <TimeValue
                    isUrgent={
                      countdown.days === 0 &&
                      countdown.hours === 0 &&
                      countdown.minutes < 5
                    }
                  >
                    {countdown.seconds.toString().padStart(2, "0")}
                  </TimeValue>
                  <TimeLabel>SECONDS</TimeLabel>
                </TimeUnit>
              </TimeUnitContainer>
            </AwesomeTimer>
          </TimerCard>
        </StatsGrid>
        {leaderboard?.data.length >= 3 && (
          <RankScoreboard>
            <RankCard
              rank={2}
              avatar={leaderboard?.data[1]?.userAvatar || TempUserIcon}
              name={leaderboard?.data[1]?.userName}
              earning={formatEarningWithCommas(
                leaderboard?.data[1]?.totalAmount
              )}
            />
            <RankCard
              rank={1}
              avatar={leaderboard?.data[0]?.userAvatar || TempUserIcon}
              name={leaderboard?.data[0]?.userName}
              earning={formatEarningWithCommas(
                leaderboard?.data[0]?.totalAmount
              )}
            />
            <RankCard
              rank={3}
              avatar={leaderboard?.data[2]?.userAvatar || TempUserIcon}
              name={leaderboard?.data[2]?.userName}
              earning={formatEarningWithCommas(
                leaderboard?.data[2]?.totalAmount
              )}
            />
          </RankScoreboard>
        )}
        {leaderboard?.data.length >= 3 && (
          <MobileRankScoreboard>
            <RankCard
              rank={1}
              avatar={leaderboard?.data[0]?.userAvatar || TempUserIcon}
              name={leaderboard?.data[0]?.userName}
              earning={formatEarningWithCommas(
                leaderboard?.data[0]?.totalAmount
              )}
            />
            <RankCard
              rank={2}
              avatar={leaderboard?.data[1]?.userAvatar || TempUserIcon}
              name={leaderboard?.data[1]?.userName}
              earning={formatEarningWithCommas(
                leaderboard?.data[1]?.totalAmount
              )}
            />
            <RankCard
              rank={3}
              avatar={leaderboard?.data[2]?.userAvatar || TempUserIcon}
              name={leaderboard?.data[2]?.userName}
              earning={formatEarningWithCommas(
                leaderboard?.data[2]?.totalAmount
              )}
            />
          </MobileRankScoreboard>
        )}
      </Scoreboard>
      <LeaderBoardTable />
    </LeaderBoardContainer>
  );
};

const LeaderBoardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
}));

const Heading = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "fit-content",
  [theme.breakpoints.down(680)]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
  },
}));

const HeadingTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "24px",
  color: "#fff",
  fontWeight: "bold",
}));

const HeadingTitleIcon = styled(Box)(({ theme }) => ({
  width: "36px",
  height: "36px",
  img: {
    width: "100%",
    height: "auto",
  },
}));

const HeadingTitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
}));

const HeadingContent = styled(Typography)(({ theme }) => ({
  color: "#627691",
  fontSize: "16px",
  [theme.breakpoints.down(480)]: {
    fontSize: "14px",
  },
}));

const Scoreboard = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1000px",
  display: "flex",
  flexDirection: "column",
  gap: "100px",
  marginTop: "100px",
  [theme.breakpoints.down(768)]: {
    marginTop: "50px",
  },
}));

// New Modern Structure
const StatsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "24px",
  width: "100%",
  [theme.breakpoints.down(768)]: {
    gridTemplateColumns: "1fr",
    gap: "20px",
  },
  [theme.breakpoints.down(480)]: {
    gap: "16px",
  },
}));

const PrizeCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "24px",
  borderRadius: "16px",
  background:
    "linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)",
  border: "1px solid rgba(255, 215, 0, 0.3)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow:
      "0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 215, 0, 0.2)",
  },
  [theme.breakpoints.down(768)]: {
    padding: "20px",
    gap: "10px",
  },
  [theme.breakpoints.down(480)]: {
    padding: "16px",
    gap: "8px",
  },
}));

const PrizeHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
}));

const PrizeIcon = styled(Box)(({ theme }) => ({
  fontSize: "24px",
  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
  [theme.breakpoints.down(480)]: {
    fontSize: "20px",
  },
}));

const PrizeAmount = styled(Typography)(({ theme }) => ({
  fontSize: "36px",
  fontWeight: "bold",
  color: "#FFD700",
  textShadow: "0 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255, 215, 0, 0.3)",
  animation: "prizeGlow 2s ease-in-out infinite alternate",
  textAlign: "center",
  "@keyframes prizeGlow": {
    "0%": {
      textShadow: "0 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255, 215, 0, 0.3)",
    },
    "100%": {
      textShadow: "0 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(255, 215, 0, 0.6)",
    },
  },
  [theme.breakpoints.down(768)]: {
    fontSize: "32px",
  },
  [theme.breakpoints.down(480)]: {
    fontSize: "28px",
  },
}));

const PrizeLabel = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "rgba(255, 255, 255, 0.8)",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "1px",
  [theme.breakpoints.down(480)]: {
    fontSize: "14px",
  },
}));

const PrizeSubtext = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "rgba(255, 255, 255, 0.6)",
  fontWeight: "400",
  textAlign: "center",
  fontStyle: "italic",
  [theme.breakpoints.down(480)]: {
    fontSize: "14px",
  },
}));

const TimerCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "24px",
  borderRadius: "16px",
  background:
    "linear-gradient(135deg, rgba(14, 247, 169, 0.1) 0%, rgba(14, 247, 169, 0.05) 100%)",
  border: "1px solid rgba(14, 247, 169, 0.3)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow:
      "0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(14, 247, 169, 0.2)",
  },
  [theme.breakpoints.down(768)]: {
    padding: "20px",
    gap: "12px",
  },
  [theme.breakpoints.down(480)]: {
    padding: "16px",
    gap: "10px",
  },
}));

const TimerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
}));

const TimerTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "600",
  color: "#fff",
  textTransform: "uppercase",
  letterSpacing: "1px",
  [theme.breakpoints.down(480)]: {
    fontSize: "14px",
  },
}));

const EndedBadge = styled(Box)(({ theme }) => ({
  padding: "4px 12px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #ff4757 0%, #ff3742 100%)",
  color: "#fff",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "1px",
  animation: "bounce 0.6s ease-in-out infinite",
  "@keyframes bounce": {
    "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
    "40%": { transform: "translateY(-3px)" },
    "60%": { transform: "translateY(-2px)" },
  },
}));

// Awesome Timer Components
const AwesomeTimer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
  padding: "16px 12px",
  borderRadius: "16px",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  animation: "timerGlow 2s ease-in-out infinite alternate",
  "@keyframes timerGlow": {
    "0%": {
      boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(14, 247, 169, 0.3)",
    },
    "100%": {
      boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 30px rgba(14, 247, 169, 0.6)",
    },
  },
}));

const TimeUnitContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
}));

const TimeUnit = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
}));

const TimeValue = styled(Typography)<{ isUrgent?: boolean }>(
  ({ theme, isUrgent }) => ({
    fontSize: "32px",
    fontWeight: "bold",
    color: isUrgent ? "#ff4757" : "#fff",
    textShadow: isUrgent
      ? "0 0 10px rgba(255, 71, 87, 0.8), 0 0 20px rgba(255, 71, 87, 0.4)"
      : "0 2px 4px rgba(0,0,0,0.5)",
    animation: isUrgent ? "pulse 1s ease-in-out infinite" : "none",
    "@keyframes pulse": {
      "0%": { transform: "scale(1)" },
      "50%": { transform: "scale(1.05)" },
      "100%": { transform: "scale(1)" },
    },
    transition: "all 0.3s ease",
    [theme.breakpoints.down(768)]: {
      fontSize: "24px",
    },
  })
);

const TimeLabel = styled(Typography)(({ theme }) => ({
  fontSize: "10px",
  fontWeight: "600",
  color: "rgba(255,255,255,0.7)",
  textTransform: "uppercase",
  letterSpacing: "1px",
  [theme.breakpoints.down(768)]: {
    fontSize: "8px",
  },
}));

const TimeSeparator = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: "bold",
  color: "#0ef7a9",
  textShadow: "0 0 10px rgba(14, 247, 169, 0.5)",
  animation: "blink 1s ease-in-out infinite",
  "@keyframes blink": {
    "0%, 50%": { opacity: 1 },
    "51%, 100%": { opacity: 0.5 },
  },
  alignSelf: "flex-start",
  [theme.breakpoints.down(768)]: {
    fontSize: "24px",
  },
}));

const RaceEndedBadge = styled(Box)(({ theme }) => ({
  marginTop: "8px",
  padding: "8px 16px",
  borderRadius: "20px",
  background: "linear-gradient(135deg, #ff4757 0%, #ff3742 100%)",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "bold",
  textTransform: "uppercase",
  textAlign: "center",
  letterSpacing: "1px",
  animation: "bounce 0.6s ease-in-out infinite",
  "@keyframes bounce": {
    "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
    "40%": { transform: "translateY(-5px)" },
    "60%": { transform: "translateY(-3px)" },
  },
}));

const RankScoreboard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: "20px",
  [theme.breakpoints.down(728)]: {
    display: "none",
  },
}));

const MobileRankScoreboard = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down(728)]: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "60px",
  },
}));

interface RankCardProps {
  rank: number;
  avatar: string;
  name: string;
  earning: string;
}

const RankCard = (props: RankCardProps) => {
  const { rank, avatar, name, earning } = props;
  const img = rank === 1 ? Rank1Img : rank === 2 ? Rank2Img : Rank3Img;
  return (
    <RankCardContainer rank={rank}>
      <RankCardCircle rank={rank} />
      <RankImg src={img} rank={rank} alt="rank-img" />
      <UserInfo>
        <UserAvatar rank={rank} src={avatar} alt="user-avatar" />
        <UserName>{name}</UserName>
      </UserInfo>
      <EarningContainer>
        <EarningText>Earnings</EarningText>
        <EarningValue>$ {earning}</EarningValue>
      </EarningContainer>
    </RankCardContainer>
  );
};

const RankCardContainer = styled(Box)<{ rank: number }>(({ theme, rank }) => ({
  position: "relative",
  borderRadius: "20px",
  width: rank === 1 ? "337px" : rank === 2 ? "290px" : "310px",
  height: rank === 1 ? "450px" : rank === 2 ? "370px" : "327px",
  // background: 'linear-gradient(180deg, #0E1629, #1A1E31)',
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "column",
  padding: rank === 1 ? "90px 30px 30px 30px" : "70px 30px 30px 30px",
  transition: "all 0.6s ease",
  cursor: "pointer",
  background:
    rank === 1
      ? "radial-gradient(circle at 55% 90%, rgba(255,215,0,0.3) 0%,rgb(90, 84, 26), #081B1F)"
      : "radial-gradient(circle at 55% 90%, rgba(14, 247, 169, 0.3) 0%, #0F3D3E, #081B1F)",
  "&:hover": {
    transform: "scale(1.05)",
  },

  [theme.breakpoints.down(1280)]: {
    height: rank === 1 ? "380px" : rank === 2 ? "340px" : "300px",
  },

  [theme.breakpoints.down(768)]: {
    height: rank === 1 ? "320px" : rank === 2 ? "280px" : "260px",
  },

  [theme.breakpoints.down(728)]: {
    width: "380px",
    height: rank === 1 ? "360px" : rank === 2 ? "320px" : "300px",
  },

  [theme.breakpoints.down(480)]: {
    width: "100%",
  },
}));

const RankCardCircle = styled(Box)<{ rank: number }>(({ theme, rank }) => ({
  width: rank === 1 ? "260px" : rank === 2 ? "200px" : "200px",
  height: rank === 1 ? "260px" : rank === 2 ? "200px" : "200px",
  bottom: "50px",
  borderRadius: "50%",
  boxShadow: `0px 0px 20px 10px rgba(255, 255, 255, 0.3)`,
  filter: "blur(5px)",
  position: "absolute",
  zIndex: 0,
  [theme.breakpoints.down(1280)]: {
    width: rank === 1 ? "220px" : rank === 2 ? "180px" : "180px",
    height: rank === 1 ? "220px" : rank === 2 ? "180px" : "180px",
  },

  [theme.breakpoints.down(768)]: {
    width: rank === 1 ? "180px" : rank === 2 ? "140px" : "140px",
    height: rank === 1 ? "180px" : rank === 2 ? "140px" : "140px",
  },
  [theme.breakpoints.down(728)]: {
    width: rank === 1 ? "220px" : rank === 2 ? "180px" : "180px",
    height: rank === 1 ? "220px" : rank === 2 ? "180px" : "180px",
  },
}));

const RankImg = styled("img")<{ rank: number }>(({ theme, rank }) => ({
  width: rank === 1 ? "77px" : "60px",
  height: "auto",
  position: "absolute",
  top: "-12%",
}));

const UserInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  zIndex: 1,
}));

const UserAvatar = styled("img")<{ rank: number }>(({ theme, rank }) => ({
  width: rank === 1 ? "90px" : "75px",
  height: rank === 1 ? "90px" : "75px",
  borderRadius: "15px",
  [theme.breakpoints.down(1280)]: {
    width: rank === 1 ? "75px" : "60px",
    height: rank === 1 ? "75px" : "60px",
  },
  [theme.breakpoints.down(728)]: {
    width: rank === 1 ? "90px" : "75px",
    height: rank === 1 ? "90px" : "75px",
  },
}));

const UserName = styled(Typography)(({ theme }) => ({
  fontSize: "22px",
  color: "#fff",
  fontWeight: "bold",
  textAlign: "center",
  textTransform: "capitalize",
  [theme.breakpoints.down(1280)]: {
    fontSize: "20px",
  },
  [theme.breakpoints.down(728)]: {
    fontSize: "22px",
  },
}));

const EarningContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  zIndex: 1,
}));

const EarningText = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "bold",
  color: "#fff",
  opacity: "0.8",
}));

const EarningValue = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  color: "#fff",
  fontWeight: "bold",
  textWrap: "nowrap",
  [theme.breakpoints.down(1280)]: {
    fontSize: "18px",
  },
  [theme.breakpoints.down(728)]: {
    fontSize: "20px",
  },
}));
