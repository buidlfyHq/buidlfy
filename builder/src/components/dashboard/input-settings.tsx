import React, { FC } from "react";
import UtilitiesComponent from "components/settings/utilities-component";
import ColorComponent from "components/settings/color-component";
import BorderRadiusComponent from "components/settings/border-radius-component";
import ShadowComponent from "components/settings/shadow-component";
import MarginComponent from "components/settings/margin-component";
import ISettings from "interfaces/settings";
import "styles/components.css";

const InputSettings: FC<ISettings> = ({
  selectedItem,
  setColor,
  color,
  setDeleteComponent,
  deleteComponent,
  borderRadius,
  setBorderRadius,
  setSmall,
  setMedium,
  setLarge,
  shadow,
  placeholder,
  handlePlaceholderChange,
  margin,
  setMarginLeft,
  setMarginRight,
  setMarginTop,
  setMarginBottom,
}) => (
  <>
    <h3 className="ml-[1rem]">
      {selectedItem ? (
        <span className="setting-text">{selectedItem.name}</span>
      ) : null}
    </h3>

    <div className="flex items-center mx-2 mt-1 w-[13.5rem] text-black">
      {/* <RiText className="text-[18px] mr-3" /> */}
      <textarea
        value={placeholder}
        onChange={(e) => handlePlaceholderChange(e)}
        className="changeText input-text h-[6rem] pl-[0.5rem] pt-[0.5rem]"
        placeholder="Please write your text here..."
      />
    </div>

    <BorderRadiusComponent
      borderRadius={borderRadius}
      setBorderRadius={setBorderRadius}
    />
    <MarginComponent
      setMarginLeft={setMarginLeft}
      setMarginRight={setMarginRight}
      setMarginTop={setMarginTop}
      setMarginBottom={setMarginBottom}
      margin={{ ...margin }}
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
    {/* <UtilitiesComponent
      deleteComponent={deleteComponent}
      setDeleteComponent={setDeleteComponent}
    /> */}
  </>
);

export default InputSettings;
