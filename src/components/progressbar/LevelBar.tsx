import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Box, Typography } from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#0d1321",
    backgroundImage:
      "linear-gradient(45deg, hsla(0, 0%, 100%, .15) 25%, transparent 0, transparent 50%, hsla(0, 0%, 100%, .15) 0, hsla(0, 0%, 100%, .15) 75%, transparent 0, transparent)",
    backgroundSize: "2rem 2rem",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#1AE5A1",
  },
}));

interface LevelProgressBarProps {
  value: number;
  unit: string;
  maxLossAmount: number;
}

export const LevelProgressBar = (props: LevelProgressBarProps) => {
  const { value, unit, maxLossAmount } = props;
  return (
    <LevelProgressBarContainer>
      <BorderLinearProgress
        variant="determinate"
        value={(value / maxLossAmount) * 100}
      />
      <LevelLabel value={(value / maxLossAmount) * 100}>
        {unit}
        {value} / {unit}
        {maxLossAmount}
      </LevelLabel>
    </LevelProgressBarContainer>
  );
};

const LevelProgressBarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  gap: "16px",
}));

const LevelLabel = styled(Typography)<{ value: number }>(
  ({ theme, value }) => ({
    fontSize: "12px",
    color: "#fff",
    position: "absolute",
    top: "15px",
    left: `${value > 50 ? value - 4 : value}%`,
    textWrap: "nowrap",
    [theme.breakpoints.down(540)]: {
      left: `${value > 50 ? value - 8 : value}%`,
    },
  })
);
