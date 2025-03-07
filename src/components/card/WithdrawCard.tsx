import { Box, styled } from "@mui/material";

export const WithdrawCard = () => {
  return <WithdrawCardContainer></WithdrawCardContainer>;
};

const WithdrawCardContainer = styled(Box)(({ theme }) => ({
  width: "150px",
  height: "220px",
  backgroundColor: "#171e31",
  borderRadius: "15px",
  [theme.breakpoints.down(768)]: {
    width: "120px",
    height: "176px",
  },
}));
