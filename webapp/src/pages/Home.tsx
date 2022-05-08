import React from "react";
import Navbar from "../components/Navbar";


let Home: React.FC<{}> = function Home() {
  return <section id='home'>
    <Navbar />
  </section>;
}

export default Home;