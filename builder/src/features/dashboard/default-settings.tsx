import React, { FC } from "react";
import BgColorComponent from "components/settings/bg-color-component";
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
  const onChangeLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setHead({ ...head, logo: reader.result });
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

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
          {/* It will be used in later features */}
          {/* <div className="flex justify-center">
            <div className="mb-3 w-96">
              <input
                onChange={onChangeLogo}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 file:cursor-pointer"
                type="file"
                id="formFile"
              />
            </div>
          </div> */}
        </aside>
        <div className="flex justify-center">
          <div className="mb-3 mt-5 upload-img">
            <label htmlFor="inputTag" className="image-label">
              Drag and drop a file, or{" "}
              <span className="purple-label">browse</span>
              <input
                onChange={onChangeLogo}
                className="upload-input"
                // className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 file:cursor-pointer"
                type="file"
                id="inputTag"
              />
            </label>
          </div>
          <br />
        </div>
        <div className="flex justify-center">
          <button className="upload-btn mx-2 ">Upload</button>
        </div>
        <div
          id="logo"
          className="mx-3 mb-2 h-48 w-48 text-center mx-4 flex items-center justify-center"
          style={{
            backgroundImage: `url(${head.logo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left",
            backgroundSize: "contain",
          }}
        />
      </div>
    </main>
  );
};

export default DefaultSettings;
