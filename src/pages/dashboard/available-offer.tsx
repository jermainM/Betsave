import { Box, IconButton, styled, Typography } from "@mui/material";
import { Keyboard } from "swiper/modules";
import { useEffect, useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { GreenAbleOfferPng } from "../../constants/images";
import { CashOfferCard } from "../../components/card/CashOfferCard";
import { OfferProps } from "../../constants/interfaces";
import { offerService } from "../../api/services/offerService";
import { EmptyBox } from "../../components/box/EmptyBox";
import { useNotification } from "../../provider/notification";
import { LoadingBox } from "../../components/loader/LoadingBox";
import CountrySelect from "../../components/common/CountrySelect";

export const AvailableOffer = () => {
  const [offers, setOffers] = useState<OfferProps[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [countryFilter, setCountryFilter] = useState("");

  const { notifyError } = useNotification();
  const fetchOffers = async () => {
    try {
      setLoading(true);
      const offers = await offerService.getOffers();
      const offersData = offers.data.map((offer: OfferProps, idx: number) => ({
        id: idx,
        _id: offer._id,
        image: offer.image,
        title: offer.title,
        subTitle: offer.subTitle,
        description: offer.description,
        termsAndConditions: offer.termsAndConditions,
        allowedCountries: offer.allowedCountries,
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
        rewards: offer.rewards,
      }));
      console.log({ offersData });
      setOffers(offersData);
    } catch (error) {
      console.error("Error fetching offers:", error);
      notifyError(`Error fetching offers: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Filter offers by country and cashback type
  const filteredOffers = offers.filter((offer) => {
    const isNGR = offer.cashbackType === "NGR";
    const matchesCountry =
      !countryFilter ||
      offer.allowedCountries.includes("ALL") ||
      (offer.allowedCountries &&
        offer.allowedCountries.includes(countryFilter));
    return isNGR && matchesCountry;
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <Container>
      <Heading>
        <HeadingTitleContainer>
          <HeadingTitle>
            <HeadingTitleIcon>
              <img src={GreenAbleOfferPng} alt="title-icon" />
            </HeadingTitleIcon>
            Tiered Cashback
          </HeadingTitle>
          <HeadingContent>
            Advance through tiers to maximize your cashback rewards
          </HeadingContent>
        </HeadingTitleContainer>
        {offers.length > 0 && (
          <HeadingAction>
            <p>View All</p>
            <HeadingActionButton className="myoffer-swiper-button-prev">
              <KeyboardArrowLeft />
            </HeadingActionButton>
            <HeadingActionButton className="myoffer-swiper-button-next">
              <KeyboardArrowRight />
            </HeadingActionButton>
          </HeadingAction>
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
          <AvailableOfferwiper>
            <CustomSwiper
              slidesPerView={"auto"}
              freeMode={true}
              keyboard={{
                enabled: true,
              }}
              navigation={{
                nextEl: ".myoffer-swiper-button-next",
                prevEl: ".myoffer-swiper-button-prev",
              }}
              modules={[Keyboard, Pagination, Navigation, Autoplay, FreeMode]}
              className="mySwiper"
            >
              {filteredOffers.map((offer, idx) => (
                <SwiperSlide key={"Offer-" + idx}>
                  <CashOfferCard offer={offer} />
                </SwiperSlide>
              ))}
            </CustomSwiper>
          </AvailableOfferwiper>
        )}
      </OfferContainer>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
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

const HeadingAction = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  color: "#627691",
  fontSize: "18px",
  p: {
    textWrap: "nowrap",
  },
  [theme.breakpoints.down(480)]: {
    fontSize: "14px",
  },
}));

const HeadingActionButton = styled(IconButton)(({ theme }) => ({
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

const AvailableOfferwiper = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
}));

const CustomSwiper = styled(Swiper)(({ theme }) => ({
  ".swiper-wrapper": {
    width: "auto",
    gap: "10px",
  },
  ".swiper-slide": {
    width: "auto",
  },
}));

const OfferContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
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
