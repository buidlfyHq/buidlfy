import Spinner from "components/dashboard/spinner";
import React, { FC, useState } from "react";
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
  return (
    <>
      {imgData ? (
        <div
          id="image-one"
          className="items-center justify-center w-auto h-full"
          style={{
            height: "-webkit-fill-available",
            backgroundImage: `url(${imgData})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: justifyContent,
            backgroundSize: "contain",
            margin: `${margin.marginTop}px ${margin.marginRight}px ${margin.marginBottom}px ${margin.marginLeft}px`,
          }}
        />
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
