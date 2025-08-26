import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  styled,
  Typography,
  MenuItem,
} from "@mui/material";
import {
  AccountBalanceWallet,
  KeyboardArrowDown,
  Notifications,
  Search,
} from "@mui/icons-material";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

import { IconInput } from "../components/input/IconInput";

import { STATIC_DATA } from "../constants/static-data";
import { Footer } from "./footer";
import { AppDispatch, RootState } from "../store";
import { setActiveItem } from "../store/slices/navbarSlice";
import {
  setWalletData,
  setError,
  clearWalletData,
} from "../store/slices/walletSlice";
import {
  BetSaveLogoImg,
  HandMoneyIcon,
  JonahAvatarIcon,
  TempUserIcon,
} from "../constants/images";
import { clearSession } from "../store/slices/sessionSlice";
import { useNotification } from "../provider/notification";
import { formatEarningWithCommas } from "../utils/number";
import { getUserWalletData } from "../api/functions";

import { ChatbotButton } from "../components/Chatbot/ChatbotButton";

export const NavBar = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const { user } = useSelector((state: RootState) => state.session);
  const activeItem = useSelector((state: RootState) => state.navbar.activeItem);
  const [searchText, setSearchText] = useState("");
  const [sidebarAnchorEl, setSidebarAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const { balance, totalCashback } = useSelector(
    (state: RootState) => state.wallet
  );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [selectedItem, setSelectedItem] = useState(activeItem);

  const { notifyError } = useNotification();

  const isSidebarOpen = Boolean(sidebarAnchorEl);
  const isUserMenuOpen = Boolean(userMenuAnchorEl);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleSidebarMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setSidebarAnchorEl(event.currentTarget);
  };

  const handleSidebarMenuClose = () => {
    setSidebarAnchorEl(null);
  };

  const handleNavItemClick = (idx: number) => {
    setSelectedItem(idx);
    navigate("/dashboard");
    dispatch(setActiveItem(idx));
    setSidebarAnchorEl(null);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleAccountInfo = () => {
    handleUserMenuClose();
    navigate("/account");
  };

  const handleSignOut = () => {
    handleUserMenuClose();
    dispatch(clearSession());
    dispatch(clearWalletData());
    navigate("/");
  };

  const fetchWalletData = async () => {
    if (!user || !user.betsaveId) {
      return;
    }

    try {
      const walletData = await getUserWalletData(user.betsaveId);
      dispatch(
        setWalletData({
          balance: walletData.balance,
          totalCashback: walletData.totalCashback,
          history: {
            cashbackDetails: walletData.cashbackDetails,
            cpaDetails: walletData.cpaDetails,
            referralDetails: walletData.referralDetails,
          },
        })
      );
    } catch (error) {
      console.log({ error });
      notifyError("Error fetching wallet balance");
      dispatch(setError("Error fetching wallet balance"));
    }
  };

  const mobileListItem = STATIC_DATA.navListItems;
  const restListItem = STATIC_DATA.navListItems.slice(4);

  useEffect(() => {
    console.log({ user });
    if (user && user.betsaveId) {
      fetchWalletData();
    } else if (!user) {
      // Reset balance when user logs out
      dispatch(
        setWalletData({
          balance: 0,
          totalCashback: 0,
          history: {
            cashbackDetails: [],
            cpaDetails: [],
            referralDetails: [],
          },
        })
      );
    }
  }, [user]);

  return (
    <Container>
      <NavBarContainer>
        <NavBarWrapper>
          {/* <SidebarButton onClick={() => setExpand(!isExpand)}>
            <Img src={ExpandSidebarIcon} alt="expand-sidebar-icon" />
          </SidebarButton> */}
          <Logo
            src={BetSaveLogoImg}
            alt="betsave-logo"
            onClick={() => navigate("/")}
          />
          <SearchBarContainer>
            <IconInput
              type="text"
              placeholder="Search for offers..."
              name="search"
              value={searchText}
              setValue={handleSearch}
              icon={<Search sx={{ color: "#627691" }} />}
            />
          </SearchBarContainer>
          <MobileUserInfoContainer>
            <UserIconButton onClick={handleUserMenuClick}>
              <Icon src={JonahAvatarIcon} alt="user-icon" />
            </UserIconButton>

            <StyledMenu
              anchorEl={userMenuAnchorEl}
              open={isUserMenuOpen}
              onClose={handleUserMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuListItem onClick={handleAccountInfo}>
                <FaUser style={{ fontSize: "16px" }} />
                Account Info
              </MenuListItem>
              <MenuListItem onClick={handleSignOut}>
                <FaSignOutAlt style={{ fontSize: "16px" }} />
                Sign Out
              </MenuListItem>
            </StyledMenu>
          </MobileUserInfoContainer>

          <MobileWalletContainer>
            <WalletValue>
              <WalletIcon src={HandMoneyIcon} alt="wallet-icon" />${balance}
            </WalletValue>
            <WalletButton onClick={() => navigate("/wallet")}>
              <AccountBalanceWallet />
              <p>Wallet</p>
            </WalletButton>
          </MobileWalletContainer>
        </NavBarWrapper>
        <NavBarWrapper>
          <DesktopWalletContainer>
            <WalletValue>
              <WalletIcon src={HandMoneyIcon} alt="wallet-icon" />$
              {formatEarningWithCommas(balance)}
            </WalletValue>
            <WalletButton onClick={() => navigate("/wallet")}>
              <AccountBalanceWallet />
              Wallet
            </WalletButton>
          </DesktopWalletContainer>
          <UserInfoContainer>
            <UserInfoButton
              endIcon={<KeyboardArrowDown fontSize="small" />}
              onClick={handleUserMenuClick}
            >
              <Avatar
                src={user.avatar || TempUserIcon}
                sx={{ width: "25px", height: "25px", marginRight: "8px" }}
              />
              {user ? `${user.firstName} ${user.lastName}` : "User"}
            </UserInfoButton>
            <StyledMenu
              anchorEl={userMenuAnchorEl}
              open={isUserMenuOpen}
              onClose={handleUserMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuListItem onClick={handleAccountInfo}>
                <FaUser style={{ fontSize: "16px" }} />
                Account Info
              </MenuListItem>
              <MenuListItem onClick={handleSignOut}>
                <FaSignOutAlt style={{ fontSize: "16px" }} />
                Sign Out
              </MenuListItem>
            </StyledMenu>
          </UserInfoContainer>
          <MobileSearchBar>
            <IconInput
              type="text"
              placeholder="Search for offers..."
              name="search"
              value={searchText}
              setValue={handleSearch}
              icon={<Search sx={{ color: "#627691" }} />}
            />
          </MobileSearchBar>
          <ActionButton>
            <Notifications
              sx={{ transform: "rotate(10deg)", color: "#1AE5A1" }}
            />
            <NotifyBadge />
          </ActionButton>
          <ActionButton>
            <BsFillChatDotsFill
              style={{ width: "20px", height: "20px", color: "#627691" }}
            />
          </ActionButton>
        </NavBarWrapper>
      </NavBarContainer>

      <MainboardContainer>
        <SideBarContainer
          sx={{
            minWidth: `280px`,
            width: `280px`,
            transition: "all 0.3s ease",
            overflowX: "hidden",
          }}
        >
          {/* <GiftClaimContainer
            sx={{
              background: `
                  linear-gradient(90deg, #0D1422 0%, #141C30 60%, transparent 100%),
                  radial-gradient(circle at 75% 100%, rgba(14, 247, 169, 0.3) 0%, rgba(20, 28, 48, 0) 64%)
                `,
            }}
          >
            <GiftClaimValueContainer>
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
                width: "120px",
                height: "auto",
                position: "absolute",
                bottom: "-35px",
                left: "unset",
                right: 0,
              }}
            />
          </GiftClaimContainer> */}

          <SideBarList>
            {STATIC_DATA.navListItems.map((item) => (
              <SideBarListItem key={"Sidebar-" + item.idx} disablePadding>
                <SideBarListItemButton
                  selected={selectedItem === item.idx}
                  onClick={() => handleNavItemClick(item.idx)}
                  disabled={item.comingSoon}
                  sx={{
                    opacity: "1 !important",
                    cursor: item.comingSoon ? "not-allowed" : "pointer",
                  }}
                >
                  <SideBarListItemIcon
                    sx={{
                      filter:
                        selectedItem === item.idx ? "none" : "grayScale(100%)",
                    }}
                  >
                    {item.icon}
                  </SideBarListItemIcon>
                  <SideBarListItemText
                    sx={{
                      opacity: 1,
                    }}
                  >
                    {item.name}
                  </SideBarListItemText>
                  {item.comingSoon && (
                    <ComingSoonBadge
                      sx={{
                        opacity: 1,
                        transition: "all 0.3s ease",
                      }}
                    >
                      Coming Soon
                    </ComingSoonBadge>
                  )}
                </SideBarListItemButton>
              </SideBarListItem>
            ))}
          </SideBarList>
        </SideBarContainer>
        <MainboardContent>
          <Box sx={{ minHeight: "calc(100vh - 150px)" }}>{children}</Box>
          <FooterContainer>
            <Footer />
          </FooterContainer>
        </MainboardContent>
      </MainboardContainer>

      <MobileSidebarContainer>
        {STATIC_DATA.navListItems.map((item) => (
          <MobileSidebarItem
            isSelected={selectedItem === item.idx}
            onClick={() => handleNavItemClick(item.idx)}
            icon={item.icon}
            name={item.name}
            comingSoon={item.comingSoon}
            key={"MobileSidebar-" + item.idx}
          />
        ))}
      </MobileSidebarContainer>

      <MobileSmallSidebarContainer>
        {/* <SidebarMenuButton onClick={handleSidebarMenuClick}>
          <MenuImg src={ExpandSidebarIcon} alt="expand-sidebar-icon" />
        </SidebarMenuButton>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={sidebarAnchorEl}
          open={isSidebarOpen}
          onClose={handleSidebarMenuClose}
        >
          <SmallSidebarItemContainer>
            {restListItem.map((item) => (
              <SmallSidebarItem
                isSelected={selectedItem === item.idx}
                onClick={() => handleNavItemClick(item.idx)}
                icon={item.icon}
                name={item.name}
                key={"SmallSidebar-" + item.idx}
                comingSoon={item.comingSoon}
              />
            ))}
          </SmallSidebarItemContainer>
        </StyledMenu> */}
        {mobileListItem.map((item) => (
          <MobileSidebarItem
            isSelected={selectedItem === item.idx}
            onClick={() => handleNavItemClick(item.idx)}
            icon={item.icon}
            name={item.name}
            comingSoon={item.comingSoon}
            key={"MobileSmallSidebar-" + item.idx}
          />
        ))}
      </MobileSmallSidebarContainer>

      <ChatbotButton />
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

const NavBarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  borderWidth: "0px 0px 1px 0px",
  borderStyle: "solid",
  borderColor: "#627691",
  padding: "15px 20px",
  backgroundColor: "#0F1629",
  [theme.breakpoints.down(1280)]: {
    padding: "10px 20px",
  },
  [theme.breakpoints.down(450)]: {
    padding: "10px 15px",
  },
}));

const NavBarWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "13px",
  [theme.breakpoints.down(450)]: {
    gap: "5px",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  width: "45px",
  height: "45px",
  borderRadius: "7px",
  backgroundColor: "#171e31",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "inherit",
  position: "relative",
  [theme.breakpoints.down(450)]: {
    width: "36px",
    height: "36px",
  },
}));

