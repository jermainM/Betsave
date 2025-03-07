import { Box, Button, IconButton, styled, Typography } from "@mui/material";
import { PromoCard } from "../../components/card/PromoCard";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Keyboard,
  Pagination,
  Navigation,
  Autoplay,
  FreeMode,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { PromoCodeTable } from "../../components/table/promo";

export const PromoCode = () => {
  return (
    <Container>
      <PromocodeHeader>
        <PromoTitleContainer>
          <PromoTitle>Promo Codes</PromoTitle>
          <PromoSubTitle>Your Exclusive Deals</PromoSubTitle>
        </PromoTitleContainer>
        <HeadingAction>
          <p>View All</p>
          <HeadingActionButton className="promo-swiper-button-prev">
            <KeyboardArrowLeft />
          </HeadingActionButton>
          <HeadingActionButton className="promo-swiper-button-next">
            <KeyboardArrowRight />
          </HeadingActionButton>
        </HeadingAction>
      </PromocodeHeader>
      <PromoCardContainer>
        <CashOfferSwiper>
          <CustomSwiper
            slidesPerView={"auto"}
            freeMode={true}
            keyboard={{
              enabled: true,
            }}
            navigation={{
              nextEl: ".promo-swiper-button-next",
              prevEl: ".promo-swiper-button-prev",
            }}
            modules={[Keyboard, Pagination, Navigation, Autoplay, FreeMode]}
            className="mySwiper"
          >
            {[...Array(5)].map((_, idx) => (
              <SwiperSlide key={idx}>
                <PromoCard />
              </SwiperSlide>
            ))}
          </CustomSwiper>
        </CashOfferSwiper>
      </PromoCardContainer>

      <ActiveCodeContainer>
        <ActiveCodeTitle>Active Promo Codes</ActiveCodeTitle>
        <ActiveCodeItemContainer>
          {[...Array(8)].map((_, idx) => (
            <ActiveCodeItem
              key={idx}
              id={idx + 1}
              content="WELCOME10: Extra 10% cashback for January"
            />
          ))}
        </ActiveCodeItemContainer>
      </ActiveCodeContainer>

      <PromoCodeTable />
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
}));

const PromoTitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
}));

const PromoTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: "#fff",
  fontWeight: "normal",
}));

const PromoSubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#627691",
}));

const PromoCardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  width: "100%",
}));

const PromocodeHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  [theme.breakpoints.down(380)]: {
    flexDirection: "column",
    gap: "20px",
    alignItems: "flex-start",
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

const ActiveCodeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  gap: "20px",
}));

const ActiveCodeTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: "#fff",
  fontWeight: "normal",
}));

const ActiveCodeItemContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "10px",
  width: "100%",
  [theme.breakpoints.down(1356)]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}));

interface ActiveCodeItemProps {
  id: number;
  content: string;
}

const ActiveCodeItem = (props: ActiveCodeItemProps) => {
  const { id, content } = props;
  return (
    <ActiveCodeItemWrapper>
      <ItemID>{id}</ItemID>
      <ItemContent>{content} </ItemContent>
    </ActiveCodeItemWrapper>
  );
};

const ActiveCodeItemWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: "12px",
  backgroundColor: "#0f1629",
  display: "flex",
  alignItems: "center",
  padding: "10px",
  gap: "30px",
  [theme.breakpoints.down(540)]: {
    gap: "15px",
  },
}));

const ItemID = styled(Box)(({ theme }) => ({
  width: "42px",
  height: "42px",
  minWidth: "42px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#172034",
  borderRadius: "9px",
  fontSize: "18px",
  fontWeight: "bold",
  [theme.breakpoints.down(540)]: {
    width: "36px",
    height: "36px",
    minWidth: "36px",
    fontSize: "16px",
  },
}));

const ItemContent = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#627691",
  [theme.breakpoints.down(1620)]: {
    fontSize: "14px",
  },
  [theme.breakpoints.down(1356)]: {
    fontSize: "16px",
  },

  [theme.breakpoints.down(540)]: {
    fontSize: "14px",
  },
}));
