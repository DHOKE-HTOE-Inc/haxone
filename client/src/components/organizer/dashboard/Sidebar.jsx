import React from "react";
import { Link, NavLink } from "react-router-dom";
import { LayoutDashboard, Network } from "lucide-react";

const navItems = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/manage-events",
    label: "Manage Events",
    icon: Network,
  },
];

const Sidebar = () => {
  return (
    <aside className="flex flex-col items-center gap-12 flex-shrink-0 w-60 h-screen px-3 py-6 pb-12 bg-secondary">
      {/* Logo */}
      <Link to="/" className="text-3xl font-medium">
        Haxone
      </Link>

      {/* Navigation menu */}
      <nav className="flex flex-col gap-2 w-full">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-2 text-xl font-medium p-3 rounded-md transition-all duration-200 ease-in-out ${
                isActive ? "bg-accent text-secondary" : "text-primary"
              }`
            }
          >
            <Icon size={24} strokeWidth={1} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
