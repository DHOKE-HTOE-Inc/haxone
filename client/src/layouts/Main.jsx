import React, { useState } from "react";
import TopNavBar from "../components/TopNavBar";
import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Main = () => {
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
  return (
    <>
      <TopNavBar
        isShowMobileMenu={isShowMobileMenu}
        setIsShowMobileMenu={setIsShowMobileMenu}
      />
      <Outlet />
      <Footer />

      {isShowMobileMenu && <MobileMenu />}
    </>
  );
};

export default Main;
const MobileMenu = () => {
  return (
    <section className="fixed top-14 left-0 w-full h-full bg-white/50 backdrop-blur-sm z-30 px-8 sm:px-12">
      <div className="flex flex-col gap-4 py-8">
        <Link
          to={"/"}
          className="text-lg font-semibold"
          onClick={() => setIsShowMobileMenu(false)}
        >
          Home
        </Link>
        <Link
          to={"/events"}
          className="text-lg font-semibold"
          onClick={() => setIsShowMobileMenu(false)}
        >
          Events
        </Link>
        <Link
          to={"/contact"}
          className="text-lg font-semibold"
          onClick={() => setIsShowMobileMenu(false)}
        >
          Contact
        </Link>
      </div>
    </section>
  );
};
