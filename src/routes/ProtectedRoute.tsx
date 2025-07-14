import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNotification } from "../provider/notification";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.session);
  const { notifyError } = useNotification();

  if (!isAuthenticated) {
    // Add a small delay to prevent notification during logout
    // setTimeout(() => {
    //   notifyError("Session expired. Please login again.");
    // }, 100);
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
