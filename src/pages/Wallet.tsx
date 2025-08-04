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
import { getUserWalletData } from "../api/functions";
import { formatEarningWithCommas } from "../utils/number";
import { TIER_CONFIG } from "../constants/static-data";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

interface DetailsType {
  description: string | React.ReactNode;
  amount: number;
  date: string;
}

// Helper functions for tier calculations
const getCurrentTierInfo = (totalCashback: number) => {
  const tiers = Object.values(TIER_CONFIG);
  for (const tier of tiers) {
    if (totalCashback >= tier.min && totalCashback <= tier.max) {
      return tier;
    }
  }
  return TIER_CONFIG.BRONZE; // fallback
};

const getNextTierInfo = (currentTier: any) => {
  const tierOrder = ["BRONZE", "SILVER", "GOLD", "PLATINUM"];
  const currentIndex = tierOrder.findIndex(
    (tier) =>
      TIER_CONFIG[tier as keyof typeof TIER_CONFIG].name === currentTier.name
  );

  if (currentIndex < tierOrder.length - 1) {
    const nextTierKey = tierOrder[currentIndex + 1];
    return TIER_CONFIG[nextTierKey as keyof typeof TIER_CONFIG];
  }
  return null; // Already at highest tier
};

const getTierIcon = (tierName: string) => {
  switch (tierName) {
    case "Bronze":
      return BronzeIcon;
    case "Silver":
      return SilverIcon;
    case "Gold":
      return GoldIcon;
    case "Platinum":
      return PlatinumIcon;
    default:
      return BronzeIcon;
  }
};

