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
      <div className="flex items-center justify-start ">
        <SettingComponent
          classname={"mx-2 text-4xl font-normal leading-normal mt-0 mb-2 "}
          text={headingThree}
          link={""}
          setBrandName={setHeadingThree}
        />
      </div>
    </>
  );
};

export default HeadingThree;
