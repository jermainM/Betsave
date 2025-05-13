import React from "react";
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useLocation } from "react-router-dom";

import { Header } from "./header";
import { Footer } from "./footer";
import { NavBar } from "./navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isResetPasswordPage = location.pathname.startsWith("/reset-password");
  const isComingSoonPage = location.pathname === "/coming-soon";
  const { isAuthenticated } = useSelector((state: RootState) => state.session);

  if (isComingSoonPage) {
    return <>{children}</>;
  }

  return (
    <LayoutContainer>
      {!isAuthenticated ? (
        <>
          {!isResetPasswordPage && <Header />}
          <Wrapper>
            {children}
            {!isResetPasswordPage && <Footer />}
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
  overflow: "hidden",
}));

export const LayerImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  position: "absolute",
  top: "100px",
  zIndex: "-1",
}));

const Wrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "0px 40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.down(450)]: {
    padding: "0px 20px",
  },
}));
