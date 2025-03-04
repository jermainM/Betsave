import { KeyboardArrowDown, KeyboardArrowLeft } from '@mui/icons-material';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  styled,
  Typography,
} from '@mui/material';
import { IoMdSettings, IoMdWallet } from 'react-icons/io';
import { IoSettingsSharp } from 'react-icons/io5';
import { HiCash } from 'react-icons/hi';
import { LevelProgressBar } from '../../components/progressbar/LevelBar';
import { STATIC_DATA } from '../../constants/static-data';
import { useState } from 'react';
import { Setting } from './setting';
import { AccountDashboard } from './dashboard';
import { History } from './history';
import { BookMaker } from './bookmaker';
import { ReferralProgram } from './referral';
import { PromoCode } from './promocode';
import { HelpCenter } from './helpcenter';

import { NetImg, TempUserIcon } from '../../constants/images';

export const AccountManage = () => {
  const [selectedItem, setSelectedItem] = useState(0);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavItemClick = (idx: number) => {
    setSelectedItem(idx);
    handleClose();
  };

  return (
    <AccountManageContainer>
      <ProfileContainer>
        <ButtonContainer>
          <BackButton>
            <KeyboardArrowLeft fontSize="small" />
            Back
          </BackButton>
          <Label>Personal Cabinet</Label>
        </ButtonContainer>
        <ProfileInfoCard>
          <VectorImg src={NetImg} alt="vector-img" />
          <UserAvatar>
            <AvatarImg src={TempUserIcon} alt="avatar-img" />
          </UserAvatar>
          <ProfileContent>
            <ProfileContentContainer>
              <ProfileInfo>
                <ProfileName>Abir Designs</ProfileName>
                <ProfileWallet>
                  <WalletIconBox>
                    <IoMdWallet />
                  </WalletIconBox>
                  $342,600
                </ProfileWallet>
              </ProfileInfo>
              <ProfileAction>
                <WalletBox>
                  <HiCash />
                  <WalletInfo>
                    <WalletBalance>$342,600</WalletBalance>
                    <WalletStatus>Available</WalletStatus>
                  </WalletInfo>
                  <WalletButton>Withdraw</WalletButton>
                </WalletBox>
                <SettingButton>
                  <IoSettingsSharp />
                </SettingButton>
              </ProfileAction>
            </ProfileContentContainer>
            <LevelProgressContainer>
              <LevelBadgeContainer>
                <LevelBadge level={1} status="current" />
                <LevelBadge level={2} status="next" />
              </LevelBadgeContainer>
              <LevelProgressBar value={65} unit="$" />
            </LevelProgressContainer>
          </ProfileContent>
        </ProfileInfoCard>
      </ProfileContainer>

      <AccountController>
        <MobileSideBarListContainer>
          <MobileSideBarButton onClick={handleClick}>
            <StartIconContainer>
              <ButtonIcon>
                {STATIC_DATA.accountListItems[selectedItem].icon}
              </ButtonIcon>
              {STATIC_DATA.accountListItems[selectedItem].name}
            </StartIconContainer>
            <KeyboardArrowDown />
          </MobileSideBarButton>

          <SidebarMenu
            id="basic-menu"
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <SideBarList>
              {STATIC_DATA.accountListItems.map((item) => (
                <SideBarListItem key={item.idx} disablePadding>
                  <SideBarListItemButton
                    selected={selectedItem === item.idx}
                    onClick={() => handleNavItemClick(item.idx)}
                  >
                    <SideBarListItemIcon sx={{ marginLeft: '18px' }}>
                      {item.icon}
                    </SideBarListItemIcon>
                    <SideBarListItemText>{item.name}</SideBarListItemText>
                  </SideBarListItemButton>
                </SideBarListItem>
              ))}
            </SideBarList>
          </SidebarMenu>
        </MobileSideBarListContainer>
        <SideBarListContainer>
          <SideBarList>
            {STATIC_DATA.accountListItems.map((item) => (
              <SideBarListItem key={item.idx} disablePadding>
                <SideBarListItemButton
                  selected={selectedItem === item.idx}
                  onClick={() => handleNavItemClick(item.idx)}
                >
                  <SideBarListItemIcon sx={{ marginLeft: '18px' }}>
                    {item.icon}
                  </SideBarListItemIcon>
                  <SideBarListItemText>{item.name}</SideBarListItemText>
                </SideBarListItemButton>
              </SideBarListItem>
            ))}
          </SideBarList>
        </SideBarListContainer>

        <AccountBoard>
          {selectedItem === 0 && <AccountDashboard />}
          {selectedItem === 1 && <History />}
          {selectedItem === 2 && <BookMaker />}
          {selectedItem === 3 && <ReferralProgram />}
          {selectedItem === 4 && <PromoCode />}
          {selectedItem === 5 && <Setting />}
          {selectedItem === 6 && <HelpCenter />}
        </AccountBoard>
      </AccountController>
    </AccountManageContainer>
  );
};

const AccountManageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  width: '100%',
  padding: '20px 0px',
  marginTop: '20px',
}));

const ProfileContainer = styled(Box)(({ theme }) => ({
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

const UserAvatar = styled(Box)(({ theme }) => ({
  width: '135px',
  height: '135px',
  borderRadius: '50%',
  minWidth: '135px',
  border: '1px solid #1AE5A1',
  padding: '6px',
}));

const AvatarImg = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
}));

