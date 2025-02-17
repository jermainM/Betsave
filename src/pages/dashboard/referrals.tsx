import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem, styled, Typography } from '@mui/material';
import { FaUsers } from 'react-icons/fa';
import { FaMoneyBills } from 'react-icons/fa6';
import { KeyboardArrowDown, KeyboardArrowLeft } from '@mui/icons-material';
import { BiSolidEditAlt } from 'react-icons/bi';
import { FaSackDollar } from 'react-icons/fa6';
import { IoAnalyticsSharp } from 'react-icons/io5';
import {
  FaYoutube,
  FaTwitter,
  FaTiktok,
  FaFacebookF,
  FaTelegramPlane,
} from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { ReferralTable } from '../../components/table/referral';
import { ReferralChart } from '../../components/chart/referral';
import { ReferralLink } from '../../components/link/referral';
import { TempUserIcon } from '../../constants/images';

export const Referrals = () => {
  const [referCode, setReferCode] = useState('betsave.com/r/8e4df6');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortOption, setSortOption] = useState(0);
  const isSortOpen = Boolean(anchorEl);
  const [selected, setSelected] = useState(0);

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSortClose = (idx: number) => {
    setSortOption(idx);
    setAnchorEl(null);
  };

  const handleOptionSelect = (index: number) => {
    setSelected(index);
  };

  const options = ['Week', 'Monthly', 'Yearly'];
  return (
    <Container>
      <ReferralsContainer>
        <ButtonContainer>
          <BackButton>
            <KeyboardArrowLeft fontSize="small" />
            Back
          </BackButton>
          <Label>Affiliates</Label>
        </ButtonContainer>
        <ReferralsContent>
          <ReferralsAction>
            <ClaimCardContainer>
              <UserAvatar>
                <AvatarImg src={TempUserIcon} alt="avatar-img" />
              </UserAvatar>
              <CardContent>
                <UserIDContainer>
                  <UserID>@abirdesigns</UserID>
                  <UserEmail>abirdesigns@gmail.com</UserEmail>
                </UserIDContainer>
                <UserInfoContainer>
                  <UserInfoItem
                    badge={<TiersBadge>1</TiersBadge>}
                    content="tiers"
                  />
                  <UserInfoItem
                    badge={<CommissionBadge>5%</CommissionBadge>}
                    content="commission"
                  />
                </UserInfoContainer>
                <ClaimSection>
                  <ClaimIcon>
                    <FaMoneyBills style={{ width: '100%', height: '100%' }} />
                  </ClaimIcon>
                  <ClaimInfo>
                    <ClaimValue>$62.41</ClaimValue>
                    <ClaimStatus>Available</ClaimStatus>
                  </ClaimInfo>
                  <ClaimButton>Claim</ClaimButton>
                </ClaimSection>
              </CardContent>
            </ClaimCardContainer>
            <ReferralCardContainer>
              <ReferralCardTitle>Your Referral link</ReferralCardTitle>
              <ReferralCopyContainer>
                <ReferralCode
                  isEditable={false}
                  value={referCode}
                  onChange={(value) => setReferCode(value)}
                />
                <ReferralCopyAction>
                  <EditButton>
                    <BiSolidEditAlt />
                  </EditButton>
                  <CopyButton>Copy</CopyButton>
                </ReferralCopyAction>
              </ReferralCopyContainer>
              <ReferralShareContainer>
                <ReferralShareTitle>
                  Share your referral link
                </ReferralShareTitle>
                <ReferralShareBox>
                  <ReferralLink
                    icon={
                      <FaYoutube style={{ width: '100%', height: '100%' }} />
                    }
                    link="https://youtube.com/"
                  />
                  <ReferralLink
                    icon={
                      <FaTwitter style={{ width: '100%', height: '100%' }} />
                    }
                    link="https://x.com/"
                  />
                  <ReferralLink
                    icon={
                      <AiFillInstagram
                        style={{ width: '100%', height: '100%' }}
                      />
                    }
                    link="https://instagram.com/"
                  />
                  <ReferralLink
                    icon={
                      <FaTiktok style={{ width: '100%', height: '100%' }} />
                    }
                    link="https://tiktok.com/"
                  />
                  <ReferralLink
                    icon={
                      <FaFacebookF style={{ width: '100%', height: '100%' }} />
                    }
                    link="https://facebook.com/"
                  />
                  <ReferralLink
                    icon={
                      <FaTelegramPlane
                        style={{ width: '100%', height: '100%' }}
                      />
                    }
                    link="https://telegram.com/"
                  />
                </ReferralShareBox>
              </ReferralShareContainer>
            </ReferralCardContainer>
            <ReferralItemContainer>
              <ReferralsInfo
                icon={<FaUsers style={{ width: '24px', height: '24px' }} />}
                value={342600}
                content={'Active Bettors'}
              />
              <ReferralsInfo
                icon={<FaUsers style={{ width: '24px', height: '24px' }} />}
                value={342600}
                content={'Total Betting Volume'}
              />
              <ReferralsInfo
                icon={<FaUsers style={{ width: '24px', height: '24px' }} />}
                value={342600}
                content={'New Bettors'}
              />
            </ReferralItemContainer>
          </ReferralsAction>
          <ReferralsInfoContainer>
            <ReferralsInfoItemWrapper>
              <ReferralsInfo
                icon={<FaUsers style={{ width: '24px', height: '24px' }} />}
                value={342600}
                content={'Total Commission Earned'}
              />
              <ReferralsInfo
                icon={<FaUsers style={{ width: '24px', height: '24px' }} />}
                value={342600}
                content={'Last 30 Days Earnings'}
              />
              <ReferralsInfo
                icon={<FaUsers style={{ width: '24px', height: '24px' }} />}
                value={342600}
                content={'Total Bettors Referred'}
              />
            </ReferralsInfoItemWrapper>
            <ReferralsInfoItemMobile>
              <ReferralsInfo
                icon={<FaUsers style={{ width: '24px', height: '24px' }} />}
                value={342600}
                content={'Active Bettors'}
              />
              <ReferralsInfo
                icon={<FaUsers style={{ width: '24px', height: '24px' }} />}
                value={342600}
                content={'Total Betting Volume'}
              />
              <ReferralsInfo
                icon={<FaUsers style={{ width: '24px', height: '24px' }} />}
                value={342600}
                content={'New Bettors'}
              />
              <ReferralsInfo
                icon={<FaUsers style={{ width: '24px', height: '24px' }} />}
                value={342600}
                content={'Total Commission Earned'}
              />
              <ReferralsInfo
                icon={<FaUsers style={{ width: '24px', height: '24px' }} />}
                value={342600}
                content={'Last 30 Days Earnings'}
              />
              <ReferralsInfo
                icon={<FaUsers style={{ width: '24px', height: '24px' }} />}
                value={342600}
                content={'Total Bettors Referred'}
              />
            </ReferralsInfoItemMobile>
          </ReferralsInfoContainer>
        </ReferralsContent>
      </ReferralsContainer>
      <ReferralManageContainer>
        <ReferralManageTitle>Referral Management</ReferralManageTitle>
        <ReferralManageSubtitle>
          Allow sorting by performance, date of registration, or revenue
          generated.
        </ReferralManageSubtitle>
        <ReferralManageContent>
          <ReferralManageAction>
            <SortButtonContainer>
              <SortButton
                onClick={handleSortClick}
                size="small"
                aria-controls={isSortOpen ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isSortOpen ? 'true' : undefined}
              >
                <p>
                  Sort by:{' '}
                  <span>{sortOption === 0 ? 'Revenue' : 'Analystics'}</span>
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
                  <MenuItemContent>
                    <FaSackDollar />
                    Revenue
                  </MenuItemContent>
                </MenuItem>
                <MenuItem onClick={() => handleSortClose(1)}>
                  <MenuItemContent>
                    <IoAnalyticsSharp />
                    Analytics
                  </MenuItemContent>
                </MenuItem>
              </Menu>
            </SortButtonContainer>
            <TimerContainer>
              <MovingBackground
                style={{
                  transform: `translateX(${selected * 100}%)`,
                  marginLeft: '3px',
                }}
              />
              {options.map((option, index) => (
                <OptionButton
                  key={option}
                  onClick={() => handleOptionSelect(index)}
                  style={{ color: selected === index ? '#000' : '#627691' }}
                >
                  {option}
                </OptionButton>
              ))}
            </TimerContainer>
          </ReferralManageAction>
          <ReferralContentContainer>
            {sortOption === 0 ? <ReferralTable /> : <ReferralChart />}
            {/* <NoDataPage>
              <NoDataPageTitle>No data yet</NoDataPageTitle>
              <NoDataPageContent>
                Start sharing your affiliate link to track new bettors!
              </NoDataPageContent>
            </NoDataPage> */}
          </ReferralContentContainer>
        </ReferralManageContent>
      </ReferralManageContainer>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  width: '100%',
}));

