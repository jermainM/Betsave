import { Box, styled, Typography } from '@mui/material';
import { ArrowRightAlt } from '@mui/icons-material';

interface CategoryCardProps {
  img: string;
  title: string;
  content: string;
  action: string;
  link: string;
}

export const CategoryCard = (props: CategoryCardProps) => {
  const { img, title, content, action, link } = props;
  return (
    <CategoryCardContainer>
      <CategoryTitle>
        <Img src={img} alt="category-title-img" />
        {title}
      </CategoryTitle>
      <CategoryContent>{content}</CategoryContent>
      <CategoryLink>
        {action} <ArrowRightAlt />{' '}
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
  [theme.breakpoints.down(1240)]: {
    gap: '12px',
    padding: '25px 35px',
  },
  [theme.breakpoints.down(420)]: {
    gap: '8px',
  },
}));

const CategoryTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  fontSize: '22px',
  color: '#fff',
  fontWeight: 'bold',
  [theme.breakpoints.down(1240)]: {
    gap: '12px',
    fontSize: '20px',
  },
  [theme.breakpoints.down(420)]: {
    fontSize: '16px',
  },
}));

const Img = styled('img')(({ theme }) => ({
  width: '24px',
  height: '24px',
  [theme.breakpoints.down(1240)]: {
    width: '20px',
    height: '20px',
  },
}));

const CategoryContent = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#627691',
  lineHeight: '24px',
  [theme.breakpoints.down(420)]: {
    fontSize: '14px',
  },
}));

const CategoryLink = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '18px',
  color: '#1AE5A1',
  cursor: 'pointer',
  marginTop: '10px',
  [theme.breakpoints.down(1240)]: {
    fontSize: '16px',
  },
  [theme.breakpoints.down(420)]: {
    fontSize: '14px',
  },
}));
