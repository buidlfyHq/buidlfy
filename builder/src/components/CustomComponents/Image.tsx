import React, { FC } from "react";
import "styles/Components.css";

interface IImageComponent {
  imgData: string | ArrayBuffer;
  justifyContent: string;
}

const Image: FC<IImageComponent> = ({ imgData, justifyContent }) => (
  <>
    {imgData ? (
      <div
        id="image-one"
        className="flex items-center justify-center w-full h-full"
        style={{
          backgroundImage: `url(${imgData})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: justifyContent,
          backgroundSize: "contain",
        }}
      />
    ) : (
      <div className="flex items-center justify-center w-full h-full">
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
