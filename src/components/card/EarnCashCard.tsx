import { Box, styled, Typography } from "@mui/material";

interface EarnCashbackCardProps {
  isFull?: boolean;
  img: string;
  icon: string;
  title: string;
  content: string;
}

export const EarnCashbackCard = (props: EarnCashbackCardProps) => {
  const { isFull, img, icon, title, content } = props;
  return (
    <EarnCashbackCardContainer>
      <EarnCashbackImgWrapper>
        {isFull ? (
          <FullBackground src={img} alt="earn-cashback-bg" />
        ) : (
          <Background src={img} alt="earn-cashback-bg" />
        )}
      </EarnCashbackImgWrapper>
      <EarnCashbackContent>
        <EarnCashbackTitle>
          <Img src={icon} alt="earn-img" />
          {title}
        </EarnCashbackTitle>
        <EarnCashbackSubTitle>{content}</EarnCashbackSubTitle>
      </EarnCashbackContent>
    </EarnCashbackCardContainer>
  );
};

const EarnCashbackCardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

const EarnCashbackImgWrapper = styled(Box)(({ theme }) => ({
  height: "350px",
  borderRadius: "15px",
  // backgroundColor: '#141c30',
  background:
    "radial-gradient(circle at 55% 90%, rgba(14, 247, 169, 0.3) 0%, #0F3D3E, #081B1F)",
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.down(1380)]: {
    height: "300px",
  },
  [theme.breakpoints.down(1180)]: {
    width: "100%",
    height: "280px",
  },
  [theme.breakpoints.down(1024)]: {
    height: "350px",
  },

  [theme.breakpoints.down(540)]: {
    height: "330px",
  },

  [theme.breakpoints.down(370)]: {
    height: "280px",
  },
}));

const Background = styled("img")(({ theme }) => ({
  width: "80%",
  height: "auto",
  position: "absolute",
  bottom: "-30px",
  left: "30px",
  [theme.breakpoints.down(1024)]: {
    width: "380px",
    left: "20%",
  },
  [theme.breakpoints.down(540)]: {
    width: "80%",
    left: "20%",
  },
  [theme.breakpoints.down(480)]: {
    width: "100%",
    left: "0",
  },
}));

const EarnCashbackContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
}));

const EarnCashbackTitle = styled(Box)(({ theme }) => ({
  fontSize: "22px",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  fontWeight: "bold",
  [theme.breakpoints.down(640)]: {
    fontSize: "18px",
  },
}));

const Img = styled("img")(({ theme }) => ({
  width: "24px",
  height: "24px",
}));

const EarnCashbackSubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  color: "#627691",
  textAlign: "center",
  height: "100px",
}));

const FullBackground = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
}));
