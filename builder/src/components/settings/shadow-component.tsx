import React, { FC } from "react";
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
    // setLeft(!left);
    if (shadow === "small") {
      setSmall(false);
    } else {
      setSmall(true);
    }
  };

  const handleMediumChange = () => {
    // setLeft(!center);
    if (shadow === "medium") {
      setMedium(false);
    } else {
      setMedium(true);
    }
  };

  const handleLargeChange = () => {
    // setRight(!right);
    if (shadow === "large") {
      setLarge(false);
    } else {
      setLarge(true);
    }
  };

  return (
    <span className="margin-text text-left px-3 mt-6 mb-0 text-xl text-gray-500 font-regular font-normal not-italic">
      Shadow
      <div className="flex mt-3">
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
    </span>
  );
};
export default ShadowComponent;
