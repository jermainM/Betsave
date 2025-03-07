import { useEffect, useState } from "react";
import { BetaCard } from "../card/BetaCard";
import { Box, styled } from "@mui/material";
import { Bet365Png, NedsPng, SbPng } from "../../constants/images";

export const BetaCardSlider = () => {
  const cards = [
    {
      id: 1,
      img: SbPng,
      title: <>Sign up and get rewarded</>,
      value: "3.75%",
      credit: 5,
    },
    {
      id: 2,
      img: Bet365Png,
      title: (
        <>
          Get <span>$100</span>
        </>
      ),
      value: "4.3%",
      credit: 5,
    },
    {
      id: 3,
      img: NedsPng,
      title: <>Earn cashback for every bet</>,
      value: "7%",
      credit: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to automatically shift the cards every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [cards.length]);
  return (
    <CardContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          width: "100%",
          height: "300px",
          overflow: "hidden",
        }}
      >
        {cards.map((card, index) => {
          // Calculate the relative position of each card
          const position = (index - currentIndex + cards.length) % cards.length;

          // Define the scaling and shifting logic
          const size = position === 1 ? 1 : 0.75; // Middle card size 1, others 0.75
          const offset = position === 1 ? 0 : position === 0 ? -100 : 100; // Move left/right

          return (
            <BetaCardContainer
              key={card.id}
              sx={{
                transform: `scale(${size}) translateX(${offset}%)`,
                transition: "transform 0.5s ease-in-out",
                position: "absolute",
                zIndex: `${size}`,
              }}
            >
              <BetaCard
                img={card.img}
                title={card.title}
                value={card.value}
                credit={card.credit}
              />
            </BetaCardContainer>
          );
        })}
      </Box>
    </CardContainer>
  );
};

const CardContainer = styled(Box)(({ theme }) => ({
  width: "504px",
  [theme.breakpoints.down(540)]: {
    width: "100%",
  },
}));

const BetaCardContainer = styled(Box)(({ theme }) => ({
  width: "250px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down(640)]: {
    width: "200px",
  },
}));
