import HomeMainSenior from "@/components/home/HomeMainSenior";
import HomeMainYouth from "@/components/home/HomeMainYouth";
import Header from "@/components/ui/Header";

import React from "react";

const Home: React.FC = () => {
  const type = "adult";
  return (
    <>
      <Header />
      {type === "adult" ? <HomeMainSenior /> : <HomeMainYouth />}
    </>
  );
};

export default Home;
