import React, { FC } from "react";
// import AbiComponent from "./AbiComponent";
import Navbar from "./Navbar";
import Dnd from "../dnd";

const Workspace: FC<{
  abi: string;
  showComponent: number[];
  setShowComponent: any;
}> = ({ abi, showComponent, setShowComponent }) => {
  return (
    <>
      <Navbar />
      <section className="p-4">
        Welcome to DeFlow
        {/* <AbiComponent
          abi={abi}
          showComponent={showComponent}
          setShowComponent={setShowComponent}
        /> */}
        {/* <Dnd /> */}
      </section>
    </>
  );
};

export default Workspace;
