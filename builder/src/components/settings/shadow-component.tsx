import React, { FC } from "react";
import { BsBrightnessLow } from "react-icons/bs";
import "styles/components.css";
import "styles/dashboard.css";

interface IShadowComponent {
  setSmall: (shadow: string | boolean) => void;
  setMedium: (shadow: string | boolean) => void;
  setLarge: (shadow: string | boolean) => void;
  shadow: string;
}

const ShadowComponent: FC<IShadowComponent> = ({
  setSmall,
  setMedium,
  setLarge,
  shadow,
}) => {
  const handleSmallChange = () => {
    setSmall(shadow !== "small");
  };

  const handleMediumChange = () => {
    setMedium(shadow !== "medium");
  };

  const handleLargeChange = () => {
    setLarge(shadow !== "large");
  };

  return (
    <div className="margin-text text-left px-3 mt-6 mb-0 text-xl text-gray-500 font-regular font-normal not-italic">
      <span className="flex px-1">
        <span> Shadow </span>{" "}
        <BsBrightnessLow className="text-[18px] ml-2 mt-[-2px]" />
      </span>
      <div className="flex mt-3 px-1">
        <span
          onClick={handleSmallChange}
          className="shadow-div flex items-center justify-center shadow text-[18px] py-2 px-3 font-regular"
        >
          S
        </span>
        <span
          onClick={handleMediumChange}
          className="shadow-div flex items-center justify-center shadow text-[18px] py-2 px-3 mx-3 font-regular"
        >
          M
        </span>
        <span
          onClick={handleLargeChange}
          className="shadow-div flex items-center justify-center shadow text-[18px] py-2 px-3 font-regular"
        >
          L
        </span>
      </div>
    </div>
  );
};
export default ShadowComponent;
