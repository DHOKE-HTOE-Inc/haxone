import React, { useState } from "react";

const SkillsModal = ({ isOpen, onClose, setSkills, skills }) => {
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    setSkills([...skills, newSkill]);
    setNewSkill("");

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-primary/30 flex items-center justify-center overflow-hidden"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-md p-2 border-2 border-primary/80 md:w-1/5 flex gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          placeholder="Add Skill"
          className="w-full p-2 rounded-md border-2 border-primary/80 focus:outline-none"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <button
          type="button"
          className="bg-accent text-white p-2 px-4 rounded-md"
          onClick={handleAddSkill}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default SkillsModal;
