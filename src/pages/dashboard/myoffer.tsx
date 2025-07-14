import { Box, IconButton, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

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

import { CashOfferCard } from "../../components/card/CashOfferCard";
import { EmptyBox } from "../../components/box/EmptyBox";
import { GreenMyOfferPng } from "../../constants/images";
import { offerService } from "../../api/services/offerService";
import { calculateOfferStatus } from "../../utils/offer";
import { Row } from "../../constants/interfaces";
import { useNotification } from "../../provider/notification";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearSession } from "../../store/slices/sessionSlice";
import { RootState } from "../../store";

export const MyOffer = () => {
  const [isEmpty, setEmpty] = useState(false);
  const [offers, setOffers] = useState<Row[]>([]);
  const { notifyError } = useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.session);
  const fetchOffers = async () => {
    try {
      if (!user || !user.betsaveId) {
        return;
      }
      const offers = await offerService.getMyOffer(user.betsaveId);
      const offersData = offers.data.map((offer: any, idx: number) => ({
        id: idx,
        _id: offer._id,
        image: offer.image,
        title: offer.title,
        description: offer.description,
        termsAndConditions: offer.termsAndConditions,
        type: offer.type,
        cashbackRate: offer.cashbackRate,
        cashbackType: offer.cashbackType,
        brands: offer.brands,
        allowedCountries: offer.allowedCountries,
      }));
      setOffers(offersData);
    } catch (error) {
      console.error("Error fetching offers:", error);
      dispatch(clearSession());
      navigate("/");
      notifyError(`Error fetching offers: ${error}`);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOffers();
    } else {
      notifyError("Something went wrong");
    }
  }, [user]);
  return (
    <MyOfferContainer>
      {/* <MyOfferHeader>
        <MyOfferHeaderText>
          Earn <span>on</span>
        </MyOfferHeaderText>
        <MyOfferBadgeWrapper>
          <MyOfferBadge icon={<DiAndroid />} text={'Android'} />
          <MyOfferBadge icon={<FaDesktop />} text={'Desktop'} />
          <MyOfferBadge icon={<FaApple />} text={'iOS'} />
        </MyOfferBadgeWrapper>
      </MyOfferHeader> */}
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
        {!isEmpty && (
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
      {isEmpty ? (
        <EmptyBox />
      ) : (
        <CashOfferSwiper>
          <CustomSwiper
            slidesPerView={"auto"}
            freeMode={true}
            keyboard={{
              enabled: true,
            }}
            navigation={{
              nextEl: ".cashoffer-swiper-button-next",
              prevEl: ".cashoffer-swiper-button-prev",
            }}
            modules={[Keyboard, Pagination, Navigation, Autoplay, FreeMode]}
            className="mySwiper"
          >
            {offers.map((offer, idx) => (
              <SwiperSlide key={idx}>
                <CashOfferCard
                  id={offer._id}
                  image={offer.image}
                  title={offer.title}
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
        </CashOfferSwiper>
      )}
    </MyOfferContainer>
  );
};

const MyOfferContainer = styled(Box)(({ theme }) => ({
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

const MyOfferHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  [theme.breakpoints.down(640)]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const MyOfferHeaderText = styled(Typography)(({ theme }) => ({
  fontSize: "28px",
  color: "#fff",
  fontWeight: "600",
  span: {
    color: "#627691",
    fontSize: "18px",
    fontWeight: "500",
  },
}));

const MyOfferBadgeWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
}));

interface MyOfferBadgeIcon {
  icon: React.ReactNode;
  text: string;
}

const MyOfferBadge = (props: MyOfferBadgeIcon) => {
  const { icon, text } = props;
  return (
    <MyOfferBadgeContainer>
      <MyOfferIcon>{icon}</MyOfferIcon>
      <MyOfferText>{text}</MyOfferText>
      <MyOfferStatusIcon>
        <FaCircleCheck />
      </MyOfferStatusIcon>
    </MyOfferBadgeContainer>
  );
};

const MyOfferBadgeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 10px",
  borderRadius: "24px",
  backgroundColor: "#171e31",
}));

const MyOfferIcon = styled(Box)(({ theme }) => ({
  color: "#fff",
  fontSize: "20px",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down(480)]: {
    fontSize: "16px",
  },
}));

const MyOfferText = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: "#627691",
  [theme.breakpoints.down(480)]: {
    fontSize: "16px",
  },
}));

const MyOfferStatusIcon = styled(Box)(({ theme }) => ({
  color: "#1ae5a1",
  fontSize: "20px",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down(480)]: {
    fontSize: "16px",
  },
}));

const MyOfferContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  gap: "10px",
}));

const MyOfferContentHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "63px",
  [theme.breakpoints.down(390)]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
    height: "auto",
  },
}));

const MyOfferContentTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "18px",
  color: "#fff",
  [theme.breakpoints.down(480)]: {
    fontSize: "16px",
    gap: "8px",
  },
}));

const MyOfferTitleIcon = styled(Box)(({ theme }) => ({
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

const CashOfferSwiper = styled(Box)(({ theme }) => ({
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
