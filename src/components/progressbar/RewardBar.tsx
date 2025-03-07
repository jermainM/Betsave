import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Box, Typography } from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
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

interface RewardBarProps {
  value: number;
  unit: string;
  earn: number;
}

export const RewardBar = (props: RewardBarProps) => {
  const { value, unit, earn } = props;
  return (
    <RewardBarContainer>
      <LevelLabelContainer>
        <LevelLabel value={value} type="current">
          {unit}
          {value / 10}
        </LevelLabel>
        <LevelLabel value={100} type="max">
          {unit}
          {earn}
        </LevelLabel>
      </LevelLabelContainer>
      <BorderLinearProgress variant="determinate" value={value} />
    </RewardBarContainer>
  );
};

const RewardBarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}));

const LevelLabelContainer = styled(Box)(({ theme }) => ({
  position: "relative",
}));

const LevelLabel = styled(Typography)<{ value: number; type: string }>(
  ({ theme, value, type }) => ({
    fontSize: "12px",
    color: type === "max" ? "#fff" : "#102A33",
    position: "absolute",
    top: "-25px",
    left: `${value > 50 ? value - 4 : value - 3}%`,
    textWrap: "nowrap",
    backgroundColor: type === "max" ? "#172034" : "#1AE5A1",
    padding: "2px 4px",
    borderRadius: "4px",
    fontWeight: type === "max" ? "normal" : "bold",
    zIndex: type === "max" ? 1 : 2,
    [theme.breakpoints.down(540)]: {
      left: `${value > 50 ? value - 8 : value}%`,
    },
  }),
);
