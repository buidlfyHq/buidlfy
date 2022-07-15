import React from "react";
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

const InputSettings = (
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
) => {
  return (
    <>
      <h3 className="mb-3 ml-8">
        Component -{" "}
        {selectedItem ? (
          <span className="font-bold">{selectedItem.name}</span>
        ) : null}
      </h3>
      <BorderRadiusComponent
        borderRadius={borderRadius}
        setBorderRadius={setBorderRadius}
      />

      <ColorComponent
        color={color}
        setColor={setColor}
        selectedItem={selectedItem}
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
    </>
  );
};

export default InputSettings;
