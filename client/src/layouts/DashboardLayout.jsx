import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/organizer/dashboard/Sidebar";
import DashboardNavbar from "../components/organizer/dashboard/DashboardNavbar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardNavbar />
        <main className="flex-1 p-6 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
