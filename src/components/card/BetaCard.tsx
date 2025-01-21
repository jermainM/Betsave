import React from 'react';
import { Box, styled, SxProps, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import { Theme } from '@emotion/react';

interface BetaCardProps {
  sx?: SxProps<Theme>;
  img: string;
  title: React.ReactNode;
  value: string;
  credit: number;
}

export const BetaCard = (props: BetaCardProps) => {
  const { sx, title, value, credit, img } = props;
  return (
    <BetaCardContainer sx={sx}>
      <CardImage src={img} alt="card-img" />
      <CardText variant="subtitle1">{title}</CardText>
      <CardValue>
        <ValueText variant="subtitle1">
          {value}.<span>00</span>
        </ValueText>
        <Credit>
          <Star sx={{ color: 'yellow', width: '16px', height: '16px' }} />
          <CreditValue variant="subtitle1">{credit}.0</CreditValue>
        </Credit>
      </CardValue>
    </BetaCardContainer>
  );
};

const BetaCardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#141c30',
  borderRadius: '10px',
  padding: '15px',
  width: '175px',
  [theme.breakpoints.down(640)]: {
    width: '150px',
  },
}));

const CardImage = styled('img')(({ theme }) => ({
  width: '100%',
  borderRadius: '8px',
  height: 'auto',
}));

const CardText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#627691',
  marginTop: '4px',
  lineHeight: '20px',

  span: {
    color: '#fff',
  },
}));

const CardValue = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '4px',
}));

const ValueText = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#fff',
  fontWeight: 'bold',
  span: {
    fontSize: '14px',
  },
}));

const Credit = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
}));

const CreditValue = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: '#fff',
}));
