import { Box, styled, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { casinoService } from "../../api/services/casinoService";
import { useState } from "react";
import { NewOfferDialog } from "../dialog/NewOfferDialog";

interface OfferProps {
  id: string;
  _id: string;
  image: string;
  title: string;
  subTitle: string;
  description: string;
  cashbackType: string;
  cashbackRate: number;
  allowedCountries: string[];
  termsAndConditions: string;
  rewards: Array<{
    amount: string;
    title: string;
  }>;
  offerRate: number;
  bonusesRating: number;
  gameVarietyRating: number;
  trustScoreRating: number;
  depositBonus: string;
  apiEndpoint: string;
  apiKey: string;
  affiliateLink: string;
}

interface CardProps {
  offer: OfferProps;
}

export const CashOfferCard = (props: CardProps) => {
  const { offer } = props;
  const { user } = useSelector((state: RootState) => state.session);
  const [open, setOpen] = useState(false);

  const handleClick = async (affiliateLink: string) => {
    // Guard clause to prevent API call when user is null (during logout)
    if (!user || !user.betsaveId) {
      console.error("User session not found");
      return;
    }
    const newLink = `${affiliateLink}?subid=${user.betsaveId}&partner_id=${offer._id}`;
    window.open(newLink, "_blank", "noopener,noreferrer");

    try {
      const response = await casinoService.createAccount(
        user.betsaveId,
        offer._id
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const isPromo = offer.cashbackType === "Promo";

  return (
    <>
      <CardContainer isPromo={isPromo}>
        {isPromo && <PromoBadge>PROMO</PromoBadge>}
        <CardImg src={offer.image} alt="promo-logo" isPromo={isPromo} />
        <CardWrapper>
          <CardTitle isPromo={isPromo}>{offer.title}</CardTitle>
          <CardContent isPromo={isPromo}>Casino/{offer.title}</CardContent>
          {isPromo && <PromoLabel>🔥 Exclusive Offer</PromoLabel>}
          <JoinButton
            variant="contained"
            onClick={() => setOpen(true)}
            isPromo={isPromo}
          >
            Join Now
          </JoinButton>
        </CardWrapper>
      </CardContainer>
      <NewOfferDialog
        open={open}
        setOpen={setOpen}
        offer={offer}
        handleClick={handleClick}
      />
    </>
  );
};

const CardContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isPromo",
})<{ isPromo?: boolean }>(({ theme, isPromo }) => ({
  position: "relative",
  background: isPromo
    ? "linear-gradient(135deg, rgba(26, 229, 161, 0.15) 0%, rgba(138, 43, 226, 0.15) 50%, rgba(255, 107, 53, 0.15) 100%)"
    : "linear-gradient(135deg, rgba(26, 229, 161, 0.12) 0%, rgba(0, 255, 255, 0.12) 50%, rgba(26, 229, 161, 0.12) 100%)",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  padding: "25px 20px 20px 20px",
  gap: "12px",
  width: "190px",
  height: "fit-content",
  marginTop: "12px",
  marginBottom: "8px",
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    padding: "1px",
    background: isPromo
      ? "linear-gradient(180deg, #171E31 0%, #1AE5A1 100%)"
      : "linear-gradient(135deg, #1AE5A1 0%, #00FFFF 50%, #1AE5A1 100%)",
    borderRadius: "16px",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    maskComposite: "exclude",
    pointerEvents: "none",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    padding: "4px",
    background: isPromo
      ? "linear-gradient(90deg, transparent, rgba(26, 229, 161, 0.6), rgba(26, 229, 161, 1), rgba(26, 229, 161, 0.6), transparent, transparent, rgba(0, 255, 255, 0.5), rgba(0, 255, 255, 0.9), rgba(0, 255, 255, 0.5), transparent, transparent, rgba(138, 43, 226, 0.4), rgba(138, 43, 226, 0.8), rgba(138, 43, 226, 0.4), transparent)"
      : "linear-gradient(90deg, transparent, rgba(26, 229, 161, 0.7), rgba(26, 229, 161, 1), rgba(26, 229, 161, 0.7), transparent, transparent, rgba(0, 255, 255, 0.6), rgba(0, 255, 255, 1), rgba(0, 255, 255, 0.6), transparent, transparent, rgba(26, 229, 161, 0.7), rgba(26, 229, 161, 1), rgba(26, 229, 161, 0.7), transparent)",
    borderRadius: "16px",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    maskComposite: "exclude",
    pointerEvents: "none",
    animation: "shimmer 16s linear infinite",
    backgroundSize: "400% 100%",
    opacity: 1,
  },
  "@keyframes shimmer": {
    "0%": {
      backgroundPosition: "500% 0",
    },
    "100%": {
      backgroundPosition: "0% 0",
    },
  },
}));

const PromoBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "-8px",
  right: "-8px",
  background: "linear-gradient(135deg, #FF6B35, #F7931E)",
  color: "#fff",
  fontSize: "10px",
  fontWeight: "bold",
  padding: "4px 8px",
  borderRadius: "12px",
  zIndex: 10,
  boxShadow: "0 4px 12px rgba(255, 107, 53, 0.4)",
  animation: "pulse 2s infinite",
  "@keyframes pulse": {
    "0%, 100%": {
      transform: "scale(1)",
    },
    "50%": {
      transform: "scale(1.05)",
    },
  },
}));

