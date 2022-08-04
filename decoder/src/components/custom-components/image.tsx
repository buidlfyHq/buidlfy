import { FC } from "react";
import defaultImage from "assets/default-image.png";
import "styles/components.css";

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

const Image: FC<IImageComponent> = ({ imgData, justifyContent, margin }) => (
  <div
    className="flex justify-center items-center h-full w-full"
    style={{
      backgroundImage: `url(${imgData ? imgData : defaultImage})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: justifyContent,
      backgroundSize: "contain",
      margin: `${margin.marginTop}px ${margin.marginRight}px ${margin.marginBottom}px ${margin.marginLeft}px`,
    }}
  />
);

export default Image;
