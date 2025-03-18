import { Box, styled, Typography, Button } from "@mui/material";
import { BetfuryImg } from "../../constants/images";

interface CardProps {
  image: string;
  title: string;
  affiliateLink: string;
}

export const CashOfferCard = (props: CardProps) => {
  const { image, title, affiliateLink } = props;
  const handleClick = () => {
    window.open(affiliateLink, "_blank", "noopener,noreferrer");
  };

  return (
    <CardContainer>
      <CardImg src={image} alt="promo-logo" />
      <CardWrapper>
        <CardTitle>{title}</CardTitle>
        <CardContent onClick={handleClick}>Casino/{title}</CardContent>
        <CashbackLabel>
          Cashback:{" "}
          <CashbackValue>
            <span>3</span>.5%
          </CashbackValue>
        </CashbackLabel>
        <JoinButton variant="contained">Join</JoinButton>
      </CardWrapper>
    </CardContainer>
  );
};

const CardContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  background: "linear-gradient(180deg, rgba(20, 57, 60, 0.1) 0%, #14393C 100%)",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  gap: "16px",
  width: "220px",
  marginTop: "8px",
  marginBottom: "8px",
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    inset: -1,
    padding: "1px",
    background: "linear-gradient(180deg, #171E31 0%, #1AE5A1 100%)",
    borderRadius: "16px",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    pointerEvents: "none",
  },
}));

const CardImg = styled("img")(({ theme }) => ({
  width: "110px",
  height: "110px",
  borderRadius: "20px",
  alignSelf: "center",
  padding: "8px",
  border: "2px dashed rgba(255, 255, 255, 0.2)",
}));

const CardWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  alignItems: "center",
  textAlign: "center",
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "600",
  color: "#fff",
  lineHeight: 1.2,
}));

const CardContent = styled("a")(({ theme }) => ({
  fontSize: "12px",
  color: "#627690",
  marginBottom: "4px",
  cursor: "pointer",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
    color: "#7b92b4",
  },
}));

const CashbackLabel = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#1ae5a1",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  marginBottom: "12px",
}));

const CashbackValue = styled("span")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "600",
  color: "#1ae5a1",
  "& span": {
    fontSize: "26px",
  },
}));

const JoinButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1ae5a1",
  color: "#171e30",
  fontSize: "14px",
  fontWeight: "600",
  padding: "6px 32px",
  borderRadius: "8px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#15c88c",
  },
}));
