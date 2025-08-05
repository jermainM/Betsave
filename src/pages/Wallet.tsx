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
import { TransactionType } from "../constants/interfaces";
import { formatDateTime } from "../utils/date";

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

  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isWalletRefreshing, setIsWalletRefreshing] = useState(false);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [transactionPage, setTransactionPage] = useState<number>(1);
  const [transactionRowsPerPage, setTransactionRowsPerPage] = useState(5);
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

  const handleTransactionPageClick = (newPage: number) => {
    setTransactionPage(newPage);
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

  const renderTransactionPagination = () => {
    const totalTransactionPages: number = Math.ceil(
      transactions.length / transactionRowsPerPage
    );
    const pagination: React.ReactElement[] = [];

    if (totalTransactionPages === 0) return pagination;

    pagination.push(
      <PaginationButton
        key={1}
        className={transactionPage === 1 ? "active" : ""}
        onClick={() => handleTransactionPageClick(1)}
      >
        1
      </PaginationButton>
    );

    if (transactionPage > 3) {
      pagination.push(
        <PaginationButton
          key="more-left"
          onClick={() => handleTransactionPageClick(transactionPage - 2)}
        >
          ...
        </PaginationButton>
      );
    }

    const startPage = Math.max(2, transactionPage - 1);
    const endPage = Math.min(totalTransactionPages - 1, transactionPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pagination.push(
        <PaginationButton
          key={i}
          className={transactionPage === i ? "active" : ""}
          onClick={() => handleTransactionPageClick(i)}
        >
          {i}
        </PaginationButton>
      );
    }

    if (transactionPage < totalTransactionPages - 2) {
      pagination.push(
        <PaginationButton
          key="more-right"
          onClick={() => handleTransactionPageClick(transactionPage + 2)}
        >
          ...
        </PaginationButton>
      );
    }

    if (totalTransactionPages > 1) {
      pagination.push(
        <PaginationButton
          key={totalTransactionPages}
          className={transactionPage === totalTransactionPages ? "active" : ""}
          onClick={() => handleTransactionPageClick(totalTransactionPages)}
        >
          {totalTransactionPages}
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
          <TransactionTableContainer>
            {isRefreshing && (
              <RefreshOverlay>
                <RefreshSpinner />
                <RefreshText>Refreshing withdrawal status...</RefreshText>
              </RefreshOverlay>
            )}
            <TransactionTable>
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ textWrap: "nowrap" }}>
                    Cashback From
                  </StyledTableCell>
                  <StyledTableCell align="left" sx={{ textWrap: "nowrap" }}>
                    Amount
                  </StyledTableCell>
                  <StyledTableCell align="left" sx={{ textWrap: "nowrap" }}>
                    Date
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {totalDetails.length > 0 &&
                  totalDetails
                    .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                    .map((item: any, index: any) => (
                      <TableRow key={index}>
                        <StyledTableCell>{item.description}</StyledTableCell>
                        <StyledTableCell align="left">
                          ${item.amount.toFixed(2)}
                        </StyledTableCell>

                        <StyledTableCell align="left">
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
                        </StyledTableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </TransactionTable>
          </TransactionTableContainer>
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

      <TransactionSection>
        <Header>
          <Title>Transactions</Title>
        </Header>
        <TransactionContainer>
          <TransactionTableContainer>
            <TransactionTable>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>Tier</StyledTableCell>
                  <StyledTableCell>Cashback Rate</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions
                    .slice(
                      (transactionPage - 1) * transactionRowsPerPage,
                      transactionPage * transactionRowsPerPage
                    )
                    .map((transaction, index) => (
                      <TableRow key={index}>
                        <StyledTableCell>
                          {formatDateTime(transaction.requestedDate)}
                        </StyledTableCell>
                        <StyledTableCell>
                          {transaction.paymentAddress || "N/A"}
                        </StyledTableCell>
                        <StyledTableCell>
                          <TierBadge tier={transaction.tier || user?.tier}>
                            {transaction.tier || user?.tier}
                          </TierBadge>
                        </StyledTableCell>
                        <StyledTableCell>
                          {transaction.cashbackRate || user?.cashbackRate}%
                        </StyledTableCell>
                        <StyledTableCell>
                          $
                          {transaction.totalRequestedAmount?.toFixed(2) ||
                            "0.00"}
                        </StyledTableCell>
                        <StyledTableCell>
                          <StatusBadge status={transaction.status}>
                            {transaction.status}
                          </StatusBadge>
                        </StyledTableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <StyledTableCell colSpan={7} align="center">
                      <EmptyTransactionState>
                        <EmptyTransactionIcon>📊</EmptyTransactionIcon>
                        <EmptyTransactionText>
                          No transactions yet
                        </EmptyTransactionText>
                        <EmptyTransactionSubtext>
                          Your transaction history will appear here
                        </EmptyTransactionSubtext>
                      </EmptyTransactionState>
                    </StyledTableCell>
                  </TableRow>
                )}
              </TableBody>
            </TransactionTable>
          </TransactionTableContainer>
          {transactions.length > 0 && (
            <PaginationContainer>
              <PaginationButton
                key="prev"
                onClick={() => handleTransactionPageClick(transactionPage - 1)}
                disabled={transactionPage === 1}
              >
                <KeyboardArrowLeft fontSize="small" />
              </PaginationButton>
              <PaginationWrapper>
                {renderTransactionPagination()}
              </PaginationWrapper>
              <PaginationButton
                key="next"
                onClick={() => handleTransactionPageClick(transactionPage + 1)}
                disabled={
                  transactionPage ===
                  Math.ceil(transactions.length / transactionRowsPerPage)
                }
              >
                <KeyboardArrowRight fontSize="small" />
              </PaginationButton>
            </PaginationContainer>
          )}
        </TransactionContainer>
      </TransactionSection>
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
  [theme.breakpoints.down(480)]: {
    padding: "0px",
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
  [theme.breakpoints.down(1370)]: {
    flexDirection: "column",
    alignItems: "center",
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
  [theme.breakpoints.down(480)]: {
    width: "100%",
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: "24px",
  backgroundColor: "#0f1629",
  backgroundImage: "none",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "420px",
  height: "fit-content",
  justifyContent: "space-between",
  [theme.breakpoints.down(480)]: {
    padding: "16px",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "8px 12px",
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
  width: "36px",
  height: "36px",
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
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  padding: "4px 8px",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: "600",
  color: "#fff",
  backgroundColor:
    tier === "Bronze"
      ? "#CD7F32"
      : tier === "Silver"
        ? "#C0C0C0"
        : tier === "Gold"
          ? "#FFD700"
          : tier === "Platinum"
            ? "#E5E4E2"
            : "#8A8D98",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  },
}));

const TierIcon = styled("img")(({ theme }) => ({
  width: "36px",
  height: "36px",
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
  textTransform: "capitalize",
  backgroundColor:
    status === "paid"
      ? "#1AE5A1"
      : status === "pending"
        ? "#FFA500"
        : status === "not-paid"
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
  padding: "5px 8px",
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
  width: "40px",
  height: "40px",
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
  width: "36px",
  height: "36px",
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
  fontSize: "28px",
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
  fontSize: "16px",
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

const TierDisplay = styled(Box)<{ tier: string }>(({ theme, tier }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
}));

const TierName = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
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

const TransactionSection = styled(Box)(({ theme }) => ({
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const TransactionContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const TransactionTableContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  overflowX: "auto",
  borderRadius: "12px",
  backgroundColor: "#0f1629",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
  [theme.breakpoints.down(480)]: {
    borderRadius: "8px",
  },
}));

const TransactionTable = styled(Table)(({ theme }) => ({
  width: "100%",
  borderCollapse: "collapse",
  "& th": {
    fontSize: "14px",
    color: "#8A8D98",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    padding: "12px 16px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    textAlign: "left",
    [theme.breakpoints.down(480)]: {
      padding: "8px 12px",
    },
  },
  "& td": {
    fontSize: "14px",
    color: "#fff",
    padding: "12px 16px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    [theme.breakpoints.down(480)]: {
      padding: "8px 12px",
    },
  },
  "& tr:last-child td": {
    borderBottom: "none",
  },
}));

const EmptyTransactionState = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "40px 20px",
  color: "#8A8D98",
  fontSize: "18px",
  fontWeight: "500",
  textAlign: "center",
  [theme.breakpoints.down(480)]: {
    padding: "30px 15px",
    fontSize: "16px",
  },
}));

const EmptyTransactionIcon = styled("span")({
  fontSize: "48px",
  marginBottom: "15px",
  color: "#8A8D98",
});

const EmptyTransactionText = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: "700",
  color: "#fff",
  marginBottom: "10px",
  [theme.breakpoints.down(480)]: {
    fontSize: "20px",
  },
}));

const EmptyTransactionSubtext = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "rgba(255, 255, 255, 0.7)",
  lineHeight: "1.5",
}));