const Img = styled("img")(({ theme }) => ({
  width: "18px",
  height: "auto",
}));

const Logo = styled("img")(({ theme }) => ({
  width: "180px",
  height: "auto",
  marginLeft: "5px",
  cursor: "pointer",
  [theme.breakpoints.down(1280)]: {
    width: "150px",
  },

  [theme.breakpoints.down(1096)]: {
    display: "none",
  },
}));

const SearchBarContainer = styled(Box)(({ theme }) => ({
  marginLeft: "80px",
  [theme.breakpoints.down(1280)]: {
    marginLeft: "10px",
  },
  [theme.breakpoints.down(1096)]: {
    display: "none",
  },
}));

const DesktopWalletContainer = styled(Box)(({ theme }) => ({
  padding: "5px 8px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  background:
    "radial-gradient(circle at 0% 0%, rgba(14, 247, 169, 0.3) 5%, #141c30 150%)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  [theme.breakpoints.down(1096)]: {
    display: "none",
  },
}));

const MobileWalletContainer = styled(Box)(({ theme }) => ({
  padding: "5px 8px",
  borderRadius: "8px",
  display: "none",
  alignItems: "center",
  gap: "12px",
  background:
    "radial-gradient(circle at 0% 0%, rgba(14, 247, 169, 0.3) 5%, #141c30 150%)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  [theme.breakpoints.down(1096)]: {
    display: "flex",
  },
}));

