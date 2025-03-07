import { useState } from "react";
import {
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Typography,
} from "@mui/material";

import { ChallengeCard } from "../../components/card/ChallengeCard";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Keyboard, Pagination, Navigation, Autoplay } from "swiper/modules";
import { ReferRewardClaimCard } from "../../components/card/ReferRewardClaimCard";
import {
  BronzeImg,
  GoldenImg,
  GreenRewardPng,
  PlatinumImg,
  SilverImg,
} from "../../constants/images";
import { StreakCard } from "../../components/card/StreakCard";
import { LoyaltyBar } from "../../components/progressbar/LoyaltyBar";

interface ChallengeCardDataProps {
  initialTimer: number;
}

interface ReferCardDataProps {
  goal: number;
  current: number;
  earn: number;
}

interface StreakCardDataProps {
  hasBadge?: boolean;
  streak: number;
  subTitle: string;
}

const ChallengeCardData = [
  {
    initialTimer: 78591,
  },
  {
    initialTimer: 54895,
  },
  {
    initialTimer: 0,
  },
  {
    initialTimer: 12568,
  },
  {
    initialTimer: 54892,
  },
  {
    initialTimer: 0,
  },
  {
    initialTimer: 45265,
  },
  {
    initialTimer: 76621,
  },
  {
    initialTimer: 12652,
  },
  {
    initialTimer: 0,
  },
  {
    initialTimer: 32652,
  },
  {
    initialTimer: 48565,
  },
  {
    initialTimer: 0,
  },
  {
    initialTimer: 46523,
  },
];

const ReferCardData = [
  {
    goal: 1,
    current: 1,
    earn: 10,
  },
  {
    goal: 3,
    current: 1,
    earn: 15,
  },
  {
    goal: 5,
    current: 1,
    earn: 20,
  },
  {
    goal: 7,
    current: 1,
    earn: 25,
  },

  {
    goal: 10,
    current: 1,
    earn: 30,
  },
  {
    goal: 14,
    current: 1,
    earn: 35,
  },
  {
    goal: 40,
    current: 1,
    earn: 10,
  },
  {
    goal: 45,
    current: 1,
    earn: 10,
  },
  {
    goal: 50,
    current: 1,
    earn: 10,
  },
  {
    goal: 55,
    current: 1,
    earn: 10,
  },
  {
    goal: 60,
    current: 1,
    earn: 10,
  },
  {
    goal: 65,
    current: 1,
    earn: 10,
  },
  {
    goal: 70,
    current: 1,
    earn: 10,
  },
];

const StreakCardData = [
  {
    hasBadge: true,
    streak: 3,
    subTitle: "+1% Cashback",
  },
  {
    streak: 5,
    subTitle: "$10 Free Bet",
  },
  {
    streak: 10,
    subTitle: "+3% Cashback",
  },
  {
    streak: 15,
    subTitle: "$25 Free Bet",
  },
  {
    streak: 30,
    subTitle: "+5% Cashback",
  },
  {
    streak: 3,
    subTitle: "+1% Cashback",
  },
  {
    streak: 5,
    subTitle: "$10 Free Bet",
  },
  {
    streak: 10,
    subTitle: "+3% Cashback",
  },
];

