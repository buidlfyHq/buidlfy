import React, { FC } from "react";
import UtilitiesComponent from "components/settings/utilities-component";
import ColorComponent from "components/settings/color-component";
import BgColorComponent from "components/settings/bg-color-component";
import UploadComponent from "components/settings/upload-component";
import BorderComponent from "components/settings/border-component";
import BorderRadiusComponent from "components/settings/border-radius-component";
import ShadowComponent from "components/settings/shadow-component";
import ISettings from "interfaces/settings";
import ColumnNumberComponent from "components/settings/columns-setting";

const ContainerSettings: FC<ISettings> = ({
  selectedItem,
  items,
  setItems,
  setColor,
  setBgColor,
  setDeleteComponent,
  setBorderRadius,
  setBorderWidth,
  setSmall,
  setMedium,
  setLarge,
  columns,
  setColumnNumber,
}) => (
  <>
    <h3 className="mb-3 ml-8">
      Component -
      {selectedItem ? (
        <span className="font-bold">{selectedItem.name}</span>
      ) : null}
    </h3>
    {columns && <ColumnNumberComponent 
      columns={columns}
      setColumnNumber={setColumnNumber}
    />}
    <UploadComponent
      selectedItem={selectedItem}
      items={items}
      setItems={setItems}
    />
    <BgColorComponent color={selectedItem?.style?.backgroundColor} setBgColor={setBgColor} />
    <ColorComponent
      color={selectedItem?.style?.color}
      setColor={setColor}
      selectedItem={selectedItem}
    />
    <BorderRadiusComponent
      borderRadius={selectedItem?.style?.borderRadius}
      setBorderRadius={setBorderRadius}
    />
    <BorderComponent
      borderWidth={selectedItem?.style?.borderWidth}
      setBorderWidth={setBorderWidth}
    />
    <ShadowComponent
      setSmall={setSmall}
      setMedium={setMedium}
      setLarge={setLarge}
      shadow={selectedItem?.style?.shadow}
    />
    <UtilitiesComponent
      deleteComponent={selectedItem?.style?.deleteComponent}
      setDeleteComponent={setDeleteComponent}
    />
  </>
);

export default ContainerSettings;
