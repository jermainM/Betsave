import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  styled,
  IconButton,
  Popover,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  AmazonIcon,
  PaypalIcon,
  BitcoinIcon,
  ADAIcon,
  BNBIcon,
  DogeIcon,
  ETHIcon,
  SOLIcon,
  TRXIcon,
  USDCIcon,
  USDTIcon,
  XRPIcon,
  BTCIcon,
} from "../../constants/images";
import { KeyboardArrowDown } from "@mui/icons-material";
import api from "../../api/services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { TokenSelector } from "./TokenSelector";
import { userService } from "../../api/services/userService";
import { useNotification } from "../../provider/notification";

interface Token {
  symbol: string;
  name: string;
  icon: string;
}

interface WithdrawDialogProps {
  open: boolean;
  onClose: () => void;
  availableCashback: number;
}

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

export const WithdrawDialog: React.FC<WithdrawDialogProps> = ({
  open,
  onClose,
  availableCashback,
}) => {
  const { user } = useSelector((state: RootState) => state.session);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(
    paymentMethods[0].id
  );
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [address, setAddress] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [eligibility, setEligibility] = useState([]);

  const { notifyError, notifySuccess } = useNotification();

  const handleMethodClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    if (method !== "Crypto") {
      setSelectedToken(null);
    }
    setAnchorEl(null);
    setAddress(""); // Reset address when changing method
  };

  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEligibilityCheck = async () => {
    try {
      const response = await userService.checkEligibility(user.betsaveId);
      console.log({ response });
      setEligibility(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleEligibilityCheck();
  }, []);

  const handleSubmit = async () => {
    try {
      if (eligibility.length === 0) {
        const response = await api.post("/casino/request-cashback", {
          method: selectedMethod,
          token:
            selectedMethod === "Crypto" ? selectedToken?.symbol : undefined,
          requestedAmount: availableCashback,
          address,
          betsaveId: user.betsaveId,
        });
        notifySuccess("Cashback requested successfully");
        console.log(response);
      } else {
        notifyError(
          "You are not eligible for cashback. Reason: " + eligibility
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const currentMethod =
    paymentMethods.find((method) => method.id === selectedMethod) ||
    paymentMethods[0];

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogHeader>
        <Typography variant="h6">Withdraw</Typography>
        <IconButton onClick={onClose} sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </DialogHeader>
      <DialogContent sx={{ p: 3 }}>
        <FormContainer>
          <InputLabel>{currentMethod.label}</InputLabel>
          <MethodSelect onClick={handleMethodClick}>
            <MethodIcon src={currentMethod.icon} alt={currentMethod.id} />
            <span>{currentMethod.id}</span>
            {currentMethod.tag && <MethodTag>{currentMethod.tag}</MethodTag>}
            <DropdownIcon>
              <KeyboardArrowDown />
            </DropdownIcon>
          </MethodSelect>

          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            PaperProps={{
              sx: {
                backgroundColor: "#172236",
                backgroundImage: "none",
                mt: 1,
                width: anchorEl?.offsetWidth,
                minWidth: anchorEl?.offsetWidth,
              },
            }}
          >
            <MethodsList>
              {paymentMethods.map((method) => (
                <MethodOption
                  key={method.id}
                  onClick={() => handleMethodSelect(method.id)}
                >
                  <MethodIcon src={method.icon} alt={method.id} />
                  <span>{method.id}</span>
                </MethodOption>
              ))}
            </MethodsList>
          </Popover>

          {selectedMethod === "Crypto" && (
            <TokenSelector
              selectedToken={selectedToken}
              onTokenSelect={handleTokenSelect}
            />
          )}

          <InputLabel>Withdrawal Amount (Min $20 USD)</InputLabel>
          <StyledInput
            type="number"
            placeholder="Enter withdrawal amount"
            value={availableCashback}
            disabled={true}
          />

          <InputLabel>Your {selectedMethod} address</InputLabel>
          <StyledInput
            type="text"
            placeholder={
              selectedMethod === "Crypto" && selectedToken
                ? `Enter your ${selectedToken.symbol} address`
                : currentMethod.placeholder
            }
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <WithdrawButton
            onClick={handleSubmit}
            disabled={
              !selectedMethod ||
              !address ||
              (selectedMethod === "Crypto" && !selectedToken)
            }
          >
            Withdraw
          </WithdrawButton>
        </FormContainer>
      </DialogContent>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    backgroundColor: "#151A30",
    borderRadius: "12px",
    color: "#fff",
    backgroundImage: "none",
  },
});

const DialogHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 24px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
});

const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
});

const InputLabel = styled(Typography)({
  color: "#8A8D98",
  fontSize: "14px",
  marginBottom: "-8px",
});

const MethodSelect = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 16px",
  backgroundColor: "#172236",
  borderRadius: "8px",
  cursor: "pointer",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  "&:hover": {
    backgroundColor: "#1c2943",
  },
});

const MethodIcon = styled("img")({
  width: "24px",
  height: "24px",
  objectFit: "contain",
});

const DropdownIcon = styled(Box)({
  marginLeft: "auto",
  fontSize: "12px",
  color: "#8A8D98",
});

const StyledInput = styled("input")({
  padding: "16px",
  backgroundColor: "#172236",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "14px",
  width: "100%",
  "&::placeholder": {
    color: "#6B7280",
  },
  "&:focus": {
    outline: "none",
    borderColor: "#1AE5A1",
  },
});

const WithdrawButton = styled(Button)({
  padding: "12px",
  backgroundColor: "#1AE5A1",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: 600,
  cursor: "pointer",
  width: "150px",
  marginTop: "8px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#15cc8f",
  },
  "&:disabled": {
    backgroundColor: "#172236",
    color: "#8A8D98",
    cursor: "not-allowed",
  },
});

const MethodsList = styled(Box)({
  maxHeight: "200px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    background: "rgba(255, 255, 255, 0.1)",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#1AE5A1",
    borderRadius: "4px",
  },
});

const MethodOption = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 16px",
  cursor: "pointer",
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

const MethodTag = styled(Box)({
  padding: "2px 6px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "4px",
  fontSize: "12px",
  marginLeft: "8px",
  color: "#8A8D98",
});
