import React, { FC } from "react";
import "../../styles/Components.css";
import image from "../../assets/image-component.png";
interface ImageProps {
  heading: string;
}
const Image: FC = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <img className="h-32 w-32" src={image} alt="img" />
    </div>
  );
};

export default Image;
