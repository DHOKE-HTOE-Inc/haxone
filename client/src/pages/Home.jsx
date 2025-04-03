import React from "react";
import Hero from "../components/Hero";
import OnGoingEvent from "../components/OnGoingEvent";
import CurrentJoinedEvent from "../components/CurrentJoinedEvent";

const Home = () => {
  return (
    <>
      <Hero />
      <CurrentJoinedEvent />
      <OnGoingEvent />
    </>
  );
};

export default Home;
