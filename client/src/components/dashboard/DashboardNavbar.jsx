import React from "react";
import { Bell } from "lucide-react";
import Ellipse6 from "../../assests/Ellipse6";

const DashboardNavbar = () => {
  return (
    <nav className="flex w-full h-20 px-8 justify-between items-center bg-secondary">
      {/* Welcome message */}
      <h1 className="text-2xl font-medium">
        Welcome, <span className="text-light-gray">Bob!</span>
      </h1>

      {/* Right side elements container */}
      <div className="flex items-center gap-6">
        {/* Notification bell */}
        <button className="relative">
          <Bell size={24} strokeWidth={1.5} />
        </button>

        {/* User profile section */}
        <div className="flex items-center gap-3">
          <Ellipse6 />
          <div>
            <p className="text-base font-medium">Bob</p>
            <p className="text-sm font-medium text-light-gray">Bob@gmail.com</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
