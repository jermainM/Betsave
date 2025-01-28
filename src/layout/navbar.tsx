import React, { useState } from 'react';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuProps,
  SpeedDial,
  SpeedDialAction,
  styled,
  Typography,
} from '@mui/material';
import {
  AccessTime,
  AccountBalanceWallet,
  KeyboardArrowDown,
  Notifications,
  Search,
} from '@mui/icons-material';
import { BsFillChatDotsFill } from 'react-icons/bs';

import { IconInput } from '../components/input/IconInput';

import ExpandSidebarIcon from '../assets/expand-sidebar.png';
import BetsaveLogoImg from '../assets/Betsave-logo.png';
import HandMoneyIcon from '../assets/hand-money-icon.png';
import JonahAvatarIcon from '../assets/Jonah.png';
import GiftIcon from '../assets/gift.png';

import { STATIC_DATA } from '../contants/static-data';
import { Footer } from './footer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { setActiveItem } from '../store/slices/navbarSlice';

export const NavBar = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState(0);
  const [isExpand, setExpand] = useState(true);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isOpen = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleNavItemClick = (idx: number) => {
    setSelectedItem(idx);
    dispatch(setActiveItem(idx));
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const mobileListItem = STATIC_DATA.listItems.slice(0, 4);
  const restListItem = STATIC_DATA.listItems.slice(4);

  return (
    <Container>
      <NavBarContainer>
        <NavBarWrapper>
          <SidebarButton onClick={() => setExpand(!isExpand)}>
            <Img src={ExpandSidebarIcon} alt="expand-sidebar-icon" />
          </SidebarButton>
          <Logo src={BetsaveLogoImg} alt="betsave-logo" />
          <SearchBarContainer>
            <IconInput
              type="text"
              placeholder="Search for offers..."
              name="search"
              value={searchText}
              setValue={handleSearch}
              icon={<Search sx={{ color: '#627691' }} />}
            />
          </SearchBarContainer>

          <UserIconButton>
            <Icon src={JonahAvatarIcon} alt="user-icon" />
          </UserIconButton>

          <MobileWalletContainer>
            <WalletValue>
              <WalletIcon src={HandMoneyIcon} alt="wallet-icon" />
              $90.00
            </WalletValue>
            <WalletButton>
              <AccountBalanceWallet />
              <p>Wallet</p>
            </WalletButton>
          </MobileWalletContainer>
        </NavBarWrapper>
        <NavBarWrapper>
          <DesktopWalletContainer>
            <WalletValue>
              <WalletIcon src={HandMoneyIcon} alt="wallet-icon" />
              $90.00
            </WalletValue>
            <WalletButton>
              <AccountBalanceWallet />
              Wallet
            </WalletButton>
          </DesktopWalletContainer>
          <UserInfoContainer>
            <UserInfoButton endIcon={<KeyboardArrowDown fontSize="small" />}>
              <Avatar
                src={JonahAvatarIcon}
                sx={{ width: '25px', height: '25px', marginRight: '8px' }}
              />
              Jonah Batten
            </UserInfoButton>
          </UserInfoContainer>
          <MobileSearchBar>
            <IconInput
              type="text"
              placeholder="Search for offers..."
              name="search"
              value={searchText}
              setValue={handleSearch}
              icon={<Search sx={{ color: '#627691' }} />}
            />
          </MobileSearchBar>
          <ActionButton>
            <Notifications
              sx={{ transform: 'rotate(10deg)', color: '#1AE5A1' }}
            />
            <NotifyBadge />
          </ActionButton>
          <ActionButton>
            <BsFillChatDotsFill
              style={{ width: '20px', height: '20px', color: '#627691' }}
            />
          </ActionButton>
        </NavBarWrapper>
      </NavBarContainer>

      <MainboardContainer>
        <SideBarContainer
          sx={{
            minWidth: `${isExpand ? 320 : 64}px`,
            width: `${isExpand ? 320 : 64}px`,
            transition: 'all 0.3s ease',
            overflowX: 'hidden',
          }}
        >
          <GiftClaimContainer
            sx={{
              background: !isExpand
                ? 'none'
                : `
                  linear-gradient(90deg, #0D1422 0%, #141C30 60%, transparent 100%),
                  radial-gradient(circle at 75% 100%, rgba(14, 247, 169, 0.3) 0%, rgba(20, 28, 48, 0) 64%)
                `,
            }}
          >
            <GiftClaimValueContainer sx={{ opacity: isExpand ? 1 : 0 }}>
              <GiftCount>0 / 1000</GiftCount>
              <GiftDuration>
                <AccessTime fontSize="small" />
                1d : 6h : 32s
              </GiftDuration>
            </GiftClaimValueContainer>
            <GiftImg
              src={GiftIcon}
              alt="gift-img"
              sx={{
                width: isExpand ? '120px' : '45px',
                height: 'auto',
                position: 'absolute',
                bottom: isExpand ? '-35px' : '22px',
                left: isExpand ? 'unset' : 0,
                right: isExpand ? 0 : 'unset',
              }}
            />
          </GiftClaimContainer>

          <SideBarList>
            {STATIC_DATA.listItems.map((item) => (
              <SideBarListItem key={item.idx} disablePadding>
                <SideBarListItemButton
                  selected={selectedItem === item.idx}
                  onClick={() => handleNavItemClick(item.idx)}
                >
                  <SideBarListItemIcon sx={{ marginLeft: '18px' }}>
                    {item.icon}
                  </SideBarListItemIcon>
                  <SideBarListItemText
                    sx={{
                      opacity: isExpand ? 1 : 0,
                    }}
                  >
                    {item.name}
                  </SideBarListItemText>
                </SideBarListItemButton>
              </SideBarListItem>
            ))}
          </SideBarList>
        </SideBarContainer>
        <MainboardContent expand={isExpand ? 1 : 0}>
          {children}
          <FooterContainer>
            <Footer />
          </FooterContainer>
        </MainboardContent>
      </MainboardContainer>

      <MobileSidebarContainer>
        {STATIC_DATA.listItems.map((item) => (
          <MobileSidebarItem
            isSelected={selectedItem === item.idx}
            onClick={() => handleNavItemClick(item.idx)}
            icon={item.icon}
            name={item.name}
            key={item.idx}
          />
        ))}
      </MobileSidebarContainer>

      <MobileSmallSidebarContainer>
        <SidebarMenuButton onClick={handleMenuClick}>
          <MenuImg src={ExpandSidebarIcon} alt="expand-sidebar-icon" />
        </SidebarMenuButton>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleMenuClose}
        >
          <SmallSidebarItemContainer>
            {restListItem.map((item) => (
              <SmallSidebarItem
                isSelected={selectedItem === item.idx}
                onClick={() => handleNavItemClick(item.idx)}
                icon={item.icon}
                name={item.name}
                key={item.idx}
              />
            ))}
          </SmallSidebarItemContainer>
        </StyledMenu>
        {mobileListItem.map((item) => (
          <MobileSidebarItem
            isSelected={selectedItem === item.idx}
            onClick={() => handleNavItemClick(item.idx)}
            icon={item.icon}
            name={item.name}
            key={item.idx}
          />
        ))}
      </MobileSmallSidebarContainer>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));

const NavBarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  borderWidth: '0px 0px 1px 0px',
  borderStyle: 'solid',
  borderColor: '#627691',
  padding: '20px 30px',
  backgroundColor: '#0F1629',
  [theme.breakpoints.down(450)]: {
    padding: '10px 20px',
  },
}));

const NavBarWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '13px',
  [theme.breakpoints.down(450)]: {
    gap: '5px',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  width: '45px',
  height: '45px',
  borderRadius: '7px',
  backgroundColor: '#171e31',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 'inherit',
  position: 'relative',
  [theme.breakpoints.down(450)]: {
    width: '36px',
    height: '36px',
  },
}));

const Img = styled('img')(({ theme }) => ({
  width: '18px',
  height: 'auto',
}));

const Logo = styled('img')(({ theme }) => ({
  width: '180px',
  height: 'auto',
  marginLeft: '15px',
  cursor: 'pointer',
  [theme.breakpoints.down(1240)]: {
    marginLeft: '5px',
  },

  [theme.breakpoints.down(1096)]: {
    display: 'none',
  },
}));

const SearchBarContainer = styled(Box)(({ theme }) => ({
  marginLeft: '80px',
  [theme.breakpoints.down(1240)]: {
    marginLeft: '10px',
  },
  [theme.breakpoints.down(1096)]: {
    display: 'none',
  },
}));