const ProfileInfoCard = styled(Box)(({ theme }) => ({
  padding: '30px',
  borderRadius: '15px',
  background:
    'radial-gradient(circle at 34% 179%, rgba(14, 247, 169, 0.3) -61%, #141c30 62%)',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '40px',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down(680)]: {
    flexDirection: 'column',
    gap: '20px',
  },
}));

const VectorImg = styled('img')(({ theme }) => ({
  width: '540px',
  height: 'auto',
  position: 'absolute',
  zIndex: 0,
  bottom: 0,
  right: 0,
}));

const ProfileContent = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '16px',
  zIndex: 1,
}));

const ProfileContentContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down(680)]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
}));

const ProfileInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  [theme.breakpoints.down(680)]: {
    alignItems: 'center',
  },
}));

const ProfileName = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: '#fff',
  fontWeight: 'bold',
  [theme.breakpoints.down(680)]: {
    fontSize: '24px',
  },
}));

const ProfileWallet = styled(Box)(({ theme }) => ({
  backgroundColor: '#0d1321',
  borderRadius: '8px',
  padding: '4px 6px 4px 4px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '12px',
  color: '#627691',
  width: 'fit-content',
}));

const WalletIconBox = styled(Box)(({ theme }) => ({
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  color: '#000',
  backgroundColor: '#1AE5A1',
  borderRadius: '7px',
}));

const ProfileAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
}));

const WalletBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#0d1321',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '9px',
  color: '#1AE5A1',
  fontSize: '24px',
}));

const WalletInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const WalletBalance = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: '#fff',
}));

const WalletStatus = styled(Typography)(({ theme }) => ({
  fontSize: '10px',
  color: '#627691',
}));

const WalletButton = styled(Button)(({ theme }) => ({
  width: '95px',
  height: '32px',
  backgroundColor: '#1AE5A1',
  color: '#000',
  fontSize: '14px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textTransform: 'none',
}));

const SettingButton = styled(Button)(({ theme }) => ({
  width: '50px',
  minWidth: '50px',
  height: '50px',
  backgroundColor: '#0d1321',
  color: '#627691',
  fontSize: '24px',
  borderRadius: '10px',
}));

const LevelProgressContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}));

const LevelBadgeContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

interface LevelBadgeProps {
  level: number;
  status: 'current' | 'next';
}

const LevelBadge = (props: LevelBadgeProps) => {
  const { level, status } = props;
  return (
    <BadgeContainer>
      tiers
      <CurrentLevelBox
        sx={{
          backgroundColor: status === 'current' ? '#1AE5A1' : '#627691',
          color: status === 'current' ? '#000' : '#fff',
        }}
      >
        {level}
      </CurrentLevelBox>
    </BadgeContainer>
  );
};

const BadgeContainer = styled(Box)(({ theme }) => ({
  padding: '4px 4px 4px 8px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  borderRadius: '7px',
  color: '#427691',
  fontSize: '12px',
  backgroundColor: '#0d1321',
}));

const CurrentLevelBox = styled(Box)(({ theme }) => ({
  width: '20px',
  height: '20px',
  borderRadius: '7px',
  fontSize: '10px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const AccountController = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  gap: '30px',
  [theme.breakpoints.down(840)]: {
    flexDirection: 'column',
  },
}));

const SideBarListContainer = styled(Box)(({ theme }) => ({
  width: '300px',
  minWidth: '300px',
  backgroundColor: '#0f1629',
  padding: '4px 11px',
  borderRadius: '15px',
  height: 'fit-content',
  [theme.breakpoints.down(840)]: {
    display: 'none',
  },
}));

const SideBarList = styled(List)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  minWidth: '48px',
  width: '100%',
}));

const SideBarListItem = styled(ListItem)(({ theme }) => ({}));

const SideBarListItemButton = styled(ListItemButton)(({ theme }) => ({
  color: '#627691',
  borderRadius: '9px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  '&:hover': {
    backgroundColor: '#131A2D',
  },
  '&.Mui-selected': {
    backgroundColor: '#131A2D',
    '&:hover': {
      backgroundColor: '#131A2D',
    },
    color: '#fff',
    svg: {
      color: '#1AE5A1',
    },
  },
}));

const SideBarListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  width: '24px',
  height: '24px',
  color: 'inherit',
  minWidth: '24px',
}));

const SideBarListItemText = styled(ListItemText)(({ theme }) => ({
  textWrap: 'nowrap',
}));

const AccountBoard = styled(Box)(({ theme }) => ({
  width: 'calc(100% - 330px)',
  paddingTop: '20px',
  [theme.breakpoints.down(840)]: {
    width: '100%',
  },
}));

const MobileSideBarListContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'none',
  [theme.breakpoints.down(840)]: {
    display: 'flex',
  },
}));

const MobileSideBarButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0f1629',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '10px',
  padding: '8px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  gap: '10px',
  color: '#627691',
  textTransform: 'none',
  fontFamily: 'SpaceGrotesk, sans-serif',
  fontSize: '16px',
  height: '54px',
  [theme.breakpoints.down(390)]: {
    fontSize: '14px',
  },
}));

const StartIconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const ButtonIcon = styled(Box)(({ theme }) => ({
  width: '24px',
  height: '24px',
  color: 'inherit',
  minWidth: '24px',
}));

const SidebarMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#0F1629',
    backgroundImage: 'none',
    marginTop: '10px',
    width: '100%',
  },
}));
