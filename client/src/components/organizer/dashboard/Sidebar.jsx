import { Link, NavLink } from "react-router-dom";
import { LayoutDashboard, Network } from "lucide-react";

const navItems = [
  {
    path: "/organizer",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/organizer/events",
    label: "Manage Events",
    icon: Network,
  },
];

const Sidebar = () => {
  return (
    <aside className="h-full w-60 bg-secondary flex flex-col items-center gap-12 px-3 py-6">
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
            end={path === "/organizer"}
            className={({ isActive }) =>
              `flex items-center gap-3 text-lg font-medium p-3 rounded-md transition-all duration-200 ease-in-out ${
                isActive ? "bg-accent text-secondary" : "text-primary"
              }`
            }
          >
            <Icon size={22} strokeWidth={1} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