const Wallet = () => {
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.session);

  const [transactions, setTransactions] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isWalletRefreshing, setIsWalletRefreshing] = useState(false);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const { balance, history, totalCashback } = useSelector(
    (state: RootState) => state.wallet
  );

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
      getTransactions();
    }
  }, [user]);

  const fetchWalletBalance = async () => {
    if (!user || !user.betsaveId) {
      return;
    }

    try {
      const walletData = await getUserWalletData(user.betsaveId);
      dispatch(updateWalletBalance(walletData.balance));
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      notifyError("Error fetching wallet balance");
      dispatch(setError("Error fetching wallet balance"));
    }
  };

  const totalDetails: DetailsType[] = [];

  history.cashbackDetails.map((detail) => {
    const _detail = {
      description: (
        <OfferCell>
          <OfferImage src={detail.offerImage} alt={detail.offerTitle} />
          <OfferName>{detail.offerTitle}</OfferName>
        </OfferCell>
      ),
      amount: detail.lossAmount,
      date: detail.dateTime,
    };
    totalDetails.push(_detail);
  });

  history.cpaDetails.map((detail) => {
    const _detail = {
      description: (
        <OfferCell>
          <OfferImage src={detail.offerImage} alt={detail.offerTitle} />
          <OfferName>{detail.offerTitle}</OfferName>
        </OfferCell>
      ),
      amount: detail.lossAmount,
      date: detail.dateTime,
    };

    totalDetails.push(_detail);
  });

  history.referralDetails.map((detail) => {
    const _detail = {
      description: `Referral Reward for referring ${detail.referralName} to Betsave`,
      amount: detail.referralAmount,
      date: detail.dateTime,
    };
    totalDetails.push(_detail);
  });

  const totalPages: number = Math.ceil(totalDetails.length / rowsPerPage);

  const handlePageClick = (newPage: number) => {
    setPage(newPage);
  };

  const renderPagination = () => {
    const pagination: React.ReactElement[] = [];

    if (totalPages === 0) return pagination;

    pagination.push(
      <PaginationButton
        key={1}
        className={page === 1 ? "active" : ""}
        onClick={() => handlePageClick(1)}
      >
        1
      </PaginationButton>
    );

    if (page > 3) {
      pagination.push(
        <PaginationButton
          key="more-left"
          onClick={() => handlePageClick(page - 2)}
        >
          ...
        </PaginationButton>
      );
    }

    const startPage = Math.max(2, page - 1);
    const endPage = Math.min(totalPages - 1, page + 1);

    for (let i = startPage; i <= endPage; i++) {
      pagination.push(
        <PaginationButton
          key={i}
          className={page === i ? "active" : ""}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </PaginationButton>
      );
    }

    if (page < totalPages - 2) {
      pagination.push(
        <PaginationButton
          key="more-right"
          onClick={() => handlePageClick(page + 2)}
        >
          ...
        </PaginationButton>
      );
    }

    if (totalPages > 1) {
      pagination.push(
        <PaginationButton
          key={totalPages}
          className={page === totalPages ? "active" : ""}
          onClick={() => handlePageClick(totalPages)}
        >
          {totalPages}
        </PaginationButton>
      );
    }

    return pagination;
  };

  return (
    <PageContainer>
      <Header>
        <Title>My Wallet</Title>
      </Header>

      <PageWrapper>
        <StatsContainer>
          <StatCard>
            <StatCardValue>
              <StatTitle>Total Balance </StatTitle>
              <StatAction>
                <StatValue>
                  ${formatEarningWithCommas(balance)}
                  {isWalletRefreshing && (
                    <WalletRefreshIndicator>🔄</WalletRefreshIndicator>
                  )}
                </StatValue>
              </StatAction>
            </StatCardValue>

            <WalletStatsContainer>
              <StatItem>
                <StatIconContainer>
                  <StatIcon>💰</StatIcon>
                </StatIconContainer>
                <StatContent>
                  <StatLabelContainer>
                    <StatLabel>Cashback Rate</StatLabel>
                    <StatValueText>
                      {user?.cashbackRate}% →{" "}
                      {(() => {
                        const currentTier = getCurrentTierInfo(
                          totalCashback || 0
                        );
                        const nextTier = getNextTierInfo(currentTier);
                        return nextTier
                          ? `${nextTier.cashbackRate}%`
                          : `${currentTier.cashbackRate}%`;
                      })()}
                    </StatValueText>
                  </StatLabelContainer>
                  <StatDescription>Current → Next tier rate</StatDescription>
                </StatContent>
              </StatItem>

              <StatItem>
                <TierIconContainer>
                  <TierIcon
                    src={getTierIcon(user?.tier)}
                    alt={`${user?.tier} tier icon`}
                  />
                </TierIconContainer>
                <StatContent>
                  <StatLabelContainer>
                    <StatLabel>Your Tier</StatLabel>
                    <TierDisplay tier={user?.tier}>
                      <TierName>{user?.tier}</TierName>
                    </TierDisplay>
                  </StatLabelContainer>
                  <TierProgress>
                    <TierProgressBar
                      tier={user?.tier}
                      progress={(() => {
                        const currentTier = getCurrentTierInfo(
                          totalCashback || 0
                        );
                        const progress =
                          (((totalCashback || 0) - currentTier.min) /
                            (currentTier.max - currentTier.min)) *
                          100;
                        return Math.min(Math.max(progress, 0), 100);
                      })()}
                    />
                  </TierProgress>
                  <StatDescription>
                    {(() => {
                      const currentTier = getCurrentTierInfo(
                        totalCashback || 0
                      );
                      console.log({ totalCashback });
                      const nextTier = getNextTierInfo(currentTier);
                      if (nextTier) {
                        const cashbackNeeded =
                          Math.round(
                            (currentTier.max - (totalCashback || 0)) * 100
                          ) / 100;
                        return `Need $${cashbackNeeded.toFixed(2)} more for ${nextTier.name} tier`;
                      }
                      return "You've reached the top tier!";
                    })()}
                  </StatDescription>
                </StatContent>
              </StatItem>

              <StatItem>
                <TierIconContainer>
                  <TierIcon
                    src={(() => {
                      const currentTier = getCurrentTierInfo(
                        totalCashback || 0
                      );
                      const nextTier = getNextTierInfo(currentTier);
                      return nextTier
                        ? getTierIcon(nextTier.name)
                        : getTierIcon(user?.tier);
                    })()}
                    alt="Next tier icon"
                  />
                </TierIconContainer>
                <StatContent>
                  <StatLabelContainer>
                    <StatLabel>Next Tier</StatLabel>
                    <TierDisplay tier={user?.tier}>
                      <TierName>
                        {(() => {
                          const currentTier = getCurrentTierInfo(
                            totalCashback || 0
                          );
                          const nextTier = getNextTierInfo(currentTier);
                          return nextTier ? nextTier.name : "Max Level";
                        })()}
                      </TierName>
                    </TierDisplay>
                  </StatLabelContainer>
                  <StatDescription>
                    {(() => {
                      const currentTier = getCurrentTierInfo(
                        totalCashback || 0
                      );
                      const nextTier = getNextTierInfo(currentTier);
                      if (nextTier) {
                        return `${nextTier.cashbackRate}% cashback rate`;
                      }
                      return "Maximum tier achieved";
                    })()}
                  </StatDescription>
                </StatContent>
              </StatItem>
            </WalletStatsContainer>
            <ActionContainer>
              <WithdrawButton
                onClick={handleWithdrawClick}
                disabled={balance <= 0 || pendingAmount !== 0}
              >
                {pendingAmount !== 0 ? "Withdrawing" : "Withdraw Now"}
              </WithdrawButton>
              <ExportButton>Export</ExportButton>
            </ActionContainer>
          </StatCard>
        </StatsContainer>

        <WithdrawDialog
          open={withdrawDialogOpen}
          onClose={handleCloseWithdrawDialog}
          cashback={balance}
        />

        <TableWrapper>
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
                  <TableCell sx={{ textWrap: "nowrap" }}>
                    Cashback From
                  </TableCell>
                  <TableCell align="left" sx={{ textWrap: "nowrap" }}>
                    Amount
                  </TableCell>
                  <TableCell align="left" sx={{ textWrap: "nowrap" }}>
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {totalDetails.length > 0 &&
                  totalDetails
                    .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                    .map((item: any, index: any) => (
                      <TableRow key={index}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell align="left">
                          ${item.amount.toFixed(2)}
                        </TableCell>

                        <TableCell align="left">
                          {(() => {
                            const date = new Date(item.date);
                            const year = date.getFullYear();
                            const month = (date.getMonth() + 1)
                              .toString()
                              .padStart(2, "0");
                            const day = date
                              .getDate()
                              .toString()
                              .padStart(2, "0");
                            return `${year}/${month}/${day}`;
                          })()}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          {totalDetails.length > 0 && (
            <PaginationContainer>
              <PaginationButton
                key="prev"
                onClick={() => handlePageClick(page - 1)}
                disabled={page === 1}
              >
                <KeyboardArrowLeft fontSize="small" />
              </PaginationButton>
              <PaginationWrapper>{renderPagination()}</PaginationWrapper>
              <PaginationButton
                key="next"
                onClick={() => handlePageClick(page + 1)}
                disabled={page === totalPages}
              >
                <KeyboardArrowRight fontSize="small" />
              </PaginationButton>
            </PaginationContainer>
          )}
        </TableWrapper>
      </PageWrapper>
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

const PageWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "24px",
  width: "100%",
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
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: "24px",
  backgroundColor: "#0f1629",
  backgroundImage: "none",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "480px",
  height: "fit-content",
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
  alignItems: "center",
  width: "100%",
  gap: "8px",
  [theme.breakpoints.down(340)]: {
    alignItems: "flex-start",
  },
}));

const StatDivider = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "1px",
  backgroundColor: "#2E3340",
  margin: "16px 0",
}));

const StatTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#8A8D98",
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
  justifyContent: "center",
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
  background: "linear-gradient(135deg, #1AE5A1 0%, #00D4AA 100%)",
  color: "#141C30",
  padding: "12px 24px",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: "700",
  textTransform: "none",
  width: "100%",
  boxShadow: "0 4px 15px rgba(26, 229, 161, 0.4)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
    transition: "left 0.5s ease",
  },
  "&:hover": {
    background: "linear-gradient(135deg, #15cc8f 0%, #00b894 100%)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(26, 229, 161, 0.6)",
    "&::before": {
      left: "100%",
    },
  },
  "&:active": {
    transform: "translateY(0px)",
    boxShadow: "0 4px 15px rgba(26, 229, 161, 0.4)",
  },
  "&.Mui-disabled": {
    background: "linear-gradient(135deg, #172236 0%, #1a2338 100%)",
    color: "#8A8D98",
    opacity: 1,
    boxShadow: "none",
    transform: "none",
  },
  [theme.breakpoints.down(640)]: {
    padding: "10px 20px",
    fontSize: "14px",
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#0f1629",
  backgroundImage: "none",
  borderRadius: "12px",
  overflow: "hidden",
  position: "relative", // Add this for overlay positioning
  width: "100%",
  height: "fit-content",
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
  width: "40px",
  height: "40px",
  objectFit: "contain",
  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
  },
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

const WalletStatsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
  padding: "16px 0",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "12px",
  },
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flex: 1,
  padding: "12px",
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "all 0.3s ease",
  width: "100%",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.08)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
  },
}));

const StatIconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "48px",
  height: "48px",
  borderRadius: "12px",
  flexShrink: 0,
  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    filter: "drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))",
  },
}));

const TierIconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "48px",
  height: "48px",
  borderRadius: "12px",
  flexShrink: 0,
  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    filter: "drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))",
  },
}));

const StatIcon = styled("span")({
  fontSize: "36px",
  objectFit: "contain",
  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
  },
});

const StatContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  flex: 1,
}));

const StatLabelContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: "#8A8D98",
  fontWeight: "500",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
}));

const StatValueText = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  color: "#fff",
  fontWeight: "700",
  lineHeight: "1.2",
}));

const StatDescription = styled(Typography)(({ theme }) => ({
  fontSize: "11px",
  color: "rgba(255, 255, 255, 0.7)",
  fontWeight: "400",
  lineHeight: "1.3",
}));

const VerticalDivider = styled(Box)(({ theme }) => ({
  width: "1px",
  height: "60px",
  background:
    "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "1px",
  },
}));

const TierDisplay = styled(Box)<{ tier: string }>(({ theme, tier }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
}));

const TierName = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: "#fff",
  fontWeight: "700",
  lineHeight: "1.2",
}));

const TierProgress = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "4px",
  borderRadius: "2px",
  background: "rgba(255, 255, 255, 0.1)",
  overflow: "hidden",
}));

const TierProgressBar = styled(Box)<{ tier: string; progress?: number }>(
  ({ theme, tier, progress }) => ({
    height: "100%",
    borderRadius: "2px",
    background: "linear-gradient(90deg, #1AE5A1 0%, #00D4AA 100%)",
    width:
      progress !== undefined
        ? `${progress}%`
        : tier === "Bronze"
          ? "25%"
          : tier === "Silver"
            ? "50%"
            : tier === "Gold"
              ? "75%"
              : "100%",
    transition: "width 0.8s ease",
    boxShadow: "0 0 8px rgba(26, 229, 161, 0.5)",
  })
);

const ActionContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  width: "100%",
  justifyContent: "center",
}));

const ExportButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: "700",
  textTransform: "none",
  width: "100%",
  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
    transition: "left 0.5s ease",
  },
  "&:hover": {
    background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)",
    "&::before": {
      left: "100%",
    },
  },
  "&:active": {
    transform: "translateY(0px)",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
  },
  [theme.breakpoints.down(640)]: {
    padding: "10px 20px",
    fontSize: "14px",
  },
}));

const PaginationContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  marginTop: "20px",
});

const PaginationWrapper = styled(Box)(({ theme }) => ({
  borderRadius: "5px",
  backgroundColor: "#0f1629",
  display: "flex",
  alignItems: "center",
}));

const PaginationButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#0f1629",
  color: "#627691",
  border: "none",
  borderRadius: "5px",
  minWidth: "36px",
  width: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "bold",
  "&.active": {
    backgroundColor: "#1ae5a1",
    color: "#fff",
  },
  "&:disabled": {
    opacity: "0.4",
  },

  [theme.breakpoints.down(520)]: {
    width: "32px",
    height: "32px",
    minWidth: "32px",
  },
}));

const TableWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
  alignItems: "center",
}));
