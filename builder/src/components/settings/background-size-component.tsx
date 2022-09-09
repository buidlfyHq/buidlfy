import React, { FC } from "react";
import {
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineAlignCenter,
} from "react-icons/ai";
import "styles/components.css";
import "styles/dashboard.css";

interface IBackgroundSizeComponent {
  setCover: (backgroundSize: string | boolean) => void;
  setContain: (backgroundSize: string | boolean) => void;
  setAuto: (backgroundSize: string | boolean) => void;
  backgroundSize: string;
  isAuto?: boolean;
  setIsAuto?: (isAuto: boolean) => void;
}

const BackgroundSizeComponent: FC<IBackgroundSizeComponent> = ({
  setCover,
  setContain,
  setAuto,
  backgroundSize,
  setIsAuto,
  isAuto,
}) => {
  const handleCoverChange = () => {
    if (backgroundSize === "cover") {
      setCover(false);
    } else {
      setCover(true);
    }
  };

  const handleAutoChange = () => {
    if (backgroundSize === "auto") {
      setAuto(false);
    } else {
      setAuto(true);
    }
  };

  const handleContainChange = () => {
    if (backgroundSize === "contain") {
      setContain(false);
    } else {
      setContain(true);
    }
  };

  return (
    <>
      <span className="margin-text text-left px-3 mt-2 mb-0 text-xl text-gray-500 font-regular font-normal not-italic">
        Background Size
        <div className="flex mt-3 px-3">
          <span
            onClick={handleContainChange}
            className="align-div flex items-center justify-center shadow text-[12px] p-2 mr-2 my-2 font-regular text-black"
          >
            Contain
          </span>
          <span
            onClick={handleCoverChange}
            className="align-div flex items-center justify-center shadow text-[12px] p-2 mx-2 my-2 font-regular text-black"
          >
            Cover
          </span>
          <span
            onClick={handleAutoChange}
            className="align-div flex items-center justify-center shadow text-[12px] p-2 mx-2 my-2 font-regular text-black"
          >
            Auto
          </span>
        </div>
      </span>
    </>
  );
};
export default BackgroundSizeComponent;
