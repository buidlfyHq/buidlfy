import React, { FC } from "react";
import UtilitiesComponent from "./UtilitiesComponent";
import ColorComponent from "./ColorComponent";
import BorderRadiusComponent from "./BorderRadiusComponent";
import ShadowComponent from "./ShadowComponent";
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
  shadow
}) => {
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
