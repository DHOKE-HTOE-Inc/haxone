import { Outlet } from "react-router-dom";
import Sidebar from "../components/organizer/dashboard/Sidebar";
import DashboardNavbar from "../components/organizer/dashboard/DashboardNavbar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="fixed h-screen">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 ml-60">
        {/* Navbar */}
        <div className="fixed top-0 right-0 left-60 z-10">
          <DashboardNavbar />
        </div>

        <main className="mt-20 p-6 bg-white h-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
