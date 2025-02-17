import { Box, styled, Typography } from '@mui/material';
import { EmptyImg } from '../../constants/images';

export const EmptyBox = () => {
  return (
    <EmptyBoxContainer>
      <EmptyIcon src={EmptyImg} alt="empty-icon" />
      <EmptyText>You haven't started any offers yet</EmptyText>
    </EmptyBoxContainer>
  );
};

const EmptyBoxContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '48px',
  [theme.breakpoints.down(390)]: {
    gap: '36px',
    marginTop: '20px',
  },
}));

const EmptyIcon = styled('img')(({ theme }) => ({
  width: '130px',
  height: 'auto',
  [theme.breakpoints.down(450)]: {
    width: '110px',
  },
}));

const EmptyText = styled(Typography)(({ theme }) => ({
  color: '#627691',
  fontSize: '18px',
  [theme.breakpoints.down(390)]: {
    fontSize: '16px',
  },
}));
