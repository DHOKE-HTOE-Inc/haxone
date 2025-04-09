import { ChevronLeft, Upload, Loader2, PlusCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import { Check } from "lucide-react";
import { Skill } from "./Skills";
import SkillsModal from "./SkillsModal";

const EditUserModal = ({
  userInfo,
  fetchUserProfile,
  isOpen,
  setIsEditUserModalOpen,
}) => {
  if (!isOpen) return null;

  const [displayName, setDisplayName] = useState(userInfo.display_name || "");
  const [skills, setSkills] = useState(userInfo.skills || []);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(userInfo.current_job || "");
  const [location, setLocation] = useState(userInfo.location || "");
  const [aboutMe, setAboutMe] = useState(userInfo.aboutme || "");
  const [profileImg, setProfileImg] = useState(userInfo.profile_img || "");
  const [previewUrl, setPreviewUrl] = useState(userInfo.profile_img || "");

  const handleImageChange = (e) => {
    // dr ka change lyk tat img
    const file = e.target.files[0];
    if (file) {
      setProfileImg(file);
      // Create a URL for the selected file to preview
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  // Clean up the URL when component unmounts or when preview changes
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl !== userInfo.profile_img) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, userInfo.profile_img]);

  // dr ka submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("display_name", displayName);
      formData.append("current_job", position);
      formData.append("location", location);
      formData.append("aboutme", aboutMe);
      formData.append("skills", JSON.stringify([...skills]));

      // Only append profile_img if a new file was selected
      if (profileImg instanceof File) {
        formData.append("profile_img", profileImg);
      }

      const response = await axiosInstance.put(`/auth/users/me/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        icon: <Check className="text-accent" />,
      });
      setIsEditUserModalOpen(false);
      fetchUserProfile();
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error(error.response?.data?.detail || "Error updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-primary/40 fixed z-10 inset-0 flex items-center justify-center">
      <Form className="bg-white rounded-md p-4 w-1/2" onSubmit={handleSubmit}>
        {/* back button  */}
        <div className="flex items-center ">
          <button
            className=" text-primary rounded-md cursor-pointer "
            onClick={() => setIsEditUserModalOpen(false)}
          >
            <ChevronLeft />
          </button>
          <p className="text-primary text-lg font-semibold ms-4">
            Edit Profile
          </p>
        </div>

        {/* form  */}

        {/* left section  */}
        <div className="flex px-6 py-8">
          <div className="w-1/3 flex flex-col gap-4 items-center">
            <img
              src={previewUrl || "/defaultUserProfile.png"}
              alt="Profile preview"
              className="w-30 h-30 object-cover mx-auto rounded-full"
            />
            <input
              type="file"
              id="profileImg"
              name="profileImg"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <button
              type="button"
              className="text-primary border-2 border-primary px-4 py-2 rounded-md text-center flex items-center gap-2 w-fit font-medium cursor-pointer"
              onClick={() => document.getElementById("profileImg").click()}
            >
              <Upload />
              Upload Image
            </button>

            <div className="flex flex-col gap-2 items-center">
              <p className="text-primary text-xl">@{userInfo.username}</p>
              <p className="text-neutral-500 text-md ">{userInfo.email}</p>
            </div>
          </div>

          {/* right section  */}
          <div className="w-2/3 border-s-2 border-primary/30 px-12 flex flex-col gap-4">
            <div>
              <label
                htmlFor="display_name"
                className="text-neutral-500 text-md"
              >
                Display Name
              </label>
              <input
                type="text"
                id="display_name"
                name="display_name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="border-2 border-primary/30 rounded-md px-2 py-2 block w-full mt-2"
              />
            </div>
            <div>
              <label htmlFor="position" className="text-neutral-500 text-md">
                Position (e.g. Software Engineer)
              </label>
              <input
                type="text"
                id="position"
                name="position"
                className="border-2 border-primary/30 rounded-md px-2 py-2 block w-full mt-2"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="location" className="text-neutral-500 text-md">
                Location (e.g. San Francisco, CA)
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="border-2 border-primary/30 rounded-md px-2 py-2 block w-full mt-2"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="aboutMe" className="text-neutral-500 text-md">
                About me
              </label>
              <textarea
                id="aboutMe"
                name="aboutMe"
                style={{ resize: "none" }}
                className="border-2 border-primary/30 rounded-md px-2 h-28 py-2 block w-full mt-2"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
              ></textarea>
            </div>

            {/* skills section  */}
            <div>
              <label htmlFor="skills" className="text-neutral-500 text-md">
                Skills
              </label>

              <div className="py-2 px-4 rounded-md border-2 border-primary/30 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Skill key={skill} name={skill} />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setIsSkillsModalOpen(true)}
                  className="text-primary/50 cursor-pointer"
                >
                  <PlusCircle />
                </button>
              </div>
            </div>

            {isSkillsModalOpen && (
              <SkillsModal
                isOpen={isSkillsModalOpen}
                onClose={() => setIsSkillsModalOpen(false)}
                setSkills={setSkills}
                skills={skills}
              />
            )}

            {/* button section  */}
            <div className="mt-10 w-full flex gap-8 items-center">
              <button
                type="button"
                className="w-full  px-12 py-4 border-2 border-primary rounded-md cursor-pointer hover:bg-accent-hover hover:text-secondary hover:border-accent-hover transition-all duration-200 ease-in-out"
                onClick={() => setIsEditUserModalOpen(false)}
              >
                Cancel
              </button>
              {isLoading ? (
                <button
                  type="submit"
                  className="w-full text-xl px-12 py-4 text-secondary bg-accent hover:bg-accent-hover rounded-md cursor-pointer transition-colors duration-200 ease-in-out"
                >
                  <Loader2 className="animate-spin mx-auto" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-xl px-12 py-4 text-secondary bg-accent hover:bg-accent-hover rounded-md cursor-pointer transition-colors duration-200 ease-in-out"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </Form>
    </section>
  );
};

export default EditUserModal;
