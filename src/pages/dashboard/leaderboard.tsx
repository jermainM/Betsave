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
import { useEffect } from "react";

export const LeaderBoard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => transactionService.getLeaderBoardData(),
  });

  useEffect(() => {
    console.log({ leaderboard: data });
  }, [data]);
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
        <BannerContainer>
          <PrizeWrapper>
            <PrizeContainer>
              <PrizeValue>$2,000</PrizeValue>
              <PrizeTitle>Monthly Prize</PrizeTitle>
            </PrizeContainer>
            <PrizeDivider />
          </PrizeWrapper>
          <RaceTimeContainer>
            <RaceTime>01D:20H:31M:38S</RaceTime>
            <RaceTitle>Race Ends</RaceTitle>
          </RaceTimeContainer>
        </BannerContainer>
        <RankScoreboard>
          <RankCard
            rank={2}
            avatar={TempUserIcon}
            name={"Andr Grown"}
            earning={formatEarningWithCommas(839904.93)}
          />
          <RankCard
            rank={1}
            avatar={TempUserIcon}
            name={"Andr Grown"}
            earning={formatEarningWithCommas(839904.93)}
          />
          <RankCard
            rank={3}
            avatar={TempUserIcon}
            name={"Andr Grown"}
            earning={formatEarningWithCommas(839904.93)}
          />
        </RankScoreboard>
        <MobileRankScoreboard>
          <RankCard
            rank={1}
            avatar={TempUserIcon}
            name={"Andr Grown"}
            earning={formatEarningWithCommas(839904.93)}
          />
          <RankCard
            rank={2}
            avatar={TempUserIcon}
            name={"Andr Grown"}
            earning={formatEarningWithCommas(839904.93)}
          />
          <RankCard
            rank={3}
            avatar={TempUserIcon}
            name={"Andr Grown"}
            earning={formatEarningWithCommas(839904.93)}
          />
        </MobileRankScoreboard>
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
}));

const BannerContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: "15px",
  padding: "24px 50px",
  backgroundColor: "#0f1629",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background:
    "radial-gradient(circle at 55% 90%, rgba(14, 247, 169, 0.3) 0%, #0F3D3E, #081B1F)",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  [theme.breakpoints.down(640)]: {
    padding: "16px 24px",
  },
}));

const PrizeWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "87px",
  [theme.breakpoints.down(640)]: {
    gap: "42px",
  },
  [theme.breakpoints.down(420)]: {
    gap: "21px",
  },
  [theme.breakpoints.down(360)]: {
    gap: "10px",
  },
}));

const PrizeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const PrizeValue = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: "bold",
  color: "#fff",
  [theme.breakpoints.down(640)]: {
    fontSize: "20px",
  },
  [theme.breakpoints.down(420)]: {
    fontSize: "18px",
  },
  [theme.breakpoints.down(360)]: {
    fontSize: "16px",
  },
}));

const PrizeTitle = styled(Typography)(({ theme }) => ({
  color: "#627691",
  fontSize: "18px",
  fontWeight: "bold",
  [theme.breakpoints.down(640)]: {
    fontSize: "16px",
  },
  [theme.breakpoints.down(420)]: {
    fontSize: "14px",
  },
}));

const PrizeDivider = styled(Box)(({ theme }) => ({
  width: "1px",
  height: "63px",
  backgroundColor: "#1AE5A1",
  [theme.breakpoints.down(640)]: {
    height: "54px",
  },
}));

const RaceTimeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const RaceTime = PrizeValue;

const RaceTitle = PrizeTitle;

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
