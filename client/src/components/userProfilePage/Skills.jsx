import React from "react";

const Skills = ({ skills }) => {
  return (
    <section className="bg-white rounded-xl shadow-xl p-8 relative">
      <div className="text-2xl mb-4 font-semibold">Skills</div>

      <div className="flex gap-2 items-center max-w-full flex-wrap">
        {skills && skills.length > 0 ? (
          skills.map((skill) => <Skill key={skill} name={skill} />)
        ) : (
          <p className="text-neutral-500">No skills found</p>
        )}
      </div>
    </section>
  );
};

export default Skills;

export const Skill = ({ name }) => {
  return (
    <section className="w-fit py-1 px-4 border-2 rounded-full text-sm bg-neutral-100">
      {name}
    </section>
  );
};
