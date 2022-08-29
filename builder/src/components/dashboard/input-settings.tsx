import React, { FC } from "react";
import UtilitiesComponent from "components/settings/utilities-component";
import ColorComponent from "components/settings/color-component";
import BorderRadiusComponent from "components/settings/border-radius-component";
import ShadowComponent from "components/settings/shadow-component";
import ISettings from "interfaces/settings";
import { RiText } from "react-icons/ri";
import MarginComponent from "components/settings/margin-component";

const InputSettings: FC<ISettings> = ({
  selectedItem,
  placeholder,
  handlePlaceholderChange,
  setColor,
  setDeleteComponent,
  setBorderRadius,
  setSmall,
  setMedium,
  setLarge,
  setMarginTop,
  setMarginRight,
  setMarginBottom,
  setMarginLeft,
}) => (
  <>
    <h3 className="mb-3 ml-8">
      Component -
      {selectedItem ? (
        <span className="font-bold">{selectedItem.name}</span>
      ) : null}
    </h3>

    <div className="flex items-center px-3 mt-2 text-black">
      <RiText className="text-[18px] mr-3" />
      <input
        value={placeholder}
        onChange={(e) => handlePlaceholderChange(e)}
        className="changeText"
        type="text"
        placeholder="placeholder text.."
      />
    </div>

    <BorderRadiusComponent
      borderRadius={selectedItem?.style?.borderRadius}
      setBorderRadius={setBorderRadius}
    />
    <MarginComponent
      margin={selectedItem?.style?.margin}
      setMarginLeft={setMarginLeft}
      setMarginRight={setMarginRight}
      setMarginTop={setMarginTop}
      setMarginBottom={setMarginBottom}
    />
    <ColorComponent
      color={selectedItem?.style?.color}
      setColor={setColor}
      selectedItem={selectedItem}
    />
    <ShadowComponent
      setSmall={setSmall}
      setMedium={setMedium}
      setLarge={setLarge}
      shadow={selectedItem?.style?.shadow}
    />
    <UtilitiesComponent setDeleteComponent={setDeleteComponent} />
  </>
);

export default InputSettings;
