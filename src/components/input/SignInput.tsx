import { Box, styled } from '@mui/material';

interface SignInputProps {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  name: string;
  setValue: (props: string) => void;
  type: string;
}

export const SignInput = (props: SignInputProps) => {
  const { icon, placeholder, type, value, name, setValue } = props;

  return (
    <SignInputContainer>
      <IconContainer>{icon}</IconContainer>
      <InputBox
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </SignInputContainer>
  );
};

const SignInputContainer = styled(Box)(({ theme }) => ({
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '15px',
  height: '50px',
  backgroundColor: '#0f1629',
  width: '100%',
  minWidth: '20px',
  color: '#a9a9b0',
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: '18px',
  height: '18px',
  minWidth: '18px',
}));

const InputBox = styled('input')(({ theme }) => ({
  outline: 'none',
  height: '100%',
  fontSize: '16px',
  color: '#fff',
  background: 'none',
  minWidth: '20px',
  border: 'none',
  '::placeholder': {
    color: '#a9a9b0',
  },
  [theme.breakpoints.down(480)]: {
    fontSize: '14px',
  },
}));
