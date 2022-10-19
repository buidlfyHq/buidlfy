import { FC } from "react";
import defaultImage from "assets/default-image.svg";
import add from "assets/add-image.svg";
import "styles/components.css";

interface IDefaultImage {
  id: string;
}

const DefaultImage: FC<IDefaultImage> = ({ id }) => {
  return (
    // We need id to make image clickable overall till we find a better way to write it
    <section className="default-image w-full h-full">
      <div id={id} className="flex justify-center items-center h-full">
        <div id={id}>
          <span id={id} className="flex justify-center">
            <img
              id={id}
              className="w-[2.5rem]"
              src={defaultImage}
              alt="default"
            />
          </span>
          <span id={id} className="text-[#3F405C] text-[12px] mt-3">
            Click here to add the image
          </span>
          <span
            id={id}
            className="flex mt-3 justify-center py-2.5 image-div rounded-[8px]"
          >
            <span id={id} className="text-[#666BD3] text-[13px]">
              Add Image
            </span>
            <img className="w-5 ml-2" src={add} alt="add" />
          </span>
        </div>
      </div>
    </section>
  );
};
export default DefaultImage;
