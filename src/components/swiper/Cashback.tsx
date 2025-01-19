import { Box, Button, styled } from '@mui/material';
import { CashbackCard } from '../card/CashbackCard';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Keyboard, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

export const CashbackSlider = () => {
  return (
    <CashbackSliderContainer>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
          el: '.cashback-swiper-pagination', // Ensuring pagination is styled correctly
        }}
        navigation={{
          nextEl: '.cashback-swiper-button-next',
          prevEl: '.cashback-swiper-button-prev',
        }}
        autoplay={{
          delay: 5000,
        }}
        modules={[Keyboard, Pagination, Navigation, Autoplay]}
        className="mySwiper"
        style={{ width: '100%' }}
      >
        <SwiperSlide>
          <CashbackSliderItem>
            <CashbackCard />
            <CashbackCard />
            <CashbackCard />
            <CashbackCard />
          </CashbackSliderItem>
        </SwiperSlide>
        <SwiperSlide>
          <CashbackSliderItem>
            <CashbackCard />
            <CashbackCard />
            <CashbackCard />
            <CashbackCard />
          </CashbackSliderItem>
        </SwiperSlide>
        <SwiperSlide>
          <CashbackSliderItem>
            <CashbackCard />
            <CashbackCard />
            <CashbackCard />
            <CashbackCard />
          </CashbackSliderItem>
        </SwiperSlide>
      </Swiper>
      <NavigationContainer>
        <SliderButton
          variant="contained"
          className="cashback-swiper-button-prev"
        >
          <KeyboardArrowLeft />
        </SliderButton>
        <PaginationController className="cashback-swiper-pagination" />
        <SliderButton
          variant="contained"
          className="cashback-swiper-button-next"
        >
          <KeyboardArrowRight />
        </SliderButton>
      </NavigationContainer>
    </CashbackSliderContainer>
  );
};

const CashbackSliderContainer = styled(Box)(({ theme }) => ({
  marginTop: '50px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  flexDirection: 'column',
  gap: '40px',
  [theme.breakpoints.down(1280)]: {
    marginTop: '20px',
  },
}));

const CashbackSliderItem = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 2fr)',
  gap: '20px',
  placeItems: 'center',
  [theme.breakpoints.down(768)]: {
    gridTemplateColumns: 'repeat(1, 2fr)',
  },
}));

const NavigationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '40px',
}));

const SliderButton = styled(Button)(({ theme }) => ({
  borderRadius: '10px',
  width: '50px',
  minWidth: 'inherit',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#141c30',
  color: '#fff',
  [theme.breakpoints.down(960)]: {
    width: '42px',
    height: '42px',
  },
  '::after': {
    display: 'none',
  },
  svg: {
    width: '1em',
    height: '1em',
  },
}));

const PaginationController = styled(Box)(({ theme }) => ({
  position: 'static',
}));
