import { Box, Rating, styled, Typography } from "@mui/material";
import { Bet365Logo, LockIcon } from "../../constants/images";
import { useEffect, useState } from "react";
import { offerService } from "../../api/services/offerService";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { casinoService } from "../../api/services/casinoService";
import { userService } from "../../api/services/userService";
import { IoCheckbox } from "react-icons/io5";

interface Partner {
  id: string;
  name: string;
  logo: string;
  userCount: number;
  isJoined: boolean;
}

const LoaderContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "240px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  background:
    "radial-gradient(circle at 50% 115%, rgba(14, 247, 169, 0.3) 0%, #0F3D3E 10% 10%, #141c30)",
  borderRadius: "15px",
  boxShadow: "0px 2px 3px 0px rgba(14, 247, 169,0.75)",
}));

const LoaderSpinner = styled(Box)(({ theme }) => ({
  width: "60px",
  height: "60px",
  border: `3px solid ${theme.palette.primary.main}`,
  borderTop: `3px solid transparent`,
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-3px",
    left: "-3px",
    right: "-3px",
    bottom: "-3px",
    borderRadius: "50%",
    border: "3px solid transparent",
    borderTop: "3px solid rgba(14, 247, 169, 0.3)",
    animation: "spin 2s linear infinite",
  },
}));

const LoaderText = styled(Typography)(({ theme }) => ({
  position: "absolute",
  bottom: "40px",
  color: theme.palette.primary.main,
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "1px",
}));

const BookMakerLoader = () => {
  return (
    <LoaderContainer>
      <LoaderSpinner />
      <LoaderText>Loading Partners</LoaderText>
    </LoaderContainer>
  );
};

export const PartnerList = () => {
  const [partnerList, setPartnerList] = useState<Partner[]>([]);
  const [numberOfUsers, setNumberOfUsers] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.session);

  const getPartnerList = async () => {
    try {
      setIsLoading(true);
      const response = await offerService.getOffers();
      const _partnerList = await Promise.all(
        response.data.map(async (item: any) => {
          const joinedStatus = await checkJoined(item._id);
          return {
            id: item._id,
            name: item.title,
            logo: item.image,
            userCount: item.userCount,
            isJoined: joinedStatus,
          };
        })
      );
      setPartnerList(_partnerList);
    } catch (error) {
      console.error("Error fetching partner list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUsersLength = async () => {
    try {
      const response = await userService.getUsers();
      const users = response.data;
      setNumberOfUsers(users.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsersLength();
    getPartnerList();
  }, []);

  const checkJoined = async (offerId: string) => {
    try {
      const response = await casinoService.checkJoined(offerId, user.betsaveId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <BookMakerTitleContainer>
        <BookMakerTitle>Partner Casinos</BookMakerTitle>
        <BookMakerSubTitle>
          Casinos you've joined through BETSAVE. Only connected partners are
          eligible for cashback rewards.
        </BookMakerSubTitle>
      </BookMakerTitleContainer>
      <BookMakerItemContainer>
        {isLoading ? (
          <BookMakerLoader />
        ) : (
          <>
            {partnerList.map((item) => {
              const rate =
                Number((item.userCount / numberOfUsers).toFixed(1)) * 5;
              return (
                <BookMakerItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  logo={item.logo}
                  rate={rate}
                  isJoined={item.isJoined}
                />
              );
            })}
            <BookMakerItem rate={3.8} isComing />
            <BookMakerItem rate={1.4} isComing />
          </>
        )}
      </BookMakerItemContainer>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

const BookMakerTitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
}));

const BookMakerTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: "#fff",
  fontWeight: "normal",
}));

const BookMakerSubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: "#627691",
}));

const BookMakerItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  marginTop: "20px",
  flexWrap: "wrap",
  [theme.breakpoints.down(840)]: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
  },
  [theme.breakpoints.down(768)]: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  [theme.breakpoints.down(560)]: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.down(380)]: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}));

interface BookMakerItemProps {
  id?: string;
  name?: string;
  logo?: string;
  rate: number;
  isComing?: boolean;
  isJoined?: boolean;
}

const BookMakerItem = (props: BookMakerItemProps) => {
  const { id, name, logo = Bet365Logo, rate, isComing, isJoined } = props;
  return (
    <BookMakerItemWrapper>
      {isComing && (
        <BookMakerTrasparent>
          <LockImg src={LockIcon} alt="lock-icon" />
          <LockText>Coming Soon </LockText>
        </BookMakerTrasparent>
      )}
      {isJoined && (
        <ItemBadge>
          Connected <IoCheckbox />
        </ItemBadge>
      )}
      <ItemsBox>
        <ItemImg src={logo} alt="item-img" />
        <ItemTitle>{name}</ItemTitle>
      </ItemsBox>
      <RatingContainer>
        <RatingTitle>Rating {rate}</RatingTitle>
        <BetRating value={rate} precision={0.5} readOnly />
      </RatingContainer>
    </BookMakerItemWrapper>
  );
};

const BookMakerItemWrapper = styled(Box)(({ theme }) => ({
  width: "165px",
  height: "240px",
  borderRadius: "15px",
  background:
    "radial-gradient(circle at 50% 115%, rgba(14, 247, 169, 0.3) 0%, #0F3D3E 10% 10%, #141c30)",
  boxShadow: "0px 2px 3px 0px rgba(14, 247, 169,0.75)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
  padding: "20px",
  [theme.breakpoints.down(840)]: {
    width: "100%",
  },
}));

const ItemBadge = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  padding: "4px 8px",
  fontSize: "12px",
  color: "#1ae5a1",
  width: "fit-content",
  borderRadius: "7px",
  backgroundColor: "#102A33",
  position: "absolute",
  right: "12px",
  top: "12px",
  svg: {
    fontSize: "16px",
  },
}));

const ItemsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  marginTop: "40px",
}));

const ItemTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: "#13B17F",
  fontWeight: "700",
  span: {
    color: "#F5DB1F",
  },
}));

const RatingContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "5px",
}));

const RatingTitle = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "18px",
}));

const ItemImg = styled("img")(({ theme }) => ({
  width: "105px",
  height: "auto",
  borderRadius: "5px",
}));

const BetRating = styled(Rating)(({ theme }) => ({
  fontSize: "20px",
  color: "#fffc00",
}));

const BookMakerTrasparent = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  opacity: "1",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "15px",
  padding: "20px",
  backdropFilter: "blur(10px)",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
}));

const LockImg = styled("img")(({ theme }) => ({
  width: "45px",
  height: "auto",
}));

const LockText = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: "#fff",
  textAlign: "center",
}));
