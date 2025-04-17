import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import InfoCard from "../components/userProfilePage/InfoCard";
import Application from "../components/userProfilePage/Application";
import { Link, useParams } from "react-router-dom";
import About from "../components/userProfilePage/About";
import Skills from "../components/userProfilePage/Skills";
import axiosInstance from "../utils/axios";
import EditUserModal from "../components/userProfilePage/EditUserModal";
const UserProfile = () => {
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

  const { username } = useParams();

  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/auth/users/?username=${username}`
      );
      setUserInfo(response.data[0]);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <section className="min-h-screen pb-8">
      <EditUserModal
        userInfo={userInfo}
        isOpen={isEditUserModalOpen}
        setIsEditUserModalOpen={setIsEditUserModalOpen}
        setUserInfo={setUserInfo}
        fetchUserProfile={fetchUserProfile}
      />
      {/* back button  */}
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="flex text-xl pl-4 md:pl-10 py-4 gap-2 items-center hover:text-accent-hover transition-all duration-200 ease-in-out"
        >
          <ChevronLeft size={30} />
        </Link>
        <p className="text-xl font-semibold text-primary pl-2">
          Profile Setting
        </p>
      </div>

      {/* dr ka main  */}
      <div className="flex px-4 md:px-20 gap-8 md:flex-row flex-col">
        {/* dr ka left section  */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 ">
          <InfoCard
            userInfo={userInfo}
            setIsEditUserModalOpen={setIsEditUserModalOpen}
          />
          <About aboutme={userInfo?.aboutme} />
          <Skills skills={userInfo?.skills} />
        </div>

        {/* dr ka right section  */}
        <Application />
      </div>
    </section>
  );
};

export default UserProfile;