export const Reward = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortOption, setSortOption] = useState(0);
  const isSortOpen = Boolean(anchorEl);

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = (idx: number) => {
    setSortOption(idx);
    setAnchorEl(null);
  };

  const chunkArray = <T,>(array: T[], chunkSize: number): T[][] => {
    return array.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / chunkSize);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }
      resultArray[chunkIndex].push(item);
      return resultArray;
    }, [] as T[][]);
  };

  const chunkedChallengeCardData = chunkArray<ChallengeCardDataProps>(
    ChallengeCardData,
    6,
  );
  const chunkedReferCardData = chunkArray<ReferCardDataProps>(ReferCardData, 6);

  const chunkedStreakCardData = chunkArray<StreakCardDataProps>(
    StreakCardData,
    10,
  );

  return (
    <Container>
      <Heading>
        <HeadingTitleContainer>
          <HeadingTitle>
            <HeadingTitleIcon>
              <img src={GreenRewardPng} alt="title-icon" />
            </HeadingTitleIcon>
            Rewards
          </HeadingTitle>
          <HeadingContent>
            Complete challenges to unlock cashback boosts and exclusive perks.{" "}
            The more you play, the more you earn!
          </HeadingContent>
        </HeadingTitleContainer>
      </Heading>
      <RewardBoxContainer>
        <ButtonContainer>
          <BackButton>
            <KeyboardArrowLeft fontSize="small" />
            Back
          </BackButton>
          <Label>Affiliates</Label>
        </ButtonContainer>
        <ChallengeContainer>
          <LabelContainer>
            <LabelTitle>
              {sortOption === 0 && "Cashback Multiplier Challenges"}
              {sortOption === 1 && "Referral Missions"}
              {sortOption === 2 && "Streak Bonuses"}
              {sortOption === 3 && "Loyalty Program"}
            </LabelTitle>
            <LabelSubTitle>
              {sortOption === 0 &&
                "Boost Your Cashback by Completing Challenges and Unlock Amazing Rewards"}
              {sortOption === 1 &&
                "Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum "}
              {sortOption === 2 && "Bet consistently and earn extra rewards!"}
              {sortOption === 3 && "The more you bet, the higher your rewards."}
            </LabelSubTitle>
          </LabelContainer>
          <ActionContainer>
            <SortButtonContainer>
              <SortButton
                onClick={handleSortClick}
                size="small"
                aria-controls={isSortOpen ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isSortOpen ? "true" : undefined}
              >
                <p>
                  Sort by: &nbsp;&nbsp;
                  <span>
                    {sortOption === 0 && "Cashback Challenges"}
                    {sortOption === 1 && "Referral Missions"}
                    {sortOption === 2 && "Streak Bonuses"}
                    {sortOption === 3 && "Loyalty Program"}
                  </span>
                </p>
                <KeyboardArrowDown />
              </SortButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={isSortOpen}
                onClose={() => setAnchorEl(null)}
                onClick={() => setAnchorEl(null)}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              >
                <MenuItem onClick={() => handleSortClose(0)}>
                  <MenuItemContent>Cashback Challenges</MenuItemContent>
                </MenuItem>
                <MenuItem onClick={() => handleSortClose(1)}>
                  <MenuItemContent>Referral Missions</MenuItemContent>
                </MenuItem>
                <MenuItem onClick={() => handleSortClose(2)}>
                  <MenuItemContent>Streak Bonuses</MenuItemContent>
                </MenuItem>
                <MenuItem onClick={() => handleSortClose(3)}>
                  <MenuItemContent>Loyalty Program</MenuItemContent>
                </MenuItem>
              </Menu>
            </SortButtonContainer>
            {sortOption !== 3 && (
              <HeadingAction>
                <p>View All</p>
                <HeadingActionButton className="challenge-swiper-button-prev">
                  <KeyboardArrowLeft />
                </HeadingActionButton>
                <HeadingActionButton className="challenge-swiper-button-next">
                  <KeyboardArrowRight />
                </HeadingActionButton>
              </HeadingAction>
            )}
          </ActionContainer>
          {sortOption !== 3 && (
            <ChallengeSwiper>
              <CustomSwiper
                keyboard={{
                  enabled: true,
                }}
                navigation={{
                  nextEl: ".challenge-swiper-button-next",
                  prevEl: ".challenge-swiper-button-prev",
                }}
                modules={[Keyboard, Pagination, Navigation, Autoplay]}
                className="mySwiper"
              >
                {sortOption === 0 &&
                  chunkedChallengeCardData.map((subcards, idx) => (
                    <SwiperSlide key={idx} style={{ width: "100%" }}>
                      <CardContainer>
                        {subcards.map((item, subIdx) => (
                          <ChallengeCard
                            initialTimer={item.initialTimer}
                            key={subIdx}
                          />
                        ))}
                      </CardContainer>
                    </SwiperSlide>
                  ))}
                {sortOption === 1 &&
                  chunkedReferCardData.map((subcards, idx) => (
                    <SwiperSlide key={idx} style={{ width: "100%" }}>
                      <CardContainer>
                        {subcards.map((item, subIdx) => (
                          <ReferRewardClaimCard
                            goal={item.goal}
                            current={item.current}
                            earn={item.earn}
                            key={subIdx}
                          />
                        ))}
                      </CardContainer>
                    </SwiperSlide>
                  ))}
                {sortOption === 2 &&
                  chunkedStreakCardData.map((subcards, idx) => (
                    <SwiperSlide key={idx} style={{ width: "100%" }}>
                      <StreakCardContainer>
                        {subcards.map((item, subIdx) => (
                          <StreakCard
                            hasBadge={item.hasBadge}
                            streak={item.streak}
                            subTitle={item.subTitle}
                            key={subIdx}
                          />
                        ))}
                      </StreakCardContainer>
                    </SwiperSlide>
                  ))}
              </CustomSwiper>
            </ChallengeSwiper>
          )}
          {sortOption === 3 && <LoyaltyProgram />}
        </ChallengeContainer>
      </RewardBoxContainer>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  width: "100%",
}));

