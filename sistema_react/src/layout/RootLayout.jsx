import React from 'react';
import { Outlet } from "react-router-dom";
import NavBar from '../ui/components/navegacao/NavBar';
import Footer from '../ui/components/footer/Footer';

function RootLayout() {
  return (
    <>
        <NavBar/>
        <Outlet />
        <Footer/>     
    </>
  );
}

export default RootLayout;