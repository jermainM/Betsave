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
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { LuBadgeDollarSign } from "react-icons/lu";
import {
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { TempUserIcon, VectorIcon } from "../../constants/images";

interface Row {
  rank: number;
  user: string;
  earnings: string;
  prize: string;
}

export const LeaderBoardTable = () => {
  const [tab, setTab] = useState(500);
  const [isOpen, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [page, setPage] = useState<number>(1);

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

  // Table related

  const rows: Row[] = Array.from({ length: 100 }, (_, i) => ({
    rank: i + 4,
    user: "abirdesigns",
    earnings: "$2,893.00",
    prize: "$2,893.00",
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
      </PaginationButton>,
    );

    if (page > 3) {
      pagination.push(
        <PaginationButton
          key="more-left"
          onClick={() => handlePageClick(page - 2)}
        >
          ...
        </PaginationButton>,
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
        </PaginationButton>,
      );
    }

    if (page < totalPages - 2) {
      pagination.push(
        <PaginationButton
          key="more-right"
          onClick={() => handlePageClick(page + 2)}
        >
          ...
        </PaginationButton>,
      );
    }

    pagination.push(
      <PaginationButton
        key={totalPages}
        className={page === totalPages ? "active" : ""}
        onClick={() => handlePageClick(totalPages)}
      >
        {totalPages}
      </PaginationButton>,
    );

    return pagination;
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log({ newValue });
    setTab(newValue);
  };

  return (
    <Container>
      <LeaderBoardAction>
        <TabbarContainer>
          <StyledTabs value={tab} onChange={handleTabChange}>
            <StyledTab
              icon={<LuBadgeDollarSign />}
              iconPosition="start"
              label="$500"
              {...a11yProps(0)}
              value={500}
            />
            <StyledTab
              icon={<LuBadgeDollarSign />}
              iconPosition="start"
              label="$5,000"
              {...a11yProps(1)}
              value={5000}
            />
          </StyledTabs>
        </TabbarContainer>
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
      </LeaderBoardAction>

      <TableContainer>
        <CustomTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>Rank</StyledTableCell>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell>Earnings</StyledTableCell>
              <StyledTableCell align="left">Prize</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((row) => (
                <StyledTableRow key={row.rank}>
                  <StyledTableCell width={30}>
                    <RankItem label={row.rank} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <UserItem avatar={TempUserIcon} name={row.user} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <EarningText>{row.earnings}</EarningText>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <PrizeText>{row.prize}</PrizeText>
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
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginTop: "100px",
}));

const LeaderBoardAction = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
}));

const TabbarContainer = styled(Box)(({ theme }) => ({
  borderRadius: "7px",
  backgroundColor: "#0f1629",
  display: "flex",
  alignItems: "center",
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
  color: "#fff",
  fontSize: "14px",
  border: "none",
  [theme.breakpoints.down(520)]: {
    padding: "8px",
  },
}));

const StyledTableRow = styled(TableRow)({
  "&:nth-of-type(even)": {
    backgroundColor: "transparent",
  },
  "&:nth-of-type(odd)": {
    backgroundColor: "#0f1629",
  },

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
  minWidth: "45px",
  width: "45px",
  height: "45px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "14px",
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
}));

interface RankItemProps {
  label: number;
}

const RankItem = (props: RankItemProps) => {
  const { label } = props;
  return (
    <RankItemContainer>
      <RankImg src={VectorIcon} alt="rank-img" />
      <RankLabel>{label}</RankLabel>
    </RankItemContainer>
  );
};

const RankItemContainer = styled(Box)(({ theme }) => ({
  width: "25px",
  height: "25px",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const RankImg = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  zIndex: "0",
}));

const RankLabel = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "12px",
  position: "absolute",
  zIndex: "1",
}));

interface UserItemProps {
  avatar: string;
  name: string;
}

const UserItem = (props: UserItemProps) => {
  const { avatar, name } = props;
  return (
    <UserItemContainer>
      <UserImg src={avatar} alt="user-avatar" />
      <UserName>{name}</UserName>
    </UserItemContainer>
  );
};

const UserItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));

const UserImg = styled("img")(({ theme }) => ({
  borderRadius: "50%",
  width: "24px",
  height: "24px",
}));

const UserName = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#fff",
}));

const EarningText = styled(Box)(({ theme }) => ({
  padding: "4px 8px",
  fontSize: "14px",
  color: "#fff",
  width: "fit-content",
  backgroundColor: "#171e31",
  borderRadius: "5px",
}));

const PrizeText = styled(Box)(({ theme }) => ({
  padding: "4px 8px",
  fontSize: "14px",
  color: "#1AE5A1",
  width: "fit-content",
  backgroundColor: "#102A33",
  borderRadius: "5px",
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: "#1AE5A1",
  },
  "& .Mui-selected": {
    background: "linear-gradient(to bottom,#0f1629 40%,#15A373 200%)",
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: "48px",
  svg: {
    width: "18px",
    height: "18px",
  },
}));
