import React, { useEffect, useRef, useState } from 'react';
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
} from '@mui/material';
import { LuBadgeDollarSign } from 'react-icons/lu';
import {
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';
import VectorIcon from '../../assets/vector.png';
import TempUserIcon from '../../assets/user.png';

interface Row {
  id: string;
  date: string;
  deposit: string;
  payout: string;
  commission: string;
}

export const CashbackHistoryTable = () => {
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
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
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
    id: '#642847966',
    date: '28/01/2025',
    deposit: '$2,893.00',
    payout: '$2,893.00',
    commission: '+4.70%',
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
        className={page === 1 ? 'active' : ''}
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
          className={page === i ? 'active' : ''}
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
        className={page === totalPages ? 'active' : ''}
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
          <HistorySubTitle>All your transaction</HistorySubTitle>
        </HistoryTitleContainer>
        <TransactionAction>
          <OptionButton
            ref={anchorRef}
            id="composition-button"
            aria-controls={isOpen ? 'composition-menu' : undefined}
            aria-expanded={isOpen ? 'true' : undefined}
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
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
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
      <TableContainer>
        <CustomTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>PlayerID</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Deposit</StyledTableCell>
              <StyledTableCell>Payout</StyledTableCell>
              <StyledTableCell align="left">Commission</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((row, idx) => (
                <StyledTableRow key={idx}>
                  <StyledTableCell width={100}>
                    <IDItem label={row.id} />
                  </StyledTableCell>
                  <StyledTableCell>{row.date}</StyledTableCell>
                  <StyledTableCell>
                    <MinusText>{row.deposit}</MinusText>
                  </StyledTableCell>
                  <StyledTableCell>
                    <PlusText>{row.payout}</PlusText>
                  </StyledTableCell>
                  <StyledTableCell>
                    <PlusText>{row.commission}</PlusText>
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
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}));

const TransactionAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const TransactionTableHeader = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const OptionButton = styled(Button)(({ theme }) => ({
  padding: '6px 12px',
  fontSize: '12px',
  color: '#fff',
  borderRadius: '7px',
  backgroundColor: '#0f1629',
  minWidth: '0px',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: '10px',
  width: '60px',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: '#627691',
  fontSize: '12px',
  border: 'none',
  padding: '8px',
  borderBottom: 'inherit',
  [theme.breakpoints.down(520)]: {},
}));

const StyledTableRow = styled(TableRow)({
  backgroundColor: '#0f1629',
  'td:first-of-type': {
    borderTopLeftRadius: '7px',
    borderBottomLeftRadius: '7px',
  },
  'td:last-of-type': {
    borderTopRightRadius: '7px',
    borderBottomRightRadius: '7px',
  },
});

const PaginationContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
});

const PaginationWrapper = styled(Box)(({ theme }) => ({
  borderRadius: '5px',
  backgroundColor: '#0f1629',
  display: 'flex',
  alignItems: 'center',
}));

const PaginationButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0f1629',
  color: '#627691',
  border: 'none',
  borderRadius: '5px',
  minWidth: '36px',
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 'bold',
  '&.active': {
    backgroundColor: '#1ae5a1',
    color: '#fff',
  },
  '&:disabled': {
    opacity: '0.4',
  },

  [theme.breakpoints.down(520)]: {
    width: '32px',
    height: '32px',
    minWidth: '32px',
  },
}));

const TableContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  overflowX: 'auto',
}));

const CustomTable = styled(Table)(({ theme }) => ({
  minWidth: '420px',
  borderCollapse: 'separate', // Enables gaps between rows
  borderSpacing: '0 10px',
}));

interface IDItemProps {
  label: string;
}

const IDItem = (props: IDItemProps) => {
  const { label } = props;
  return <IDItemContainer>{label}</IDItemContainer>;
};

const IDItemContainer = styled(Box)(({ theme }) => ({
  fontSize: '12px',
  backgroundColor: '#171e31',
  padding: '4px 6px',
  borderRadius: '5px',
}));

const MinusText = styled(Box)(({ theme }) => ({
  backgroundColor: '#271C2D',
  color: '#ff5a65',
  padding: '4px 8px',
  fontSize: '12px',
  borderRadius: '5px',
  width: 'fit-content',
}));

const PlusText = styled(Box)(({ theme }) => ({
  padding: '4px 8px',
  fontSize: '12px',
  color: '#1ae5a1',
  width: 'fit-content',
  borderRadius: '5px',
  backgroundColor: '#102A33',
}));

const HistoryTitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
}));

const HistoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: '#fff',
  fontWeight: 'normal',
}));

const HistorySubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: '#627691',
}));