const Heading = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "fit-content",
  [theme.breakpoints.down(680)]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
  },
}));

const HeadingTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "24px",
  color: "#fff",
  fontWeight: "bold",
}));

const HeadingTitleIcon = styled(Box)(({ theme }) => ({
  width: "36px",
  height: "36px",
  img: {
    width: "100%",
    height: "auto",
  },
}));

const HeadingTitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
}));

const HeadingContent = styled(Typography)(({ theme }) => ({
  color: "#627691",
  fontSize: "16px",
  [theme.breakpoints.down(480)]: {
    fontSize: "14px",
  },
}));

const RewardBoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));

const BackButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#171e31",
  borderRadius: "7px",
  border: "1px solid #627691",
  color: "#627691",
  padding: "6px 10px 6px 6px",
  textTransform: "none",
  height: "28px",
  fontSize: "14px",
}));

const Label = styled(Typography)(({ theme }) => ({
  color: "#627691",
  fontSize: "14px",
  fontWeight: "bold",
}));

const ChallengeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  [theme.breakpoints.down(480)]: {
    gap: "20px",
  },
}));

const LabelContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "4px",
}));

const LabelTitle = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  color: "#fff",
  textAlign: "center",
  fontWeight: "bold",
}));

const LabelSubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#627691",
  textAlign: "center",
}));

const ActionContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down(480)]: {
    flexDirection: "column-reverse",
    gap: "20px",
    alignItems: "center",
  },
}));

const SortButtonContainer = styled(Box)(({ theme }) => ({}));

const SortButton = styled(Button)(({ theme }) => ({
  height: "60px",
  padding: "12px 20px",
  backgroundColor: "#111827",
  textTransform: "none",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  color: "#627691",
  span: {
    color: "#fff",
  },
  [theme.breakpoints.down(640)]: {
    padding: "12px",
    height: "50px",
  },
}));

const MenuItemContent = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "#627691",
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

const CardContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  width: "100%",
  gap: "20px",
  [theme.breakpoints.down(768)]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}));

const StreakCardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  [theme.breakpoints.down(1500)]: {
    justifyContent: "center",
  },
}));

const CustomSwiper = styled(Swiper)(({ theme }) => ({
  ".swiper-wrapper": {
    width: "auto",
  },
  ".swiper-slide": {
    width: "auto",
  },
}));

const ChallengeSwiper = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
}));

const LoyaltyProgram = () => {
  interface Tier {
    name: string;
    cashback: string;
    perks: string;
  }

  const tiers: Tier[] = [
    { name: "Bronze", cashback: "2.5%", perks: "Bronze Perks" },
    { name: "Silver", cashback: "5%", perks: "Silver Perks" },
    { name: "Gold", cashback: "7%", perks: "Gold Perks" },
    { name: "Platinum", cashback: "10%", perks: "Platinum Perks" },
  ];

  const strcutureData = [
    { img: BronzeImg, locked: false },
    { img: BronzeImg, locked: true },
    { img: BronzeImg, locked: true },
    { img: BronzeImg, locked: true },
  ];

  return (
    <LoyaltyContainer>
      <ProgressSection>
        <LoyaltyBar value={40} unit="%" />
      </ProgressSection>
      <TierTitle>Benefits of Each Tier</TierTitle>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <th>All Tires</th>
              <th>Cashback Percentage</th>
              <th>VIP Perks</th>
            </tr>
          </TableHeader>
          <TableBody>
            {tiers.map((tier, idx) => (
              <tr key={idx}>
                <td>{tier.name}</td>
                <td>{tier.cashback}</td>
                <td>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PerksButton>{tier.perks}</PerksButton>
                  </Box>
                </td>
              </tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StructureContainer>
        <StructureTitle>Tiered Structure</StructureTitle>
        <StructureWrapper>
          {strcutureData.map((item, idx) => (
            <Structure key={idx}>
              <StructureImage
                src={item.img}
                alt="structure-image"
                locked={item.locked ? 1 : 0}
              />
              <StructureButton disabled={item.locked}>
                {item.locked ? "Locked" : "Unlocked"}
              </StructureButton>
            </Structure>
          ))}
        </StructureWrapper>
      </StructureContainer>
    </LoyaltyContainer>
  );
};

const LoyaltyContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  alignItems: "center",
  width: "100%",
}));

