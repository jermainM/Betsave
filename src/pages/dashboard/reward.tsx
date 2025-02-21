import { useState } from 'react';
import {
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Typography,
} from '@mui/material';

import { ChallengeCard } from '../../components/card/ChallengeCard';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Keyboard, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { ReferRewardClaimCard } from '../../components/card/ReferRewardClaimCard';
import { GreenRewardPng } from '../../constants/images';

interface ChallengeCardDataProps {
  initialTimer: number;
}

interface ReferCardDataProps {
  goal: number;
  current: number;
  earn: number;
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

  const chunkChallengeArray = (
    array: ChallengeCardDataProps[],
    chunkSize: number
  ) => {
    return array.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / chunkSize);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // Create a new subarray
      }
      resultArray[chunkIndex].push(item);
      return resultArray;
    }, [] as ChallengeCardDataProps[][]);
  };

  const chunkReferArray = (array: ReferCardDataProps[], chunkSize: number) => {
    return array.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / chunkSize);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // Create a new subarray
      }
      resultArray[chunkIndex].push(item);
      return resultArray;
    }, [] as ReferCardDataProps[][]);
  };

  const chunkedChallengeCardData = chunkChallengeArray(ChallengeCardData, 6);
  const chunkedReferCardData = chunkReferArray(ReferCardData, 6);

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
            Complete challenges to unlock cashback boosts and exclusive perks.{' '}
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
              {sortOption === 0
                ? 'Cashback Multiplier Challenges'
                : 'Referral Missions'}
            </LabelTitle>
            <LabelSubTitle>
              {sortOption === 0
                ? 'Boost Your Cashback by Completing Challenges and Unlock Amazing Rewards'
                : 'Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum '}
            </LabelSubTitle>
          </LabelContainer>
          <ActionContainer>
            <SortButtonContainer>
              <SortButton
                onClick={handleSortClick}
                size="small"
                aria-controls={isSortOpen ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isSortOpen ? 'true' : undefined}
              >
                <p>
                  Sort by: &nbsp;&nbsp;
                  <span>
                    {sortOption === 0
                      ? 'Cashback Challenges'
                      : 'Referral Missions'}
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
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => handleSortClose(0)}>
                  <MenuItemContent>Cashback Challenges</MenuItemContent>
                </MenuItem>
                <MenuItem onClick={() => handleSortClose(1)}>
                  <MenuItemContent>Referral Missions</MenuItemContent>
                </MenuItem>
              </Menu>
            </SortButtonContainer>
            <HeadingAction>
              <p>View All</p>
              <HeadingActionButton className="challenge-swiper-button-prev">
                <KeyboardArrowLeft />
              </HeadingActionButton>
              <HeadingActionButton className="challenge-swiper-button-next">
                <KeyboardArrowRight />
              </HeadingActionButton>
            </HeadingAction>
          </ActionContainer>
          <ChallengeSwiper>
            <CustomSwiper
              keyboard={{
                enabled: true,
              }}
              navigation={{
                nextEl: '.challenge-swiper-button-next',
                prevEl: '.challenge-swiper-button-prev',
              }}
              modules={[Keyboard, Pagination, Navigation, Autoplay]}
              className="mySwiper"
            >
              {sortOption === 0
                ? chunkedChallengeCardData.map((subcards, idx) => (
                    <SwiperSlide key={idx} style={{ width: '100%' }}>
                      <CardContainer>
                        {subcards.map((item) => (
                          <ChallengeCard initialTimer={item.initialTimer} />
                        ))}
                      </CardContainer>
                    </SwiperSlide>
                  ))
                : chunkedReferCardData.map((subcards, idx) => (
                    <SwiperSlide key={idx} style={{ width: '100%' }}>
                      <CardContainer>
                        {subcards.map((item) => (
                          <ReferRewardClaimCard
                            goal={item.goal}
                            current={item.current}
                            earn={item.earn}
                          />
                        ))}
                      </CardContainer>
                    </SwiperSlide>
                  ))}
            </CustomSwiper>
          </ChallengeSwiper>
        </ChallengeContainer>
      </RewardBoxContainer>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
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
  height: 'fit-content',
  [theme.breakpoints.down(680)]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
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

const HeadingTitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
}));

const HeadingContent = styled(Typography)(({ theme }) => ({
  color: '#627691',
  fontSize: '16px',
  [theme.breakpoints.down(480)]: {
    fontSize: '14px',
  },
}));

const RewardBoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const BackButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#171e31',
  borderRadius: '7px',
  border: '1px solid #627691',
  color: '#627691',
  padding: '6px 10px 6px 6px',
  textTransform: 'none',
  height: '28px',
  fontSize: '14px',
}));

const Label = styled(Typography)(({ theme }) => ({
  color: '#627691',
  fontSize: '14px',
  fontWeight: 'bold',
}));

const ChallengeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  [theme.breakpoints.down(480)]: {
    gap: '20px',
  },
}));

const LabelContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '4px',
}));

const LabelTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  color: '#fff',
  textAlign: 'center',
  fontWeight: 'bold',
}));

const LabelSubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#627691',
  textAlign: 'center',
}));

const ActionContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down(480)]: {
    flexDirection: 'column-reverse',
    gap: '20px',
    alignItems: 'center',
  },
}));

const SortButtonContainer = styled(Box)(({ theme }) => ({}));

const SortButton = styled(Button)(({ theme }) => ({
  height: '60px',
  padding: '12px 20px',
  backgroundColor: '#111827',
  textTransform: 'none',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  color: '#627691',
  span: {
    color: '#fff',
  },
  [theme.breakpoints.down(640)]: {
    padding: '12px',
    height: '50px',
  },
}));

const MenuItemContent = styled(Box)(({ theme }) => ({
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: '#627691',
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

const CardContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  width: '100%',
  gap: '20px',
  [theme.breakpoints.down(768)]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
}));

const CustomSwiper = styled(Swiper)(({ theme }) => ({
  '.swiper-wrapper': {
    width: 'auto',
  },
  '.swiper-slide': {
    width: 'auto',
  },
}));

const ChallengeSwiper = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
}));
