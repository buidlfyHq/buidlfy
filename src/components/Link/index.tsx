import React, { FC, useState } from "react";
import "../../styles/Components.css";
import SettingComponent from "../utils/SettingComponent";

interface LinkProps {
  heading: string;
}
const Link: FC = () => {
  const [brandName, setBrandName] = useState<String>("Link");
  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div>
          <SettingComponent
            classname={
              "mx-2 font-regular underline hover:text-blue-800 visited:text-purple-600"
            }
            text={brandName}
            link={""}
            setBrandName={setBrandName}
          />
        </div>
      </div>
    </>
  );
};

export default Link;
