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

      {/* Catch all route - redirect to appropriate page based on auth status */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />}
      />
    </Routes>
  );
};
