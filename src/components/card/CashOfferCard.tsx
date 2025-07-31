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

  const handleClick = async (affiliateLink: string, brandName: string) => {
    // Guard clause to prevent API call when user is null (during logout)
    if (!user || !user.betsaveId) {
      console.error("User session not found");
      return;
    }

    try {
      const response = await casinoService.createAccount(
        user.betsaveId,
        offer.id
      );
      console.log(response);
      if (user.referrer) {
        const newLink = `${affiliateLink}?subId1=${user.betsaveId}&subId2=${user.referrer}`;
        window.open(newLink, "_blank", "noopener,noreferrer");
      } else {
        const newLink = `${affiliateLink}?subId1=${user.betsaveId}`;
        window.open(newLink, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CardContainer>
        <CardImg src={offer.image} alt="promo-logo" />
        <CardWrapper>
          <CardTitle>{offer.title}</CardTitle>
          <CardContent>Casino/{offer.title}</CardContent>
          {/* <CashbackLabel>Cashback: {cashbackRate}%</CashbackLabel> */}
          <JoinButton variant="contained" onClick={() => setOpen(true)}>
            Join
          </JoinButton>
        </CardWrapper>
      </CardContainer>
      <NewOfferDialog open={open} setOpen={setOpen} offer={offer} />
    </>
  );
};

const CardContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  background: "linear-gradient(180deg, rgba(20, 57, 60, 0.1) 0%, #14393C 100%)",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  padding: "25px 20px 20px 20px",
  gap: "12px",
  width: "210px",
  height: "fit-content",
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
    inset: 0,
    padding: "1px",
    background: "linear-gradient(180deg, #171E31 0%, #1AE5A1 100%)",
    borderRadius: "16px",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    maskComposite: "exclude",
    pointerEvents: "none",
  },
}));

const CardImg = styled("img")(({ theme }) => ({
  width: "100px",
  height: "100px",
  borderRadius: "16px",
  alignSelf: "center",
  padding: "6px",
  border: "2px dashed rgba(255, 255, 255, 0.2)",
}));

const CardWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: "600",
  color: "#fff",
  lineHeight: 1.2,
}));

const CardContent = styled("a")(({ theme }) => ({
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

const JoinButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1ae5a1",
  color: "#171e30",
  fontSize: "15px",
  fontWeight: "bold",
  padding: "5px 25px",
  borderRadius: "8px",
  textTransform: "none",
  width: "100%",
  marginTop: "10px",
  "&:hover": {
    backgroundColor: "#15c88c",
  },
}));
