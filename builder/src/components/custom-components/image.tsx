import React, { FC } from "react";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";
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
  imgData,
  justifyContent,
  margin,
  width,
  height,
  backgroundSize,
  i,
  isAuto,
}) => {
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
      {imgData ? (
        <div className="flex w-full h-full">
          <div
            // ref={ref}
            id={i}
            className="flex w-full h-full"
            style={{
              backgroundImage: `url(${imgData})`,
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
        <div className="flex overflow-hidden items-center justify-center w-auto h-full">
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
};

export default Image;
