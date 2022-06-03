import React, { FC } from "react";
import "../../styles/Components.css";
import image from "../../assets/image-component.png";
interface ImageProps {
  deleteComponent: any;
}

const Image: FC<ImageProps> = ({ deleteComponent }: ImageProps) => {
  return (
    <>
      {deleteComponent ? null : (
        <div className="h-full flex justify-center items-center">
          <img className=" h-32 w-32 ml-6" src={image} />
        </div>
      )}
    </>
  );
};

export default Image;
