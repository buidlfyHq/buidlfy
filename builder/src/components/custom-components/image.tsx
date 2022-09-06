import React, { FC } from "react";
import "styles/components.css";

interface IImageComponent {
  imgData: any;
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
  updateBackgroundSize?: boolean;
}

const Image: FC<IImageComponent> = ({
  imgData,
  justifyContent,
  margin,
  width,
  height,
  backgroundSize,
  updateBackgroundSize,
}) => {
  return (
    <>
      {imgData ? (
        <div className="flex w-full h-full">
          <div
            id="image-one"
            className="flex w-full h-full"
            style={{
              backgroundImage: `url(${imgData})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: justifyContent,
              backgroundSize: `${
                !updateBackgroundSize
                  ? backgroundSize
                  : `${width}px ${height}px`
              }`,
              margin: `${margin.marginTop}px ${margin.marginRight}px ${margin.marginBottom}px ${margin.marginLeft}px`,
            }}
          />
        </div>
      ) : (
        <div className="flex overflow-hidden  items-center justify-center w-auto h-full">
          <div
            id="image-two"
            className="px-10 bold py-[10px] rounded-xl bg-indigo-700 text-white"
          >
            Upload Image
          </div>
        </div>
      )}
    </>
  );
};

export default Image;
