import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdLink } from "react-icons/io";
import { setSelectorToDefault } from "redux/contract/contract.reducers";
import ColorComponent from "components/settings/color-component";
import BorderColorComponent from "components/settings/border-color-component";
import BgColorComponent from "components/settings/bg-color-component";
import FontSizeComponent from "components/settings/font-size-component";
import AdvanceComponent from "components/settings/advance-component";
import BorderRadiusComponent from "components/settings/border-radius-component";
import ShadowComponent from "components/settings/shadow-component";
import ConnectSwitchComponent from "components/settings/connect-switch-component";
import MarginComponent from "components/settings/margin-component";
import PaddingComponent from "components/settings/padding-component";
import CombinedComponent from "components/settings/combined-setting";
import { IRootState } from "redux/root-state.interface";
import {
  ISettings,
  IWorkspaceElement,
} from "redux/workspace/workspace.interfaces";
import "styles/dashboard.css";

const ButtonSettings: FC<ISettings> = ({
  handleSettingChange,
  openTab,
  setOpenTab,
}) => {
  const dispatch = useDispatch();
  const selectedElement: IWorkspaceElement = useSelector(
    (state: IRootState) => state.workspace.selectedElement
  );

  const handleToggleTab = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    tab: number
  ) => {
    e.preventDefault();

    setOpenTab(tab);
    if (tab === 1) {
      dispatch(setSelectorToDefault());
    }
  };

  return (
    <>
      <span className="flex tab mb-[0.5rem]">
        <span
          className={`w-[8rem] pb-[0.8rem] ${
            openTab === 1 ? "tab-active" : "tab-heading"
          }`}
          onClick={(e) => handleToggleTab(e, 1)}
        >
          Setting
        </span>
        <span
          className={`w-[8rem] pb-[0.8rem] ${
            openTab === 2 ? "tab-active" : "tab-heading"
          }`}
          onClick={(e) => handleToggleTab(e, 2)}
        >
          Contract
        </span>
      </span>
      <span className={openTab === 1 ? "block" : "hidden"} id="link-one">
        <h3 className="ml-[0.5rem] mt-[4.5rem]">
          {selectedElement ? (
            <span className="setting-text ">{selectedElement.name}</span>
          ) : null}
        </h3>
        <CombinedComponent
          i={selectedElement.i}
          fontWeight={selectedElement.style.fontWeight}
          fontStyle={selectedElement.style.fontStyle}
          textDecoration={selectedElement.style.textDecoration}
          justifyContent={selectedElement.style.justifyContent}
        />
        <div className="flex items-center mx-2 mt-1 w-[13.5rem] text-black">
          <textarea
            value={selectedElement.value}
            onChange={(e) => handleSettingChange(e, "value")}
            className="changeText input-text h-[6rem] pl-[0.5rem] pt-[0.5rem]"
            placeholder="Please write your text here..."
          />
        </div>
        <div className="flex items-center mt-4 mx-2  w-[13.5rem] text-black">
          <div className="link-div px-1 py-1">
            <IoMdLink className="text-[18px]" />
          </div>
          <input
            value={selectedElement.link}
            onChange={(e) => handleSettingChange(e, "link")}
            className="changeText pl-[2.5rem] py-[0.4rem] input-text"
            type="text"
            placeholder="Link"
          />
        </div>
        <ConnectSwitchComponent
          i={selectedElement.i}
          connectWallet={selectedElement.connectWallet}
        />
        <FontSizeComponent
          i={selectedElement.i}
          fontSize={selectedElement.style.fontSize}
        />
        <BorderRadiusComponent
          i={selectedElement.i}
          borderRadius={selectedElement.style.borderRadius}
        />
        <ColorComponent
          i={selectedElement.i}
          color={selectedElement.style.color}
        />
        <BorderColorComponent
          i={selectedElement.i}
          borderColor={selectedElement.style.borderColor}
        />
        <BgColorComponent
          i={selectedElement.i}
          elementBackgroundColor={selectedElement.style.backgroundColor}
        />
        <MarginComponent
          i={selectedElement.i}
          margin={selectedElement.style.margin}
        />
        <PaddingComponent
          i={selectedElement.i}
          padding={selectedElement.style.padding}
        />
        <ShadowComponent
          i={selectedElement.i}
          shadow={selectedElement.style.shadow}
        />
      </span>
      <div className={openTab === 2 ? "block" : "hidden"} id="link-two">
        <AdvanceComponent selectedElement={selectedElement} />
      </div>
    </>
  );
};

export default ButtonSettings;
