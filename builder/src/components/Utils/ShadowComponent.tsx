import React, { FC } from "react";
import "styles/Dashboard.css";
import "styles/Components.css";

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
    <span className=" text-left px-3 mt-2 mb-0 text-xl text-gray-500 font-regular font-normal not-italic">
      Shadow
      <div className="flex mt-3 px-3">
        <span
          onClick={handleSmallChange}
          className="flex items-center justify-center shadow text-[18px] w-8 h-10 my-2 font-regular"
        >
          Sm
        </span>
        <span
          onClick={handleMediumChange}
          className="flex items-center justify-center shadow text-[18px] w-8 h-10 m-2 font-regular"
        >
          Md
        </span>
        <span
          onClick={handleLargeChange}
          className="flex items-center justify-center shadow text-[18px] w-8 h-10 my-2 font-regular"
        >
          Lg
        </span>
      </div>
    </span>
  );
};
export default ShadowComponent;
