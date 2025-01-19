import { Box, Button, styled } from '@mui/material';
import { WhyChooseCard } from '../card/WhyChooseCard';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Keyboard, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import { STATIC_DATA } from '../../contants/static-data';

interface whychoose {
  img: string;
  title: string;
  content: string;
}

const chunkArray = (arr: whychoose[], chunkSize: number) => {
  let result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  const lastChunk = result[result.length - 1];
  if (lastChunk.length < chunkSize) {
    const remainingItems = arr.slice(0, chunkSize - lastChunk.length); // Get the remaining items to fill the chunk
    result[result.length - 1] = lastChunk.concat(remainingItems); // Add them to the last chunk
  }

  return result;
};

export const WhyChooseSwiper = () => {
  const chunks = chunkArray(STATIC_DATA.whychoose, 4);
  return (
    <WhyChooseSwiperContainer>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
          el: '.whychoose-swiper-pagination', // Ensuring pagination is styled correctly
        }}
        navigation={{
          nextEl: '.whychoose-swiper-button-next',
          prevEl: '.whychoose-swiper-button-prev',
        }}
        modules={[Keyboard, Pagination, Navigation, Autoplay]}
        className="mySwiper"
        autoplay={{
          delay: 5000,
        }}
        style={{ width: '100%' }}
      >
        {chunks.map((chunk, index) => (
          <SwiperSlide key={index}>
            <WhyChooseSwiperItem>
              {chunk.map((item, subIndex) => (
                <WhyChooseCard
                  key={subIndex}
                  img={item.img}
                  title={item.title}
                  content={item.content}
                />
              ))}
            </WhyChooseSwiperItem>
          </SwiperSlide>
        ))}
      </Swiper>
      <NavigationContainer>
        <SliderButton
          variant="contained"
          className="whychoose-swiper-button-prev"
        >
          <KeyboardArrowLeft />
        </SliderButton>
        <PaginationController className="whychoose-swiper-pagination" />
        <SliderButton
          variant="contained"
          className="whychoose-swiper-button-next"
        >
          <KeyboardArrowRight />
        </SliderButton>
      </NavigationContainer>
    </WhyChooseSwiperContainer>
  );
};

const WhyChooseSwiperContainer = styled(Box)(({ theme }) => ({
  marginTop: '50px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: '40px',
  flexDirection: 'column',
  [theme.breakpoints.down(1280)]: {
    marginTop: '20px',
  },
}));

const WhyChooseSwiperItem = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 2fr)',
  gap: '20px',
  [theme.breakpoints.down(768)]: {
    gridTemplateColumns: 'repeat(1, 2fr)',
  },
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

const NavigationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '40px',
}));

const PaginationController = styled(Box)(({ theme }) => ({
  position: 'static',
}));
