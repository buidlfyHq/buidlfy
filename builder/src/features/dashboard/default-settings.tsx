import React, { FC, useState } from "react";
import BgColorComponent from "components/settings/bg-color-component";
import { uploadFileToWeb3Storage } from "config/web3storage";
import { SITE_SIZE_VARIABLE } from "config/constant";
import ReactTooltip from "react-tooltip";
import upload from "assets/upload-img.svg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Spinner from "components/utils/spinner";
import "styles/components.css";

interface IDefaultSettings {
  workspaceBackgroundColor: string;
  setWorkspaceBackgroundColor: (backgroundColor: string) => void;
  head: {
    title: string;
    logo: string | ArrayBuffer;
  };
  setHead: (head: { title: string; logo: string | ArrayBuffer }) => void;
}

const DefaultSettings: FC<IDefaultSettings> = ({
  workspaceBackgroundColor,
  setWorkspaceBackgroundColor,
  head,
  setHead,
}) => {
  const [sizeExceeded, setSizeExceeded] = useState<boolean>(false);
  const [siteImage, setSiteImage] = useState<string>();
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const onChangeLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files[0]) {
      if (e.target.files[0].size > SITE_SIZE_VARIABLE) {
        setSizeExceeded(true);
      } else {
        setSizeExceeded(false);
        setIsSpinner(true);
        const reader = new FileReader();
        reader.addEventListener("load", async () => {
          setSiteImage(reader.result as string);
          const cid = await uploadFileToWeb3Storage(reader.result as string);
          setIsSpinner(false);
          setHead({ ...head, logo: cid });
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  const handleDeleteImage = () => {
    setSiteImage("");
    setHead({ ...head, logo: "" });
  };

  const imageInput = (
    <input
      onChange={onChangeLogo}
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
      delayShow={200}
    />
  );

  // ADD: New site design in next branch
  return (
    <main className="fixed right-0 top-[60px] w-[250px] setting-nav h-full  bg-white">
      <div className="mx-3 my-2">
        <h3 className="mb-2 setting-text mt-4 ml-[0.8rem]">Site Settings</h3>
        <aside className="mb-1">
          <BgColorComponent
            workspaceBackgroundColor={workspaceBackgroundColor}
            setWorkspaceBackgroundColor={setWorkspaceBackgroundColor}
          />
        </aside>

        <aside className="flex items-center mb-3 px-3 text-black">
          {/* <RiText className="text-[18px] mr-3" /> */}
          <textarea
            value={head.title}
            onChange={(e) => setHead({ ...head, title: e.target.value })}
            className="changeText input-text h-[6rem] pl-[0.5rem] pt-[0.5rem]"
            placeholder="Site Title..."
          />
        </aside>

        <aside className="items-center w-full px-3 py-2 text-gray-600 rounded">
          <div className="px-1 margin-text text-left my-1 ">
            Upload Site Logo
          </div>
        </aside>

        <>
          {tooltip}
          <div
            className={`relative w-[205px] rounded-[0.3rem] h-[155px] mr-1 ml-4 my-2 cursor-pointer ${
              siteImage ? "image-overlay" : "default-upload"
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
                    <h6 className="text-white text-[13px]">
                      Image is Uploading
                    </h6>
                  </div>
                </div>
                <img
                  className="w-[220px] h-[153px] object-fill absolute z-[-1]"
                  src={siteImage}
                  alt="default"
                />
              </div>
            ) : (
              <>
                {siteImage ? (
                  <>
                    <IoIosCloseCircleOutline
                      onClick={handleDeleteImage}
                      className="text-white absolute right-1 top-1 text-[18px]"
                    />
                    <img
                      className="w-[220px] h-[153px] object-fill"
                      src={siteImage}
                      alt="default"
                    />
                    <label
                      htmlFor="inputTag"
                      className="image-label cursor-pointer"
                    >
                      {imageInput}
                      <span className="bg-white border absolute border-[#8268E5] py-2 px-10 bottom-[0.5rem] left-[1.5rem] rounded-[34px] text-[#8268E5] text-[12px]">
                        Change Image
                      </span>
                    </label>
                  </>
                ) : (
                  <label
                    htmlFor="inputTag"
                    className="image-label cursor-pointer"
                  >
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

        {/* <div>
          <div className="flex justify-center" onChange={onChangeLogo}>
            <div className="mb-3 mt-5 upload-img cursor-pointer">
              <label htmlFor="inputTag" className="image-label">
                Drag and drop a file, or{" "}
                <span className="purple-label">browse</span>
                <input
                  className="upload-input"
                  type="file"
                  id="inputTag"
                  accept=".ico"
                />
              </label>
            </div>
            <br />
          </div>
          <div className="flex justify-center" onChange={onChangeLogo}>
            <button className="upload-btn mx-2 cursor">Upload</button>
          </div>
        </div>
        {sizeExceeded ? (
          <h3 className="text-red-500 text-sm ml-5 mb-2">
            Please upload file below 1 mb
          </h3>
        ) : null}
        <div
          id="logo"
          className="mx-[4.5rem] mt-[2rem] mb-2 h-14 w-15 text-center mx-4 flex items-center justify-center"
          style={{
            backgroundImage: `url(${siteImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        /> */}
      </div>
    </main>
  );
};

export default DefaultSettings;
