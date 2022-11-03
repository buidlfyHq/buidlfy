import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ReactTooltip from "react-tooltip";
import { IMAGE_SIZE_VARIABLE } from "config/constant";
import Spinner from "components/utils/assets/spinner";
import {
  updateWorkspaceElement,
  updateUploadedImageData,
} from "redux/workspace/workspace.reducers";
import { IUploadedImageData } from "redux/workspace/workspace.interfaces";
import { uploadImage } from "redux/upload/upload.action";
import { IRootState } from "redux/root-state.interface";
import upload from "assets/upload-img.svg";
import "styles/components.css";
import "styles/dashboard.css";

interface IUploadComponent {
  i: string;
}

const UploadComponent: FC<IUploadComponent> = ({ i }) => {
  const dispatch = useDispatch();
  const [sizeExceeded, setSizeExceeded] = useState<boolean>(false);
  const [isSpinner, setIsSpinner] = useState<boolean>(false);

  const imageData: IUploadedImageData = useSelector((state: IRootState) =>
    state.workspace.uploadedImagesData.find(
      (image: IUploadedImageData) => image.settingItemId === i
    )
  );

  // FIX: find suitable types for e
  const onChangeImage = async (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0].size > IMAGE_SIZE_VARIABLE) {
        setSizeExceeded(true);
      } else {
        setSizeExceeded(false);
        setIsSpinner(true);
        const reader = new FileReader();
        reader.addEventListener("load", async () => {
          dispatch(
            updateUploadedImageData({
              settingItemId: i,
              uploadedImageData: reader.result as string,
            })
          );
          dispatch(uploadImage({ data: reader.result as string, id: i }));
          setIsSpinner(false);
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  const handleDeleteImage = () => {
    dispatch(
      updateUploadedImageData({
        settingItemId: i,
        uploadedImageData: null,
      })
    );
    dispatch(
      updateWorkspaceElement({
        settingItemId: i,
        propertyName: "imgData",
        propertyValue: null,
      })
    );
  };

  const imageInput = (
    <input
      onChange={onChangeImage}
      className="upload-input"
      type="file"
      id="inputTag"
    />
  );
  const tooltip = (
    <ReactTooltip
      id="upload"
      className="tool"
      place="left"
      type="dark"
      effect="solid"
      backgroundColor="#262338"
      arrowColor="#262338"
      scrollHide={true}
      delayShow={200}
    />
  );

  return (
    <>
      {tooltip}
      <div
        className={`relative w-[220px] h-[155px] rounded-[0.5rem] mx-1 my-2 ${
          imageData?.uploadedImageData ? "image-overlay" : "default-upload"
        } `}
      >
        {isSpinner ? (
          <div>
            <IoIosCloseCircleOutline
              onClick={handleDeleteImage}
              className="text-white absolute right-1 top-1 text-[18px] hover:scale-125 ease-linear duration-200 scale-100 cursor-pointer"
            />
            <div className="absolute flex justify-center items-center w-full h-full">
              <Spinner />
              <div className="absolute flex mt-[2.5rem] justify-center items-center w-full h-full">
                <h6 className="text-white text-[13px]">Image is Uploading</h6>
              </div>
            </div>
            <img
              className="w-[220px] h-[153px] object-fill absolute z-[-1]"
              src={imageData?.uploadedImageData}
              alt="default"
            />
          </div>
        ) : (
          <>
            {imageData?.uploadedImageData ? (
              <>
                <IoIosCloseCircleOutline
                  onClick={handleDeleteImage}
                  className="text-white cursor-pointer bg-black rounded-[50%] hover:scale-125 ease-linear duration-200 scale-100 absolute right-1 top-1 text-[18px]"
                />
                <img
                  className="w-[220px] h-[153px] object-fill rounded-[0.5rem]"
                  src={imageData?.uploadedImageData}
                  alt="default"
                />
                <label
                  htmlFor="inputTag"
                  className="image-label cursor-pointer"
                >
                  {imageInput}
                  <span className="bg-white hover:bg-[#8268E5] hover:text-white ease-linear duration-200 border absolute border-[#8268E5] py-2 px-10 bottom-[0.5rem] left-[2rem] rounded-[34px] text-[#8268E5] text-[12px]">
                    Change Image
                  </span>
                </label>
              </>
            ) : (
              <label htmlFor="inputTag" className="image-label cursor-pointer">
                <div data-tip="Click here to upload image" data-for="upload">
                  <div className="flex justify-center mt-2">
                    <img src={upload} alt="upload" className="w-[3.5rem]" />
                  </div>
                  <h6 className="text-[12px] font-medium mt-2 flex justify-center">
                    Add Image from Desktop
                  </h6>
                  <div className="flex justify-center mt-4">
                    {imageInput}
                    <span className="bg-white hover:bg-[#8268E5] hover:text-white ease-linear duration-200 border border-[#8268E5] py-2 px-7 rounded-[34px] text-[#8268E5] text-[12px]">
                      Upload Image
                    </span>
                  </div>
                </div>
              </label>
            )}
          </>
        )}
      </div>
      {sizeExceeded ? (
        <h3 className="text-red-500 text-sm ml-2 mb-2">
          Please upload the file with a size of less than 5 Mb
        </h3>
      ) : null}
    </>
  );
};
export default UploadComponent;
