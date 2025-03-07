import { Box, styled } from "@mui/material";
import { CashbackHistoryTable } from "../../components/table/transaction";

export const History = () => {
  return (
    <Container>
      <CashbackHistoryTable />
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));
