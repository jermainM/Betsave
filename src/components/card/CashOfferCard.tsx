import { Box, styled, Typography } from "@mui/material";

export const CashOfferCard = () => {
  return (
    <CardContainer>
      <CardImg />
      <CardWrapper>
        <CardTitle>Wild Fish</CardTitle>
        <CardContent>Game</CardContent>
        <CardValue>
          <span>3</span>.5%
        </CardValue>
      </CardWrapper>
    </CardContainer>
  );
};

const CardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#171e30",
  borderRadius: "13px",
  display: "flex",
  flexDirection: "column",
  padding: "15px",
  gap: "14px",
  width: "auto",
}));

const CardImg = styled("img")(({ theme }) => ({
  width: "110px",
  height: "110px",
  backgroundColor: "#627691",
  borderRadius: "10px",
}));

const CardWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#fff",
  lineHeight: 1,
}));

const CardContent = styled(Typography)(({ theme }) => ({
  fontSize: "10px",
  color: "#627690",
}));

const CardValue = styled(Typography)(({ theme }) => ({
  fontSize: "10px",
  color: "#1ae5a1",
  span: {
    fontSize: "14px",
  },
}));
