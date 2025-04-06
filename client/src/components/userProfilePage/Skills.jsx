import React from "react";

const Skills = () => {
  return (
    <section className="bg-white rounded-xl shadow-xl p-8 relative">
      <div className="text-2xl mb-4 font-semibold">Skills</div>

      <div className="flex gap-2 items-center max-w-full flex-wrap">
        <Skill name="html" />
        <Skill name="css" />
        <Skill name="js" />
        <Skill name="react" />
        <Skill name="python" />
        <Skill name="html" />
        <Skill name="css" />
        <Skill name="css" />
        <Skill name="react" />
        <Skill name="html" />
        <Skill name="js" />
        <Skill name="js" />
        <Skill name="react" />
        <Skill name="js" />
        <Skill name="python" />
        <Skill name="python" />
        <Skill name="css" />
        <Skill name="html" />
        <Skill name="react" />
        <Skill name="python" />
      </div>
    </section>
  );
};

export default Skills;

const Skill = ({ name }) => {
  return (
    <section className="w-fit py-1 px-4 border-2 rounded-full text-sm bg-neutral-100">
      {name}
    </section>
  );
};
