import { ArrowLeft } from "lucide-react";
import React from "react";
import InfoCard from "../components/userProfilePage/infoCard";
import Application from "../components/userProfilePage/Application";
import { Link } from "react-router-dom";
import About from "../components/userProfilePage/About";

const UserProfile = () => {
  return (
    <section className="min-h-screen">
      {/* back button  */}
      <Link className="flex text-xl px-10 py-4 gap-2 items-center">
        <ArrowLeft size={30} />
        <p>Home</p>
      </Link>

      {/* dr ka main  */}
      <div className="flex px-20 gap-8">
        {/* dr ka left section  */}
        <div className="w-1/2 flex flex-col gap-4">
          <InfoCard />
          <About />
        </div>

        {/* dr ka right section  */}
        <Application />
      </div>
    </section>
  );
};

export default UserProfile;