const WalletValue = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "14px",
}));

const WalletIcon = styled("img")(({ theme }) => ({
  width: "24px",
  height: "auto",
}));

const WalletButton = styled(Button)(({ theme }) => ({
  width: "90px",
  height: "35px",
  borderRadius: "7px",
  textTransform: "none",
  background: "linear-gradient(to bottom,#15A373 0%,#018055 100%)",
  minWidth: "32px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  [theme.breakpoints.down(450)]: {
    width: "35px",
    height: "35px",
  },
  p: {
    [theme.breakpoints.down(450)]: {
      display: "none",
    },
  },
  [theme.breakpoints.down(450)]: {
    width: "32px",
    height: "32px",
  },
  "&:hover": {
    backgroundColor: "#1c2a42",
  },
}));

const UserInfoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down(1096)]: {
    display: "none",
  },
}));

const MobileUserInfoContainer = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down(1096)]: {
    display: "flex",
  },
}));

const UserInfoButton = styled(Button)(({ theme }) => ({
  padding: "10px",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#171e31",
  borderRadius: "7px",
  fontSize: "14px",
  textTransform: "none",
  color: "#627691",
  height: "45px",
}));

const NotifyBadge = styled(Box)(({ theme }) => ({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: "red",
  position: "absolute",
  top: "18px",
  right: "10px",
}));

