import { Box, IconButton, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

import { CashOfferCard } from "../../components/card/CashOfferCard";
import { EmptyBox } from "../../components/box/EmptyBox";
import { GreenMyOfferPng } from "../../constants/images";
import { offerService } from "../../api/services/offerService";
import { OfferProps } from "../../constants/interfaces";
import { useNotification } from "../../provider/notification";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearSession } from "../../store/slices/sessionSlice";
import { RootState } from "../../store";
import { LoadingBox } from "../../components/loader/LoadingBox";
import CountrySelect from "../../components/common/CountrySelect";

export const MyOffer = () => {
  const [offers, setOffers] = useState<OfferProps[]>([]);
  const [countryFilter, setCountryFilter] = useState("");
  const { notifyError } = useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.session);
  const [isLoading, setLoading] = useState(false);
  const fetchOffers = async () => {
    try {
      if (!user || !user.betsaveId) {
        return;
      }
      setLoading(true);
      const offers = await offerService.getMyOffer(user.betsaveId);
      const offersData = offers.data.map((offer: any, idx: number) => ({
        id: idx,
        _id: offer._id,
        image: offer.image,
        title: offer.title,
        subTitle: offer.subTitle,
        description: offer.description,
        termsAndConditions: offer.termsAndConditions,
        cashbackRate: offer.cashbackRate,
        cashbackType: offer.cashbackType,
        offerRate: offer.offerRate,
        bonusesRating: offer.bonusesRating,
        gameVarietyRating: offer.gameVarietyRating,
        trustScoreRating: offer.trustScoreRating,
        depositBonus: offer.depositBonus,
        apiEndpoint: offer.apiEndpoint,
        apiKey: offer.apiKey,
        affiliateLink: offer.affiliateLink,
        allowedCountries: offer.allowedCountries,
        rewards: offer.rewards,
      }));
      console.log({ offersData });
      setOffers(offersData);
    } catch (error) {
      console.error("Error fetching offers:", error);
      dispatch(clearSession());
      navigate("/");
      notifyError(`Error fetching offers: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Filter offers by country
  const filteredOffers = offers.filter((offer) => {
    const matchesCountry =
      !countryFilter ||
      offer.allowedCountries.includes("ALL") ||
      (offer.allowedCountries &&
        offer.allowedCountries.includes(countryFilter));
    return matchesCountry;
  });

  useEffect(() => {
    if (user) {
      fetchOffers();
    } else {
      notifyError("Something went wrong");
    }
  }, [user]);

  return (
    <MyOfferContainer>
      <Heading>
        <HeadingTitleContainer>
          <HeadingTitle>
            <HeadingTitleIcon>
              <img src={GreenMyOfferPng} alt="title-icon" />
            </HeadingTitleIcon>
            My Offer
          </HeadingTitle>
          <HeadingContent>
            Track your claimed rewards and active deals all in one place.
            <br />
            Enjoy your exclusive perks
          </HeadingContent>
        </HeadingTitleContainer>
        {offers.length > 0 && (
          <MyOfferContentAction>
            <p>View All</p>
            <MyOfferNavButton className="cashoffer-swiper-button-prev">
              <KeyboardArrowLeft />
            </MyOfferNavButton>
            <MyOfferNavButton className="cashoffer-swiper-button-next">
              <KeyboardArrowRight />
            </MyOfferNavButton>
          </MyOfferContentAction>
        )}
      </Heading>
      <OfferContainer>
        <FilterContainer>
          <CountrySelectWrapper>
            <CountrySelect
              value={countryFilter}
              onChange={setCountryFilter}
              placeholder="Filter offers by country"
            />
          </CountrySelectWrapper>
        </FilterContainer>
        {isLoading ? (
          <LoadingBox size="small" />
        ) : offers.length === 0 ? (
          <EmptyBox />
        ) : (
          <CashOfferContainer>
            {filteredOffers.map((offer, idx) => (
              <CashOfferCard offer={offer} key={"MyOffer-" + idx} />
            ))}
          </CashOfferContainer>
        )}
      </OfferContainer>
    </MyOfferContainer>
  );
};

const MyOfferContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
}));

const Heading = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "fit-content",
  [theme.breakpoints.down(680)]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
  },
}));

const HeadingTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "24px",
  color: "#fff",
  fontWeight: "bold",
}));

const HeadingTitleIcon = styled(Box)(({ theme }) => ({
  width: "36px",
  height: "36px",
  img: {
    width: "100%",
    height: "auto",
  },
}));

const MyOfferContentAction = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  color: "#627691",
  fontSize: "18px",
  [theme.breakpoints.down(480)]: {
    fontSize: "14px",
  },
}));

const MyOfferNavButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#171e31",
  borderRadius: "7px",
  width: "40px",
  height: "40px",
  "&:hover": {
    backgroundColor: "#171e31",
  },
  [theme.breakpoints.down(480)]: {
    fontSize: "14px",
    width: "32px",
    height: "32px",
  },
}));

const HeadingTitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
}));

const HeadingContent = styled(Typography)(({ theme }) => ({
  color: "#627691",
  fontSize: "16px",
  [theme.breakpoints.down(480)]: {
    fontSize: "14px",
  },
}));

const OfferContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

const FilterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
}));

const CountrySelectWrapper = styled(Box)(({ theme }) => ({
  width: "300px",
  [theme.breakpoints.down(480)]: {
    width: "100%",
  },
}));

const CashOfferContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "15px",
  width: "100%",
}));
