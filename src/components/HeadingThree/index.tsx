import React, { FC, useState } from "react";
import "../../styles/Components.css";
import SettingComponent from "../utils/SettingComponent";

// interface HeadingProps {
//   heading: string;
// }
const HeadingThree: FC = () => {
  const [headingThree, setHeadingThree] = useState<String>("Heading 3");

  return (
    <>
      <div className="flex items-center justify-center h-full">
        <SettingComponent
          classname={"text-4xl font-normal leading-normal"}
          text={headingThree}
          link={""}
          setBrandName={setHeadingThree}
        />
      </div>
    </>
  );
};

export default HeadingThree;
