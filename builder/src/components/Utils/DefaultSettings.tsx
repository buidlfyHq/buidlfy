import React, { FC } from "react";
import { RiText } from "react-icons/ri";
import { AiOutlineLink } from "react-icons/ai";
import AlignComponent from "./AlignComponent";
import FontStyleComponent from "./FontStyleComponent";
import UtilitiesComponent from "./UtilitiesComponent";
import ColorComponent from "./ColorComponent";
import BgColorComponent from "./BgColorComponent";
import FontSizeComponent from "./FontSizeComponent";
import AdvanceComponent from "./AdvanceComponent";
import IItems from "interfaces/items";
import UploadComponent from "./UploadComponent";
import BorderComponent from "./BorderComponent";
import BorderRadiusComponent from "./BorderRadiusComponent";
import ShadowComponent from "./ShadowComponent";
import ConnectSwitchComponent from "./ConnectSwitchComponent";
import ISettings from "interfaces/settings";

const DefaultSettings: FC<ISettings> = ({
  textVal,
  handleTextChange,
  linkVal,
  handleLinkChange,
  items,
  setItems,
  selectedItem,
  setLink,
  link,
  setValue,
  value,
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
  setSelector,
  elementConfig,
  openTab,
  setOpenTab,
  setPicture,
  setImgData,
  imgData,
  borderRadius,
  setBorderRadius,
  borderWidth,
  setBorderWidth,
  setSmall,
  setMedium,
  setLarge,
  shadow,
  setOn,
  connectWallet,
}) => {
  return (
    <>
      {" "}
      <h3 className="mb-3 ml-8">
        Component -{" "}
        {selectedItem ? (
          <span className="font-bold">{selectedItem.name}</span>
        ) : null}
      </h3>
      <div className="flex items-center px-3 mt-1 text-black">
        <RiText className="text-[18px] mr-3" />

        <input
          value={textVal}
          onChange={(e) => handleTextChange(e)}
          className="changeText"
          type="text"
          placeholder="Name..."
        />
      </div>
      <div className="flex items-center px-3 mt-2 text-black">
        <AiOutlineLink className="text-[18px] mr-3" />
        <input
          value={linkVal}
          onChange={(e) => handleLinkChange(e)}
          className="changeText"
          type="text"
          placeholder="URL..."
        />
      </div>
      <FontStyleComponent
        bold={bold}
        italic={italic}
        underline={underline}
        setBold={setBold}
        setItalic={setItalic}
        setUnderline={setUnderline}
      />
      <AlignComponent
        justifyContent={justifyContent}
        setLeft={setLeft}
        setRight={setRight}
        setCenter={setCenter}
      />
      <FontSizeComponent fontSize={fontSize} setFontSize={setFontSize} />
      <ColorComponent
        color={color}
        setColor={setColor}
        selectedItem={selectedItem}
      />
      <BgColorComponent color={backgroundColor} setBgColor={setBgColor} />
      <UtilitiesComponent
        deleteComponent={deleteComponent}
        setDeleteComponent={setDeleteComponent}
      />
    </>
  );
};

export default DefaultSettings;
