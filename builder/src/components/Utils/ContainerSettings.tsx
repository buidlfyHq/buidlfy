import React, { FC } from "react";
import UtilitiesComponent from "./UtilitiesComponent";
import ColorComponent from "./ColorComponent";
import BgColorComponent from "./BgColorComponent";
import UploadComponent from "./UploadComponent";
import BorderComponent from "./BorderComponent";
import BorderRadiusComponent from "./BorderRadiusComponent";
import ShadowComponent from "./ShadowComponent";
import ISettings from "interfaces/settings";

const ContainerSettings: FC<ISettings> = ({
  items,
  setItems,
  selectedItem,
  setColor,
  color,
  setBgColor,
  backgroundColor,
  setDeleteComponent,
  deleteComponent,
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
}) => {
  return (
    <>
      <h3 className="mb-3 ml-8">
        Component -{" "}
        {selectedItem ? (
          <span className="font-bold">{selectedItem.name}</span>
        ) : null}
      </h3>
      <UploadComponent
        setPicture={setPicture}
        setImgData={setImgData}
        imgData={imgData}
        selectedItem={selectedItem}
        items={items}
        setItems={setItems}
      />
      <BgColorComponent color={backgroundColor} setBgColor={setBgColor} />
      <ColorComponent
        color={color}
        setColor={setColor}
        selectedItem={selectedItem}
      />
      <BorderRadiusComponent
        borderRadius={borderRadius}
        setBorderRadius={setBorderRadius}
      />
      <BorderComponent
        borderWidth={borderWidth}
        setBorderWidth={setBorderWidth}
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

export default ContainerSettings;