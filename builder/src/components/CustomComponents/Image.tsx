import React, { FC } from "react";
import image from "assets/image-component.png";
import "styles/Components.css";

interface IImageComponent {
  imgData;
}

const Image: FC<IImageComponent> = ({ imgData }) => {
  return (
    <>
      {imgData ? (
        <img
          className="flex justify-center items-center h-full w-full"
          src={imgData}
          alt=""
        />
      ) : (
        <img
          className="flex justify-center items-center h-full w-full"
          src={image}
          alt=""
        />
      )}
    </>
  );
};

export default Image;
