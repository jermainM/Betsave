import React, { useState } from "react";
import { Fab, styled } from "@mui/material";
import { SmartToy } from "@mui/icons-material";
import ChatbotModal from "./ChatbotModal";

export const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StyledFab
        color="primary"
        onClick={() => setIsOpen(true)}
        sx={{
          background: "linear-gradient(135deg, #1AE5A1 0%, #00D4AA 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #15cc8f 0%, #00b894 100%)",
            transform: "scale(1.05)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        <SmartToy sx={{ fontSize: "24px" }} />
      </StyledFab>

      <ChatbotModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

const StyledFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: "24px",
  right: "24px",
  zIndex: 1000,
  boxShadow: "0 4px 20px rgba(26, 229, 161, 0.4)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    boxShadow: "0 8px 30px rgba(26, 229, 161, 0.6)",
  },
  [theme.breakpoints.down(1096)]: {
    bottom: "96px",
    right: "16px",
  },
}));
