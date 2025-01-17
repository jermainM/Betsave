import { Box, Button, Divider, styled, Typography } from '@mui/material';
import { FormInput } from '../input/FormInput';
import { EmailOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';

export const SignUpCard = () => {
  const [email, setEmail] = useState('');
  const handleChange = (value: string) => {
    setEmail(value);
  };
  return (
    <SignUpCardContainer>
      <TitleText variant="h6">Sign Up for Free</TitleText>
      <FormInput
        icon={<EmailOutlined />}
        type="email"
        name="email"
        placeholder="Email address"
        value={email}
        setValue={handleChange}
      />
      <CreateButton
        variant="contained"
        sx={{ backgroundColor: '#1ae5a1', marginTop: '23px' }}
      >
        Create a free account
      </CreateButton>
      <HorDivider>OR</HorDivider>
      <CreateButton
        variant="contained"
        sx={{ backgroundColor: '#fff' }}
        startIcon={<FcGoogle />}
      >
        Sign Up with Google
      </CreateButton>
      <CreateButton
        variant="contained"
        sx={{ backgroundColor: '#1877f2', color: '#fff', marginTop: '10px' }}
        startIcon={<FaFacebookF />}
      >
        Sign Up with Facebook
      </CreateButton>
      <SignUpInfo>
        <span>81452+</span> sign ups in the past 24 hours
      </SignUpInfo>
    </SignUpCardContainer>
  );
};

const SignUpCardContainer = styled(Box)(({ theme }) => ({
  padding: '30px',
  borderRadius: '15px',
  backgroundColor: '#141c30',
  width: '420px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down(1140)]: {
    width: '100%',
  },
  [theme.breakpoints.down(390)]: {
    padding: '18px',
  },
}));

const TitleText = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  color: '#fff',
  marginBottom: '20px',
  fontWeight: 'bold',
  [theme.breakpoints.down(390)]: {
    fontSize: '24px',
  },
}));

const CreateButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  width: '100%',
  color: '0d1321',
  fontSize: '16px',
  fontWeight: 'bold',
  height: '50px',
  borderRadius: '10px',
  [theme.breakpoints.down(390)]: {
    height: '42px',
    fontSize: '14px',
  },
}));

const HorDivider = styled(Divider)(({ theme }) => ({
  fontSize: '16px',
  color: '#c1ccdd',
  width: '100%',
  marginTop: '10px',
  marginBottom: '10px',
}));

const SignUpInfo = styled(Typography)(({ theme }) => ({
  marginTop: '27px',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#627691',
  span: {
    color: '#fff',
  },
  [theme.breakpoints.down(390)]: {
    fontSize: '12px',
  },
}));
