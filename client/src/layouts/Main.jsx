import React from "react";
import TopNavBar from "../components/TopNavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <>
      <TopNavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Main;
