import React from "react";
import PhoneInputLib from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  countryCode?: string;
}

const CustomPhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  error,
  countryCode,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        "& .react-tel-input": {
          width: "100%",
          "& .form-control": {
            width: "100%",
            height: "auto",
            backgroundColor: "#172236",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "16px",
            padding: "12px 16px 12px 48px",
            "&::placeholder": {
              color: "#6B7280",
              opacity: 1,
            },
            "&:focus": {
              boxShadow: "none",
              border: "none",
            },
            "&:hover": {
              border: "none",
            },
          },
          "& .flag-dropdown": {
            backgroundColor: "#172236",
            border: "none",
            borderRadius: "8px 0 0 8px",
            "&:hover": {
              backgroundColor: "#172236",
            },
            "&.open": {
              backgroundColor: "#172236",
            },
          },
          "& .selected-flag": {
            backgroundColor: "#172236",
            padding: "0px 0px 0px 14px",
            "&:hover": {
              backgroundColor: "#172236",
            },
            "&:focus": {
              backgroundColor: "#172236",
            },
            "& .flag": {
              backgroundColor: "#172236",
            },
          },
          "& .country-list": {
            backgroundColor: "#172236",
            border: "none",
            borderRadius: "8px",
            "& .country": {
              color: "#fff",
              padding: "8px 16px",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#2E334AB2",
              },
              "&.highlight": {
                backgroundColor: "#2E334AB2",
              },
            },
            "& .divider": {
              borderBottom: "1px solid #2E334AB2",
            },
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#172236",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#2E334AB2",
              borderRadius: "3px",
            },
          },
        },
        [theme.breakpoints.down(1024)]: {
          "& .react-tel-input .form-control": {
            fontSize: "14px",
            padding: "10px 16px 10px 48px",
          },
        },
        [theme.breakpoints.down(840)]: {
          "& .react-tel-input .form-control": {
            fontSize: "14px",
            padding: "6px 10px 6px 48px",
          },
        },
      }}
    >
      <PhoneInputLib
        country={countryCode?.toLowerCase() || "us"}
        value={value}
        onChange={onChange}
        placeholder="Enter your phone number"
        inputProps={{
          name: "phone",
          required: true,
          autoFocus: false,
        }}
        buttonStyle={{
          backgroundColor: "#172236",
          border: "none",
        }}
        dropdownStyle={{
          backgroundColor: "#172236",
          border: "none",
        }}
        containerStyle={{
          width: "100%",
        }}
        inputStyle={{
          width: "100%",
          height: "auto",
          backgroundColor: "#172236",
          border: "none",
          borderRadius: "8px",
          color: "#fff",
          fontSize: "16px",
          padding: "12px 16px 12px 48px",
        }}
      />
    </Box>
  );
};

export default CustomPhoneInput;
