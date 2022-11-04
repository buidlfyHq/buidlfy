import { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUploadedImageData,
  updateWorkspaceImageElementStyle,
} from "redux/workspace/workspace.reducers";
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
  imgData?: string | ArrayBuffer;
}

const Image: FC<IImageComponent> = ({
  i,
  justifyContent,
  margin,
  width,
  height,
  backgroundSize,
  isAuto,
  imgData,
}) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>();
  const imageData = useSelector((state: IRootState) =>
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
      {imageData?.uploadedImageData || imgData ? (
        <div className="flex w-full h-full">
          <div
            ref={ref}
            id={i}
            className="flex w-full h-full"
            style={{
              backgroundImage: `url(${
                imageData?.uploadedImageData
                  ? imageData.uploadedImageData
                  : imgData
              })`,
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
