import {
  Box,
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  FormGroup,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { SignInput } from "../input/SignInput";
import { LuUserRound } from "react-icons/lu";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { MdOutlineEmail } from "react-icons/md";
import { PaymentMethodMenu } from "../menu/PaymentMethod";
import { FaSackDollar, FaBullhorn } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface SignUpDialogProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

export const SignUpDialog = (props: SignUpDialogProps) => {
  const { isOpen, setOpen } = props;
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    marketing: "",
  });

  const handleChange = (name: string, value: string) => {
    setData({ ...data, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledDialog open={isOpen} onClose={handleClose}>
      <DialogContent>
        <DialogTitle>Sign Up Now</DialogTitle>
        <SignInputContainer>
          <SignInputWrapper>
            <SignInput
              icon={<LuUserRound style={{ width: "100%", height: "100%" }} />}
              name="name"
              placeholder="Full Name"
              type="text"
              value={data.name}
              setValue={(value) => handleChange("name", value)}
            />
            <SignInput
              icon={
                <LiaPhoneVolumeSolid
                  style={{ width: "100%", height: "100%" }}
                />
              }
              name="phone"
              placeholder="Phone Number"
              type="text"
              value={data.phone}
              setValue={(value) => handleChange("phone", value)}
            />
          </SignInputWrapper>
          <SignInput
            icon={<MdOutlineEmail style={{ width: "100%", height: "100%" }} />}
            name="email"
            placeholder="Email Address"
            type="email"
            value={data.email}
            setValue={(value) => handleChange("email", value)}
          />
        </SignInputContainer>

        <PaymentContainer>
          <PaymentTitle>Choose Payment Method</PaymentTitle>
          <PaymentWrapper>
            <PaymentMethodMenu
              icon={<FaSackDollar style={{ width: "100%", height: "100%" }} />}
              name="Choose payment method"
            />
            <SignInput
              icon={<FaBullhorn style={{ width: "100%", height: "100%" }} />}
              name="marketing"
              placeholder="Marketing Preferences"
              type="text"
              value={data.marketing}
              setValue={(value) => handleChange("marketing", value)}
            />
            <TermsContainer>
              <FormGroup>
                <FormControlLabel
                  control={<TermsCheckBox />}
                  label={
                    <CheckboxLabel>
                      I agree to the{" "}
                      <Link
                        to="https://betsave.gitbook.io/untitled/terms-and-conditions"
                        target="_blank"
                      >
                        terms & conditions
                      </Link>
                    </CheckboxLabel>
                  }
                />
              </FormGroup>
            </TermsContainer>
            <SubmitButton>Submit Now</SubmitButton>
            <LoginLabel>
              Already have an account? <span>Login</span>
            </LoginLabel>
          </PaymentWrapper>
        </PaymentContainer>
      </DialogContent>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "17px",
    maxWidth: "none",
    width: "640px",
    margin: "16px",
  },
}));

const DialogContent = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "700px",
  borderRadius: "7px",
  backgroundColor: "#141C30",
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.down(480)]: {
    height: "640px",
  },
  [theme.breakpoints.down(420)]: {
    padding: "20px",
    height: "620px",
  },
}));

const DialogTitle = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: "bold",
  color: "#fff",
  [theme.breakpoints.down(480)]: {
    fontSize: "24px",
  },
}));

const SignInputContainer = styled(Box)(({ theme }) => ({
  marginTop: "40px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
  [theme.breakpoints.down(540)]: {
    gap: "15px",
    marginTop: "20px",
  },
}));

const SignInputWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  width: "100%",
  [theme.breakpoints.down(540)]: {
    flexDirection: "column",
    gap: "15px",
  },
}));

const PaymentContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "30px",
  marginTop: "40px",
  [theme.breakpoints.down(540)]: {
    marginTop: "20px",
  },
}));

const PaymentTitle = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  color: "#fff",
  fontWeight: "bold",
  [theme.breakpoints.down(480)]: {
    fontSize: "18px",
  },
}));

const PaymentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
  [theme.breakpoints.down(540)]: {
    gap: "15px",
  },
}));

const TermsContainer = styled(Box)(({ theme }) => ({}));

const TermsCheckBox = styled(Checkbox)(({ theme }) => ({
  svg: {
    width: "20px",
    height: "20px",
  },
}));

const CheckboxLabel = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: "#a9a9b0",
  span: {
    color: "#1AE5A1",
    textDecoration: "underline",
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1AE5A1",
  color: "#000",
  fontSize: "22px",
  fontWeight: "bold",
  width: "100%",
  height: "54px",
  textTransform: "none",
  [theme.breakpoints.down(480)]: {
    fontSize: "18px",
    height: "42px",
  },
}));

const LoginLabel = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: "#a9a9b0",
  textAlign: "center",
  span: {
    color: "#1AE5A1",
    cursor: "pointer",
  },
}));