const SidebarButton = styled(Button)(({ theme }) => ({
  width: "45px",
  height: "45px",
  borderRadius: "7px",
  backgroundColor: "#171e31",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "inherit",
  position: "relative",
  [theme.breakpoints.down(1096)]: {
    display: "none",
  },
}));

const UserIconButton = styled(IconButton)(({ theme }) => ({
  width: "42px",
  height: "42px",
  border: "1px solid #1AE5A1",
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down(1096)]: {
    display: "flex",
  },
  [theme.breakpoints.down(450)]: {
    width: "36px",
    height: "36px",
  },
}));

const Icon = styled("img")(({ theme }) => ({
  width: "36px",
  height: "36px",
  [theme.breakpoints.down(450)]: {
    width: "30px",
    height: "30px",
  },
}));

const MobileSearchBar = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down(1094)]: {
    display: "block",
  },

  [theme.breakpoints.down(670)]: {
    display: "none",
  },
}));

const SideBarContainer = styled(Box)(({ theme }) => ({
  padding: "20px 10px",
  backgroundColor: "#0F1629",
  minHeight: "calc(100vh - 86px )",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.down(1096)]: {
    display: "none",
  },
}));

const GiftClaimContainer = styled(Box)(({ theme }) => ({
  borderRadius: "10px",
  padding: "20px",
  width: "100%",
  backgroundBlendMode: "overlay",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

const GiftClaimValueContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
}));

const GiftCount = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#fff",
  textWrap: "nowrap",
}));

const GiftDuration = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  color: "#fff",
  fontSize: "12px",
  textWrap: "nowrap",
}));

const GiftImg = styled("img")(({ theme }) => ({}));

