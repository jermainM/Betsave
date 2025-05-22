import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";

import { HiArrowRight } from "react-icons/hi";
import { BetsaveTooltip } from "../tooltip";
import { NoDataCard } from "../card/NoDataCard";
import { transactionService } from "../../api/services/transactionService";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { formatEarningWithCommas } from "../../utils/number";

interface HistoryItem {
  offerId: string;
  offerImage: string;
  offerTitle: string;
  lossAmount: number;
  dateTime: string;
  withdrawable: boolean;
}

interface Row {
  betsaveId: string;
  userName: string;
  userEmail: string;
  totalRequestedAmount: number;
  tier: string;
  cashbackRate: number;
  status: string;
  requestedDate: string;
  claimDate: string;
  paymentMethod: string;
  paymentAddress: string;
  history: HistoryItem[];
}

export const CashbackHistoryTable = () => {
  const [isOpen, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [page, setPage] = useState<number>(1);
  const { user } = useSelector((state: RootState) => state.session);
  const [rows, setRows] = useState<Row[]>([]);

  const handleMenuToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (value: number) => {
    setRowsPerPage(value);
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(isOpen);
  useEffect(() => {
    if (prevOpen.current === true && isOpen === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await transactionService.getTransactionByBetsaveId(
          user.betsaveId
        );

        setRows(response.data ?? []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactions();
  }, []);

  // Table related

  const totalPages: number = Math.ceil(rows.length / rowsPerPage);

  const handlePageClick = (newPage: number) => {
    setPage(newPage);
  };

  const renderPagination = () => {
    const pagination = [];

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

    pagination.push(
      <PaginationButton
        key={totalPages}
        className={page === totalPages ? "active" : ""}
        onClick={() => handlePageClick(totalPages)}
      >
        {totalPages}
      </PaginationButton>
    );

    return pagination;
  };

  return (
    <Container>
      <TransactionTableHeader>
        <HistoryTitleContainer>
          <HistoryTitle>Cashback History</HistoryTitle>
          <HistorySubTitle>
            Here's a record of your tracked losses, the cashback earned, and
            your current rate per platform. Cashback is calculated based on
            BETSAVE's affiliate earnings with each operator.
          </HistorySubTitle>
        </HistoryTitleContainer>
        <TransactionAction>
          <OptionButton
            ref={anchorRef}
            id="composition-button"
            aria-controls={isOpen ? "composition-menu" : undefined}
            aria-expanded={isOpen ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleMenuToggle}
            endIcon={<KeyboardArrowDown />}
          >
            {rowsPerPage}
          </OptionButton>
          <Popper
            open={isOpen}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <StyledPaper>
                  <ClickAwayListener onClickAway={() => setOpen(false)}>
                    <MenuList
                      autoFocusItem={isOpen}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={() => handleClose(5)}>5</MenuItem>
                      <MenuItem onClick={() => handleClose(10)}>10</MenuItem>
                      <MenuItem onClick={() => handleClose(25)}>25</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </StyledPaper>
              </Grow>
            )}
          </Popper>
        </TransactionAction>
      </TransactionTableHeader>
      {rows.length > 0 ? (
        <TableContainer>
          <CustomTable>
            <TableHead>
              <TableRow>
                <StyledTableCell>Platform</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>
                  <BetsaveTooltip title="This is the amount you lost on this partner platform that we tracked.">
                    <CustomTableCell>
                      Tracked Loss <HiArrowRight />
                    </CustomTableCell>
                  </BetsaveTooltip>
                </StyledTableCell>
                <StyledTableCell>
                  <BetsaveTooltip title="This is your share of our affiliate commission.">
                    <CustomTableCell>
                      Cashback Earned <HiArrowRight />
                    </CustomTableCell>
                  </BetsaveTooltip>
                </StyledTableCell>
                <StyledTableCell align="left">Cashback Rate</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((row, idx) =>
                  row.history.map((item, historyIdx) => (
                    <StyledTableRow key={`${idx}-${historyIdx}`}>
                      <StyledTableCell width={100}>
                        <OfferCell>
                          <OfferImage
                            src={item.offerImage}
                            alt={item.offerTitle}
                          />
                          <OfferName>{item.offerTitle}</OfferName>
                        </OfferCell>
                      </StyledTableCell>
                      <StyledTableCell>{row.claimDate}</StyledTableCell>
                      <StyledTableCell>
                        ${formatEarningWithCommas(item.lossAmount)}
                      </StyledTableCell>
                      <StyledTableCell>
                        $
                        {formatEarningWithCommas(
                          (item.lossAmount * row.cashbackRate) / 100
                        )}
                      </StyledTableCell>
                      <StyledTableCell>
                        <PlusText>{row.cashbackRate}</PlusText>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                )}
            </TableBody>
          </CustomTable>
        </TableContainer>
      ) : (
        <NoDataCard
          title="No data"
          subtitle="You have not made any cashback requests yet."
        />
      )}
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
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

const TransactionAction = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const TransactionTableHeader = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const OptionButton = styled(Button)(({ theme }) => ({
  padding: "6px 12px",
  fontSize: "12px",
  color: "#fff",
  borderRadius: "7px",
  backgroundColor: "#0f1629",
  minWidth: "0px",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: "10px",
  width: "60px",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: "#627691",
  fontSize: "12px",
  border: "none",
  padding: "8px",
  borderBottom: "inherit",
  [theme.breakpoints.down(520)]: {},
}));

const StyledTableRow = styled(TableRow)({
  backgroundColor: "#0f1629",
  "td:first-of-type": {
    borderTopLeftRadius: "7px",
    borderBottomLeftRadius: "7px",
  },
  "td:last-of-type": {
    borderTopRightRadius: "7px",
    borderBottomRightRadius: "7px",
  },
});

const PaginationContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
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

const TableContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  overflowX: "auto",
}));

const CustomTable = styled(Table)(({ theme }) => ({
  minWidth: "420px",
  borderCollapse: "separate", // Enables gaps between rows
  borderSpacing: "0 10px",
}));

interface IDItemProps {
  label: string;
}

const IDItem = (props: IDItemProps) => {
  const { label } = props;
  return <IDItemContainer>{label}</IDItemContainer>;
};

const IDItemContainer = styled(Box)(({ theme }) => ({
  fontSize: "12px",
  backgroundColor: "#171e31",
  padding: "4px 6px",
  borderRadius: "5px",
}));

const MinusText = styled(Box)(({ theme }) => ({
  backgroundColor: "#271C2D",
  color: "#ff5a65",
  padding: "4px 8px",
  fontSize: "12px",
  borderRadius: "5px",
  width: "fit-content",
}));

const PlusText = styled(Box)(({ theme }) => ({
  padding: "4px 8px",
  fontSize: "12px",
  color: "#1ae5a1",
  width: "fit-content",
  borderRadius: "5px",
  backgroundColor: "#102A33",
}));

const HistoryTitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
}));

const HistoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: "#fff",
  fontWeight: "normal",
}));

const HistorySubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#627691",
}));

const CustomTableCell = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  cursor: "pointer",
  width: "fit-content",
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
