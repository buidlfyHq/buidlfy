import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateWorkspaceElement,
  updateUploadedImageData,
} from "redux/workspace/workspace.reducers";
import { uploadFileToWeb3Storage } from "utils/web3storage";
import upload from "assets/upload-img.svg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IMAGE_SIZE_VARIABLE } from "config/constant";
import { IUploadedImageData } from "redux/workspace/workspace.interfaces";
import { IRootState } from "redux/root-state.interface";
import Spinner from "components/utils/spinner";
import ReactTooltip from "react-tooltip";
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
          const cid = await uploadFileToWeb3Storage(reader.result as string);
          setIsSpinner(false);
          dispatch(
            updateWorkspaceElement({
              settingItemId: i,
              propertyName: "imgData",
              propertyValue: cid,
            })
          );
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
      className="tool"
      place="left"
      type="dark"
      effect="solid"
      backgroundColor="#262338"
      arrowColor="#262338"
      scrollHide={true}
      delayShow={300}
    />
  );

  return (
    <>
      {tooltip}
      <div
        className={`relative w-[220px] h-[155px] rounded-[0.5rem] mx-1 my-2 cursor-pointer ${
          imageData?.uploadedImageData ? "image-overlay" : "default-upload"
        } `}
      >
        {isSpinner ? (
          <div>
            <IoIosCloseCircleOutline
              onClick={handleDeleteImage}
              className="text-white absolute right-1 top-1 text-[18px] "
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
                  className="text-white absolute right-1 top-1 text-[18px]"
                />
                <img
                  className="w-[220px] h-[153px] object-fill"
                  src={imageData?.uploadedImageData}
                  alt="default"
                />
                <label
                  htmlFor="inputTag"
                  className="image-label cursor-pointer"
                >
                  {imageInput}
                  <span className="bg-white border absolute border-[#8268E5] py-2 px-10 bottom-[0.5rem] left-[2rem] rounded-[34px] text-[#8268E5] text-[12px]">
                    Change Image
                  </span>
                </label>
              </>
            ) : (
              <label htmlFor="inputTag" className="image-label cursor-pointer">
                <div data-tip="Click here to upload image">
                  <div className="flex justify-center mt-2">
                    <img src={upload} alt="upload" className="w-[3.5rem]" />
                  </div>
                  <h6 className="text-[12px] font-medium mt-2 flex justify-center">
                    Add Image from Desktop
                  </h6>
                  <div className="flex justify-center mt-4">
                    {imageInput}
                    <span className="bg-white border border-[#8268E5] py-2 px-7 rounded-[34px] text-[#8268E5] text-[12px]">
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
          Please upload file below 5 mb
        </h3>
      ) : null}
    </>
  );
};
export default UploadComponent;
