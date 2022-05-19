import React, { FC, useState } from "react";
import "../../styles/Components.css";
import SettingComponent from "../utils/SettingComponent";

// interface HeadingProps {
//   heading: string;
// }
const HeadingTwo: FC = () => {
  const [headingTwo, setHeadingTwo] = useState<String>("Heading 2");

  return (
    <>
      <div className="flex items-center justify-start ">
        <SettingComponent
          classname={"mx-2 text-5xl font-normal leading-normal mt-0 mb-2"}
          text={headingTwo}
          link={""}
          setBrandName={setHeadingTwo}
        />
      </div>
    </>
  );
};

export default HeadingTwo;
