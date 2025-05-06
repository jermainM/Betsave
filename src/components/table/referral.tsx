import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TempUserIcon, VectorIcon } from "../../constants/images";
import { formatEarningWithCommas } from "../../utils/number";
import { NoDataCard } from "../card/NoDataCard";

interface Row {
  rank: number;
  referral: string;
  grossWageredAmount: number;
  trackedLosses: number;
  cashbackEarned: number;
}

interface ReferralTableProps {
  rows?: Row[];
}

export const ReferralTable = (props: ReferralTableProps) => {
  const { rows } = props;

  return (
    <Container>
      {rows && rows.length > 0 ? (
        <TableContainer>
          <CustomTable>
            <TableHead>
              <TableRow>
                <StyledTableCell>Rank</StyledTableCell>
                <StyledTableCell>Referral</StyledTableCell>
                <StyledTableCell>Gross Wagered Amount</StyledTableCell>
                <StyledTableCell>Tracked Losses</StyledTableCell>
                <StyledTableCell align="right">
                  Cashback Earned from Referral
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.rank}>
                  <StyledTableCell width={30}>
                    <RankItem label={row.rank} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <UserItem avatar={TempUserIcon} name={row.referral} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <EarningText>
                      ${formatEarningWithCommas(row.grossWageredAmount)}
                    </EarningText>
                  </StyledTableCell>
                  <StyledTableCell>
                    <EarningText>
                      ${formatEarningWithCommas(row.trackedLosses)}
                    </EarningText>
                  </StyledTableCell>
                  <StyledTableCell>
                    <PrizeTextContainer>
                      <PrizeText>
                        ${formatEarningWithCommas(row.cashbackEarned)}
                      </PrizeText>
                    </PrizeTextContainer>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </CustomTable>
        </TableContainer>
      ) : (
        <NoDataCard
          title="No data yet"
          subtitle="Start sharing your affiliate link to track new bettors!"
        />
      )}
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: "#627691",
  fontSize: "14px",
  border: "none",
  [theme.breakpoints.down(768)]: {
    padding: "8px",
  },

  [theme.breakpoints.down(640)]: {
    fontSize: "12px",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: "#0f1629",
  "td:first-of-type": {
    borderTopLeftRadius: "7px",
    borderBottomLeftRadius: "7px",
  },
  "td:last-of-type": {
    borderTopRightRadius: "7px",
    borderBottomRightRadius: "7px",
  },
}));

const TableContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  overflowX: "auto",
}));

const CustomTable = styled(Table)(({ theme }) => ({
  minWidth: "600px",
  borderCollapse: "separate", // Enables gaps between rows
  borderSpacing: "0 10px",
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

const PrizeTextContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
}));
