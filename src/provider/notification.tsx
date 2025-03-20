import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Notification } from "../components/notification";

interface NotificationContextType {
  showNotification: (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => void;
  notifySuccess: (message: string) => void;
  notifyError: (message: string) => void;
  notifyInfo: (message: string) => void;
  notifyWarning: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "error",
  });

  const handleCloseNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, open: false }));
  }, []);

  const showNotification = useCallback(
    (message: string, severity: "success" | "error" | "info" | "warning") => {
      setNotification({
        open: true,
        message,
        severity,
      });
    },
    []
  );

  const notifySuccess = useCallback(
    (message: string) => showNotification(message, "success"),
    [showNotification]
  );
  const notifyError = useCallback(
    (message: string) => showNotification(message, "error"),
    [showNotification]
  );
  const notifyInfo = useCallback(
    (message: string) => showNotification(message, "info"),
    [showNotification]
  );
  const notifyWarning = useCallback(
    (message: string) => showNotification(message, "warning"),
    [showNotification]
  );

  useEffect(() => {
    const handleNotification = (event: CustomEvent) => {
      showNotification(event.detail.message, event.detail.severity);
    };

    window.addEventListener(
      "showNotification",
      handleNotification as EventListener
    );
    return () => {
      window.removeEventListener(
        "showNotification",
        handleNotification as EventListener
      );
    };
  }, [showNotification]);

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        notifySuccess,
        notifyError,
        notifyInfo,
        notifyWarning,
      }}
    >
      {children}
      {notification.open && (
        <Notification
          message={notification.message}
          severity={notification.severity}
          onClose={handleCloseNotification}
        />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
