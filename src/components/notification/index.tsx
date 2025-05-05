import { Alert, styled, IconButton, keyframes } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

interface NotificationProps {
  message: string;
  title?: string;
  severity: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

const slideIn = keyframes`
  0% {
    transform: translateX(100%) scale(0.8);
    opacity: 0;
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateX(100%) scale(0.8);
    opacity: 0;
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(26, 229, 161, 0.2);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(26, 229, 161, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(26, 229, 161, 0);
  }
`;

const NotificationWrapper = styled("div")({
  position: "fixed",
  top: "20px",
  right: "20px",
  zIndex: 2000,
  maxWidth: "400px",
  width: "100%",
  animation: `${slideIn} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  "&.closing": {
    animation: `${slideOut} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

const StyledAlert = styled(Alert)(({ theme, severity }) => ({
  position: "relative",
  border: "none",
  borderRadius: "16px",
  padding: "16px 48px 16px 16px",
  margin: "8px 0",
  backdropFilter: "blur(12px)",
  transition: "all 0.3s ease-in-out",
  animation: `${pulse} 2s infinite`,
  backgroundColor: "#171e31",
  "& .MuiAlert-icon": {
    fontSize: "32px",
    opacity: 1,
    marginRight: "16px",
    transition: "transform 0.3s ease-in-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "&:hover .MuiAlert-icon": {
    transform: "scale(1.1)",
  },
  "& .MuiAlert-message": {
    padding: "4px 0",
  },
  ...(severity === "success" && {
    color: "#1AE5A1",
    boxShadow: "0 8px 32px rgba(26, 229, 161, 0.15)",
    "& .MuiAlert-icon": {
      color: "#1AE5A1",
    },
  }),
  ...(severity === "info" && {
    color: "#4FC3F7",
    boxShadow: "0 8px 32px rgba(79, 195, 247, 0.2)",
    "& .MuiAlert-icon": {
      color: "#4FC3F7",
    },
  }),
  ...(severity === "warning" && {
    color: "#f9a825",
    boxShadow: "0 8px 32px rgba(249, 168, 37, 0.15)",
    "& .MuiAlert-icon": {
      color: "#f9a825",
    },
  }),
  ...(severity === "error" && {
    color: "#ff5a65",
    boxShadow: "0 8px 32px rgba(255, 90, 101, 0.15)",
    "& .MuiAlert-icon": {
      color: "#ff5a65",
    },
  }),
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: 8,
  top: 8,
  color: "#627691",
  opacity: 0.7,
  padding: 4,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    opacity: 1,
    backgroundColor: "rgba(98, 118, 145, 0.1)",
    transform: "scale(1.1) rotate(90deg)",
  },
}));

const Title = styled("div")({
  fontWeight: 600,
  fontSize: "1.1rem",
  marginBottom: 6,
  lineHeight: 1.4,
  letterSpacing: "0.01em",
});

const Message = styled("div")({
  fontSize: "0.95rem",
  lineHeight: 1.6,
  opacity: 0.9,
  letterSpacing: "0.01em",
});

const getIcon = (severity: string) => {
  switch (severity) {
    case "success":
      return <FaCheckCircle size={24} />;
    case "error":
      return <FaExclamationCircle size={24} />;
    case "warning":
      return <FaExclamationTriangle size={24} />;
    case "info":
      return <FaInfoCircle size={24} />;
    default:
      return null;
  }
};

export const Notification = ({
  message,
  title,
  severity,
  onClose,
}: NotificationProps) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(onClose, 400);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <NotificationWrapper className={isClosing ? "closing" : ""}>
      <StyledAlert
        severity={severity}
        icon={getIcon(severity)}
        action={
          <CloseButton aria-label="close" onClick={onClose} size="small">
            <CloseIcon fontSize="small" />
          </CloseButton>
        }
      >
        {title && <Title>{title}</Title>}
        <Message>{message}</Message>
      </StyledAlert>
    </NotificationWrapper>
  );
};
