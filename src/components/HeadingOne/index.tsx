import React, { FC, useState } from "react";
import "../../styles/Components.css";
import SettingComponent from "../utils/SettingComponent";

// interface HeadingProps {
//   heading: string;
// }
const HeadingOne: FC = () => {
  const [headingOne, setHeadingOne] = useState<String>("Heading 1");

  return (
    <>
      <div className="flex items-center justify-center">
        <SettingComponent
          classname={"text-6xl font-normal leading-normal mx-2 mt-0 whitespace-nowrap"}
          text={headingOne}
          link={""}
          setBrandName={setHeadingOne}
        />
      </div>
    </>
  );
};

export default HeadingOne;
