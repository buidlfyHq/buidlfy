import React, { FC } from "react";
import SignIn from "../components/home/Signin";

const Home: FC = () => {
  return (
    <main className="flex">
      {/* Welcome page */}
      <aside className="h-screen w-1/2 bg-cyan-900 text-white flex justify-center items-center">
        <section className="w-2/3">
          {/* LOGO */}
          <h1 className="text-5xl text-center font-bold">Deflow</h1>
          {/* Features */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold">Built on top on Arweave</h3>
            <p>
              We have built our solution directly on top on Arweave CLI to make
              our architecture linear and extensible.
            </p>
          </div>
          <div className="mt-10">
            <h3 className="text-2xl font-bold">
              Permanently deploy your web app
            </h3>
            <p>
              As we deploy your site directly to Arweave Permaweb, it will be
              always available for you to see.
            </p>
          </div>
          <div className="mt-10">
            <h3 className="text-2xl font-bold">Instant static deploys</h3>
            <p>
              Push to git and your website is live. Zero configuration required.
            </p>
          </div>
        </section>
      </aside>
      <aside className="w-1/2">
        <SignIn />
      </aside>
    </main>
  );
};

export default Home;