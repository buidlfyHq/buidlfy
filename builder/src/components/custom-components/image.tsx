import { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWorkspaceImageElementStyle } from "redux/workspace/workspace.reducers";
import { IRootState } from "redux/root-state.interface";
import { IUploadedImageData } from "redux/workspace/workspace.interfaces";
import DefaultImage from "components/utils/default-image";
import "styles/components.css";

interface IImageComponent {
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
  justifyContent,
  margin,
  width,
  height,
  backgroundSize,
  isAuto,
}) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>();
  const imageData: IUploadedImageData = useSelector((state: IRootState) =>
    state.workspace.uploadedImagesData.find(
      (image: IUploadedImageData) => image.settingItemId === i
    )
  );

  useEffect(() => {
    if (ref.current?.clientWidth) {
      console.log(ref.current.clientWidth, "cw");
      dispatch(
        updateWorkspaceImageElementStyle({
          settingItemId: i,
          propertyName: "width",
          propertyValue: ref.current.clientWidth,
          imageSizeProperty: false,
        })
      );
    }
  }, [ref.current?.clientWidth]);

  useEffect(() => {
    if (ref.current?.clientHeight) {
      console.log(ref.current.clientHeight, "ch");
      dispatch(
        updateWorkspaceImageElementStyle({
          settingItemId: i,
          propertyName: "height",
          propertyValue: ref.current.clientHeight,
          imageSizeProperty: false,
        })
      );
    }
  }, [ref.current?.clientHeight]);

  return (
    <>
      {imageData?.uploadedImageData ? (
        <div className="flex w-full h-full">
          <div
            ref={ref}
            id={i}
            className="flex w-full h-full"
            style={{
              backgroundImage: `url(${imageData.uploadedImageData})`,
              // It will be needed after image storage works
              // backgroundImage: `${
              //   imgData
              //     ? `url(${imgData})`
              //     : `url(${imageData.uploadedImageData})`
              // }`,
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
