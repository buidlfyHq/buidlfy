import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { IoMdLink } from "react-icons/io";
import { updateSelector } from "reducers/selectorReducer";
import UtilitiesComponent from "components/settings/utilities-component";
import ColorComponent from "components/settings/color-component";
import BgColorComponent from "components/settings/bg-color-component";
import FontSizeComponent from "components/settings/font-size-component";
import AdvanceComponent from "components/settings/advance-component";
import BorderRadiusComponent from "components/settings/border-radius-component";
import ShadowComponent from "components/settings/shadow-component";
import ConnectSwitchComponent from "components/settings/connect-switch-component";
import MarginComponent from "components/settings/margin-component";
import PaddingComponent from "components/settings/padding-component";
import CombinedComponent from "components/settings/combined-setting";
import { containerCheck } from "utils/container-check";
import ISettings from "interfaces/settings";

const ButtonSettings: FC<ISettings> = ({
  handleTextChange,
  handleLinkChange,
  selectedItem,
  elementConfig,
  openTab,
  setOpenTab,
}) => {
  const dispatch = useDispatch();

  const handleToggleTab = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    num: number
  ) => {
    e.preventDefault();
    setOpenTab(num);
    if (num === 1) {
      dispatch(updateSelector(null));
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
      {/* <ul
          className="flex flex-row flex-wrap px-[-4px] pb-2 mb-0 list-none border-b-2"
          role="tablist"
        >
          <li className="flex-auto mr-2 -mb-px last:mr-0">
            <a
              className="text-xs font-bold text-black uppercase bg-transparent"
              onClick={(e) => handleToggleTab(e, 1)}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              <i className="mr-1 text-base fas fa-space-shuttle"></i>
              Setting
            </a>
          </li>
          <li className="flex-auto mr-2 -mb-px last:mr-0">
            <a
              className="text-xs font-bold text-black uppercase bg-transparent"
              onClick={(e) => handleToggleTab(e, 2)}
              data-toggle="tab"
              href="#link3"
              role="tablist"
            >
              <i className="mr-1 text-base fas fa-briefcase"></i> Contract
            </a>
          </li>
        </ul> */}
      {/* <span className="relative flex flex-col mt-[2.5rem] break-words">
        <span className="flex-auto py-2">
          <span className="tab-content tab-space"> */}
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
            value={selectedItem?.value}
            onChange={(e) => handleTextChange(e)}
            className="changeText input-text h-[6rem] pl-[0.5rem] pt-[0.5rem]"
            placeholder="Please write your text here..."
          />
        </div>
        <div className="flex items-center mt-4 mx-2  w-[13.5rem] text-black">
          <div className="link-div px-1 py-1">
            <IoMdLink className="text-[18px]" />
          </div>
          <input
            value={selectedItem?.link}
            onChange={(e) => handleLinkChange(e)}
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
        <ColorComponent
          i={selectedItem.i}
          color={selectedItem.style.color}
          isContainer={containerCheck(selectedItem)}
        />
        <BgColorComponent
          i={selectedItem.i}
          bgColor={selectedItem.style.backgroundColor}
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
        <UtilitiesComponent i={selectedItem.i} />
      </span>
      <div className={openTab === 2 ? "block" : "hidden"} id="link-two">
        <AdvanceComponent
          elementConfig={elementConfig}
          selectedItem={selectedItem}
        />
      </div>
      {/* </span>
        </span>
      </span> */}
    </>
  );
};

export default ButtonSettings;