const DesktopWalletContainer = styled(Box)(({ theme }) => ({
  padding: '5px 8px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  background:
    'radial-gradient(circle at 10% 20%, rgba(14, 247, 169, 0.3) 0%, #0F3D3E 60% 10%, #141c30)',
  [theme.breakpoints.down(1096)]: {
    display: 'none',
  },
}));

const MobileWalletContainer = styled(Box)(({ theme }) => ({
  padding: '5px 8px',
  borderRadius: '8px',
  display: 'none',
  alignItems: 'center',
  gap: '12px',
  background:
    'radial-gradient(circle at 10% 20%, rgba(14, 247, 169, 0.3) 0%, #0F3D3E 60% 10%, #141c30)',
  [theme.breakpoints.down(1096)]: {
    display: 'flex',
  },
}));

const WalletValue = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '14px',
}));

const WalletIcon = styled('img')(({ theme }) => ({
  width: '24px',
  height: 'auto',
}));

const WalletButton = styled(Button)(({ theme }) => ({
  width: '90px',
  height: '35px',
  borderRadius: '7px',
  textTransform: 'none',
  background: 'linear-gradient(to bottom,#15A373 0%,#018055 100%)',
  minWidth: '32px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  [theme.breakpoints.down(450)]: {
    width: '35px',
    height: '35px',
  },
  p: {
    [theme.breakpoints.down(450)]: {
      display: 'none',
    },
  },
  [theme.breakpoints.down(450)]: {
    width: '32px',
    height: '32px',
  },
}));

const UserInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down(1096)]: {
    display: 'none',
  },
}));

const UserInfoButton = styled(Button)(({ theme }) => ({
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#171e31',
  borderRadius: '7px',
  fontSize: '14px',
  textTransform: 'none',
  color: '#627691',
  height: '45px',
}));

const NotifyBadge = styled(Box)(({ theme }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: 'red',
  position: 'absolute',
  top: '18px',
  right: '10px',
}));

const SidebarButton = styled(Button)(({ theme }) => ({
  width: '45px',
  height: '45px',
  borderRadius: '7px',
  backgroundColor: '#171e31',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 'inherit',
  position: 'relative',
  [theme.breakpoints.down(1096)]: {
    display: 'none',
  },
}));

const UserIconButton = styled(IconButton)(({ theme }) => ({
  width: '42px',
  height: '42px',
  border: '1px solid #1AE5A1',
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down(1096)]: {
    display: 'flex',
  },
  [theme.breakpoints.down(450)]: {
    width: '36px',
    height: '36px',
  },
}));

const Icon = styled('img')(({ theme }) => ({
  width: '36px',
  height: '36px',
  [theme.breakpoints.down(450)]: {
    width: '30px',
    height: '30px',
  },
}));

const MobileSearchBar = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down(1094)]: {
    display: 'block',
  },

  [theme.breakpoints.down(670)]: {
    display: 'none',
  },
}));

const SideBarContainer = styled(Box)(({ theme }) => ({
  padding: '20px 10px',
  backgroundColor: '#0F1629',
  minHeight: 'calc(100vh - 86px )',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down(1096)]: {
    display: 'none',
  },
}));

const GiftClaimContainer = styled(Box)(({ theme }) => ({
  borderRadius: '10px',
  padding: '20px',
  width: '100%',
  backgroundBlendMode: 'overlay',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}));

const GiftClaimValueContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}));

const GiftCount = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#fff',
  textWrap: 'nowrap',
}));

const GiftDuration = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: '#fff',
  fontSize: '12px',
  textWrap: 'nowrap',
}));

const GiftImg = styled('img')(({ theme }) => ({}));

const SideBarList = styled(List)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  minWidth: '48px',
}));

const SideBarListItem = styled(ListItem)(({ theme }) => ({}));

