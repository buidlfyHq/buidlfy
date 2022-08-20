import React, { FC } from "react";
import BgColorComponent from "components/settings/bg-color-component";
import { RiText } from "react-icons/ri";
import IColor from "interfaces/color";

interface IDefaultSettings {
  backgroundColor: IColor;
  setBackgroundColor: (backgroundColor: IColor) => void;
  head: {
    title: string;
    logo: string | ArrayBuffer;
  };
  setHead: (head: { title: string; logo: string | ArrayBuffer }) => void;
}

const DefaultSettings: FC<IDefaultSettings> = ({
  backgroundColor,
  setBackgroundColor,
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
    <main className={`relative right-0 top-[60px] w-[250px] border-l h-full`}>
      <div className="mx-3 my-2">
        <h3 className="mb-2 text-xl">Site Settings</h3>
        <aside className="mb-1">
          <BgColorComponent
            color={backgroundColor}
            setBgColor={setBackgroundColor}
          />
        </aside>

        <aside className="flex items-center mb-3 px-3 text-black">
          <RiText className="text-[18px] mr-3" />
          <input
            value={head.title}
            onChange={(e) => setHead({ ...head, title: e.target.value })}
            className="changeText"
            type="text"
            placeholder="Site Title..."
          />
        </aside>

        <aside className="items-center w-full px-3 py-2 text-gray-600 rounded">
          <div className="px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
            Upload Site Logo
          </div>
          <div className="flex justify-center">
            <div className="mb-3 w-96">
              <input
                onChange={onChangeLogo}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 file:cursor-pointer"
                type="file"
                id="formFile"
              />
            </div>
          </div>
        </aside>

        <div
          id="logo"
          className="mx-3 mb-2 h-48 w-48 flex items-center justify-center"
          style={{
            backgroundImage: `url(${head.logo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left",
            backgroundSize: "cover",
          }}
        />
      </div>
    </main>
  );
};

export default DefaultSettings;
