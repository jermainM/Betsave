import React from 'react';
import { Box, styled } from '@mui/material';

import { Header } from './header';
import { Footer } from './footer';
import LayourImg from '../assets/layer.png';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <LayoutContainer>
      <LayourImage src={LayourImg} alt="layour-image" />
      <Header />
      <Wrapper>
        {children}
        <Footer />
      </Wrapper>
    </LayoutContainer>
  );
};

const LayoutContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  position: 'relative',
}));

const LayourImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  position: 'absolute',
  top: '100px',
  zIndex: '-1',
}));

const Wrapper = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  width: '100%',
  padding: '0px 40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down(450)]: {
    padding: '0px 20px',
  },
}));
