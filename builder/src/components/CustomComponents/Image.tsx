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
        <div
          className="flex justify-center items-center h-full w-full"
          style={{
            backgroundImage: `url(${imgData})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        ></div>
      ) : (
        <div
          className="flex justify-center items-center h-full w-full"
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        ></div>
      )}
    </>
  );
};

export default Image;
