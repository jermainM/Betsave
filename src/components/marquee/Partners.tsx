import React from 'react';
import { Box, styled } from '@mui/material';
import Marquee from 'react-fast-marquee';
import VisaPng from '../../assets/partners/visa.png';
import Bet365Png from '../../assets/partners/bet365.png';
import BetitonPng from '../../assets/partners/betiton.png';
import LPng from '../../assets/partners/l.png';
import NPng from '../../assets/partners/n.png';
import NedsPng from '../../assets/partners/neds.png';
import SbPng from '../../assets/partners/sb.png';
import TabPng from '../../assets/partners/tab.png';
import ThumbupPng from '../../assets/partners/thumbup.png';

const FeaturedPartners: React.FC = () => {
  const Images = [
    VisaPng,
    NPng,
    Bet365Png,
    NedsPng,
    TabPng,
    LPng,
    SbPng,
    ThumbupPng,
    BetitonPng,
  ];
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Marquee
        gradient={true} // Remove gradient effect for a seamless look
        gradientColor="#0D1321"
        gradientWidth={'100px'}
        speed={100} // Adjust scroll speed
        direction="right" // Scroll direction
        loop={0}
        autoFill={true}
      >
        {Images.map((img, index) => (
          <ImageBox
            key={index}
            sx={{
              backgroundImage: `url(${img})`,
            }}
          />
        ))}
      </Marquee>
    </Box>
  );
};

const ImageBox = styled(Box)(({ theme }) => ({
  width: '90px',
  height: '90px',
  marginRight: '20px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

export default FeaturedPartners;
