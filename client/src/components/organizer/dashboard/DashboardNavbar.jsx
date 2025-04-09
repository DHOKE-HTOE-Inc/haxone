import React from "react";
import { Bell } from "lucide-react";
import { useSelector } from "react-redux";

const DashboardNavbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="flex w-full h-20 px-8 justify-between items-center bg-secondary">
      {/* Welcome message */}
      <h1 className="text-2xl font-medium">
        Welcome,{" "}
        <span className="text-light-gray">
          {user?.display_name || user?.username}!
        </span>
      </h1>

      {/* Right side elements container */}
      <div className="flex items-center gap-6">
        {/* Notification bell */}
        <button className="relative">
          <Bell size={24} strokeWidth={1.5} />
        </button>

        {/* User profile section */}
        <div className="flex items-center gap-3">
          {user?.profile_img ? (
            <img
              src={user.profile_img}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-medium text-lg">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-base font-medium">
              {user?.display_name || user?.username}
            </p>
            <p className="text-sm font-medium text-light-gray">{user?.email}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
