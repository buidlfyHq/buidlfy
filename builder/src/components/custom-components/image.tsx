import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkspaceImageElementStyle } from 'redux/workspace/workspace.reducers';
import { IRootState } from 'redux/root-state.interface';
import { IUploadedImageData } from 'redux/workspace/workspace.interfaces';
import DefaultImage from 'components/utils/default-image';
import 'styles/components.css';

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
  manualSizing?: boolean;
  imgData?: string | ArrayBuffer;
  link: string;
}

const Image: FC<IImageComponent> = ({ i, justifyContent, margin, width, height, backgroundSize, isAuto, manualSizing, imgData, link }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>();
  const imageData = useSelector((state: IRootState) =>
    state.workspace.uploadedImagesData.find((image: IUploadedImageData) => image.settingItemId === i),
  );

  useEffect(() => {
    if (!manualSizing && ref.current?.clientWidth) {
      dispatch(
        updateWorkspaceImageElementStyle({
          settingItemId: i,
          propertyName: 'width',
          propertyValue: ref.current.clientWidth,
          imageSizeProperty: false,
        }),
      );
    }
  }, [ref.current?.clientWidth]); // eslint-disable-line

  useEffect(() => {
    if (!manualSizing && ref.current?.clientHeight) {
      dispatch(
        updateWorkspaceImageElementStyle({
          settingItemId: i,
          propertyName: 'height',
          propertyValue: ref.current.clientHeight,
          imageSizeProperty: false,
        }),
      );
    }
  }, [ref.current?.clientHeight]); // eslint-disable-line

  const imageDiv = (
    <div className="flex w-full h-full">
      <div
        ref={ref}
        id={i}
        className="flex w-full h-full"
        style={{
          backgroundImage: `url(${imageData?.uploadedImageData ? imageData.uploadedImageData : imgData})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: justifyContent,
          backgroundSize: `${isAuto ? backgroundSize : `${width}px ${height}px`}`,
          margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
        }}
      />
    </div>
  );

  return (
    <>
      {imageData?.uploadedImageData || imgData ? (
        <>
          {link?.length > 0 ? (
            <a style={{ textDecoration: 'none' }} rel="noreferrer" target="_blank" href={link}>
              {imageDiv}
            </a>
          ) : (
            imageDiv
          )}
        </>
      ) : (
        <DefaultImage id={i} />
      )}
    </>
  );
};

export default Image;
