import IItems from "interfaces/items";
import React, { FC, useEffect, useRef, useState } from "react";
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
  item?: IItems;
  isAuto?: boolean;
  dynamicWidth?: number;
  dynamicHeight?: number;
  setDynamicWidth?: (dynamicWidth?: number) => void;
  setDynamicHeight?: (dynamicHeight?: number) => void;
}

const Image: FC<IImageComponent> = ({
  imgData,
  justifyContent,
  margin,
  width,
  height,
  backgroundSize,
  item,
  isAuto,
  dynamicHeight,
  dynamicWidth,
  setDynamicHeight,
  setDynamicWidth,
}) => {
  // Add ClientWidth and ClientHeight of Image when it changes its position
  // const ref = useRef<HTMLDivElement>();

  // useEffect(() => {
  //   if (ref?.current?.clientWidth) {
  //     console.log(ref.current.clientWidth, "cw");
  //     setDynamicWidth(ref.current.clientWidth);
  //   }
  //   if (ref?.current?.clientHeight) {
  //     setDynamicHeight(ref.current.clientHeight);
  //   }
  // }, [ref?.current?.clientWidth, ref?.current?.clientHeight]);
  // useEffect(() => {
  //   if (ref?.current?.clientHeight) {
  //     console.log(ref.current.clientHeight, "ch");
  //     setDynamicHeight(ref.current.clientHeight);
  //   }
  // }, [ref?.current?.clientHeight]);
  return (
    <>
      {imgData ? (
        <div className="flex w-full h-full">
          <div
            // ref={ref}
            id={item.i}
            className="flex w-full h-full"
            style={{
              backgroundImage: `url(${imgData})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: justifyContent,
              backgroundSize: `${
                isAuto ? backgroundSize : `${width}px ${height}px`
              }`,
              margin: `${margin.marginTop}px ${margin.marginRight}px ${margin.marginBottom}px ${margin.marginLeft}px`,
            }}
          />
        </div>
      ) : (
        <div className="flex overflow-hidden items-center justify-center w-auto h-full">
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
