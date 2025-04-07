import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import InfoCard from "../components/userProfilePage/infoCard";
import Application from "../components/userProfilePage/Application";
import { Link } from "react-router-dom";
import About from "../components/userProfilePage/About";
import Skills from "../components/userProfilePage/Skills";
import axiosInstance from "../utils/axios";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  console.log(userInfo);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/auth/users/me");
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <section className="min-h-screen pb-8">
      {/* back button  */}
      <Link
        to="/"
        className="flex text-xl px-10 py-4 gap-2 items-center hover:text-accent-hover transition-all duration-200 ease-in-out"
      >
        <ArrowLeft size={30} />
        <p>Home</p>
      </Link>

      {/* dr ka main  */}
      <div className="flex px-20 gap-8 ">
        {/* dr ka left section  */}
        <div className="w-1/2 flex flex-col gap-4">
          <InfoCard userInfo={userInfo} />
          <About aboutme={userInfo.aboutme} />
          <Skills skills={userInfo.skills} />
        </div>

        {/* dr ka right section  */}
        <Application />
      </div>
    </section>
  );
};

export default UserProfile;
