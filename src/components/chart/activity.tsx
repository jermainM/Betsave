import { Box, Button, styled, Typography } from "@mui/material";
import { FiArrowDownRight } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { useState } from "react";
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

const data = [
  { day: "Mon", trackedLossEvents: 45, trackedActiveSession: 30 },
  { day: "Tue", trackedLossEvents: 60, trackedActiveSession: 40 },
  { day: "Wed", trackedLossEvents: 55, trackedActiveSession: 35 },
  { day: "Thu", trackedLossEvents: 70, trackedActiveSession: 50 },
  { day: "Fri", trackedLossEvents: 80, trackedActiveSession: 60 },
  { day: "Sat", trackedLossEvents: 90, trackedActiveSession: 70 },
  { day: "Sun", trackedLossEvents: 100, trackedActiveSession: 80 },
];

const dayFullName: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const loss = payload.find((p: any) => p.dataKey === "trackedLossEvents");
    const session = payload.find(
      (p: any) => p.dataKey === "trackedActiveSession"
    );
    return (
      <CustomTooltipContainer>
        {loss && (
          <TooltipValue>
            {loss.value} tracked losses on {dayFullName[label] || label}
          </TooltipValue>
        )}
        {session && (
          <TooltipValue>
            {session.value} active sessions on {dayFullName[label] || label}
          </TooltipValue>
        )}
      </CustomTooltipContainer>
    );
  }
  return null;
};

export const ActivityChart = () => {
  return (
    <ActivityChartContainer>
      <Header>
        <Box>
          <Title>
            <FaUsers />
            Activities
          </Title>
          <RevenueContainer>
            <RevenueValue>274</RevenueValue>
            <RevenueBadge>
              24.6% <FiArrowDownRight />
            </RevenueBadge>
          </RevenueContainer>
        </Box>
      </Header>
      <ChartContainer>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <defs>
              <linearGradient
                id="colorTrackedLossEvents"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#1AE5A1" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#1AE5A1" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient
                id="colorTrackedActiveSession"
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
              dataKey="day"
              tick={{ fill: "#627691" }}
              axisLine={{ stroke: "#1A243C" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#627691" }}
              axisLine={{ stroke: "#1A243C" }}
              tickLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: "10px", color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="trackedLossEvents"
              name="Tracked Loss Events"
              stroke="url(#colorTrackedLossEvents)"
              strokeWidth={3}
              fill="#1AE5A1"
              dot={{
                r: 3,
                fill: "#1AE5A1",
                stroke: "#1AE5A1",
                strokeWidth: 2,
              }}
              activeDot={{ r: 5, stroke: "#0B1121", strokeWidth: 4 }}
            />
            <Line
              type="monotone"
              dataKey="trackedActiveSession"
              name="Tracked Active Session"
              stroke="url(#colorTrackedActiveSession)"
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
      </ChartContainer>
    </ActivityChartContainer>
  );
};

const ActivityChartContainer = styled(Box)(({ theme }) => ({
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
  [theme.breakpoints.down(1160)]: {
    flexDirection: "column",
    alignItems: "flex-start",
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
  backgroundColor: "#271D2F",
  color: "#ff5a65",
  padding: "4px 8px",
  borderRadius: "5px",
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

const ChartContainer = styled(Box)(({ theme }) => ({}));

const CustomTooltipContainer = styled(Box)(({ theme }) => ({
  height: "auto",
  padding: "14px 10px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#000",
  borderRadius: "10px",
  justifyContent: "center",
}));

const TooltipValue = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "6px",
  fontSize: "16px",
}));
