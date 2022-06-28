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
        <div className="h-full flex justify-center items-center">
          <img className=" h-32 w-32 ml-6" src={imgData} alt="" />
        </div>
      ) : (
        <div className="h-full flex justify-center items-center">
          <img className=" h-32 w-32 ml-6" src={image} alt="" />
        </div>
      )}
    </>
  );
};

export default Image;
