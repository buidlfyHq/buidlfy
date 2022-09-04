import React, { FC } from "react";
import UtilitiesComponent from "components/settings/utilities-component";
import ColorComponent from "components/settings/color-component";
import BgColorComponent from "components/settings/bg-color-component";
import UploadComponent from "components/settings/upload-component";
import BorderComponent from "components/settings/border-component";
import BorderRadiusComponent from "components/settings/border-radius-component";
import ShadowComponent from "components/settings/shadow-component";
import ISettings from "interfaces/settings";
import PaddingComponent from "components/settings/padding-component";

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
  borderRadius,
  setBorderRadius,
  borderWidth,
  setBorderWidth,
  setSmall,
  setMedium,
  setLarge,
  shadow,
  padding,
  setPaddingLeft,
  setPaddingRight,
  setPaddingBottom,
  setPaddingTop,
}) => (
  <>
    <h3 className="ml-[1rem]">
      {selectedItem ? (
        <span className="setting-text">{selectedItem.name}</span>
      ) : null}
    </h3>
    <UploadComponent
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
  </>
);

export default ContainerSettings;