const ProgressSection = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "160px",
  borderRadius: "15px",
  background:
    "radial-gradient(circle at 9% 0%, rgba(14, 247, 169, 0.6) -82%, #141c30 45%)",
  padding: "20px",
}));

const TierTitle = styled(Typography)(({ theme }) => ({
  fontSize: "28px",
  marginTop: "40px",
  marginBottom: "30px",
  fontWeight: "bold",
  [theme.breakpoints.down(480)]: {
    fontSize: "24px",
    marginTop: "30px",
    marginBottom: "20px",
  },
}));

const PerksButton = styled(Button)(({ theme }) => ({
  width: "220px",
  height: "54px",
  borderRadius: "12px",
  backgroundColor: "#1AE5A1",
  color: "#102A33",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "none",
  fontSize: "20px",
  fontWeight: "bold",
  [theme.breakpoints.down(640)]: {
    width: "160px",
    height: "42px",
    fontSize: "16px",
  },
}));

const TableContainer = styled(Box)(({ theme }) => ({
  borderRadius: "12px",
  overflow: "auto",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  width: "100%",
}));

const Table = styled("table")(({ theme }) => ({
  width: "100%",
  borderRadius: "12px",
  borderCollapse: "collapse",
  minWidth: "500px",
}));

const TableHeader = styled("thead")(({ theme }) => ({
  tr: {
    backgroundColor: "#121929",
    th: {
      padding: "12px 8px",
      textAlign: "center",
      fontSize: "18px",
      color: "#1AE5A1",
      fontWeight: "bold",
      borderCollapse: "collapse",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      "&:first-child": {
        borderTopLeftRadius: "12px",
      },
      "&:last-child": {
        borderTopRightRadius: "12px",
      },
      [theme.breakpoints.down(640)]: {
        fontSize: "16px",
        padding: "8px 4px",
      },
    },
  },
}));

const TableBody = styled("tbody")(({ theme }) => ({
  tr: {
    td: {
      padding: "12px 8px",
      fontSize: "18px",
      color: "#fff",
      textAlign: "center",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderCollapse: "collapse",
      "&:first-child": {
        borderBottomLeftRadius: "12px",
      },
      "&:last-child": {
        borderBottomRightRadius: "12px",
      },
      [theme.breakpoints.down(640)]: {
        fontSize: "16px",
        padding: "8px 4px",
      },
    },
  },
}));

const StructureContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
}));

const StructureTitle = TierTitle;

const StructureWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "15px",
  justifyContent: "center",
  [theme.breakpoints.down(1710)]: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 2fr)",
  },
  [theme.breakpoints.down(720)]: {
    gap: "10px",
  },
  [theme.breakpoints.down(640)]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}));

const Structure = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  [theme.breakpoints.down(720)]: {
    gap: "10px",
  },
}));

const StructureImage = styled("img")<{ locked: number }>(
  ({ theme, locked }) => ({
    width: "320px",
    height: "auto",
    borderRadius: "20px",
    filter: locked === 1 ? "grayScale(100%)" : "none",
    [theme.breakpoints.down(720)]: {
      width: "280px",
    },
    [theme.breakpoints.down(640)]: {
      width: "320px",
    },
    [theme.breakpoints.down(380)]: {
      width: "100%",
    },
  }),
);

const StructureButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "54px",
  borderRadius: "12px",
  backgroundColor: "#1AE5A1",
  color: "#102A33",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "none",
  fontSize: "20px",
  fontWeight: "bold",
  ":disabled": {
    backgroundColor: "#172034",
    color: "#fff",
    cursor: "no-drop",
    pointerEvents: "inherit",
  },
  [theme.breakpoints.down(720)]: {
    height: "42px",
    fontSize: "16px",
  },
}));
