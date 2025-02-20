import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box, IconButton, styled } from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import {
  Keyboard,
  Pagination,
  Navigation,
  Autoplay,
  FreeMode,
} from 'swiper/modules';
import { useState } from 'react';

import { CashOfferCard } from '../../components/card/CashOfferCard';
import { EmptyBox } from '../../components/box/EmptyBox';
import { GreenPromoOfferPng } from '../../constants/images';

export const MyOffers = () => {
  const [isEmpty, setEmpty] = useState(false);
  return (
    <MyOffersContainer>
      <Heading>
        <HeadingTitle>
          <HeadingTitleIcon>
            <img src={GreenPromoOfferPng} alt="title-icon" />
          </HeadingTitleIcon>
          Promotional Offers
        </HeadingTitle>
        {!isEmpty && (
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
      {isEmpty ? (
        <EmptyBox />
      ) : (
        <MyOfferSwiper>
          <CustomSwiper
            slidesPerView={'auto'}
            freeMode={true}
            keyboard={{
              enabled: true,
            }}
            navigation={{
              nextEl: '.myoffer-swiper-button-next',
              prevEl: '.myoffer-swiper-button-prev',
            }}
            modules={[Keyboard, Pagination, Navigation, Autoplay, FreeMode]}
            className="mySwiper"
          >
            {[...Array(15)].map((_, idx) => (
              <SwiperSlide key={idx}>
                <CashOfferCard />
              </SwiperSlide>
            ))}
          </CustomSwiper>
        </MyOfferSwiper>
      )}
    </MyOffersContainer>
  );
};

const MyOffersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  width: '100%',
}));

const Heading = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '63px',
  [theme.breakpoints.down(540)]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
    marginBottom: '20px',
  },
}));

const HeadingTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '24px',
  color: '#fff',
  fontWeight: 'bold',
}));

const HeadingTitleIcon = styled(Box)(({ theme }) => ({
  width: '36px',
  height: '36px',
  img: {
    width: '100%',
    height: 'auto',
  },
}));

const HeadingAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  color: '#627691',
  fontSize: '18px',
  [theme.breakpoints.down(480)]: {
    fontSize: '14px',
  },
}));

const HeadingActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#171e31',
  borderRadius: '7px',
  width: '40px',
  height: '40px',
  '&:hover': {
    backgroundColor: '#171e31',
  },
  [theme.breakpoints.down(480)]: {
    fontSize: '14px',
    width: '32px',
    height: '32px',
  },
}));

const MyOfferSwiper = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
}));

const CustomSwiper = styled(Swiper)(({ theme }) => ({
  '.swiper-wrapper': {
    width: 'auto',
    gap: '10px',
  },
  '.swiper-slide': {
    width: 'auto',
  },
}));
