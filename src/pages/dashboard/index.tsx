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
import { userService } from "../../api/services/userService";

export const Dashboard = () => {
  const activeItem = useSelector((state: RootState) => state.navbar.activeItem);
  const dispatch = useDispatch();
  const { notifyError } = useNotification();
  useEffect(() => {
    const fetchDeviceDetails = async () => {
      try {
        const ipAddress = await fetchIP();
        const response = await userService.getGeoLocation(ipAddress);
        const isoAlpha2 = response.data.countryCode;
        if (ipAddress != null) {
          dispatch(setIpAddress(ipAddress));
          dispatch(setIsoAlpha2(isoAlpha2));
          dispatch(setCountry(isoAlpha2));
        }
      } catch (error) {
        dispatch(setIpAddress(""));
        notifyError("Error fetching device details");
        setTimeout(async () => {
          await fetchDeviceDetails();
        }, 3000);
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
