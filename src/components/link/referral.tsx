import { Box, styled } from "@mui/material";

interface ReferralLinkProps {
  icon: React.ReactNode;
  link: string;
}

export const ReferralLink = (props: ReferralLinkProps) => {
  const { icon, link } = props;
  return (
    <ReferralLinkContainer href={link} rel="noopenner noreferrer">
      <ReferralLinkIcon>{icon}</ReferralLinkIcon>
    </ReferralLinkContainer>
  );
};

const ReferralLinkContainer = styled("a")(({ theme }) => ({
  outline: "none",
  textDecoration: "none",
}));

const ReferralLinkIcon = styled(Box)(({ theme }) => ({
  width: "20px",
  height: "20px",
  color: "#627691",
}));
