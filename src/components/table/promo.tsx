import { MdYoutubeSearchedFor } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
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
import { useRef, useState } from "react";
import {
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";

interface Row {
  usedCode: string;
  date: string;
  reward: string;
}

export const PromoCodeTable = () => {
  const [isOpen, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [page, setPage] = useState<number>(1);

  const handleClose = (value: number) => {
    setRowsPerPage(value);
    setOpen(false);
  };

  const handleMenuToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const rows: Row[] = Array.from({ length: 100 }, (_, i) => ({
    usedCode: "WELCOME10",
    date: "28/01/2025",
    reward: "$2,893.00",
  }));

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
    <PromoCodeHistory>
      <HistoryTitle>Promo Code History</HistoryTitle>
      <HistoryAction>
        <HistoryActionWrapper>
          <FilterButtonContainer>
            <FilterButton startIcon={<MdYoutubeSearchedFor />}>
              Filters
            </FilterButton>
          </FilterButtonContainer>
          <SearchInputContainer>
            <SearchIcon>
              <IoSearchOutline />
            </SearchIcon>
            <SearchInput placeholder="Search a code..." />
          </SearchInputContainer>
        </HistoryActionWrapper>
        <TransactionAction>
          <MobileSFilterButtonContainer>
            <FilterButton startIcon={<MdYoutubeSearchedFor />}>
              Filters
            </FilterButton>
          </MobileSFilterButtonContainer>
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
      </HistoryAction>
      <TableContainer>
        <CustomTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>Code Used</StyledTableCell>
              <StyledTableCell>Date Applied</StyledTableCell>
              <StyledTableCell>Reward Earned</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((row, idx) => (
                <StyledTableRow key={"PromoCode-" + idx}>
                  <StyledTableCell width={150}>
                    <IDItem label={row.usedCode} />
                  </StyledTableCell>
                  <StyledTableCell>{row.date}</StyledTableCell>
                  <StyledTableCell>
                    <PlusText>{row.reward}</PlusText>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </CustomTable>
      </TableContainer>
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
    </PromoCodeHistory>
  );
};

const PromoCodeHistory = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  alignItems: "center",
  width: "100%",
  marginTop: "20px",
}));

const HistoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: "#fff",
  fontWeight: "normal",
}));

const HistoryAction = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  [theme.breakpoints.down(1140)]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "20px",
  },

  [theme.breakpoints.down(1096)]: {
    flexDirection: "row",
    alignItems: "center",
    gap: "20px",
  },

  [theme.breakpoints.down(540)]: {
    flexDirection: "column-reverse",
    alignItems: "flex-start",
    gap: "20px",
  },
}));

const HistoryActionWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));

const FilterButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#0f1629",
  borderRadius: "7px",
  padding: "6px 15px",
  fontSize: "14px",
  textTransform: "none",
  svg: {
    color: "#627691",
  },
}));

const SearchInputContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#0f1629",
  borderRadius: "7px",
  padding: "10px 15px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));

const FilterButtonContainer = styled(Box)(({ theme }) => ({
  display: "block",
  [theme.breakpoints.down(540)]: {
    display: "none",
  },
}));

const MobileSFilterButtonContainer = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down(540)]: {
    display: "flex",
  },
}));

const SearchIcon = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#627691",
  display: "flex",
  alignItems: "center",
}));

const SearchInput = styled("input")(({ theme }) => ({
  border: "none",
  outline: "none",
  background: "none",
  color: "#fff",
  "::placeholder": {
    color: "#627691",
  },
}));

const TransactionAction = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
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
  width: "fit-content",
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
