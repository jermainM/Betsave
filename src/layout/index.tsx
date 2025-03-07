import React from "react";
import { Box, styled } from "@mui/material";

import { Header } from "./header";
import { Footer } from "./footer";
import { useLocation } from "react-router-dom";
import { NavBar } from "./navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
  const { children } = props;
  const location = useLocation();

  const beforeLogin = ["/", "/earn", "/bet"];

  const isBeforeLogin = beforeLogin.includes(location.pathname);
  return (
    <LayoutContainer>
      {isBeforeLogin ? (
        <>
          <Header />
          <Wrapper>
            {children}
            <Footer />
          </Wrapper>
        </>
      ) : (
        <NavBar>{children}</NavBar>
      )}
    </LayoutContainer>
  );
};

const LayoutContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  position: "relative",
}));

export const LayerImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  position: "absolute",
  top: "100px",
  zIndex: "-1",
}));

const Wrapper = styled(Box)(({ theme }) => ({
  maxWidth: "1520px",
  width: "100%",
  padding: "0px 40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.down(450)]: {
    padding: "0px 20px",
  },
}));
