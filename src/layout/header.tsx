import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Popover,
  styled,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { KeyboardArrowDown, Menu as MuiMenu } from "@mui/icons-material";
import { LuUserRound } from "react-icons/lu";
import { AiOutlineKey } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { LogoImg, MobileLogoImg } from "../constants/images";
import { US, FR, CN, ES } from "country-flag-icons/react/3x2";

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [activeLanguage, setActiveLanguage] = useState<{
    code: string;
    flag: React.ReactNode;
  }>({
    code: "EN",
    flag: <US />,
  });
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? "simple-popover" : undefined;

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };

  const handleLanguageSelect = (code: string, flag: React.ReactNode) => {
    setActiveLanguage({ code, flag });
    handleLanguageClose();
  };

  return (
    <Container>
      <Wrapper>
        <DesktopLogoImage
          src={LogoImg}
          alt="betsave-logo"
          width={"180px"}
          height={"auto"}
          onClick={() => navigate("/")}
        />
        <MobileLogoImage
          src={MobileLogoImg}
          alt="betsave-logo"
          width={"42px"}
          height={"auto"}
          onClick={() => navigate("/")}
        />
        <VerticalDivider orientation="vertical" />
        <Content>
          <LinkItemContainer>
            {/* <LinkItem onClick={() => navigate("/earn")}>
              <Icon src={GreenCashbackIcon} alt="earn-icon" />
              Earn
            </LinkItem>
            <LinkItem onClick={() => navigate("/bet")}>
              <Icon src={GreenWalletIcon} alt="cashout-icon" />
              Cashout
            </LinkItem>*/}
          </LinkItemContainer>
          <ActionContainer>
            <ButtonContainer>
              <ActionButton
                variant="contained"
                endIcon={<KeyboardArrowDown />}
                onClick={handleLanguageClick}
              >
                <FlagIcons>{activeLanguage.flag}</FlagIcons>
                {activeLanguage.code}
              </ActionButton>
              <StyledMenu
                anchorEl={languageAnchorEl}
                open={Boolean(languageAnchorEl)}
                onClose={handleLanguageClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={() => handleLanguageSelect("EN", <US />)}>
                  <ListItemIcon>
                    <FlagIcons>
                      <US />
                    </FlagIcons>
                  </ListItemIcon>
                  <ListItemText>English</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleLanguageSelect("FR", <FR />)}>
                  <ListItemIcon>
                    <FlagIcons>
                      <FR />
                    </FlagIcons>
                  </ListItemIcon>
                  <ListItemText>Français</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleLanguageSelect("CN", <CN />)}>
                  <ListItemIcon>
                    <FlagIcons>
                      <CN />
                    </FlagIcons>
                  </ListItemIcon>
                  <ListItemText>中文</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleLanguageSelect("ES", <ES />)}>
                  <ListItemIcon>
                    <FlagIcons>
                      <ES />
                    </FlagIcons>
                  </ListItemIcon>
                  <ListItemText>Español</ListItemText>
                </MenuItem>
              </StyledMenu>
              <ActionButton variant="contained" startIcon={<LuUserRound />}>
                Sign In
              </ActionButton>
              <ActionButton
                variant="contained"
                startIcon={<AiOutlineKey />}
                sx={{ background: "#1ae5a1", color: "#000" }}
              >
                Sign Up
              </ActionButton>
            </ButtonContainer>
          </ActionContainer>
          <MobileAction>
            <IconButton size="medium" onClick={handleClick}>
              <MuiMenu fontSize="inherit" />
            </IconButton>
            <Popover
              id={id}
              open={isOpen}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              sx={{ marginTop: "20px" }}
            >
              <PopoverContainer>
                <ButtonContainer>
                  <ActionButton variant="contained" startIcon={<LuUserRound />}>
                    Sign In
                  </ActionButton>
                  <ActionButton
                    variant="contained"
                    startIcon={<AiOutlineKey />}
                    sx={{ background: "#1ae5a1", color: "#000" }}
                  >
                    Sign Up
                  </ActionButton>
                  <ActionButton
                    variant="contained"
                    endIcon={<KeyboardArrowDown />}
                    onClick={handleLanguageClick}
                  >
                    <FlagIcons>{activeLanguage.flag}</FlagIcons>
                    {activeLanguage.code}
                  </ActionButton>
                  <StyledMenu
                    anchorEl={languageAnchorEl}
                    open={Boolean(languageAnchorEl)}
                    onClose={handleLanguageClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MenuItem
                      onClick={() => handleLanguageSelect("EN", <US />)}
                    >
                      <ListItemIcon>
                        <FlagIcons>
                          <US />
                        </FlagIcons>
                      </ListItemIcon>
                      <ListItemText>English</ListItemText>
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleLanguageSelect("FR", <FR />)}
                    >
                      <ListItemIcon>
                        <FlagIcons>
                          <FR />
                        </FlagIcons>
                      </ListItemIcon>
                      <ListItemText>Français</ListItemText>
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleLanguageSelect("CN", <CN />)}
                    >
                      <ListItemIcon>
                        <FlagIcons>
                          <CN />
                        </FlagIcons>
                      </ListItemIcon>
                      <ListItemText>中文</ListItemText>
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleLanguageSelect("ES", <ES />)}
                    >
                      <ListItemIcon>
                        <FlagIcons>
                          <ES />
                        </FlagIcons>
                      </ListItemIcon>
                      <ListItemText>Español</ListItemText>
                    </MenuItem>
                  </StyledMenu>
                </ButtonContainer>
              </PopoverContainer>
            </Popover>
          </MobileAction>
        </Content>
      </Wrapper>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
}));

const Wrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "82px",
  borderRadius: "10px",
  backgroundColor: "#0f1629",
  padding: "20px",
  display: "flex",
  alignItems: "center",
  margin: "30px",
  [theme.breakpoints.down(1024)]: {
    margin: "20px",
    padding: "10px",
    height: "62px",
  },
}));

const DesktopLogoImage = styled("img")(({ theme }) => ({
  marginLeft: "20px",
  cursor: "pointer",
  [theme.breakpoints.down(1024)]: {
    display: "none",
  },
}));

const MobileLogoImage = styled("img")(({ theme }) => ({
  marginLeft: "10px",
  cursor: "pointer",
  display: "none",
  [theme.breakpoints.down(1024)]: {
    display: "block",
  },
  [theme.breakpoints.down(450)]: {
    marginLeft: "0",
  },
}));

const VerticalDivider = styled(Divider)(({ theme }) => ({
  margin: "0 35px",
  [theme.breakpoints.down(1240)]: {
    margin: "0 20px",
  },
  [theme.breakpoints.down(450)]: {
    margin: "0 10px",
  },
}));

const Content = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginLeft: "10px",
  width: "100%",
  height: "100%",
  [theme.breakpoints.down(1240)]: {
    marginLeft: "4px",
  },
}));

const LinkItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontWeight: "bold",
  color: "#627691",
  fontSize: "16px",
  cursor: "pointer",
  [theme.breakpoints.down(1240)]: {
    fontSize: "14px",
  },
}));

const Icon = styled("img")(({ theme }) => ({
  width: "24px",
  height: "auto",
  color: "#1AE5A1",
}));

const LinkItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "40px",
  [theme.breakpoints.down(1240)]: {
    gap: "20px",
  },

  [theme.breakpoints.down(450)]: {
    gap: "10px",
  },
}));

const ActionContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "36px",
  height: "100%",
  [theme.breakpoints.down(1240)]: {
    gap: "20px",
  },
  [theme.breakpoints.down(540)]: {
    display: "none",
  },
}));

const MobileAction = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down(540)]: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    height: "100%",
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  height: "100%",
  [theme.breakpoints.down(480)]: {
    flexDirection: "column",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  height: "100%",
  fontWeight: "bold",
  border: "1px solid #354054",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "14px",
  width: "120px",
  background: "linear-gradient(180deg, #172236 0%, #212C40 100%)",
}));

const FlagIcons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "20px",
  height: "20px",
  marginRight: "8px",
}));

const PopoverContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "15px",
  backgroundColor: "#141c30",
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#141c30",
    borderRadius: "8px",
    marginTop: "8px",
    minWidth: "180px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    "& .MuiMenuItem-root": {
      padding: "12px 16px",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#1e2a3d",
      },
      "& .MuiListItemIcon-root": {
        minWidth: "40px",
      },
      "& .MuiListItemText-root": {
        margin: 0,
      },
    },
  },
}));