const SideBarListItemButton = styled(ListItemButton)(({ theme }) => ({
  color: '#627691',
  borderRadius: '9px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  '&.Mui-selected': {
    background: `linear-gradient(
      to right,
      rgba(26, 229, 161, 0.3) -30%, 
      #171e31 100%
    )`,
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

const MobileSidebarContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height: 'auto',
  backgroundColor: '#0E1629',
  display: 'none',
  justifyContent: 'center',
  boxShadow: '0px -1px 4px 0px rgba(5,5,5,0.75);',
  padding: '4px',
  gap: '40px',
  [theme.breakpoints.down(1096)]: {
    display: 'flex',
  },
  [theme.breakpoints.down(768)]: {
    gap: '20px',
  },
  [theme.breakpoints.down(640)]: {
    gap: '0px',
    justifyContent: 'space-between',
  },
  [theme.breakpoints.down(480)]: {
    display: 'none',
  },
}));

const MobileSmallSidebarContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height: 'auto',
  backgroundColor: '#0E1629',
  justifyContent: 'center',
  boxShadow: '0px -1px 4px 0px rgba(5,5,5,0.75);',
  padding: '4px',
  gap: '40px',
  display: 'none',
  [theme.breakpoints.down(480)]: {
    display: 'flex',
    height: 'auto',
    alignItems: 'center',
    gap: '0px',
    justifyContent: 'space-between',
  },
}));

interface MobileSidebarItemProps {
  isSelected: boolean;
  icon: React.ReactNode;
  name: string;
  onClick: () => void;
}

const MobileSidebarItem = (props: MobileSidebarItemProps) => {
  const { isSelected, icon, name, onClick } = props;
  return (
    <MobileSidebarItemContainer
      sx={{
        backgroundColor: isSelected ? '#01A482' : 'none',
        color: isSelected ? '#fff' : '#627691',
      }}
      onClick={onClick}
    >
      <MobileSidebarIcon>{icon}</MobileSidebarIcon>
      <MobileSidebarItemText>{name}</MobileSidebarItemText>
    </MobileSidebarItemContainer>
  );
};

const MobileSidebarItemContainer = styled(Button)(({ theme }) => ({
  width: '84px',
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '4px',
  borderRadius: '4px',
  textTransform: 'none',
  [theme.breakpoints.down(480)]: {
    width: '54px',
  },
}));

const MobileSidebarIcon = styled(Box)(({ theme }) => ({
  width: '24px',
  height: '24px',
  color: 'inherit',
  [theme.breakpoints.down(640)]: {
    width: '20px',
    height: '20px',
  },
}));

const MobileSidebarItemText = styled(Box)(({ theme }) => ({
  fontSize: '12px',
  color: 'inherit',
  width: '64px',
  lineHeight: '15px',
  textAlign: 'center',
  height: '30px',
  [theme.breakpoints.down(640)]: {
    fontSize: '10px',
  },
}));

const MainboardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '20px',
  width: '100%',
}));

const MainboardContent = styled(Box)<{ expand: number }>(
  ({ theme, expand }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: `calc(100% - 20px - ${expand === 1 ? 320 : 64}px)`,
    padding: '0 20px 20px 20px',
    maxWidth: '1400px',
    [theme.breakpoints.down(1096)]: {
      width: '100%',
    },
  })
);

const FooterContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down(540)]: {
    marginBottom: '45px',
  },
  [theme.breakpoints.down(480)]: {
    marginBottom: '105px',
  },
}));

const SidebarMenuButton = styled(Button)(({ theme }) => ({
  width: '64px',
  height: '54px',
  background: 'transparent',
  borderRadius: '8px',
  minWidth: '64px',
}));

const SmallSidebarItemContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
}));

const MenuImg = styled('img')(({ theme }) => ({
  width: '20px',
  height: 'auto',
}));

const SmallSidebarItem = (props: MobileSidebarItemProps) => {
  const { isSelected, icon, name, onClick } = props;
  return (
    <MobileSidebarItemContainer
      sx={{
        backgroundColor: isSelected ? '#01A482' : 'none',
        color: isSelected ? '#fff' : '#627691',
      }}
      onClick={onClick}
    >
      <MobileSidebarIcon>{icon}</MobileSidebarIcon>
      <MobileSidebarItemText>{name}</MobileSidebarItemText>
    </MobileSidebarItemContainer>
  );
};

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    background: '#171E31',
    padding: '0px 10px',
    left: '0px !important',
    top: '700px !important',
  },
}));
