import { KeyboardArrowLeft } from '@mui/icons-material';
import { Box, Button, styled, Typography } from '@mui/material';

export const AccountManage = () => {
  return (
    <AccountManageContainer>
      <ProfileContainer>
        <ButtonContainer>
          <BackButton>
            <KeyboardArrowLeft fontSize="small" />
            Back
          </BackButton>
          <Label>Personal Cabinet</Label>
        </ButtonContainer>
      </ProfileContainer>
    </AccountManageContainer>
  );
};

const AccountManageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  width: '100%',
  padding: '20px 0px',
  marginTop: '20px',
}));

const ProfileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const BackButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#171e31',
  borderRadius: '7px',
  border: '1px solid #627691',
  color: '#627691',
  padding: '6px 10px 6px 6px',
  textTransform: 'none',
  height: '28px',
  fontSize: '14px',
}));

const Label = styled(Typography)(({ theme }) => ({
  color: '#627691',
  fontSize: '14px',
  fontWeight: 'bold',
}));
