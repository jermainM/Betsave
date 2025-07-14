import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, IconButton, styled, Typography } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import {
  Keyboard,
  Pagination,
  Navigation,
  Autoplay,
  FreeMode,
} from "swiper/modules";
import { useEffect, useState } from "react";

import { CashOfferCard } from "../../components/card/CashOfferCard";
import { EmptyBox } from "../../components/box/EmptyBox";
import { GreenPromoOfferPng } from "../../constants/images";
import { offerService } from "../../api/services/offerService";
import { calculateOfferStatus } from "../../utils/offer";
import { Row } from "../../constants/interfaces";
import { useNotification } from "../../provider/notification";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearSession } from "../../store/slices/sessionSlice";
import { RootState } from "../../store";

export const PromotionalOffer = () => {
  const [offers, setOffers] = useState<Row[]>([]);
  const { notifyError } = useNotification();
  const country = useSelector((state: RootState) => state.device.country);
  const fetchOffers = async () => {
    try {
      const offers = await offerService.getOffers();
      const offersData = offers.data.map((offer: any, idx: number) => ({
        id: idx,
        _id: offer._id,
        image: offer.image,
        title: offer.title,
        description: offer.description,
        type: offer.type,
        termsAndConditions: offer.termsAndConditions,
        cashbackRate: offer.cashbackRate,
        cashbackType: offer.cashbackType,
        brands: offer.brands,
        allowedCountries: offer.allowedCountries,
      }));
      setOffers(offersData);
    } catch (error) {
      console.error("Error fetching offers:", error);
      notifyError(`Error fetching offers: ${error}`);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <PromotionalOfferContainer>
      <Heading>
        <HeadingTitleContainer>
          <HeadingTitle>
            <HeadingTitleIcon>
              <img src={GreenPromoOfferPng} alt="title-icon" />
            </HeadingTitleIcon>
            Promotional Offers
          </HeadingTitle>
          <HeadingContent>
            Unlock exclusive deals and rewards tailored just for you.
            <br />
            Don't miss out on limited-time offers
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
      {offers.length === 0 ? (
        <EmptyBox />
      ) : (
        <PromotionalOfferwiper>
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
            {offers
              .filter((offer) => offer.type === "promotional")
              .map((offer, idx) => (
                <SwiperSlide key={idx}>
                  <CashOfferCard
                    image={offer.image}
                    title={offer.title}
                    id={offer._id}
                    description={offer.description}
                    termsAndConditions={offer.termsAndConditions}
                    cashbackRate={offer.cashbackRate}
                    cashbackType={offer.cashbackType}
                    brands={offer.brands}
                    allowedCountries={offer.allowedCountries}
                  />
                </SwiperSlide>
              ))}
          </CustomSwiper>
        </PromotionalOfferwiper>
      )}
    </PromotionalOfferContainer>
  );
};

const PromotionalOfferContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "40px",
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

const HeadingAction = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  color: "#627691",
  fontSize: "18px",
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

const PromotionalOfferwiper = styled(Box)(({ theme }) => ({
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

const HeadingTitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
}));

const HeadingContent = styled(Typography)(({ theme }) => ({
  color: "#627691",
  fontSize: "16px",
  [theme.breakpoints.down(480)]: {
    fontSize: "14px",
  },
}));
