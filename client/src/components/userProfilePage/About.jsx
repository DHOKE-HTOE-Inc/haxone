import React from "react";

const About = ({ aboutme }) => {
  return (
    <section className="bg-white rounded-xl shadow-xl p-8 relative">
      <div className="text-2xl font-semibold">About Me</div>
      <div className="mt-4 text-muted-gray">
        {aboutme ? aboutme : "There is nothing about me."}
      </div>
    </section>
  );
};

export default About;
