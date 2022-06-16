import React, { FC, useState } from "react";
import { GiClick } from "react-icons/gi";

import Settings from "components/Utils/Settings";

const RightSidebar: FC<{
  rightClassName: string;
  setRightClassName: (className: string) => void;
  abi: string;
  setAbi: (abi: string) => void;
  showComponent: any;
  setShowComponent: (showComponent: any) => void;
  setSelector;
  elementConfig;
  setElementConfig;
}> = ({
  rightClassName,
  setRightClassName,
  setSelector,
  elementConfig,
  setElementConfig,
}) => {
  const [items, setItems] = useState([]); // for storing components
  const [settingItemId, setSettingItemId] = useState(""); // for storing current element id for settings
  const [openSetting, setOpenSetting] = useState<Boolean>(false); // for handling settings toggle

  const hideRightSidebar = () => {
    setRightClassName("hidden");
  };

  return (
    <main
      className={`fixed right-0 top-16 z-0 w-[250px] border-l h-full ${rightClassName}`}
    >
      <>
        {/* <section className="flex flex-row justify-between items-center h-[60px]">
       
        <div
          onClick={hideRightSidebar}
          className="m-2 p-2 text-slate-600 text-[18px] hover:bg-slate-100 hover:rounded-md cursor-pointer"
        >
          <AiOutlineDoubleLeft />
        </div>
      </section>  */}
        <div className="m-3 border h-24 p-3">
          <GiClick className="mx-20 my-2" />
          Please select an element
        </div>
        {openSetting && (
          <Settings
            items={items}
            setItems={setItems}
            settingItemId={settingItemId}
            setOpen={setOpenSetting}
            setSelector={setSelector}
            elementConfig={elementConfig}
            setElementConfig={setElementConfig}
          />
        )}
      </>
    </main>
  );
};

export default RightSidebar;
