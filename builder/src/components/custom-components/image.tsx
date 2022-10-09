import React, { FC } from "react";
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
  i: string;
  isAuto?: boolean;
}

const Image: FC<IImageComponent> = ({
  i,
  imgData,
  justifyContent,
  margin,
  width,
  height,
  backgroundSize,
  isAuto,
}) => {
  return (
    <>
      {imgData ? (
        <div className="flex w-full h-full">
          <div
            // ref={ref}
            id={i}
            className="flex w-full h-full"
            style={{
              backgroundImage: `url(${imgData})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: justifyContent,
              backgroundSize: `${
                isAuto ? backgroundSize : `${width}px ${height}px`
              }`,
              margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
            }}
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <div
            id={i}
            className="my-[1.8rem] upload-img px-3 text-[12px] whitespace-nowrap"
          >
            Click and upload file, or{" "}
            <span className="ml-2 purple-label">browse</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Image;