const SideBarList = styled(List)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  minWidth: "48px",
}));

const SideBarListItem = styled(ListItem)(({ theme }) => ({}));

const SideBarListItemButton = styled(ListItemButton)(({ theme }) => ({
  color: "#627691",
  borderRadius: "9px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: "6px",
  gap: "14px",
  "&.Mui-selected": {
    background: `linear-gradient(
      to right,
      rgba(26, 229, 161, 0.3) -30%, 
      #171e31 100%
    )`,
    color: "#fff",
    svg: {
      color: "#1AE5A1",
    },
  },
}));

const SideBarListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  width: "32px",
  height: "32px",
  color: "inherit",
  minWidth: "32px",
}));

const SideBarListItemText = styled(ListItemText)(({ theme }) => ({
  textWrap: "nowrap",
}));

const ComingSoonBadge = styled(Box)(({ theme }) => ({
  padding: "2px 8px",
  borderRadius: "8px",
  fontSize: "9px",
  fontWeight: "800",
  textTransform: "uppercase",
  letterSpacing: "0.8px",
  background: "linear-gradient(135deg, #1AE5A1 0%, #01A482 50%, #0ef7a9 100%)",
  color: "#fff",
  boxShadow:
    "0 2px 8px rgba(26, 229, 161, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15)",
  transform: "rotate(-8deg)",
  whiteSpace: "nowrap",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "8px",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, transparent 60%)",
    pointerEvents: "none",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "2px",
    left: "2px",
    right: "2px",
    bottom: "2px",
    borderRadius: "6px",
    background:
      "linear-gradient(135deg, transparent 0%, rgba(0, 0, 0, 0.1) 100%)",
    pointerEvents: "none",
  },
}));

const MobileSidebarContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  width: "100%",
  height: "auto",
  backgroundColor: "#0E1629",
  display: "none",
  justifyContent: "center",
  boxShadow: "0px -1px 4px 0px rgba(5,5,5,0.75);",
  padding: "4px",
  gap: "40px",
  zIndex: "10",
  [theme.breakpoints.down(1096)]: {
    display: "flex",
  },
  [theme.breakpoints.down(768)]: {
    gap: "20px",
  },
  [theme.breakpoints.down(640)]: {
    gap: "0px",
    justifyContent: "space-between",
  },
  [theme.breakpoints.down(480)]: {
    display: "none",
  },
}));

const MobileSmallSidebarContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  width: "100%",
  height: "auto",
  overflowX: "auto",
  backgroundColor: "#0E1629",
  justifyContent: "center",
  boxShadow: "0px -1px 4px 0px rgba(5,5,5,0.75);",
  padding: "4px",
  gap: "40px",
  display: "none",
  zIndex: "10",
  [theme.breakpoints.down(480)]: {
    display: "flex",
    height: "auto",
    alignItems: "center",
    gap: "0px",
    justifyContent: "space-between",
  },
}));

interface MobileSidebarItemProps {
  isSelected: boolean;
  icon: React.ReactNode;
  name: string;
  onClick: () => void;
  comingSoon?: boolean;
}

const MobileSidebarItem = (props: MobileSidebarItemProps) => {
  const { isSelected, icon, name, onClick, comingSoon = false } = props;
  return (
    <MobileSidebarItemContainer
      sx={{
        backgroundColor: isSelected ? "#01A482" : "none",
        color: isSelected ? "#fff" : "#627691",
        opacity: "1 !important",
        cursor: comingSoon ? "not-allowed" : "pointer",
      }}
      onClick={comingSoon ? undefined : onClick}
      disabled={comingSoon}
    >
      <MobileSidebarIcon
        sx={{ filter: isSelected ? "none" : "grayScale(100%)" }}
      >
        {icon}
      </MobileSidebarIcon>
      <MobileSidebarItemText>{name}</MobileSidebarItemText>
      {comingSoon && <MobileComingSoonBadge>Soon</MobileComingSoonBadge>}
    </MobileSidebarItemContainer>
  );
};

