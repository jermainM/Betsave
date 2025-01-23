import { Box, Button, IconButton, styled, Typography } from '@mui/material';
import React from 'react';
import { DiAndroid } from 'react-icons/di';
import { FaCircleCheck } from 'react-icons/fa6';
import { FaDesktop, FaApple } from 'react-icons/fa';
import { BsFire } from 'react-icons/bs';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { CashOfferCard } from '../../components/card/CashOfferCard';

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

export const Cashback = () => {
  return (
    <CashbackContainer>
      <CashbackHeader>
        <CashbackHeaderText>
          Earn <span>on</span>
        </CashbackHeaderText>
        <CashbackBadgeWrapper>
          <CashbackBadge icon={<DiAndroid />} text={'Android'} />
          <CashbackBadge icon={<FaDesktop />} text={'Desktop'} />
          <CashbackBadge icon={<FaApple />} text={'iOS'} />
        </CashbackBadgeWrapper>
      </CashbackHeader>
      <CashbackContent>
        <CashbackContentHeader>
          <CashbackContentTitle>
            <CashbackTitleIcon>
              <BsFire />
            </CashbackTitleIcon>
            Cashback Offers
          </CashbackContentTitle>
          <CashbackContentAction>
            <p>View All</p>
            <CashbackNavButton className="cashoffer-swiper-button-prev">
              <KeyboardArrowLeft />
            </CashbackNavButton>
            <CashbackNavButton className="cashoffer-swiper-button-next">
              <KeyboardArrowRight />
            </CashbackNavButton>
          </CashbackContentAction>
        </CashbackContentHeader>
        <CashOfferSwiper>
          <CustomSwiper
            slidesPerView={'auto'}
            freeMode={true}
            keyboard={{
              enabled: true,
            }}
            navigation={{
              nextEl: '.cashoffer-swiper-button-next',
              prevEl: '.cashoffer-swiper-button-prev',
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
        </CashOfferSwiper>
      </CashbackContent>
    </CashbackContainer>
  );
};

const CashbackContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  width: '100%',
}));

const CashbackHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  [theme.breakpoints.down(640)]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const CashbackHeaderText = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  color: '#fff',
  fontWeight: '600',
  span: {
    color: '#627691',
    fontSize: '18px',
    fontWeight: '500',
  },
}));

const CashbackBadgeWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
}));

interface CashbackBadgeIcon {
  icon: React.ReactNode;
  text: string;
}

const CashbackBadge = (props: CashbackBadgeIcon) => {
  const { icon, text } = props;
  return (
    <CashbackBadgeContainer>
      <CashbackIcon>{icon}</CashbackIcon>
      <CashbackText>{text}</CashbackText>
      <CashbackStatusIcon>
        <FaCircleCheck />
      </CashbackStatusIcon>
    </CashbackBadgeContainer>
  );
};

const CashbackBadgeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 10px',
  borderRadius: '24px',
  backgroundColor: '#171e31',
}));

const CashbackIcon = styled(Box)(({ theme }) => ({
  color: '#fff',
  fontSize: '20px',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down(480)]: {
    fontSize: '16px',
  },
}));

const CashbackText = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: '#627691',
  [theme.breakpoints.down(480)]: {
    fontSize: '16px',
  },
}));

const CashbackStatusIcon = styled(Box)(({ theme }) => ({
  color: '#1ae5a1',
  fontSize: '20px',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down(480)]: {
    fontSize: '16px',
  },
}));

const CashbackContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  gap: '10px',
}));

const CashbackContentHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  [theme.breakpoints.down(390)]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
  },
}));

const CashbackContentTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '18px',
  color: '#fff',
  [theme.breakpoints.down(480)]: {
    fontSize: '16px',
    gap: '8px',
  },
}));

const CashbackTitleIcon = styled(Box)(({ theme }) => ({
  fontSize: '24px',
  color: '#1ae5a1',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down(480)]: {
    fontSize: '20px',
  },
}));

const CashbackContentAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  color: '#627691',
  fontSize: '18px',
  [theme.breakpoints.down(480)]: {
    fontSize: '14px',
  },
}));

const CashbackNavButton = styled(IconButton)(({ theme }) => ({
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

const CashOfferSwiper = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
}));

const CashOfferCardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
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
