import { Box, Dialog, styled, Button, InputBase } from "@mui/material";
import { BetsaveSuperForgotPng } from "../../../constants/images";
import { IoClose } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";

interface ForgotPasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

export const ForgotPasswordDialog = (props: ForgotPasswordDialogProps) => {
  const { isOpen, onClose, onBack } = props;

  return (
    <StyledDialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <HeroSection>
          <HeroImage src={BetsaveSuperForgotPng} alt="hero" />
          <HeaderSection>
            <BackButton onClick={onBack}>
              <MdKeyboardArrowLeft />
              Back
            </BackButton>
            <CloseButton onClick={onClose}>
              <IoClose />
            </CloseButton>
          </HeaderSection>
        </HeroSection>
        <ContentSection>
          <Title>Forgot your password?</Title>
          <Description>
            Enter your email and we will send you a link to reset your password
          </Description>
          <StyledInput placeholder="Enter your e-mail" />
          <SubmitButton>Submit</SubmitButton>
        </ContentSection>
      </DialogContent>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "17px",
    maxWidth: "none",
    margin: "16px",
    backgroundColor: "#141C30",
  },
}));

const DialogContent = styled(Box)(({ theme }) => ({
  width: "414px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#141C30",
  padding: "12px",
  [theme.breakpoints.down(480)]: {
    width: "90vw",
  },
}));

const HeroSection = styled(Box)({
  position: "relative",
  width: "100%",
});

const HeaderSection = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  padding: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const BackButton = styled(Button)({
  color: "#8A8D98",
  textTransform: "none",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  padding: "8px",
  fontSize: "14px",
  fontWeight: "500",
  backgroundColor: "#080F29",
  borderRadius: "8px",
  height: "32px",
});

const CloseButton = styled(Button)(({ theme }) => ({
  width: "32px",
  height: "32px",
  minWidth: "32px",
  backgroundColor: "#172236",
  borderRadius: "8px",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#1c2a42",
  },
}));

const HeroImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "145px",
  objectFit: "cover",
  borderRadius: "11px",
}));

const ContentSection = styled(Box)(({ theme }) => ({
  padding: "16px 12px",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down(480)]: {
    padding: "8px",
  },
}));

const Title = styled(Box)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: "700",
  color: "#fff",
  marginBottom: "12px",
  whiteSpace: "nowrap",
  [theme.breakpoints.down(480)]: {
    fontSize: "24px",
  },
  [theme.breakpoints.down(360)]: {
    fontSize: "20px",
  },
}));

const Description = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  color: "#8A8D98",
  marginBottom: "24px",
  [theme.breakpoints.down(480)]: {
    marginBottom: "12px",
  },
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: "#172236",
  borderRadius: "8px",
  padding: "12px 16px",
  color: "#fff",
  width: "100%",
  marginBottom: "24px",
  "& input": {
    "&::placeholder": {
      color: "#6B7280",
      opacity: 1,
    },
  },
  [theme.breakpoints.down(480)]: {
    marginBottom: "12px",
    padding: "8px 12px",
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1AE5A1",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  textTransform: "none",
  width: "fit-content",
  "&:hover": {
    backgroundColor: "#15cc8f",
  },
  [theme.breakpoints.down(480)]: {
    padding: "8px 24px",
  },
}));
