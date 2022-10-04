import React, { FC } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "redux/root-state.interface";
import { IUploadedImageData } from "redux/workspace/workspace.interfaces";
import image from "assets/default-image.png";
import add from "assets/add-image.png";
import "styles/components.css";

interface IImageComponent {
  imgData: string | ArrayBuffer;
  justifyContent: string;
  margin?: {
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
  };
  width?: number;
  height?: number;
  backgroundSize?: string;
  i: string;
  isAuto?: boolean;
}

const Image: FC<IImageComponent> = ({
  i,
  imgData,
  justifyContent,
  margin,
  width,
  height,
  backgroundSize,
  isAuto,
}) => {
  const imageData: IUploadedImageData = useSelector((state: IRootState) =>
    state.workspace.uploadedImagesData.find(
      (image: IUploadedImageData) => image.settingItemId === i
    )
  );

  // Add ClientWidth and ClientHeight of Image when it changes its position
  // const ref = useRef<HTMLDivElement>();

  // useEffect(() => {
  //   if (ref?.current?.clientWidth) {
  //     console.log(ref.current.clientWidth, "cw");
  //     setDynamicWidth(ref.current.clientWidth);
  //   }
  //   if (ref?.current?.clientHeight) {
  //     setDynamicHeight(ref.current.clientHeight);
  //   }
  // }, [ref?.current?.clientWidth, ref?.current?.clientHeight]);
  // useEffect(() => {
  //   if (ref?.current?.clientHeight) {
  //     console.log(ref.current.clientHeight, "ch");
  //     setDynamicHeight(ref.current.clientHeight);
  //   }
  // }, [ref?.current?.clientHeight]);

  return (
    <>
      {imageData?.uploadedImageData ? (
        <div className="flex w-full h-full">
          <div
            // ref={ref}
            id={i}
            className="flex w-full h-full"
            style={{
              backgroundImage: `url(${imageData.uploadedImageData})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: justifyContent,
              backgroundSize: `${
                isAuto ? backgroundSize : `${width}px ${height}px`
              }`,
              margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
            }}
          />
        </div>
      ) : (
        <section className="default-image w-full h-full">
          <div id={i} className="flex justify-center items-center h-full">
            <div id={i}>
              <span id={i} className="flex justify-center">
                <img id={i} className="w-6" src={image} alt="default" />
              </span>
              <span id={i} className="text-[#3F405C] text-[12px] mt-3">
                Click here to add the image
              </span>
              <span
                id={i}
                className="flex mt-3 justify-center py-2.5 image-div rounded-[8px]"
              >
                <span id={i} className="text-[#666BD3] text-[13px]">
                  Add Image
                </span>
                <img className="w-5 ml-2" src={add} alt="add" />
              </span>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Image;
