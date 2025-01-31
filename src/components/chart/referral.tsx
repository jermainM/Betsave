import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Box, Typography, styled, Button } from '@mui/material';
import { MdArrowOutward } from 'react-icons/md';
import DateRangePicker from '../date/RangePicker';
import { GiMoneyStack } from 'react-icons/gi';

const data = [
  { month: 'Jan', revenue: 0, expenses: 10 },
  { month: 'Feb', revenue: 50, expenses: 20 },
  { month: 'Mar', revenue: 100, expenses: 50 },
  { month: 'Apr', revenue: 150, expenses: 80 },
  { month: 'May', revenue: 125.2, expenses: 120 },
  { month: 'Jun', revenue: 200, expenses: 100 },
  { month: 'Jul', revenue: 150, expenses: 50 },
  { month: 'Aug', revenue: 180, expenses: 120 },
  { month: 'Sep', revenue: 250, expenses: 200 },
  { month: 'Oct', revenue: 200, expenses: 100 },
  { month: 'Nov', revenue: 230, expenses: 180 },
  { month: 'Dec', revenue: 240.8, expenses: 250 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipContainer>
        <TooltipValue>
          ${payload[0].value}K{' '}
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

export const ReferralChart = () => {
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(2025, 0, 1),
    endDate: new Date(2025, 11, 31),
    key: 'selection',
  });

  return (
    <ChartContainer>
      <Header>
        <Box>
          <Title>
            <GiMoneyStack />
            Total Revenue
          </Title>
          <RevenueContainer>
            <RevenueValue>$240.8K</RevenueValue>
            <RevenueBadge>
              24.6% <MdArrowOutward />
            </RevenueBadge>
          </RevenueContainer>
        </Box>
        <DateRangePicker />
      </Header>

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
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2A81F7" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#2A81F7" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#1A243C" />
            <XAxis
              dataKey="month"
              tick={{ fill: '#627691' }}
              axisLine={{ stroke: '#1A243C' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#627691' }}
              axisLine={{ stroke: '#1A243C' }}
              tickLine={false}
              tickFormatter={(value) => `${value}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: '10px', color: '#fff' }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="url(#colorRevenue)"
              strokeWidth={3}
              dot={{ r: 3, fill: '#00FFD1', stroke: '#00FFD1', strokeWidth: 2 }}
              activeDot={{ r: 5, stroke: '#0B1121', strokeWidth: 4 }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="url(#colorExpenses)"
              strokeWidth={3}
              dot={{ r: 3, fill: '#2A81F7', stroke: '#2A81F7', strokeWidth: 2 }}
              activeDot={{ r: 5, stroke: '#0B1121', strokeWidth: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartBackground>
    </ChartContainer>
  );
};

// Styled Components
const ChartContainer = styled(Box)(({ theme }) => ({
  background: '#0f1629',
  borderRadius: '10px',
  padding: '20px',
  [theme.breakpoints.down(580)]: {
    padding: '0px',
  },
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  [theme.breakpoints.down(580)]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '20px',
  },
}));

const Title = styled(Typography)({
  color: '#627691',
  fontSize: '14px',
  marginBottom: '5px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  svg: {
    fontSize: '18px',
  },
});

const RevenueContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const RevenueValue = styled(Typography)({
  color: '#fff',
  fontSize: '24px',
  fontWeight: 'bold',
});

const RevenueBadge = styled(Box)({
  backgroundColor: '#102B35',
  color: '#1AE5A1',
  padding: '4px 8px',
  borderRadius: '5px',
  fontSize: '12px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const DateRangeSelector = styled(Button)({
  backgroundColor: '#171E31',
  color: '#fff',
  fontSize: '14px',
  padding: '6px 12px',
  borderRadius: '5px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#1A243C',
  },
});

const ChartBackground = styled(Box)({
  position: 'relative',
  height: '500px',
  background: '#0f1629',
  borderRadius: '10px',
  fontSize: '14px',
});

const CustomTooltipContainer = styled(Box)(({ theme }) => ({
  height: '90px',
  padding: '14px 10px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#171e31',
  borderRadius: '10px',
}));

const TooltipValue = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '24px',
}));

const TooltipDate = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#627691',
}));
