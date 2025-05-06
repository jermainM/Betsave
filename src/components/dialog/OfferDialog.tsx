import React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Typography, Box, styled } from "@mui/material";

interface OfferDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  image: string;
  title: string;
}

export const OfferDialog: React.FC<OfferDialogProps> = ({
  open,
  setOpen,
  image,
  title,
}) => {
  return (
    <StyledDialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogContainer>
        <CloseButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </CloseButton>
        <TitleBox>
          <TitleText>{title}</TitleText>
        </TitleBox>
        <ImageSection>
          <DialogImage src={image} alt="dialog-img" />
        </ImageSection>
        <CasinoSection>
          <CasinoTitle>Casino</CasinoTitle>
          <PopularityBox>
            <PopularityLabel>Popularity Score</PopularityLabel>
            <StarsBox>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i}>★</Star>
              ))}
            </StarsBox>
          </PopularityBox>
        </CasinoSection>
        <ReceiveButton fullWidth>Receive 5%</ReceiveButton>
        <SectionBox>
          <SectionTitle>Description</SectionTitle>
          <SectionText>
            Hit GO! Roll the dice! Interact with your friends, family members
            and fellow Tycoons from around the world as you explore the
            expanding universe of MONOPOLY GO! It's the new way to play - board
            flipping cleanup not required!
          </SectionText>
        </SectionBox>
        <StatusPartnerSection>
          <StatusBox>
            <StatusTitle>Not Started</StatusTitle>
            <StatusLabel>Status</StatusLabel>
          </StatusBox>
          <PartnerBox>
            <PartnerTitle>BetSave</PartnerTitle>
            <PartnerLabel>Partner</PartnerLabel>
          </PartnerBox>
        </StatusPartnerSection>
        <DividerLine />
        <SectionBox>
          <SectionTitle>Terms And Conditions</SectionTitle>
          <SectionText sx={{ paddingBottom: "32px" }}>
            Hit GO! Roll the dice! Interact with your friends, family members
            and fellow Tycoons from around the world as you explore the
            expanding universe of MONOPOLY GO! It's the new way to play - board
            flipping cleanup not required!
          </SectionText>
        </SectionBox>
      </DialogContainer>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "17px",
    backgroundColor: "#151A30",
    backgroundImage: "none",
    color: "#fff",
    maxWidth: "none",
    width: "540px",
    padding: 0,
    [theme.breakpoints.down(450)]: {
      width: "100%",
      margin: "24px",
    },
  },
}));

const DialogContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  [theme.breakpoints.down(450)]: {
    gap: "16px",
    padding: "16px",
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 16,
  right: 16,
  color: "#627691",
  zIndex: 2,
}));

const TitleBox = styled(Box)(({ theme }) => ({}));

const TitleText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 22,
  color: "#fff",
}));

const ImageSection = styled(Box)(({ theme }) => ({
  height: "160px",
  background: "#080F29",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "12px",
}));

const DialogImage = styled("img")(({ theme }) => ({
  maxHeight: "120px",
  maxWidth: "80%",
  objectFit: "contain",
  borderRadius: "12px",
}));

const CasinoSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down(380)]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "6px",
  },
}));

const CasinoTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 18,
  color: "#fff",
}));

const PopularityBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 4,
}));

const PopularityLabel = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: "#FFD600",
  fontWeight: 600,
}));

const StarsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: 8,
}));

const Star = styled("span")(({ theme }) => ({
  color: "#FFD600",
  fontSize: 18,
  marginLeft: 2,
  "&:first-of-type": {
    marginLeft: 0,
  },
}));

const ReceiveButton = styled(Button)(({ theme }) => ({
  background: "#1AE5A1",
  color: "#171e30",
  fontWeight: 700,
  fontSize: 16,
  borderRadius: "8px",
  textTransform: "none",
  "&:hover": { background: "#15c88c" },
}));

const SectionBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 16,
  color: "#fff",
}));

const SectionText = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  color: "#8A8D98",
}));

const StatusPartnerSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 24px",
  [theme.breakpoints.down(380)]: {
    padding: "0 16px",
  },
}));

const StatusBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
}));
const PartnerBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
}));

const StatusTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "16px",
  color: "#fff",
}));
const StatusLabel = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: "#627691",
}));
const PartnerTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "16px",
  color: "#fff",
  textAlign: "right",
}));
const PartnerLabel = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: "#627691",
  textAlign: "right",
}));

const DividerLine = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #31364A",
}));
