import React, { FC } from "react";
import image from "assets/image-component.png";
import "styles/Components.css";

interface IImageComponent {
  imgData;
  justifyContent: string;
}

const Image: FC<IImageComponent> = ({ imgData, justifyContent }) => {
  return (
    <>
      {imgData ? (
        <div
          id="image-id"
          className="flex items-center justify-center w-full h-full"
          style={{
            backgroundImage: `url(${imgData})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: justifyContent,
            backgroundSize: "contain",
          }}
        ></div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <div
            id="image-id"
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
