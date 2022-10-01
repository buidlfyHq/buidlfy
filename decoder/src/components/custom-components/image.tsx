import { FC } from "react";
import defaultImage from "assets/default-image.png";
import { MARGIN_VARIABLE } from "config/constants";
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
  width?: number;
  height?: number;
  backgroundSize?: string;
  isAuto?: boolean;
}

const Image: FC<IImageComponent> = ({
  imgData,
  justifyContent,
  margin,
  width,
  height,
  backgroundSize,
  isAuto,
}) => {
  return (
    <div className="flex w-full h-full">
      <div
        className="flex h-full w-full"
        style={{
          backgroundImage: `url(${imgData ? imgData : defaultImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: justifyContent,
          backgroundSize: `${
            isAuto ? backgroundSize : `${width}px ${height}px`
          }`,
          margin: `${margin.marginTop * MARGIN_VARIABLE}px ${
            margin.marginRight * MARGIN_VARIABLE
          }px ${margin.marginBottom * MARGIN_VARIABLE}px ${
            margin.marginLeft * MARGIN_VARIABLE
          }px`,
        }}
      />
    </div>
  );
};

export default Image;
