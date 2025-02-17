import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { TempUserIcon, VectorIcon } from '../../constants/images';

interface Row {
  rank: number;
  user: string;
  volume: number;
  revenue: number;
  commission: number;
}

export const ReferralTable = () => {
  const rows: Row[] = Array.from({ length: 10 }, (_, i) => ({
    rank: i + 1,
    user: 'abirdesigns',
    volume: 2893,
    revenue: 2893,
    commission: 2893,
  }));

  return (
    <Container>
      <TableContainer>
        <CustomTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>Rank</StyledTableCell>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell>Betting Volume</StyledTableCell>
              <StyledTableCell>Net Gaming Revenue</StyledTableCell>
              <StyledTableCell align="right">Your commission</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.rank}>
                <StyledTableCell width={30}>
                  <RankItem label={row.rank} />
                </StyledTableCell>
                <StyledTableCell>
                  <UserItem avatar={TempUserIcon} name={row.user} />
                </StyledTableCell>
                <StyledTableCell>
                  <EarningText>${row.volume.toLocaleString()}</EarningText>
                </StyledTableCell>
                <StyledTableCell>
                  <EarningText>${row.revenue.toLocaleString()}</EarningText>
                </StyledTableCell>
                <StyledTableCell>
                  <PrizeTextContainer>
                    <PrizeText>${row.commission.toLocaleString()}</PrizeText>
                  </PrizeTextContainer>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </CustomTable>
      </TableContainer>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: '#627691',
  fontSize: '14px',
  border: 'none',
  [theme.breakpoints.down(768)]: {
    padding: '8px',
  },

  [theme.breakpoints.down(640)]: {
    fontSize: '12px',
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: '#0f1629',
  'td:first-of-type': {
    borderTopLeftRadius: '7px',
    borderBottomLeftRadius: '7px',
  },
  'td:last-of-type': {
    borderTopRightRadius: '7px',
    borderBottomRightRadius: '7px',
  },
}));

const TableContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  overflowX: 'auto',
}));

const CustomTable = styled(Table)(({ theme }) => ({
  minWidth: '600px',
  borderCollapse: 'separate', // Enables gaps between rows
  borderSpacing: '0 10px',
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
  width: '25px',
  height: '25px',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const RankImg = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  zIndex: '0',
}));

const RankLabel = styled(Typography)(({ theme }) => ({
  color: '#fff',
  fontSize: '12px',
  position: 'absolute',
  zIndex: '1',
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
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const UserImg = styled('img')(({ theme }) => ({
  borderRadius: '50%',
  width: '24px',
  height: '24px',
}));

const UserName = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#fff',
}));

const EarningText = styled(Box)(({ theme }) => ({
  padding: '4px 8px',
  fontSize: '14px',
  color: '#fff',
  width: 'fit-content',
  backgroundColor: '#171e31',
  borderRadius: '5px',
}));

const PrizeText = styled(Box)(({ theme }) => ({
  padding: '4px 8px',
  fontSize: '14px',
  color: '#1AE5A1',
  width: 'fit-content',
  backgroundColor: '#102A33',
  borderRadius: '5px',
}));

const PrizeTextContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));
