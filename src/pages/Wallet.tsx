import {
  Box,
  Typography,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useState } from "react";
import { BetSaveLogoImg } from "../constants/images";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import WithdrawDialog from "../components/dialog/WithdrawDialog";
import {
  GoldIcon,
  SilverIcon,
  BronzeIcon,
  PlatinumIcon,
} from "../constants/images";

const Wallet = () => {
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const { history, totalCashback, availableCashback } = useSelector(
    (state: RootState) => state.wallet
  );

  const handleWithdrawClick = () => {
    setWithdrawDialogOpen(true);
  };

  const handleCloseWithdrawDialog = () => {
    setWithdrawDialogOpen(false);
  };

  return (
    <PageContainer>
      <Header>
        <Logo src={BetSaveLogoImg} alt="BetSave Logo" />
        <Title>My Wallet</Title>
      </Header>

      <StatsContainer>
        <StatCard>
          <StatCardValue>
            <StatTitle>Total Cashback</StatTitle>
            <StatValue>${totalCashback.toFixed(2)}</StatValue>
          </StatCardValue>
        </StatCard>
        <StatCard>
          <StatCardValue>
            <StatTitle>Available Cashback</StatTitle>
            <StatValue>${availableCashback.toFixed(2)}</StatValue>
          </StatCardValue>
          <WithdrawButton
            onClick={handleWithdrawClick}
            disabled={availableCashback > 20}
          >
            Withdraw Now
          </WithdrawButton>
        </StatCard>
      </StatsContainer>

      <WithdrawDialog
        open={withdrawDialogOpen}
        onClose={handleCloseWithdrawDialog}
        availableCashback={availableCashback}
      />

      <TableContainer component={StyledPaper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textWrap: "nowrap" }}>Offer</TableCell>
              <TableCell align="left" sx={{ textWrap: "nowrap" }}>
                Total Loss
              </TableCell>
              <TableCell align="left" sx={{ textWrap: "nowrap" }}>
                Tier
              </TableCell>
              <TableCell align="left" sx={{ textWrap: "nowrap" }}>
                Cashback Rate
              </TableCell>
              <TableCell align="left" sx={{ textWrap: "nowrap" }}>
                Cashback Amount
              </TableCell>
              <TableCell align="left" sx={{ textWrap: "nowrap" }}>
                Withdrawable
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((item) => (
              <TableRow key={item.offerId}>
                <TableCell>
                  <OfferCell>
                    <OfferImage src={item.image} alt={item.title} />
                    <OfferName>{item.title}</OfferName>
                  </OfferCell>
                </TableCell>
                <TableCell align="left">
                  ${item.totalLosses.toFixed(2)}
                </TableCell>
                <TableCell align="left">
                  <TierBadgeContainer>
                    <TierBadge tier={item.tier}>
                      <TierIcon
                        src={
                          item.tier === "Bronze"
                            ? BronzeIcon
                            : item.tier === "Silver"
                              ? SilverIcon
                              : item.tier === "Gold"
                                ? GoldIcon
                                : PlatinumIcon
                        }
                        alt={`${item.tier} tier icon`}
                      />
                      {item.tier}
                    </TierBadge>
                  </TierBadgeContainer>
                </TableCell>
                <TableCell align="left">{item.cashbackRate}</TableCell>
                <TableCell align="left">${item.cashback.toFixed(2)}</TableCell>
                <TableCell align="left">
                  <WithdrawableBadge withdrawable={item.withdrawable ? 1 : 0}>
                    {item.withdrawable ? "Yes" : "No"}
                  </WithdrawableBadge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
};

export default Wallet;

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
  padding: "24px",
  backgroundColor: "#141C30",
  minHeight: "100vh",
  marginTop: "20px",
  borderRadius: "12px",
  [theme.breakpoints.down(840)]: {
    padding: "16px",
  },
}));

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "32px",
  [theme.breakpoints.down(840)]: {
    marginBottom: "24px",
  },
}));

const Logo = styled("img")(({ theme }) => ({
  width: "120px",
  height: "auto",
  margincenter: "16px",
  [theme.breakpoints.down(840)]: {
    width: "100px",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 700,
  color: "#fff",
  [theme.breakpoints.down(840)]: {
    fontSize: "24px",
  },
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "24px",
  marginBottom: "32px",
  [theme.breakpoints.down(840)]: {
    gridTemplateColumns: "1fr",
    gap: "16px",
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: "24px",
  backgroundColor: "#172236",
  borderRadius: "12px",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  [theme.breakpoints.down(480)]: {
    padding: "16px",
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const StatCardValue = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const StatTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#8A8D98",
  marginBottom: "8px",
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 700,
  color: "#1AE5A1",
  [theme.breakpoints.down(840)]: {
    fontSize: "24px",
  },
}));

const WithdrawButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1AE5A1",
  color: "#141C30",
  padding: "8px 16px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600",
  textTransform: "none",
  marginTop: "12px",
  "&:hover": {
    backgroundColor: "#15cc8f",
  },
  "&.Mui-disabled": {
    backgroundColor: "#172236",
    color: "#8A8D98",
    opacity: 1,
  },
  [theme.breakpoints.down(480)]: {
    width: "100%",
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#172236",
  borderRadius: "12px",
  overflow: "hidden",
}));

const OfferCell = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const OfferImage = styled("img")({
  width: "40px",
  height: "40px",
  borderRadius: "8px",
  objectFit: "cover",
});

const OfferName = styled(Typography)({
  color: "#fff",
  fontWeight: 500,
});

const TierBadgeContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
});

const TierBadge = styled(Box)<{ tier: string }>(({ theme, tier }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "6px 12px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 600,
  background: "rgba(23, 34, 54, 0.5)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  color: "#fff",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  width: "120px",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
  },
}));

const TierIcon = styled("img")(({ theme }) => ({
  width: "32px",
  height: "32px",
  objectFit: "contain",
}));

const WithdrawableBadge = styled(Box)<{ withdrawable: number }>(
  ({ theme, withdrawable }) => ({
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#fff",
    backgroundColor: withdrawable === 1 ? "#1AE5A1" : "#8A8D98",
  })
);
