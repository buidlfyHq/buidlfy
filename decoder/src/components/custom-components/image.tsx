import { FC } from "react";
import defaultImage from "assets/default-image.png";
import "styles/components.css";
import { MARGIN_VARIABLE } from "config/constants";

interface IImageComponent {
  imgData: string | ArrayBuffer;
  justifyContent: string;
  margin?: {
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
  };
}

const Image: FC<IImageComponent> = ({ imgData, justifyContent, margin }) => {
  return (
    <div
      className="flex justify-center items-center h-full w-full"
      style={{
        height: "-webkit-fill-available",
        backgroundImage: `url(${imgData ? imgData : defaultImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: justifyContent,
        backgroundSize: "contain",
        margin: `${margin.marginTop * MARGIN_VARIABLE}px ${
          margin.marginRight * MARGIN_VARIABLE
        }px ${margin.marginBottom * MARGIN_VARIABLE}px ${
          margin.marginLeft * MARGIN_VARIABLE
        }px`,
      }}
    />
  );
};

export default Image;
