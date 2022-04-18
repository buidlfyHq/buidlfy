import { useState } from "react";
import type { NextPage } from "next";
import Navbar from "../components/navbar";

const Login: NextPage = () => {
  const [info, setInfo] = useState<string>(""); // for authentication message

  return (
    <>
      {/* Navigation */}
      <Navbar setInfo={setInfo} />
      {/* Welcome page */}
      <section className="h-screen bg-stone-400/10 flex justify-center items-center">
        <div>
          <h1 className="text-4xl text-center font-bold">Welcome to Deflow</h1>
          <p className="mt-2 text-center">{info}</p>
        </div>
      </section>
    </>
  );
};

export default Login;