const ReferralsContainer = styled(Box)(({ theme }) => ({
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

const ReferralsContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '13px',
}));

const ReferralsAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  [theme.breakpoints.down(876)]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const ReferralsInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '13px',
}));

const ReferralsInfoItemWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '13px',
  [theme.breakpoints.down(1600)]: {
    display: 'none',
  },
}));

const ReferralsInfoItemMobile = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '13px',
  [theme.breakpoints.down(1600)]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.down(1200)]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.down(640)]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
}));

interface ReferralsInfoProps {
  icon: React.ReactNode;
  value: number;
  content: string;
}

const ReferralsInfo = (props: ReferralsInfoProps) => {
  const { icon, value, content } = props;
  return (
    <ReferralsInfoWrapper>
      <ReferralsInfoSide>
        <IconWrapper>{icon}</IconWrapper>${value.toLocaleString()}
      </ReferralsInfoSide>
      <ReferralsInfoContent>{content}</ReferralsInfoContent>
    </ReferralsInfoWrapper>
  );
};

const ReferralsInfoWrapper = styled(Box)(({ theme }) => ({
  padding: '7px',
  width: '100%',
  background:
    'radial-gradient(circle at 34% 179%, rgba(14, 247, 169, 0.3) -61%, #141c30 62%)',
  borderRadius: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
}));

