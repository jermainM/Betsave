import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";

import { RootState } from "../../store";
import { MyOffer } from "./myoffer";
import { PromotionalOffer } from "./promotional-offers";
import { Withdraw } from "./withdraw";
import { LeaderBoard } from "./leaderboard";
import { Affiliates } from "./affiliates";
import { Referrals } from "./referrals";
import { Reward } from "./reward";
import { AvailableOffer } from "./available-offer";

export const Dashboard = () => {
  const activeItem = useSelector((state: RootState) => state.navbar.activeItem);
  return (
    <DashboardContainer>
      {activeItem === 0 && <PromotionalOffer />}
      {activeItem === 1 && <AvailableOffer />}
      {activeItem === 2 && <MyOffer />}
      {activeItem === 3 && <Withdraw />}
      {activeItem === 4 && <LeaderBoard />}
      {activeItem === 5 && <Reward />}
      {/* {activeItem === 6 && <Affiliates />} */}
      {activeItem === 6 && <Referrals />}
    </DashboardContainer>
  );
};

const DashboardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  padding: "20px 0px",
  marginTop: "20px",
}));
