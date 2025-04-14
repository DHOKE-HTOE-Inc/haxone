import { XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axios";

const EventSubmitModal = ({ isOpen, onClose, eventId }) => {
  if (!isOpen) return null;

  const userInfo = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: userInfo.username,
    email: userInfo.email,
    showcase_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    console.log(formData);
    try {
      await axiosInstance.post(`/events/${eventId}/apply/`, formData);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to submit application");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-primary/50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start text-2xl">
          <h2 className="font-bold mb-4">Event Submission</h2>
          <div className="cursor-pointer" onClick={onClose}>
            <XIcon />
          </div>
        </div>
        <p className="mb-4 text-neutral-500">
          Please fill out the form below to apply for the event.
        </p>
        {success ? (
          <div className="text-success mb-4">
            Application submitted successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="showcase_url" className="block mb-2">
                Portfolio
              </label>
              <input
                type="url"
                id="showcase_url"
                name="showcase_url"
                value={formData.showcase_url}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="text-sm text-gray-500 mb-4">
              If you don't have a portfolio, you can submit your GitHub account.
            </div>
            {error && <div className="text-error mb-4">{error}</div>}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-accent text-white px-4 py-2 rounded-md w-full mt-4 hover:bg-accent-hover disabled:opacity-50"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EventSubmitModal;
