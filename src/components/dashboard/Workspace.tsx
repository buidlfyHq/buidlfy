import React, { FC } from "react";
import Builder from "../builder";
import Navbar from "./Navbar";
import AbiComponent from "./AbiComponent";

const Workspace: FC<{
  abi: string;
  showComponent: number[];
  setShowComponent: any;
}> = ({ abi, showComponent, setShowComponent }) => {
  return (
    <>
      <Navbar />
      <section className="p-4">
        Welcome to Spheron Typedream
        <Builder />
        <AbiComponent
          abi={abi}
          showComponent={showComponent}
          setShowComponent={setShowComponent}
        />
      </section>
    </>
  );
};

export default Workspace;
