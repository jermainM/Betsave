import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Box, Typography, styled, Button } from "@mui/material";
import { MdArrowOutward } from "react-icons/md";
import DateRangePicker from "../date/RangePicker";
import { GiMoneyStack } from "react-icons/gi";
import { formatEarningWithCommas } from "../../utils/number";
import { BetsaveTooltip } from "../tooltip";
import { transactionService } from "../../api/services/transactionService";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNotification } from "../../provider/notification";

const data = [
  { month: "Jan", cashback: 0, lossTracked: 10 },
  { month: "Feb", cashback: 50, lossTracked: 20 },
  { month: "Mar", cashback: 100, lossTracked: 50 },
  { month: "Apr", cashback: 150, lossTracked: 80 },
  { month: "May", cashback: 125.2, lossTracked: 120 },
  { month: "Jun", cashback: 200, lossTracked: 100 },
  { month: "Jul", cashback: 150, lossTracked: 50 },
  { month: "Aug", cashback: 180, lossTracked: 120 },
  { month: "Sep", cashback: 250, lossTracked: 200 },
  { month: "Oct", cashback: 200, lossTracked: 100 },
  { month: "Nov", cashback: 230, lossTracked: 180 },
  { month: "Dec", cashback: 240.8, lossTracked: 250 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipContainer>
        <TooltipValue>
          ${payload[0].value}K{" "}
          <RevenueBadge>
            +{((payload[0].value / 240.8) * 100).toFixed(1)}% <MdArrowOutward />
          </RevenueBadge>
        </TooltipValue>
        <TooltipDate>{label} 2024</TooltipDate>
      </CustomTooltipContainer>
    );
  }
  return null;
};

export const AccountDashboardChart = () => {
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(false);
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(2025, 0, 1),
    endDate: new Date(2025, 11, 31),
    key: "selection",
  });

  const [totalCashback, setTotalCashback] = useState(0);

  const { user } = useSelector((state: RootState) => state.session);
  const { notifyError } = useNotification();
  const getTransactions = async (showLoading = false) => {
    if (showLoading) {
      setIsTransactionsLoading(true);
    }

    try {
      const response = await transactionService.getTransactionByBetsaveId(
        user.betsaveId
      );

      const _totalCashback = response.data.reduce((acc: number, curr: any) => {
        if (curr.status === "paid") {
          return acc + curr.totalRequestedAmount;
        }
        return acc;
      }, 0);

      setTotalCashback(_totalCashback);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      notifyError("Failed to fetch transaction data");
    } finally {
      if (showLoading) {
        setIsTransactionsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user) {
      getTransactions();
    }
  }, [user]);

  return (
    <ChartContainer>
      <Header>
        <BetsaveTooltip title="Calculated from your share of BETSAVE's commission from tracked losses">
          <Box>
            <Title>
              <GiMoneyStack />

              <span>Total cashback Earned</span>
            </Title>
            <RevenueContainer>
              <RevenueValue>
                $ {formatEarningWithCommas(totalCashback)}
              </RevenueValue>
              {/* <RevenueBadge>
                24.6% <MdArrowOutward />
              </RevenueBadge> */}
            </RevenueContainer>
          </Box>
        </BetsaveTooltip>
        <DateRangePicker />
      </Header>
      <ChartWrapper>
        <ChartBackground>
          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00FFD1" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#00FFD1" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient
                  id="colorlossTracked"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#2A81F7" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#2A81F7" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#1A243C" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#627691" }}
                axisLine={{ stroke: "#1A243C" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#627691" }}
                axisLine={{ stroke: "#1A243C" }}
                tickLine={false}
                tickFormatter={(value) => `${value}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: "10px", color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="cashback"
                name="Cashback"
                stroke="url(#colorRevenue)"
                strokeWidth={3}
                fill="#00FFD1"
                dot={{
                  r: 3,
                  fill: "#00FFD1",
                  stroke: "#00FFD1",
                  strokeWidth: 2,
                }}
                activeDot={{ r: 5, stroke: "#0B1121", strokeWidth: 4 }}
              />
              <Line
                type="monotone"
                dataKey="lossTracked"
                name="Losses Tracked"
                stroke="url(#colorlossTracked)"
                strokeWidth={3}
                dot={{
                  r: 3,
                  fill: "#2A81F7",
                  stroke: "#2A81F7",
                  strokeWidth: 2,
                }}
                activeDot={{ r: 5, stroke: "#0B1121", strokeWidth: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartBackground>
      </ChartWrapper>
    </ChartContainer>
  );
};

// Styled Components
const ChartContainer = styled(Box)(({ theme }) => ({
  background: "#0f1629",
  borderRadius: "10px",
  padding: "20px",
  width: "100%",
  [theme.breakpoints.down(580)]: {
    padding: "0px",
  },
}));

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  [theme.breakpoints.down(1240)]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "20px",
  },
  [theme.breakpoints.down(1096)]: {
    flexDirection: "row",
    alignItems: "center",
  },
  [theme.breakpoints.down(580)]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const Title = styled(Typography)({
  color: "#627691",
  fontSize: "14px",
  marginBottom: "5px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  svg: {
    fontSize: "18px",
  },
});

const RevenueContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const RevenueValue = styled(Typography)({
  color: "#fff",
  fontSize: "24px",
  fontWeight: "bold",
});

const RevenueBadge = styled(Box)({
  backgroundColor: "#102B35",
  color: "#1AE5A1",
  padding: "4px 8px",
  borderRadius: "5px",
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

const DateRangeSelector = styled(Button)({
  backgroundColor: "#171E31",
  color: "#fff",
  fontSize: "14px",
  padding: "6px 12px",
  borderRadius: "5px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#1A243C",
  },
});

const ChartWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  overflowX: "auto",
}));

const ChartBackground = styled(Box)({
  position: "relative",
  height: "500px",
  background: "#0f1629",
  borderRadius: "10px",
  fontSize: "14px",
});

const CustomTooltipContainer = styled(Box)(({ theme }) => ({
  height: "90px",
  padding: "14px 10px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#171e31",
  borderRadius: "10px",
  justifyContent: "center",
}));

const TooltipValue = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "24px",
}));

const TooltipDate = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#627691",
}));
