import React, { FC } from "react";
import "styles/components.css";

interface IImageComponent {
  imgData: string | ArrayBuffer;
  justifyContent: string;
}

const Image: FC<IImageComponent> = ({ imgData, justifyContent }) => (
  <>
    {imgData ? (
      <div className="relative">
        <div
          id="image-one"
          className="absolute items-center justify-center w-auto h-full"
          style={{
            backgroundImage: `url(${imgData})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: justifyContent,
            backgroundSize: "contain",
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

export default Image;