const MobileSidebarItemContainer = styled(Button)(({ theme }) => ({
  width: "84px",
  height: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "4px",
  borderRadius: "4px",
  textTransform: "none",
  [theme.breakpoints.down(480)]: {
    width: "54px",
  },
}));

const MobileSidebarIcon = styled(Box)(({ theme }) => ({
  width: "28px",
  height: "28px",
  color: "inherit",
  [theme.breakpoints.down(640)]: {
    width: "24px",
    height: "24px",
  },
}));

const MobileSidebarItemText = styled(Box)(({ theme }) => ({
  fontSize: "12px",
  color: "inherit",
  width: "64px",
  lineHeight: "15px",
  textAlign: "center",
  height: "30px",
  [theme.breakpoints.down(640)]: {
    fontSize: "10px",
  },
}));

const MobileComingSoonBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "-2px",
  right: "-2px",
  padding: "1px 4px",
  borderRadius: "5px",
  fontSize: "7px",
  fontWeight: "800",
  textTransform: "uppercase",
  letterSpacing: "0.6px",
  background: "linear-gradient(135deg, #1AE5A1 0%, #01A482 50%, #0ef7a9 100%)",
  color: "#fff",
  boxShadow:
    "0 1px 4px rgba(26, 229, 161, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
  transform: "rotate(-12deg)",
  whiteSpace: "nowrap",
  textAlign: "center",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "5px",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, transparent 60%)",
    pointerEvents: "none",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "1px",
    left: "1px",
    right: "1px",
    bottom: "1px",
    borderRadius: "4px",
    background:
      "linear-gradient(135deg, transparent 0%, rgba(0, 0, 0, 0.1) 100%)",
    pointerEvents: "none",
  },
}));

const MainboardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  width: "100%",
}));

const MainboardContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: `calc(100% - 20px - 320px)`,
  padding: "0 20px 20px 20px",
  maxWidth: "1500px",
  [theme.breakpoints.down(1096)]: {
    width: "100%",
  },

  [theme.breakpoints.down(640)]: {
    padding: "0px 10px 10px 10px",
  },
}));

const FooterContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down(540)]: {
    marginBottom: "45px",
  },
  [theme.breakpoints.down(480)]: {
    marginBottom: "105px",
  },
}));

const SidebarMenuButton = styled(Button)(({ theme }) => ({
  width: "64px",
  height: "54px",
  background: "transparent",
  borderRadius: "8px",
  minWidth: "64px",
}));

const SmallSidebarItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
}));

const MenuImg = styled("img")(({ theme }) => ({
  width: "20px",
  height: "auto",
}));

const SmallSidebarItem = (props: MobileSidebarItemProps) => {
  const { isSelected, icon, name, onClick, comingSoon = false } = props;
  return (
    <MobileSidebarItemContainer
      sx={{
        backgroundColor: isSelected ? "#01A482" : "none",
        color: isSelected ? "#fff" : "#627691",
        opacity: "1 !important",
        cursor: comingSoon ? "not-allowed" : "pointer",
      }}
      onClick={comingSoon ? undefined : onClick}
      disabled={comingSoon}
    >
      <MobileSidebarIcon
        sx={{ filter: isSelected ? "none" : "grayScale(100%)" }}
      >
        {icon}
      </MobileSidebarIcon>
      <MobileSidebarItemText>{name}</MobileSidebarItemText>
      {comingSoon && <MobileComingSoonBadge>Soon</MobileComingSoonBadge>}
    </MobileSidebarItemContainer>
  );
};

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#0f1629",
    backgroundImage: "none",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    marginTop: "8px",
    minWidth: "200px",
    padding: "8px",
    ul: {
      paddingTop: "0px",
      paddingBottom: "0px",
    },
  },
}));

const MenuListItem = styled(MenuItem)(({ theme }) => ({
  color: "#627691",
  padding: "12px 16px",
  borderRadius: "8px",
  margin: "4px 0",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  "& .MuiListItemIcon-root": {
    minWidth: "24px",
    color: "#627691",
  },
}));
