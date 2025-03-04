import { KeyboardArrowDown } from '@mui/icons-material';
import { Box, Button, styled, Typography } from '@mui/material';
import { useState } from 'react';

export const Setting = () => {
  const [data, setData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    username: '',
    phone: '',
    city: '',
    country: '',
    payment: '',
  });

  const handleData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <SettingContainer>
      <SettingTitleContainer>
        <SettingTitle>Personal Info</SettingTitle>
        <SettingSubTitle>Fill in your details</SettingSubTitle>
      </SettingTitleContainer>
      <SettingForm>
        <EmailInputContainer>
          <EmailInput
            name="email"
            placeholder="Enter your e-mail"
            value={data.email}
            onChange={handleData}
          />
          <ConfirmButton>Confirm</ConfirmButton>
        </EmailInputContainer>

        <InputWrapper>
          <SettingFormInput
            placeholder="Enter your first name"
            name="firstname"
            value={data.firstname}
            onChange={handleData}
          />
          <SettingFormInput
            placeholder="Enter your last name"
            name="lastname"
            value={data.lastname}
            onChange={handleData}
          />
        </InputWrapper>

        <InputWrapper>
          <SettingFormInput
            placeholder="Enter your user name"
            name="username"
            value={data.username}
            onChange={handleData}
          />
          <SettingFormInput
            placeholder="Enter your phone number"
            name="phone"
            value={data.phone}
            onChange={handleData}
          />
        </InputWrapper>

        <InputWrapper>
          <SettingFormInput
            placeholder="Enter your city"
            name="city"
            value={data.city}
            onChange={handleData}
          />
          <SettingFormInput
            placeholder="Enter your country"
            name="country"
            value={data.country}
            onChange={handleData}
          />
        </InputWrapper>

        <PaymentOptionContainer>
          <PreferenceInput
            name="payment"
            placeholder="Payment Preferences"
            value={data.payment}
            onChange={handleData}
          />
          <SelectButton endIcon={<KeyboardArrowDown />}>Select</SelectButton>
        </PaymentOptionContainer>

        <SaveButton>Save</SaveButton>
      </SettingForm>
    </SettingContainer>
  );
};

const SettingContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}));

const SettingTitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
}));

const SettingTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: '#fff',
  fontWeight: 'normal',
}));

const SettingSubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: '#627691',
}));

const SettingForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}));

const EmailInputContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#0f1629',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '10px',
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  gap: '30px',
}));

const EmailInput = styled('input')(({ theme }) => ({
  border: 'none',
  outline: 'none',
  background: 'none',
  fontSize: '16px',
  color: '#fff',
  padding: '0px 12px',
  width: '80%',
  fontFamily: 'SpaceGrotesk, sans-serif',
  '::placeholder': {
    color: '#627691',
  },
  [theme.breakpoints.down(540)]: {
    fontSize: '16px',
  },
  [theme.breakpoints.down(390)]: {
    fontSize: '14px',
  },
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1AE5A1',
  borderRadius: '7px',
  width: '90px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000',
  fontSize: '14px',
  fontWeight: 'bold',
  textTransform: 'none',
  //   [theme.breakpoints.down(540)]: {
  //     width: '100px',
  //     height: '35px',
  //     fontSize: '16px',
  //   },
  //   [theme.breakpoints.down(390)]: {
  //     fontSize: '14px',
  //   },
}));

const InputWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.down(480)]: {
    flexDirection: 'column',
  },
}));

const SettingFormInput = styled('input')(({ theme }) => ({
  border: 'none',
  outline: 'none',
  width: '80%',
  backgroundColor: '#0f1629',
  borderRadius: '10px',
  fontSize: '16px',
  color: '#fff',
  fontFamily: 'SpaceGrotesk, sans-serif',
  padding: '16px 18px ',
  '::placeholder': {
    color: '#627691',
  },
  //   [theme.breakpoints.down(540)]: {
  //     fontSize: '16px',
  //   },
  [theme.breakpoints.down(480)]: {
    width: '100%',
  },
  [theme.breakpoints.down(390)]: {
    fontSize: '14px',
  },
}));

const PaymentOptionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#0f1629',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '10px',
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  gap: '30px',
  [theme.breakpoints.down(390)]: {
    gap: '0px',
  },
}));

const PreferenceInput = styled('input')(({ theme }) => ({
  border: 'none',
  outline: 'none',
  background: 'none',
  fontSize: '16px',
  color: '#fff',
  padding: '0px 12px',
  width: '80%',
  fontFamily: 'SpaceGrotesk, sans-serif',
  '::placeholder': {
    color: '#627691',
  },
  [theme.breakpoints.down(390)]: {
    fontSize: '14px',
  },
}));

const SelectButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#172034',
  borderRadius: '7px',
  width: '90px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '14px',
  fontWeight: 'bold',
  textTransform: 'none',
  minWidth: '90px',
}));

const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1AE5A1',
  borderRadius: '7px',
  width: '120px',
  height: '45px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000',
  fontSize: '18px',
  fontWeight: 'bold',
  textTransform: 'none',
  [theme.breakpoints.down(540)]: {
    width: '100%',
    height: '45px',
    fontSize: '16px',
  },
  [theme.breakpoints.down(390)]: {
    fontSize: '14px',
  },
}));
