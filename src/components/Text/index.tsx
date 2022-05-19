import React, { FC, useState } from "react";
import "../../styles/Components.css";
import SettingComponent from "../utils/SettingComponent";

interface TextProps {
  heading: string;
}

const Text: FC = () => {
  const [brandName, setBrandName] = useState<String>("Text");
  return (
    <>
      <div className="flex items-center justify-start ">
        <SettingComponent
          classname={"mx-2 font-regular"}
          text={brandName}
          link={""}
          setBrandName={setBrandName}
        />
      </div>
    </>
  );
};

export default Text;
