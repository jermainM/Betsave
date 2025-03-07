import { Box, styled, Typography } from "@mui/material";
import { StreakProgressBar } from "../progressbar/StreakBar";
import { BorderRightSharp } from "@mui/icons-material";

interface CardProps {
  hasBadge?: boolean;
  streak: number;
  subTitle: string;
}

export const StreakCard = (props: CardProps) => {
  const { hasBadge, streak, subTitle } = props;
  return (
    <CardContainer>
      {hasBadge && <ClaimBadge>Claimable within 24h</ClaimBadge>}
      <CardContent>
        <CardTitle>Your Streak</CardTitle>
        <CardSubTitle>
          Current Streak: <span>{streak} Days</span>
        </CardSubTitle>
        <StreakProgressBar value={10} />
        <RemainTime>
          Days <div>01</div>
        </RemainTime>
      </CardContent>
      <CardFooter>{subTitle}</CardFooter>
    </CardContainer>
  );
};

const CardContainer = styled(Box)(({ theme }) => ({
  width: "240px",
  height: "310px",
  borderRadius: "25px",
  backgroundColor: "#131a2d",
  boxShadow: "0 2px 4px rgba(26, 229, 161, 0.4)",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  margin: "20px",
  [theme.breakpoints.down(600)]: {
    width: "100%",
  },
}));

const CardContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "fit-content",
  padding: "20px 10px 30px 10px",
  backgroundColor: "transparent",
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  color: "#fff",
}));

const CardSubTitle = styled(Typography)(({ theme }) => ({
  color: "#627691",
  fontSize: "14px",
  span: {
    color: "#1AE5A1",
  },
}));

const RemainTime = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  borderRadius: "10px",
  marginTop: "20px",
  div: {
    color: "#1AE5A1",
    backgroundColor: "#102A33",
    padding: "0px 8px",
    borderRadius: "4px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
}));

const CardFooter = styled(Box)(({ theme }) => ({
  height: "70px",
  background:
    "radial-gradient(circle at 55% 90%, rgba(14, 247, 169, 0.3) 0%, #0F3D3E, #081B1F)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "14px",
  width: "100%",
  borderRadius: "0px 0px 25px 25px",
}));

const ClaimBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  backgroundColor: "#271C2D",
  color: "#ff5a65",
  padding: "4px 8px",
  borderRadius: "8px",
  top: "-20px",
}));
