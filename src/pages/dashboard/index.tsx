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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setCountry,
  setIpAddress,
  setIsoAlpha2,
} from "../../store/slices/deviceSlice";
import { fetchIP } from "../../utils/fetchIP";
import { useNotification } from "../../provider/notification";

export const Dashboard = () => {
  const activeItem = useSelector((state: RootState) => state.navbar.activeItem);
  const dispatch = useDispatch();
  const { notifyError } = useNotification();
  useEffect(() => {
    const fetchDeviceDetails = async () => {
      try {
        const deviceDetails = await fetchIP();
        console.log({ deviceDetails });
        if (deviceDetails != null) {
          dispatch(setCountry(deviceDetails.country_name));
          dispatch(setIsoAlpha2(deviceDetails.country_code));
          dispatch(setIpAddress(deviceDetails.ip));
        }
      } catch (error) {
        dispatch(setCountry(""));
        dispatch(setIsoAlpha2(""));
        dispatch(setIpAddress(""));
        notifyError("Error fetching device details");
        setTimeout(async () => {
          await fetchDeviceDetails();
        }, 1000);
      }
    };
    fetchDeviceDetails();
  }, []);
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
