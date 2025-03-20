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
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  const showNotification = useCallback(
    (message: string, severity: "success" | "error" | "info" | "warning") => {
      setMessage(message);
      setSeverity(severity);
      setOpen(true);
    },
    []
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

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {open && (
        <Notification
          message={message}
          severity={severity}
          onClose={handleClose}
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
