import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateWorkspaceElement,
  updateUploadedImageData,
} from "redux/workspace/workspace.reducers";
import { uploadFileToWeb3Storage } from "utils/web3storage";
import upload from "assets/upload-img.png";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IMAGE_SIZE_VARIABLE } from "config/constant";
import ReactTooltip from "react-tooltip";
import "styles/components.css";
import "styles/dashboard.css";

interface IUploadComponent {
  i: string;
}

const UploadComponent: FC<IUploadComponent> = ({ i }) => {
  const dispatch = useDispatch();
  const [sizeExceeded, setSizeExceeded] = useState<boolean>(false);
  const [updateImage, setUpdateImage] = useState<string>();
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const [isImage, setIsImage] = useState<string>();
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
          setIsImage(reader.result as string);
          dispatch(
            updateUploadedImageData({
              settingItemId: i,
              uploadedImageData: reader.result as string,
            })
          );
          const cid = await uploadFileToWeb3Storage(reader.result as string);
          setUpdateImage(reader.result as string);
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
  console.log(isSpinner, "isSpin");

  const tooltip = (
    <ReactTooltip
      className="tool"
      place="left"
      type="dark"
      effect="solid"
      backgroundColor="#262338"
      arrowColor="#262338"
      scrollHide={true}
    />
  );

  return (
    // <div className="items-center w-full mx-1 py-2 text-gray-600 rounded">
    // {/* <div className="px-2 margin-text text-left mt-2 ">Upload Image</div> */}
    //  <div className="flex justify-center">
    //   <div className="mb-3 mt-5 upload-img">
    //     <label htmlFor="inputTag" className="image-label">
    //       Drag and drop a file, or{" "}
    //       <span className="purple-label">browse</span>
    //       <input
    // onChange={onChangeImage}
    //         className="upload-input"
    //         // It is important in next branch
    //         // className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 file:cursor-pointer"
    //         type="file"
    //         id="inputTag"
    //       />
    //     </label>
    //   </div>
    //   <br />
    // </div>
    // <div className="flex justify-center">
    //   <button className="upload-btn mx-2 ">Upload</button>
    // </div>
    // {sizeExceeded ? (
    //   <h3 className="text-red-500 text-sm ml-5 mb-2">
    //     Please upload file below 5 mb
    //   </h3>
    // ) : null}
    <>
      {tooltip}
      <div
        className={`relative w-[220px] h-[155px] mx-1 my-2 cursor-pointer ${
          updateImage ? "image-overlay" : "default-upload"
        } `}
      >
        {isSpinner ? (
          <>
            <IoIosCloseCircleOutline
              onClick={() => setUpdateImage(null)}
              className="text-white absolute right-1 top-1 text-[18px] "
            />
            <div
              role="status"
              className="absolute flex justify-center items-center w-full h-full"
            >
              <svg
                className="inline mr-2 w-4 h-4 text-gray-200 animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="rgba(255, 255, 255, 0.2)"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#A38CFF"
                />
              </svg>
            </div>
            <div className="absolute flex mt-[1.2rem] justify-center items-center w-full h-full">
              <h6 className="text-white text-[13px]">Image is Uploading</h6>
            </div>
            <img
              className="w-[220px] h-[153px] object-fill absolute z-[-1]"
              src={isImage}
            />
          </>
        ) : (
          <>
            {updateImage ? (
              <>
                <IoIosCloseCircleOutline
                  onClick={() => setUpdateImage(null)}
                  className="text-white absolute right-1 top-1 text-[18px]"
                />
                <img
                  className="w-[220px] h-[153px] object-fill"
                  src={updateImage}
                />
                <button
                  onClick={onChangeImage}
                  className="bg-white border absolute border-[#8268E5] py-2 px-10 bottom-[0.5rem] left-[2rem] rounded-[34px] text-[#8268E5] text-[12px]"
                >
                  Change Image
                </button>
              </>
            ) : (
              <label htmlFor="inputTag" className="image-label">
                <div data-tip="Click here to upload image">
                  <div className="flex justify-center mt-2">
                    <img src={upload} alt="upload" className="w-[3.5rem]" />
                  </div>
                  <h6 className="text-[12px] font-medium mt-2 flex justify-center">
                    Add Image from Desktop
                  </h6>
                  <div className="flex justify-center mt-4">
                    <input
                      onChange={onChangeImage}
                      className="upload-input"
                      // It is important in next branch
                      // className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 file:cursor-pointer"
                      type="file"
                      id="inputTag"
                    />
                    <button
                      onClick={onChangeImage}
                      className="bg-white border border-[#8268E5] py-2 px-7 rounded-[34px] text-[#8268E5] text-[12px]"
                    >
                      Upload Image
                    </button>
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