const ReferralsInfoSide = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  fontSize: '18px',
  [theme.breakpoints.down(1600)]: {
    fontSize: '16px',
  },
  [theme.breakpoints.down(1240)]: {
    fontSize: '14px',
    gap: '8px',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '45px',
  height: '45px',
  borderRadius: '10px',
  backgroundColor: '#1AE5A1',
  color: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down(1600)]: {
    width: '36px',
    height: '36px',
  },
}));

const ReferralsInfoContent = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#627691',
  paddingRight: '10px',
  [theme.breakpoints.down(1600)]: {
    fontSize: '14px',
    textAlign: 'right',
  },
}));

const ClaimCardContainer = styled(Box)(({ theme }) => ({
  padding: '20px',
  // backgroundColor: '#0f1629',
  background:
    'radial-gradient(circle at 30% 106%, rgba(14, 247, 169, 0.3) 0%, #141c30 66%)',
  borderRadius: '15px',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  gap: '25px',
  justifyContent: 'space-between',
  [theme.breakpoints.down(1240)]: {
    width: '100%',
    gap: '8px',
  },
  [theme.breakpoints.down(876)]: {
    width: 'fit-content',
    gap: '25px',
  },
  [theme.breakpoints.down(480)]: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: '8px',
  },
}));

const UserAvatar = styled(Box)(({ theme }) => ({
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  border: '1px solid #1AE5A1',
  padding: '6px',
  [theme.breakpoints.down(1240)]: {
    width: '120px',
    height: '120px',
  },
  [theme.breakpoints.down(1096)]: {
    width: '150px',
    height: '150px',
  },
}));

const AvatarImg = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
}));

const CardContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  [theme.breakpoints.down(480)]: {
    width: '100%',
    alignItems: 'center',
  },
}));

const UserID = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#fff',
  [theme.breakpoints.down(480)]: {
    fontSize: '18px',
    textAlign: 'center',
  },
}));

const UserEmail = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#627691',
  [theme.breakpoints.down(480)]: {
    fontSize: '16px',
    textAlign: 'center',
  },
}));

const UserInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

interface UserInfoItemProps {
  badge: React.ReactNode;
  content: string;
}

const UserInfoItem = (props: UserInfoItemProps) => {
  const { badge, content } = props;
  return (
    <UserInfoItemContainer>
      {badge}
      <UserInfoItemLabel>{content}</UserInfoItemLabel>
    </UserInfoItemContainer>
  );
};

const UserInfoItemContainer = styled(Box)(({ theme }) => ({
  borderRadius: '7px',
  backgroundColor: '#0d1321',
  padding: '3px 10px 3px 3px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  [theme.breakpoints.down(480)]: {
    padding: '6px 10px',
  },
}));

const UserInfoItemLabel = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: '#627691',
}));

const TiersBadge = styled(Box)(({ theme }) => ({
  width: '22px',
  height: '22px',
  borderRadius: '7px',
  backgroundColor: '#1AE5A1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000',
  fontSize: '14px',
}));

const CommissionBadge = styled(Box)(({ theme }) => ({
  width: '32px',
  height: '22px',
  borderRadius: '7px',
  backgroundColor: '#627691',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '14px',
}));

const ClaimSection = styled(Box)(({ theme }) => ({
  padding: '9px',
  borderRadius: '7px',
  height: '56px',
  backgroundColor: '#0d1321',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.down(1200)]: {
    gap: '15px',
  },
}));

const ClaimIcon = styled(Box)(({ theme }) => ({
  width: '28px',
  height: '28px',
  paddingLeft: '10px',
  color: '#1AE5A1',
  [theme.breakpoints.down(480)]: {
    width: '36px',
  },
}));

const ClaimInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down(480)]: {
    flexDirection: 'row',
    gap: '10px',
  },
}));

const ClaimValue = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#fff',
}));

const ClaimStatus = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: '#627691',
}));

const ClaimButton = styled(Button)(({ theme }) => ({
  width: '94px',
  height: '38px',
  borderRadius: '7px',
  color: '#000',
  backgroundColor: '#1AE5A1',
  fontSize: '14px',
  fontWeight: 'bold',
  textTransform: 'none',
  [theme.breakpoints.down(1200)]: {
    width: '75px',
  },
}));

