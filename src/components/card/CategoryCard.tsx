import { Box, styled, Typography } from '@mui/material';
import WalletPng from '../../assets/wallet.png';
import { ArrowRightAlt } from '@mui/icons-material';

export const CategoryCard = () => {
  return (
    <CategoryCardContainer>
      <CategoryTitle>
        <Img src={WalletPng} alt="category-title-img" />
        Sports Betting
      </CategoryTitle>
      <CategoryContent>
        Place bets on your favorite teams and earn cashback.
      </CategoryContent>
      <CategoryLink>
        Explore Cashback <ArrowRightAlt />{' '}
      </CategoryLink>
    </CategoryCardContainer>
  );
};

const CategoryCardContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: 'transparent',
  borderRadius: '15px',
  border: '1px solid #627691',
  padding: '30px 40px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}));

const CategoryTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  fontSize: '24px',
  color: '#fff',
  fontWeight: 'bold',
}));

const Img = styled('img')(({ theme }) => ({
  width: '24px',
  height: '24px',
}));

const CategoryContent = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#627691',
  lineHeight: '24px',
}));

const CategoryLink = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '18px',
  color: '#1AE5A1',
  cursor: 'pointer',
  marginTop: '10px',
}));
