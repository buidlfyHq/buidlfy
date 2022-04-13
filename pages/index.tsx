import { useState } from "react";
import type { NextPage } from "next";
import Navbar from "../components/navbar";

const Home: NextPage = () => {
  const [info, setInfo] = useState<string>("");

  return (
    <>
      {/* @ts-ignore */}
      <Navbar setInfo={setInfo} /> {/* @ts-ignore-line */}  
      <section className="h-screen bg-stone-400/10 flex justify-center items-center">
        <div>
          <h1 className="text-4xl text-center font-bold">Welcome to Deflow</h1>
          <p className="mt-2 text-center">{info}</p>
        </div>
      </section>
    </>
  );
};

export default Home;
