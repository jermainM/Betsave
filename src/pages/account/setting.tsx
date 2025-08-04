import {
  KeyboardArrowDown,
  Visibility,
  VisibilityOff,
  CloudUpload,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  styled,
  Typography,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  AmazonIcon,
  PaypalIcon,
  BitcoinIcon,
  TempUserIcon,
} from "../../constants/images";
import CountrySelect from "../../components/common/CountrySelect";
import { userService } from "../../api/services/userService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNotification } from "../../provider/notification";
import { updateUser } from "../../store/slices/sessionSlice";

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
    firstName: "",
    lastName: "",
    country: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setLoading] = useState(false);

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { notifySuccess, notifyError } = useNotification();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(
    paymentMethods[0].id
  );
  const isMenuOpen = Boolean(anchorEl);

  const allowedTypes = [
    "image/svg+xml",
    "image/SVG+XML",
    "image/png",
    "image/PNG",
    "image/jpeg",
    "image/JPEG",
    "image/jpg",
    "image/JPG",
  ];

  const handleData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.session);

  const handleCountryChange = (countryCode: string) => {
    setData({ ...data, country: countryCode });
  };

  const handlePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        notifyError("Invalid file type");
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
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

  const handleUpdate = async () => {
    try {
      if (
        data.newPassword != null &&
        data.newPassword !== data.confirmPassword
      ) {
        notifyError("New password and confirm password do not match");
        return;
      }
      setLoading(true);
      const response = await userService.updateUserInfo(user?.betsaveId, {
        file: avatarFile,
        ...data,
      });
      if (response.success) {
        dispatch(updateUser(response.data));
      }
      notifySuccess("Profile updated successfully");
      setLoading(false);
    } catch (error) {
      notifyError("Failed to update profile: " + (error as Error).message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setData({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        country: user.country,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setAvatarPreview(user.avatar);
    }
  }, [user]);

  return (
    <SettingContainer>
      <SettingTitleContainer>
        <SettingTitle>Personal Info</SettingTitle>
        <SettingSubTitle>Update your profile information</SettingSubTitle>
      </SettingTitleContainer>

      <SettingForm>
        {/* Avatar Upload Section */}
        <AvatarSection>
          <AvatarTitle>Profile Picture</AvatarTitle>
          <AvatarUploadContainer>
            <AvatarPreviewContainer>
              <AvatarPreview
                src={avatarPreview || TempUserIcon}
                alt="Profile"
              />
              <AvatarOverlay>
                <CloudUpload sx={{ fontSize: 24, color: "#1AE5A1" }} />
              </AvatarOverlay>
            </AvatarPreviewContainer>
            <AvatarInput
              type="file"
              id="avatar-input"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <AvatarLabel htmlFor="avatar-input">Change Photo</AvatarLabel>
          </AvatarUploadContainer>
        </AvatarSection>

        {/* Email Section */}
        <SectionContainer>
          <SectionTitle>Email Address</SectionTitle>
          <SettingFormInput
            placeholder="Enter your email address"
            name="email"
            value={data.email}
            onChange={handleData}
          />
        </SectionContainer>

        {/* Personal Information */}
        <SectionContainer>
          <SectionTitle>Personal Information</SectionTitle>
          <InputWrapper>
            <SettingFormInput
              placeholder="Enter your first name"
              name="firstName"
              value={data.firstName}
              onChange={handleData}
            />
            <SettingFormInput
              placeholder="Enter your last name"
              name="lastName"
              value={data.lastName}
              onChange={handleData}
            />
          </InputWrapper>

          <CountrySelectWrapper>
            <CountrySelect
              value={data.country}
              onChange={handleCountryChange}
            />
          </CountrySelectWrapper>
        </SectionContainer>

        {/* Password Update Section */}
        <SectionContainer>
          <SectionTitle>Password Update</SectionTitle>
          <PasswordInputContainer>
            <PasswordInput
              name="currentPassword"
              placeholder="Enter current password"
              value={data.currentPassword}
              onChange={handleData}
              type={showPasswords.current ? "text" : "password"}
            />
            <PasswordToggleButton
              onClick={() => handlePasswordVisibility("current")}
              type="button"
            >
              {showPasswords.current ? <VisibilityOff /> : <Visibility />}
            </PasswordToggleButton>
          </PasswordInputContainer>

          <InputWrapper>
            <PasswordInputContainer>
              <PasswordInput
                name="newPassword"
                placeholder="Enter new password"
                value={data.newPassword}
                onChange={handleData}
                type={showPasswords.new ? "text" : "password"}
              />
              <PasswordToggleButton
                onClick={() => handlePasswordVisibility("new")}
                type="button"
              >
                {showPasswords.new ? <VisibilityOff /> : <Visibility />}
              </PasswordToggleButton>
            </PasswordInputContainer>

            <PasswordInputContainer>
              <PasswordInput
                name="confirmPassword"
                placeholder="Confirm new password"
                value={data.confirmPassword}
                onChange={handleData}
                type={showPasswords.confirm ? "text" : "password"}
              />
              <PasswordToggleButton
                onClick={() => handlePasswordVisibility("confirm")}
                type="button"
              >
                {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
              </PasswordToggleButton>
            </PasswordInputContainer>
          </InputWrapper>
        </SectionContainer>

        {/* Payment Preferences */}
        <SectionContainer>
          <SectionTitle>Payment Preferences</SectionTitle>
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
        </SectionContainer>

        <SaveButton onClick={handleUpdate} disabled={isLoading}>
          Save Changes
        </SaveButton>
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
  gap: "24px",
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#fff",
  fontWeight: "500",
  marginBottom: "8px",
}));

// Avatar Section Styles
const AvatarSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  alignItems: "center",
  padding: "24px",
  backgroundColor: "#0f1629",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
}));

const AvatarTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#fff",
  fontWeight: "500",
}));

const AvatarUploadContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
}));

const AvatarPreviewContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  overflow: "hidden",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover .avatar-overlay": {
    opacity: 1,
  },
}));

const AvatarPreview = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
}));

const AvatarOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  transition: "opacity 0.3s ease",
}));

const AvatarInput = styled("input")(({ theme }) => ({
  display: "none",
}));

const AvatarLabel = styled("label")(({ theme }) => ({
  color: "#1AE5A1",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  "&:hover": {
    textDecoration: "underline",
  },
}));

// Email Section Styles
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
  [theme.breakpoints.down(480)]: {
    flexDirection: "column",
    gap: "16px",
  },
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
  [theme.breakpoints.down(480)]: {
    width: "100%",
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
  [theme.breakpoints.down(480)]: {
    width: "100%",
  },
}));

// Input Styles
const InputWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.down(480)]: {
    flexDirection: "column",
    gap: "16px",
  },
}));

const SettingFormInput = styled("input")(({ theme }) => ({
  border: "none",
  outline: "none",
  width: "100%",
  backgroundColor: "#0f1629",
  borderRadius: "10px",
  fontSize: "16px",
  color: "#fff",
  fontFamily: "SpaceGrotesk, sans-serif",
  padding: "16px 18px",
  "::placeholder": {
    color: "#627691",
  },
  [theme.breakpoints.down(480)]: {
    width: "100%",
  },
  [theme.breakpoints.down(390)]: {
    fontSize: "14px",
  },
}));

const PasswordInput = styled("input")(({ theme }) => ({
  border: "none",
  outline: "none",
  width: "100%",
  backgroundColor: "#0f1629",
  borderRadius: "10px",
  fontSize: "16px",
  color: "#fff",
  fontFamily: "SpaceGrotesk, sans-serif",
  padding: "16px 18px",
  "::placeholder": {
    color: "#627691",
  },
  [theme.breakpoints.down(480)]: {
    width: "100%",
  },
  [theme.breakpoints.down(390)]: {
    fontSize: "14px",
  },
}));

const CountrySelectWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down(480)]: {
    "& .MuiAutocomplete-root": {
      width: "100%",
    },
  },
}));

// Payment Section Styles
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
  width: "240px",
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

const PasswordInputContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
}));

const PasswordToggleButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#627691",
  padding: "4px",
  "&:hover": {
    color: "#1AE5A1",
  },
}));
