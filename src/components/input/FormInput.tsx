import { Box, styled } from '@mui/material';

interface FormInputProps {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  name: string;
  setValue: (props: string) => void;
  type: string;
}

export const FormInput = (props: FormInputProps) => {
  const { icon, placeholder, type, value, name, setValue } = props;

  return (
    <FormInputContainer>
      {icon}
      <InputBox
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </FormInputContainer>
  );
};

const FormInputContainer = styled(Box)(({ theme }) => ({
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  padding: '15px',
  height: '50px',
  backgroundColor: '#0f1629',
  width: '100%',
  color: '#a9a9b0',
  [theme.breakpoints.down(390)]: {
    gap: '12px',
  },
}));

const InputBox = styled('input')(({ theme }) => ({
  outline: 'none',
  height: '100%',
  fontSize: '18px',
  color: '#fff',
  background: 'none',
  border: 'none',
  '::placeholder': {
    color: '#a9a9b0',
  },
  [theme.breakpoints.down(390)]: {
    fontSize: '16px',
  },
}));