const ReferralCardContainer = styled(Box)(({ theme }) => ({
  borderRadius: '15px',
  background:
    'radial-gradient(circle at 170% 200%, rgba(14, 247, 169, 0.3) 0%, #141c30 66%)',
  padding: '20px 25px',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  [theme.breakpoints.down(1240)]: {
    width: '100%',
  },
  [theme.breakpoints.down(1140)]: {
    padding: '20px',
  },
  [theme.breakpoints.down(420)]: {
    alignItems: 'center',
  },
}));

const ReferralCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#fff',
  [theme.breakpoints.down(420)]: {
    textAlign: 'center',
    fontSize: '16px',
  },
}));

const ReferralCopyContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  [theme.breakpoints.down(420)]: {
    flexDirection: 'column',
  },
}));

interface ReferralCodeProps {
  isEditable: boolean;
  value: string;
  onChange: (value: string) => void;
}

const ReferralCode = (props: ReferralCodeProps) => {
  const { isEditable, value, onChange } = props;
  return (
    <ReferralCodeContainer
      disabled={!isEditable}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

const ReferralCodeContainer = styled('input')(({ theme }) => ({
  fontSize: '16px',
  color: '#627691',
  padding: '8px 14px',
  borderRadius: '4px',
  backgroundColor: '#0d1321',
  outline: 'none',
  textDecoration: 'none',
  border: 'none',
  width: '100%',
  [theme.breakpoints.down(876)]: {
    fontSize: '16px',
  },
  [theme.breakpoints.down(420)]: {
    textAlign: 'center',
  },
}));

const ReferralCopyAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const EditButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#172235',
  width: '32px',
  height: '32px',
  minWidth: '32px',
  borderRadius: '7px',
  color: '#627691',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

const CopyButton = styled(Button)(({ theme }) => ({
  width: '74px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textTransform: 'none',
  fontSize: '16px',
  color: '#000',
  backgroundColor: '#1AE5A1',
  fontWeight: 'bold',
}));

const ReferralShareContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  [theme.breakpoints.down(420)]: {
    width: '100%',
  },
}));

const ReferralShareTitle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#fff',
  [theme.breakpoints.down(420)]: {
    textAlign: 'center',
    fontSize: '16px',
  },
}));

const ReferralShareBox = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: '7px',
  backgroundColor: '#0d1321',
  padding: '18px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
  [theme.breakpoints.down(1240)]: {
    gap: '0px',
    justifyContent: 'space-between',
  },
}));

const ReferralItemContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'space-between',
  width: '100%',
  [theme.breakpoints.down(1600)]: {
    display: 'none',
  },
}));

const UserIDContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
}));

const ReferralManageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '5px',
  marginTop: '20px',
}));

const ReferralManageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  color: '#fff',
  fontWeight: 'bold',
}));

const ReferralManageSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#627691',
  textAlign: 'center',
}));

const ReferralManageContent = styled(Box)(({ theme }) => ({
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '20px',
}));

const ReferralManageAction = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down(450)]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
  },
}));

const SortButtonContainer = styled(Box)(({ theme }) => ({}));

const SortButton = styled(Button)(({ theme }) => ({
  width: '200px',
  height: '60px',
  padding: '20px',
  backgroundColor: '#111827',
  textTransform: 'none',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '#627691',
  span: {
    color: '#fff',
  },
  [theme.breakpoints.down(640)]: {
    padding: '12px',
    width: '175px',
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

const TimerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  backgroundColor: '#131B2E',
  borderRadius: '8px',
  padding: '4px',
  width: 'fit-content',
  position: 'relative',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

const OptionButton = styled(Button)(({ theme }) => ({
  flex: 1,
  color: '#627691',
  fontSize: '14px',
  fontWeight: 'bold',
  textTransform: 'none',
  zIndex: 1,
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const MovingBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '4px',
  bottom: 0,
  left: 0,
  width: '32%',
  height: '85%',
  borderRadius: '8px',
  backgroundColor: '#1AE5A1',
  transition: 'transform 0.3s ease-in-out',
  zIndex: 0,
}));

const ReferralContentContainer = styled(Box)(({ theme }) => ({}));

const NoDataPage = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  height: '500px',
  backgroundColor: '#0f1629',
  borderRadius: '15px',
  padding: '20px',
  [theme.breakpoints.down(540)]: {
    height: '300px',
  },
}));

const NoDataPageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  color: '#fff',
  [theme.breakpoints.down(540)]: {
    fontSize: '24px',
  },
}));

const NoDataPageContent = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#627691',
  [theme.breakpoints.down(540)]: {
    fontSize: '14px',
    textAlign: 'center',
  },
}));
