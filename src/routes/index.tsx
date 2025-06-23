import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Route, Routes, Navigate, useSearchParams } from "react-router-dom";

import { Landing } from "../pages";
import { EarnMoney } from "../pages/earn";
import { BetSmart } from "../pages/bet";
import { Dashboard } from "../pages/dashboard";
import { AccountManage } from "../pages/account";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import VerifyEmail from "../pages/VerifyEmail";
import VerifyPhone from "../pages/VerifyPhone";
import Wallet from "../pages/Wallet";
import { ResetPassword } from "../pages/ResetPassword";
import {
  setCountry,
  setIpAddress,
  setIsoAlpha2,
} from "../store/slices/deviceSlice";
import { useEffect } from "react";
import { getGeoLocation } from "../utils/fetchIP";
import { useDispatch } from "react-redux";
import { useNotification } from "../provider/notification";

export const RouterComponent = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.session);
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get("ref");

  const dispatch = useDispatch();
  const { notifyError } = useNotification();

  useEffect(() => {
    const fetchDeviceDetails = async () => {
      try {
        const geoLocation = await getGeoLocation();
        const ipAddress = geoLocation.ip;
        const isoAlpha2 = geoLocation.country_code;
        console.log({ ipAddress, isoAlpha2 });
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
    <Routes>
      {/* Public Routes */}

      <Route
        path="/"
        element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        }
      />
      <Route
        path="/r"
        element={
          <PublicRoute>
            <Landing refCode={refCode} />
          </PublicRoute>
        }
      />
      <Route
        path="/earn"
        element={
          <PublicRoute>
            <EarnMoney />
          </PublicRoute>
        }
      />
      <Route
        path="/bet"
        element={
          <PublicRoute>
            <BetSmart />
          </PublicRoute>
        }
      />

      <Route
        path="/verify-email"
        element={
          <PublicRoute>
            <VerifyEmail />
          </PublicRoute>
        }
      />

      <Route
        path="/verify-phone"
        element={
          <PublicRoute>
            <VerifyPhone />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <AccountManage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/wallet"
        element={
          <ProtectedRoute>
            <Wallet />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reset-password/:token"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />

      {/* Catch all route - redirect to appropriate page based on auth status */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />}
      />
    </Routes>
  );
};
