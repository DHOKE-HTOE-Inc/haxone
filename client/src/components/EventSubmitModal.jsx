import { XIcon } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const EventSubmitModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  //   getuserinfo
  const userInfo = useSelector((state) => state.auth.user);

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
          <h2 className=" font-bold mb-4">Event Submission</h2>
          <div className="cursor-pointer" onClick={onClose}>
            <XIcon />
          </div>
        </div>
        <p className="mb-4 text-neutral-500">
          Please fill out the form below to apply for the event.
        </p>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              defaultValue={userInfo.username}
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
              defaultValue={userInfo.email}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="link" className="block mb-2">
              Protfolio
            </label>
            <input
              type="url"
              id="link"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="text-sm text-gray-500 mb-4">
            If you don't have protfolio, you can submit your github acc.
          </div>
          <button
            type="submit"
            className="bg-accent text-white px-4 py-2 rounded-md w-full mt-4 hover:bg-accent-hover"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventSubmitModal;
