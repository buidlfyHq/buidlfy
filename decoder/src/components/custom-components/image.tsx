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

const Image: FC<IImageComponent> = ({ imgData, justifyContent, margin }) => {
  const finalMarginLeft = 2 * margin.marginLeft;
  const finalMarginRight = 2 * margin.marginRight;
  const finalMarginTop = 2 * margin.marginTop;
  const finalMarginBotttom = 2 * margin.marginBottom;

  return (
    <div
      className="flex justify-center items-center h-full w-full"
      style={{
        backgroundImage: `url(${imgData ? imgData : defaultImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: justifyContent,
        backgroundSize: "contain",
        margin: `${finalMarginTop}px ${finalMarginRight}px ${finalMarginBotttom}px ${finalMarginLeft}px`,
      }}
    />
  );
};

export default Image;
