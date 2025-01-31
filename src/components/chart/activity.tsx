import { Box, Button, styled, Typography } from '@mui/material';
import { FiArrowDownRight } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export const ActivityChart = () => {
  const [selected, setSelected] = useState(0);
  const handleOptionSelect = (index: number) => {
    setSelected(index);
  };
  const options = ['Week', 'Monthly', 'Yearly'];

  const data = [
    { day: 'Mon', value: 600 },
    { day: 'Tue', value: 300 },
    { day: 'Wed', value: 450 },
    { day: 'Thu', value: 700 },
    { day: 'Fri', value: 500 },
    { day: 'Sat', value: 250 },
    { day: 'Sun', value: 1000 },
  ];
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
        <ChartActionContainer>
          <OnlineBadge>
            <BadgeIcon />
            Last 1 Week
          </OnlineBadge>
          <TimerContainer>
            <MovingBackground
              style={{
                transform: `translateX(${selected * 100}%)`,
                marginLeft: '3px',
              }}
            />
            {options.map((option, index) => (
              <OptionButton
                key={option}
                onClick={() => handleOptionSelect(index)}
                style={{ color: selected === index ? '#000' : '#627691' }}
              >
                {option}
              </OptionButton>
            ))}
          </TimerContainer>
        </ChartActionContainer>
      </Header>

      <ChartContainer>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barSize={10}>
            <CartesianGrid stroke="#1A1C1E" strokeDasharray="3 3" />
            <XAxis dataKey="day" stroke="#627691" />
            <YAxis stroke="#627691" />
            {/* <Tooltip
              contentStyle={{
                backgroundColor: '#1A1C1E',
                border: 'none',
                color: '#627691',
              }}
              cursor={{ fill: '#1A1C1E' }}
            /> */}
            <Bar dataKey="value" fill="#1AE5A1" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </ActivityChartContainer>
  );
};

const ActivityChartContainer = styled(Box)(({ theme }) => ({
  background: '#0f1629',
  borderRadius: '10px',
  padding: '20px',
  width: '100%',
  [theme.breakpoints.down(580)]: {
    padding: '0px',
  },
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  [theme.breakpoints.down(1160)]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  [theme.breakpoints.down(580)]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
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
  backgroundColor: '#271D2F',
  color: '#ff5a65',
  padding: '4px 8px',
  borderRadius: '5px',
  fontSize: '12px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const ChartActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.down(1280)]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  [theme.breakpoints.down(1160)]: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  [theme.breakpoints.down(420)]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
    marginTop: '10px',
  },
}));

const OnlineBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  fontSize: '14px',
  color: '#627691',
}));

const BadgeIcon = styled(Box)(({ theme }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#1AE5A1',
}));

const TimerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  backgroundColor: '#131B2E',
  borderRadius: '8px',
  padding: '4px',
  width: 'fit-content',
  position: 'relative',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

const OptionButton = styled(Button)(({ theme }) => ({
  flex: 1,
  color: '#627691',
  fontSize: '14px',
  fontWeight: 'bold',
  textTransform: 'none',
  zIndex: 1,
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const MovingBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '4px',
  bottom: 0,
  left: 0,
  width: '32%',
  height: '85%',
  borderRadius: '8px',
  backgroundColor: '#1AE5A1',
  transition: 'transform 0.3s ease-in-out',
  zIndex: 0,
}));

const ChartContainer = styled(Box)(({ theme }) => ({}));
