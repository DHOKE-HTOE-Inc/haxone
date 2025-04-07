import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="text-2xl">
      <div className="p-4">
        This is Dashboard page
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-hover transition-colors"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="ml-4 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-hover transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
