import React, { FC } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "redux/root-state.interface";
import { IUploadedImageData } from "redux/workspace/workspace.interfaces";
import DefaultImage from "components/utils/default-image";
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
  console.log(imgData, "img");

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
              // backgroundImage: `${
              //   imgData
              //     ? `url(${imgData})`
              //     : `url(${imageData.uploadedImageData})`
              // }`, // It will be needed after image storage works
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
        <DefaultImage id={i} />
      )}
    </>
  );
};

export default Image;
