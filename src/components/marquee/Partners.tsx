import React from "react";
import { Box, styled } from "@mui/material";
import Marquee from "react-fast-marquee";
import {
  Bet365Png,
  BetitonPng,
  LPng,
  NedsPng,
  NPng,
  SbPng,
  TabPng,
  ThumbupPng,
  VisaPng,
} from "../../constants/images";

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
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Marquee
        gradient={true} // Remove gradient effect for a seamless look
        gradientColor="#0D1321"
        gradientWidth={"100px"}
        speed={100} // Adjust scroll speed
        direction="right" // Scroll direction
        loop={0}
        autoFill={true}
      >
        {Images.map((img, index) => (
          <ImageBox
            key={"Partner-" + index}
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
  width: "90px",
  height: "90px",
  marginRight: "20px",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

export default FeaturedPartners;
