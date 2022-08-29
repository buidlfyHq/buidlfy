import React, { FC } from "react";
import { RiText } from "react-icons/ri";
import { AiOutlineLink } from "react-icons/ai";
import AlignComponent from "components/settings/align-component";
import FontStyleComponent from "components/settings/font-style-component";
import UtilitiesComponent from "components/settings/utilities-component";
import ColorComponent from "components/settings/color-component";
import BgColorComponent from "components/settings/bg-color-component";
import FontSizeComponent from "components/settings/font-size-component";
import ISettings from "interfaces/settings";
import MarginComponent from "components/settings/margin-component";
import PaddingComponent from "components/settings/padding-component";

const GeneralSettings: FC<ISettings> = ({
  selectedItem,
  textVal,
  handleTextChange,
  linkVal,
  handleLinkChange,
  setBold,
  setItalic,
  setUnderline,
  setColor,
  setBgColor,
  setDeleteComponent,
  setLeft,
  setCenter,
  setRight,
  setFontSize,
  setMarginTop,
  setMarginRight,
  setMarginBottom,
  setMarginLeft,
  setPaddingTop,
  setPaddingRight,
  setPaddingBottom,
  setPaddingLeft,
}) => (
  <>
    <h3 className="mb-3 ml-8">
      Component -
      {selectedItem ? (
        <span className="font-bold">{selectedItem.name}</span>
      ) : null}
    </h3>
    <div className="flex items-center px-3 mt-1 text-black">
      <RiText className="text-[18px] mr-3" />
      <textarea
        value={textVal}
        onChange={(e) => handleTextChange(e)}
        className="changeText"
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
      bold={selectedItem?.style?.fontWeight}
      italic={selectedItem?.style?.fontStyle}
      underline={selectedItem?.style?.textDecoration}
      setBold={setBold}
      setItalic={setItalic}
      setUnderline={setUnderline}
    />
    <MarginComponent
      margin={selectedItem?.style?.margin}
      setMarginTop={setMarginTop}
      setMarginRight={setMarginRight}
      setMarginBottom={setMarginBottom}
      setMarginLeft={setMarginLeft}
    />
    <PaddingComponent
      padding={selectedItem?.style?.padding}
      setPaddingTop={setPaddingTop}
      setPaddingRight={setPaddingRight}
      setPaddingBottom={setPaddingBottom}
      setPaddingLeft={setPaddingLeft}
    />
    <AlignComponent
      justifyContent={selectedItem?.style?.justifyContent}
      setLeft={setLeft}
      setRight={setRight}
      setCenter={setCenter}
    />
    <FontSizeComponent
      fontSize={selectedItem?.style?.fontSize}
      setFontSize={setFontSize}
    />
    <ColorComponent
      color={selectedItem?.style?.color}
      setColor={setColor}
      selectedItem={selectedItem}
    />
    <BgColorComponent
      color={selectedItem?.style?.backgroundColor}
      setBgColor={setBgColor}
    />
    <UtilitiesComponent setDeleteComponent={setDeleteComponent} />
  </>
);

export default GeneralSettings;
