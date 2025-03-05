import HomeMainAdult from "@/components/home/HomeMainAdult";
import HomeMainYouth from "@/components/home/HomeMainYouth";
import Limit from "@/components/home/Limit";
import Report from "@/components/home/Report";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

import React from "react";

const Home: React.FC = () => {
  const type = "adult";
  const report = false;
  const limit = true;
  return (
    <>
      {report && <Report />}
      {limit && <Limit />}
      <div className="min-h-screen bg-[#f9f8f3] flex flex-col px-4">
        <Header />
        {type === "adult" ? <HomeMainAdult /> : <HomeMainYouth />}
        <Footer />
      </div>
    </>
  );
};

export default Home;
