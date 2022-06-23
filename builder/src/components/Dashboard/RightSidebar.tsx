import React, { FC, useState } from "react";
import { GiClick } from "react-icons/gi";
import Settings from "components/Utils/Settings";

const RightSidebar: FC<{
  rightClassName: string;
  setRightClassName: (className: string) => void;
  contractConfig: { abi: string; address: string };
  setContractConfig: (contractConfig: { abi: string; address: string }) => void;
  setSelector;
  elementConfig;
  setElementConfig;
  openTab;
  setOpenTab;
  selectedElements;
  setSelectedElements;
}> = ({
  rightClassName,
  setRightClassName,
  contractConfig,
  setContractConfig,
  setSelector,
  elementConfig,
  openTab,
  setOpenTab,
  selectedElements,
  setSelectedElements,
  setElementConfig,
}) => {
  const [items, setItems] = useState([]); // for storing components
  const [settingItemId, setSettingItemId] = useState(""); // for storing current element id for settings
  const [openSetting, setOpenSetting] = useState<Boolean>(false); // for handling settings toggle

  // const hideRightSidebar = () => {
  //   setRightClassName("hidden");
  // };

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
            contractConfig={contractConfig}
            setContractConfig={setContractConfig}
            setSelector={setSelector}
            elementConfig={elementConfig}
            openTab={openTab}
            setOpenTab={setOpenTab}
            selectedElements={selectedElements}
            setSelectedElements={setSelectedElements}
            setElementConfig={setElementConfig}
          />
        )}
      </>
    </main>
  );
};

export default RightSidebar;
