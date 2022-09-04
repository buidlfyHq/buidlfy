import React, { FC } from "react";
import { IoMdLink } from "react-icons/io";
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
import ISettings from "interfaces/settings";

const ButtonSettings: FC<ISettings> = ({
  textVal,
  handleTextChange,
  linkVal,
  handleLinkChange,
  items,
  setItems,
  selectedItem,
  setBold,
  bold,
  setItalic,
  italic,
  setUnderline,
  underline,
  setColor,
  color,
  setBgColor,
  backgroundColor,
  setDeleteComponent,
  deleteComponent,
  justifyContent,
  setLeft,
  setCenter,
  setRight,
  fontSize,
  setFontSize,
  contractConfig,
  setContractConfig,
  showComponent,
  setShowComponent,
  selector,
  setSelector,
  elementConfig,
  openTab,
  setOpenTab,
  borderRadius,
  setBorderRadius,
  setSmall,
  setMedium,
  setLarge,
  shadow,
  setOn,
  connectWallet,
  margin,
  setMarginLeft,
  setMarginRight,
  setMarginTop,
  setMarginBottom,
  padding,
  setPaddingLeft,
  setPaddingRight,
  setPaddingBottom,
  setPaddingTop,
}) => {
  const handleToggleTab = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    num: number
  ) => {
    e.preventDefault();
    setOpenTab(num);
    if (num === 1) {
      setSelector(null);
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
          bold={bold}
          italic={italic}
          underline={underline}
          setBold={setBold}
          setItalic={setItalic}
          setUnderline={setUnderline}
          justifyContent={justifyContent}
          setLeft={setLeft}
          setRight={setRight}
          setCenter={setCenter}
        />
        <div className="flex items-center mx-2 mt-1 w-[13.5rem] text-black">
          {/* <RiText className="text-[18px] mr-3" /> */}
          <textarea
            value={textVal}
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
            value={linkVal}
            onChange={(e) => handleLinkChange(e)}
            className="changeText pl-[2.5rem] py-[0.4rem] input-text"
            type="text"
            placeholder="Link"
          />
        </div>
        <ConnectSwitchComponent setOn={setOn} connectWallet={connectWallet} />

        <FontSizeComponent fontSize={fontSize} setFontSize={setFontSize} />
        <BorderRadiusComponent
          borderRadius={borderRadius}
          setBorderRadius={setBorderRadius}
        />
        <ColorComponent
          color={color}
          setColor={setColor}
          selectedItem={selectedItem}
        />

        <BgColorComponent color={backgroundColor} setBgColor={setBgColor} />
        <MarginComponent
          setMarginLeft={setMarginLeft}
          setMarginRight={setMarginRight}
          setMarginTop={setMarginTop}
          setMarginBottom={setMarginBottom}
          margin={{ ...margin }}
        />
        <PaddingComponent
          setPaddingLeft={setPaddingLeft}
          setPaddingRight={setPaddingRight}
          setPaddingTop={setPaddingTop}
          setPaddingBottom={setPaddingBottom}
          padding={{ ...padding }}
        />

        <ShadowComponent
          setSmall={setSmall}
          setMedium={setMedium}
          setLarge={setLarge}
          shadow={shadow}
        />
        <UtilitiesComponent
          deleteComponent={deleteComponent}
          setDeleteComponent={setDeleteComponent}
        />
      </span>
      <div
        style={{ width: "-webkit-fill-available" }}
        className={openTab === 2 ? "block" : "hidden"}
        id="link-two"
      >
        <AdvanceComponent
          contractConfig={contractConfig}
          setContractConfig={setContractConfig}
          showComponent={showComponent}
          setShowComponent={setShowComponent}
          selector={selector}
          setSelector={setSelector}
          elementConfig={elementConfig}
          selectedItem={selectedItem}
          items={items}
          setItems={setItems}
        />
      </div>
      {/* </span>
        </span>
      </span> */}
    </>
  );
};

export default ButtonSettings;
