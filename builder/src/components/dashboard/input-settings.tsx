import React, { FC } from "react";
import UtilitiesComponent from "components/settings/utilities-component";
import ColorComponent from "components/settings/color-component";
import BorderRadiusComponent from "components/settings/border-radius-component";
import ShadowComponent from "components/settings/shadow-component";
import ISettings from "interfaces/settings";

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
}) => (
  <>
    <h3 className="mb-3 ml-8">
      Component -
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

export default InputSettings;