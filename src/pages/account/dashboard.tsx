import { Box, styled, Typography } from "@mui/material";
import { AccountDashboardChart } from "../../components/chart/dashboard";
import { ActivityChart } from "../../components/chart/activity";

export const AccountDashboard = () => {
  return (
    <Container>
      <DashboardTitleContainer>
        <DashboardTitle>Dashboard</DashboardTitle>
        <DashboardSubTitle>Your Overview</DashboardSubTitle>
      </DashboardTitleContainer>
      <ChartSection>
        <AccountDashboardChart />
        <ActivityChart />
      </ChartSection>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

const DashboardTitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
}));

const DashboardTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: "#fff",
  fontWeight: "normal",
}));

const DashboardSubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: "#627691",
}));

const ChartSection = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));
