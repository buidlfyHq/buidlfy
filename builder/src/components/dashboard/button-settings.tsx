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
  const selectedItem: IWorkspaceElement = useSelector(
    (state: IRootState) => state.workspace.selectedElement
  );

  const handleToggleTab = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    num: number
  ) => {
    e.preventDefault();
    setOpenTab(num);
    if (num === 1) {
      dispatch(setSelectorToDefault());
    }
  };

  return (
    <>
      <span className="flex tab mb-[0.5rem]">
        <span
          className="tab-one w-[8rem] pb-[0.8rem]"
          onClick={(e) => handleToggleTab(e, 1)}
        >
          Setting
        </span>
        <span
          className="tab-two w-[8rem] pb-[0.8rem]"
          onClick={(e) => handleToggleTab(e, 2)}
        >
          Contract
        </span>
      </span>
      <span className={openTab === 1 ? "block" : "hidden"} id="link-one">
        <h3 className="ml-[0.5rem] mt-[3rem]">
          {selectedItem ? (
            <span className="setting-text ">{selectedItem.name}</span>
          ) : null}
        </h3>
        <CombinedComponent
          i={selectedItem.i}
          fontWeight={selectedItem.style.fontWeight}
          fontStyle={selectedItem.style.fontStyle}
          textDecoration={selectedItem.style.textDecoration}
          justifyContent={selectedItem.style.justifyContent}
        />
        <div className="flex items-center mx-2 mt-1 w-[13.5rem] text-black">
          {/* <RiText className="text-[18px] mr-3" /> */}
          <textarea
            value={selectedItem.value}
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
            value={selectedItem.link}
            onChange={(e) => handleSettingChange(e, "link")}
            className="changeText pl-[2.5rem] py-[0.4rem] input-text"
            type="text"
            placeholder="Link"
          />
        </div>
        <ConnectSwitchComponent
          i={selectedItem.i}
          connectWallet={selectedItem.connectWallet}
        />
        <FontSizeComponent
          i={selectedItem.i}
          fontSize={selectedItem.style.fontSize}
        />
        <BorderRadiusComponent
          i={selectedItem.i}
          borderRadius={selectedItem.style.borderRadius}
        />
        <ColorComponent i={selectedItem.i} color={selectedItem.style.color} />
        <BorderColorComponent
          i={selectedItem.i}
          borderColor={selectedItem.style.borderColor}
        />
        <BgColorComponent
          i={selectedItem.i}
          elementBackgroundColor={selectedItem.style.backgroundColor}
        />
        <MarginComponent
          i={selectedItem.i}
          margin={selectedItem.style.margin}
        />
        <PaddingComponent
          i={selectedItem.i}
          padding={selectedItem.style.padding}
        />
        <ShadowComponent
          i={selectedItem.i}
          shadow={selectedItem.style.shadow}
        />
      </span>
      <div className={openTab === 2 ? "block" : "hidden"} id="link-two">
        <AdvanceComponent selectedItem={selectedItem} />
      </div>
    </>
  );
};

export default ButtonSettings;
