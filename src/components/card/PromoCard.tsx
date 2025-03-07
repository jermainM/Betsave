import { Box, Button, styled } from "@mui/material";
import { useState } from "react";

export const PromoCard = () => {
  const [value, setValue] = useState("");
  return (
    <PromoCardContainer>
      <CardImg />
      <PromoInputContainer>
        <PromoInput
          placeholder="Enter Promo Code"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <RedeemButton>Redeem</RedeemButton>
      </PromoInputContainer>
    </PromoCardContainer>
  );
};

const PromoCardContainer = styled(Box)(({ theme }) => ({
  width: "auto",
  height: "100%",
  borderRadius: "15px",
  backgroundColor: "#0f1629",
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  [theme.breakpoints.down(640)]: {
    padding: "10px",
  },
}));

const CardImg = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "200px",
  borderRadius: "15px",
  backgroundColor: "#171e31",
  [theme.breakpoints.down(640)]: {
    height: "180px",
  },
}));

const PromoInputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  padding: "8px",
  borderRadius: "12px",
  backgroundColor: "#0d1321",
  [theme.breakpoints.down(640)]: {
    padding: "8px 8px 8px 0px",
  },
}));

const PromoInput = styled("input")(({ theme }) => ({
  outline: "none",
  border: "none",
  background: "none",
  fontSize: "14px",
  color: "#fff",
  marginLeft: "10px",
  width: "140px",
  "::placeholder": {
    color: "#627691",
  },
  [theme.breakpoints.down(640)]: {
    width: "120px",
    fontSize: "12px",
  },
}));

const RedeemButton = styled(Button)(({ theme }) => ({
  width: "84px",
  height: "36px",
  borderRadius: "9px",
  backgroundColor: "#1AE5A1",
  color: "#000",
  fontSize: "14px",
  fontWeight: "bold",
  textTransform: "none",
  [theme.breakpoints.down(640)]: {
    width: "72px",
    height: "32px",
    fontSize: "12px",
  },
}));
