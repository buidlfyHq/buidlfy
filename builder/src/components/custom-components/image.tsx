import React, { FC } from "react";
import "styles/components.css";

interface IImageComponent {
  imgData: string | ArrayBuffer;
  justifyContent: string;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
}

const Image: FC<IImageComponent> = ({
  imgData,
  justifyContent,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
}) => (
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
      <div className="flex items-center justify-center w-auto h-full">
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
