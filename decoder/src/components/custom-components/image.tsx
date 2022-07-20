import { FC } from "react";
import image from "assets/image-component.png";
import "styles/components.css";

interface IImageComponent {
  imgData: string | ArrayBuffer;
  justifyContent: string;
}

const Image: FC<IImageComponent> = ({ imgData, justifyContent }) => (
  <div
    className="flex justify-center items-center h-full w-full"
    style={{
      backgroundImage: `url(${imgData ? imgData : image})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: justifyContent,
      backgroundSize: "contain",
    }}
  />
);

export default Image;
