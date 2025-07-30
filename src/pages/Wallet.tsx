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
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { WithdrawDialog } from "../components/dialog/WithdrawDialog";
import {
  GoldIcon,
  SilverIcon,
  BronzeIcon,
  PlatinumIcon,
} from "../constants/images";
import { useNotification } from "../provider/notification";
import { transactionService } from "../api/services/transactionService";
import { setError, updateWalletBalance } from "../store/slices/walletSlice";
import { getUserBalance } from "../api/functions";

const Wallet = () => {
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.session);

  const [transactions, setTransactions] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isWalletRefreshing, setIsWalletRefreshing] = useState(false);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [referralReward, setReferralReward] = useState(0);
  const dispatch = useDispatch();
  const { balance, history } = useSelector((state: RootState) => state.wallet);

  const { notifyError } = useNotification();

  const handleWithdrawClick = () => {
    setWithdrawDialogOpen(true);
  };

  const handleCloseWithdrawDialog = async () => {
    setWithdrawDialogOpen(false);

    // Refresh transactions after withdrawal dialog closes
    if (user) {
      try {
        setIsWalletRefreshing(true);
        await Promise.all([getTransactions(true), fetchWalletBalance()]);
      } catch (error) {
        console.error("Error refreshing data after withdrawal:", error);
        notifyError("Failed to refresh wallet data after withdrawal");
      } finally {
        setIsWalletRefreshing(false);
      }
    }
  };

  const getWalletData = async () => {
    if (!user || !user.betsaveId) {
      return;
    }

    try {
      const {
        balance: walletBalance,
        referralReward,
        pendingAmount,
      } = await getUserBalance(user);
      dispatch(updateWalletBalance(walletBalance));
      setReferralReward(referralReward);
      setPendingAmount(pendingAmount);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
      notifyError("Error fetching wallet data");
    }
  };

  const getTransactions = async (showLoading = false) => {
    if (showLoading) {
      setIsRefreshing(true);
    }

    try {
      const response = await transactionService.getTransactionByBetsaveId(
        user.betsaveId
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      notifyError("Failed to fetch transaction data");
    } finally {
      if (showLoading) {
        setIsRefreshing(false);
      }
    }
  };

  useEffect(() => {
    if (user) {
      getWalletData();
      getTransactions();
    }
  }, [user]);

  const fetchWalletBalance = async () => {
    if (!user || !user.betsaveId) {
      return;
    }

    try {
      const { balance } = await getUserBalance(user);
      dispatch(updateWalletBalance(balance));
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      notifyError("Error fetching wallet balance");
      dispatch(setError("Error fetching wallet balance"));
    }
  };

  return (
    <PageContainer>
      <Header>
        <Title>My Wallet</Title>
      </Header>

      <StatsContainer>
        <StatCard>
          <StatCardValue>
            <StatTitle>
              Total Cashback{" "}
              {referralReward > 0 && (
                <ReferralRewardBadge>
                  <ReferralRewardIcon>🎁</ReferralRewardIcon>
                  <ReferralRewardLabel>
                    <span>${referralReward}</span> Reward
                  </ReferralRewardLabel>
                </ReferralRewardBadge>
              )}
            </StatTitle>
            <StatAction>
              <StatValue>
                ${balance.toFixed(2)}
                {isWalletRefreshing && (
                  <WalletRefreshIndicator>🔄</WalletRefreshIndicator>
                )}
              </StatValue>
              <WithdrawButton
                onClick={handleWithdrawClick}
                disabled={balance <= 0 || pendingAmount !== 0}
              >
                {pendingAmount !== 0 ? "Withdrawing" : "Withdraw Now"}
              </WithdrawButton>
            </StatAction>
          </StatCardValue>
        </StatCard>
      </StatsContainer>

      <WithdrawDialog
        open={withdrawDialogOpen}
        onClose={handleCloseWithdrawDialog}
        cashback={balance}
      />

      <TableContainer component={StyledPaper}>
        {isRefreshing && (
          <RefreshOverlay>
            <RefreshSpinner />
            <RefreshText>Refreshing withdrawal status...</RefreshText>
          </RefreshOverlay>
        )}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textWrap: "nowrap" }}>Offer</TableCell>
              <TableCell align="left" sx={{ textWrap: "nowrap" }}>
                Brand Name
              </TableCell>
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
                Is paid?
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <OfferCell>
                    <OfferImage src={item.offerImage} alt={item.offerTitle} />
                    <OfferName>{item.offerTitle}</OfferName>
                  </OfferCell>
                </TableCell>
                <TableCell align="left">{item.brandName}</TableCell>
                <TableCell align="left">
                  ${item.lossAmount.toFixed(2)}
                </TableCell>
                <TableCell align="left">
                  <TierBadgeContainer>
                    <TierBadge tier={user?.tier}>
                      <TierIcon
                        src={
                          user?.tier === "Bronze"
                            ? BronzeIcon
                            : user?.tier === "Silver"
                              ? SilverIcon
                              : user?.tier === "Gold"
                                ? GoldIcon
                                : PlatinumIcon
                        }
                        alt={`${user?.tier} tier icon`}
                      />
                      {user?.tier}
                    </TierBadge>
                  </TierBadgeContainer>
                </TableCell>
                <TableCell align="left">{user?.cashbackRate}</TableCell>
                <TableCell align="left">
                  ${((item.lossAmount * user?.cashbackRate) / 100).toFixed(2)}
                </TableCell>
                <TableCell align="left">{item.isPaid ? "Yes" : "No"}</TableCell>
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

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 700,
  color: "#fff",
  [theme.breakpoints.down(840)]: {
    fontSize: "24px",
  },
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  gap: "24px",
  marginBottom: "32px",
  width: "100%",
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: "24px",
  backgroundColor: "#0f1629",
  backgroundImage: "none",
  borderRadius: "12px",
  display: "flex",
  width: "640px",
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
  width: "100%",
  [theme.breakpoints.down(340)]: {
    alignItems: "flex-start",
  },
}));

const StatTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#8A8D98",
  marginBottom: "8px",
  [theme.breakpoints.down(640)]: {
    fontSize: "14px",
  },
  [theme.breakpoints.down(340)]: {
    display: "flex",
    flexDirection: "column",
  },
}));

const StatAction = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  width: "100%",
  justifyContent: "space-between",
  marginTop: "12px",
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 700,
  color: "#1AE5A1",
  [theme.breakpoints.down(640)]: {
    fontSize: "24px",
  },
  span: {
    fontSize: "16px",
    color: "#fff",
    marginLeft: "8px",
    fontWeight: 400,
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
  "&:hover": {
    backgroundColor: "#15cc8f",
  },
  "&.Mui-disabled": {
    backgroundColor: "#172236",
    color: "#8A8D98",
    opacity: 1,
  },
  [theme.breakpoints.down(640)]: {
    padding: "4px 12px",
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#0f1629",
  backgroundImage: "none",
  borderRadius: "12px",
  overflow: "hidden",
  position: "relative", // Add this for overlay positioning
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

const StatusBadge = styled(Box)<{ status: string }>(({ theme, status }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "6px 12px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600",
  color: "#fff",
  backgroundColor:
    status === "approved"
      ? "#1AE5A1"
      : status === "pending"
        ? "#FFA500"
        : status === "paid"
          ? "#4CAF50"
          : status === "rejected"
            ? "#F44336"
            : "#8A8D98",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
}));

const StatusIcon = styled("span")({
  fontSize: "16px",
});

const StatusText = styled("span")({
  fontSize: "12px",
  fontWeight: "500",
});

const RefreshOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(15, 22, 41, 0.9)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10,
  borderRadius: "12px",
}));

const RefreshSpinner = styled(Box)(({ theme }) => ({
  width: "40px",
  height: "40px",
  border: "3px solid rgba(26, 229, 161, 0.3)",
  borderTop: "3px solid #1AE5A1",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
}));

const RefreshText = styled(Typography)(({ theme }) => ({
  color: "#1AE5A1",
  fontSize: "14px",
  fontWeight: "500",
  marginTop: "12px",
}));

const ReferralRewardBadge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  padding: "4px 6px",
  marginLeft: "8px",
  borderRadius: "8px",
  fontSize: "10px",
  fontWeight: 600,
  background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  color: "#fff",
  boxShadow: "0 2px 8px rgba(255, 107, 107, 0.3)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  width: "fit-content",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
    transition: "left 0.5s ease",
  },
  "&:hover": {
    transform: "translateY(-1px) scale(1.01)",
    boxShadow: "0 4px 12px rgba(255, 107, 107, 0.4)",
    "&::before": {
      left: "100%",
    },
  },
  "&:active": {
    transform: "translateY(0px) scale(0.99)",
  },
  "@keyframes pulse": {
    "0%": {
      boxShadow: "0 2px 8px rgba(255, 107, 107, 0.3)",
    },
    "50%": {
      boxShadow: "0 2px 12px rgba(255, 107, 107, 0.5)",
    },
    "100%": {
      boxShadow: "0 2px 8px rgba(255, 107, 107, 0.3)",
    },
  },
  animation: "pulse 2s ease-in-out infinite",
  [theme.breakpoints.down(340)]: {
    marginLeft: "0px",
    marginTop: "4px",
  },
}));

const ReferralRewardIcon = styled("span")({
  fontSize: "12px",
  animation: "bounce 1s ease-in-out infinite",
  "@keyframes bounce": {
    "0%, 20%, 50%, 80%, 100%": {
      transform: "translateY(0)",
    },
    "40%": {
      transform: "translateY(-2px)",
    },
    "60%": {
      transform: "translateY(-1px)",
    },
  },
});

const ReferralRewardText = styled("span")({
  fontSize: "14px",
  fontWeight: "700",
  color: "#fff",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
});

const ReferralRewardLabel = styled("span")({
  fontSize: "10px",
  fontWeight: "500",
  color: "rgba(255, 255, 255, 0.9)",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
  opacity: 0.9,
  span: {
    fontSize: "12px",
    color: "#fff",
    fontWeight: 400,
  },
});

const WalletRefreshIndicator = styled("span")({
  fontSize: "16px",
  marginLeft: "8px",
  color: "#FFA500", // Orange color for refresh indicator
  animation: "spin 1s linear infinite",
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
});
