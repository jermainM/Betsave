import { Box, styled } from "@mui/material";

interface IconInputProps {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  name: string;
  setValue: (props: string) => void;
  type: string;
}

export const IconInput = (props: IconInputProps) => {
  const { icon, placeholder, type, value, name, setValue } = props;

  return (
    <IconInputContainer>
      {icon}
      <InputBox
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </IconInputContainer>
  );
};

const IconInputContainer = styled(Box)(({ theme }) => ({
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  gap: "15px",
  padding: "15px",
  height: "45px",
  backgroundColor: "#171e31",
  width: "fit-content   ",
  [theme.breakpoints.down(1240)]: {
    padding: "8px",
    gap: "8px",
  },
}));

const InputBox = styled("input")(({ theme }) => ({
  outline: "none",
  height: "100%",
  fontSize: "16px",
  color: "#fff",
  fontWeight: "bold",
  background: "none",
  border: "none",
  width: "220px",
  "::placeholder": {
    color: "#627691",
  },
  [theme.breakpoints.down(1240)]: {
    width: "180px",
  },
}));
