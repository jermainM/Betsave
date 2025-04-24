import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Route, Routes, Navigate } from "react-router-dom";

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

export const RouterComponent = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.session);

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
