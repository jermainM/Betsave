import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, Menu, MenuItem, styled, Typography } from "@mui/material";
import { useState } from "react";
import { AmazonIcon, PaypalIcon, BitcoinIcon } from "../../constants/images";

type PaymentMethod = "Amazon" | "PayPal" | "Crypto";

interface PaymentMethodOption {
  id: PaymentMethod;
  label: string;
  placeholder: string;
  icon: string;
  tag?: string;
}

const paymentMethods: PaymentMethodOption[] = [
  {
    id: "Amazon",
    label: "Payment method",
    placeholder: "Enter your Email address",
    icon: AmazonIcon,
  },
  {
    id: "PayPal",
    label: "Payment method",
    placeholder: "Enter your PayPal Address",
    icon: PaypalIcon,
  },
  {
    id: "Crypto",
    label: "Payment method",
    placeholder: "Select Token",
    icon: BitcoinIcon,
  },
];

export const Setting = () => {
  const [data, setData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
    city: "",
    country: "",
    payment: "",
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(
    paymentMethods[0].id
  );
  const isMenuOpen = Boolean(anchorEl);

  const handleData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    handleMenuClose();
  };

  return (
    <SettingContainer>
      <SettingTitleContainer>
        <SettingTitle>Personal Info</SettingTitle>
        <SettingSubTitle>Fill in your details</SettingSubTitle>
      </SettingTitleContainer>
      <SettingForm>
        <EmailInputContainer>
          <EmailInput
            name="email"
            placeholder="Enter your e-mail"
            value={data.email}
            onChange={handleData}
          />
          <ConfirmButton>Confirm</ConfirmButton>
        </EmailInputContainer>

        <InputWrapper>
          <SettingFormInput
            placeholder="Enter your first name"
            name="firstname"
            value={data.firstname}
            onChange={handleData}
          />
          <SettingFormInput
            placeholder="Enter your last name"
            name="lastname"
            value={data.lastname}
            onChange={handleData}
          />
        </InputWrapper>

        <InputWrapper>
          <SettingFormInput
            placeholder="Enter your user name"
            name="username"
            value={data.username}
            onChange={handleData}
          />
          <SettingFormInput
            placeholder="Enter your phone number"
            name="phone"
            value={data.phone}
            onChange={handleData}
          />
        </InputWrapper>

        <InputWrapper>
          <SettingFormInput
            placeholder="Enter your city"
            name="city"
            value={data.city}
            onChange={handleData}
          />
          <SettingFormInput
            placeholder="Enter your country"
            name="country"
            value={data.country}
            onChange={handleData}
          />
        </InputWrapper>

        <PaymentOptionContainer>
          <PreferenceInput
            name="payment"
            placeholder="Payment Preferences"
            value={selectedMethod}
            onChange={handleData}
            disabled
          />
          <SelectButton
            endIcon={<KeyboardArrowDown />}
            onClick={handleMenuClick}
          >
            Select
          </SelectButton>
          <StyledMenu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {paymentMethods.map((method) => (
              <StyledMenuItem
                key={method.id}
                onClick={() => handleMethodSelect(method.id)}
                selected={selectedMethod === method.id}
              >
                <MenuItemContent>
                  <MethodIcon src={method.icon} alt={method.id} />
                  {method.id}
                </MenuItemContent>
              </StyledMenuItem>
            ))}
          </StyledMenu>
        </PaymentOptionContainer>

        <SaveButton>Save</SaveButton>
      </SettingForm>
    </SettingContainer>
  );
};

const SettingContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

const SettingTitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
}));

const SettingTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: "#fff",
  fontWeight: "normal",
}));

const SettingSubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: "#627691",
}));

const SettingForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

const EmailInputContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#0f1629",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "10px",
  padding: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  gap: "30px",
}));

const EmailInput = styled("input")(({ theme }) => ({
  border: "none",
  outline: "none",
  background: "none",
  fontSize: "16px",
  color: "#fff",
  padding: "0px 12px",
  width: "80%",
  fontFamily: "SpaceGrotesk, sans-serif",
  "::placeholder": {
    color: "#627691",
  },
  [theme.breakpoints.down(540)]: {
    fontSize: "16px",
  },
  [theme.breakpoints.down(390)]: {
    fontSize: "14px",
  },
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1AE5A1",
  borderRadius: "7px",
  width: "90px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#000",
  fontSize: "14px",
  fontWeight: "bold",
  textTransform: "none",
  //   [theme.breakpoints.down(540)]: {
  //     width: '100px',
  //     height: '35px',
  //     fontSize: '16px',
  //   },
  //   [theme.breakpoints.down(390)]: {
  //     fontSize: '14px',
  //   },
}));

const InputWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.down(480)]: {
    flexDirection: "column",
  },
}));

const SettingFormInput = styled("input")(({ theme }) => ({
  border: "none",
  outline: "none",
  width: "80%",
  backgroundColor: "#0f1629",
  borderRadius: "10px",
  fontSize: "16px",
  color: "#fff",
  fontFamily: "SpaceGrotesk, sans-serif",
  padding: "16px 18px ",
  "::placeholder": {
    color: "#627691",
  },
  //   [theme.breakpoints.down(540)]: {
  //     fontSize: '16px',
  //   },
  [theme.breakpoints.down(480)]: {
    width: "100%",
  },
  [theme.breakpoints.down(390)]: {
    fontSize: "14px",
  },
}));

const PaymentOptionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#0f1629",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "10px",
  padding: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  gap: "30px",
  [theme.breakpoints.down(390)]: {
    gap: "0px",
  },
}));

const PreferenceInput = styled("input")(({ theme }) => ({
  border: "none",
  outline: "none",
  background: "none",
  fontSize: "16px",
  color: "#fff",
  padding: "0px 12px",
  width: "80%",
  fontFamily: "SpaceGrotesk, sans-serif",
  "::placeholder": {
    color: "#627691",
  },
  [theme.breakpoints.down(390)]: {
    fontSize: "14px",
  },
}));

const SelectButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#172034",
  borderRadius: "7px",
  width: "90px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "bold",
  textTransform: "none",
  minWidth: "90px",
}));

const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1AE5A1",
  borderRadius: "7px",
  width: "120px",
  height: "45px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#000",
  fontSize: "18px",
  fontWeight: "bold",
  textTransform: "none",
  [theme.breakpoints.down(540)]: {
    width: "100%",
    height: "45px",
    fontSize: "16px",
  },
  [theme.breakpoints.down(390)]: {
    fontSize: "14px",
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#111827",
    borderRadius: "10px",
    marginTop: "8px",
    minWidth: "200px",
    backgroundImage: "none",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
    border: "1px solid rgba(26, 229, 161, 0.1)",
    "& .MuiList-root": {
      padding: "8px",
    },
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  borderRadius: "8px",
  margin: "2px 0",
  padding: "10px 16px",
  color: "#627691",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#1a2234",
    color: "#fff",
  },
  "&.Mui-selected": {
    backgroundColor: "#1AE5A1",
    color: "#102A33",
    "&:hover": {
      backgroundColor: "#1AE5A1",
    },
  },
}));

const MenuItemContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "14px",
  fontWeight: 500,
}));

const MethodIcon = styled("img")({
  width: "24px",
  height: "24px",
  objectFit: "contain",
});
