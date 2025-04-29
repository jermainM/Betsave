import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Menu, MenuItem, Typography, styled } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { tokens } from "../../constants/tokens";

interface Token {
  symbol: string;
  name: string;
  icon: string;
}

const TokenButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "12px 16px",
  backgroundColor: "#172236",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: "#fff",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#1c2943",
    borderColor: "#1AE5A1",
  },
}));

const TokenInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const TokenIcon = styled("img")({
  width: "24px",
  height: "24px",
  objectFit: "contain",
});

const TokenName = styled(Typography)({
  fontSize: "14px",
  color: "#fff",
});

const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    marginTop: "8px",
    backgroundColor: "#172236",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    maxHeight: "300px",
    backgroundImage: "none",
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(255, 255, 255, 0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#1AE5A1",
      borderRadius: "4px",
    },
  },
});

const StyledMenuItem = styled(MenuItem)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px 16px",
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

interface TokenSelectorProps {
  selectedToken: Token | null;
  onTokenSelect: (token: Token) => void;
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  onTokenSelect,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = useState<number>(0);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTokenSelect = (token: Token) => {
    onTokenSelect(token);
    handleClose();
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TokenButton
        ref={buttonRef}
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
      >
        <TokenInfo>
          {selectedToken ? (
            <>
              <TokenIcon src={selectedToken.icon} alt={selectedToken.symbol} />
              <TokenName>{selectedToken.symbol}</TokenName>
            </>
          ) : (
            <TokenName>Select Token</TokenName>
          )}
        </TokenInfo>
      </TokenButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            width: buttonWidth,
          },
        }}
      >
        {tokens.map((token) => (
          <StyledMenuItem
            key={token.symbol}
            onClick={() => handleTokenSelect(token)}
          >
            <TokenIcon src={token.icon} alt={token.symbol} />
            <TokenName>{token.symbol}</TokenName>
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </Box>
  );
};
