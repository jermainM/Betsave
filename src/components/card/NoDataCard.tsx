import { Box, styled, Typography } from "@mui/material";
import { MdOutlineReceiptLong } from "react-icons/md";

export const NoDataCard = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <NoDataContainer>
      <NoDataIcon>
        <MdOutlineReceiptLong />
      </NoDataIcon>
      <NoDataTitle>{title}</NoDataTitle>
      <NoDataSubtitle>{subtitle}</NoDataSubtitle>
    </NoDataContainer>
  );
};

const NoDataContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 20px",
  gap: "12px",
  backgroundColor: "#0F1629",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
}));

const NoDataIcon = styled(Box)(({ theme }) => ({
  fontSize: "48px",
  color: "#627691",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "80px",
  height: "80px",
  backgroundColor: "rgba(98, 118, 145, 0.1)",
  borderRadius: "50%",
}));

const NoDataTitle = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  color: "#fff",
  fontWeight: 500,
}));

const NoDataSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#627691",
  textAlign: "center",
}));
