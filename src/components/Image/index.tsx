import React, { FC } from "react";
import "../../styles/Components.css";
import image from "../../assets/image-component.png";
interface ImageProps {
  heading: string;
}
const Image: FC = () => {
  return (
    <>
      <img className=" h-32 w-32 ml-6" src={image} />
    </>
  );
};

export default Image;