const PromoLabel = styled(Typography)(({ theme }) => ({
  fontSize: "11px",
  color: "#FF6B35",
  fontWeight: "600",
  marginBottom: "8px",
  textAlign: "center",
}));

const CardImg = styled("img", {
  shouldForwardProp: (prop) => prop !== "isPromo",
})<{ isPromo?: boolean }>(({ theme, isPromo }) => ({
  width: "100px",
  height: "100px",
  borderRadius: "16px",
  alignSelf: "center",
  padding: "6px",
  border: isPromo
    ? "2px dashed rgba(255, 107, 53, 0.4)"
    : "2px dashed rgba(26, 229, 161, 0.4)",
  ...(isPromo && {
    boxShadow: "0 0 15px rgba(255, 107, 53, 0.3)",
  }),
  ...(!isPromo && {
    boxShadow: "0 0 10px rgba(26, 229, 161, 0.2)",
  }),
}));

const CardWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
}));

const CardTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isPromo",
})<{ isPromo?: boolean }>(({ theme, isPromo }) => ({
  fontSize: "15px",
  fontWeight: "600",
  color: isPromo ? "#FF6B35" : "#fff",
  lineHeight: 1.2,
  ...(isPromo && {
    textShadow: "0 0 8px rgba(255, 107, 53, 0.5)",
  }),
}));

const CardContent = styled("a", {
  shouldForwardProp: (prop) => prop !== "isPromo",
})<{ isPromo?: boolean }>(({ theme, isPromo }) => ({
  fontSize: "10px",
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
  fontSize: "16px",
  color: "#1ae5a1",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  marginBottom: "10px",
}));

const CashbackValue = styled("span")(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "600",
  color: "#1ae5a1",
}));

const JoinButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isPromo",
})<{ isPromo?: boolean }>(({ theme, isPromo }) => ({
  backgroundColor: isPromo ? "#FF6B35" : "#1ae5a1",
  color: isPromo ? "#fff" : "#171e30",
  fontSize: "15px",
  fontWeight: "bold",
  padding: "5px 25px",
  borderRadius: "8px",
  textTransform: "none",
  width: "100%",
  marginTop: "10px",
  transition: "all 0.3s ease",
  ...(isPromo && {
    boxShadow: "0 4px 15px rgba(255, 107, 53, 0.4)",
    "&:hover": {
      backgroundColor: "#E55A2B",
      boxShadow: "0 6px 20px rgba(255, 107, 53, 0.6)",
      transform: "translateY(-2px)",
    },
  }),
  "&:hover": {
    backgroundColor: isPromo ? "#E55A2B" : "#15c88c",
  },
}));
