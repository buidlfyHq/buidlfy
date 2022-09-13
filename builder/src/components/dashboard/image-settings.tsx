import React, { FC } from "react";
import AlignComponent from "components/settings/align-component";
import UtilitiesComponent from "components/settings/utilities-component";
import UploadComponent from "components/settings/upload-component";
import MarginComponent from "components/settings/margin-component";
import ISettings from "interfaces/settings";
import SizeComponent from "components/settings/image-size-component";
import BackgroundSizeComponent from "components/settings/background-size-component";

const ImageSettings: FC<ISettings> = ({
  items,
  setItems,
  selectedItem,
  setDeleteComponent,
  deleteComponent,
  justifyContent,
  setLeft,
  setCenter,
  setRight,
  margin,
  setMarginLeft,
  setMarginRight,
  setMarginTop,
  setMarginBottom,
  width,
  height,
  setWidth,
  setHeight,
  setCover,
  setContain,
  setAuto,
  backgroundSize,
  isAuto,
  setIsAuto,
  dynamicHeight,
  dynamicWidth,
  setDynamicHeight,
  setDynamicWidth,
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
    <AlignComponent
      justifyContent={justifyContent}
      setLeft={setLeft}
      setRight={setRight}
      setCenter={setCenter}
    />

    <SizeComponent
      width={width}
      height={height}
      setWidth={setWidth}
      setHeight={setHeight}
      setCover={setCover}
      setContain={setContain}
      setAuto={setAuto}
      setIsAuto={setIsAuto}
      isAuto={isAuto}
      dynamicWidth={dynamicWidth}
      dynamicHeight={dynamicHeight}
      setDynamicWidth={setDynamicWidth}
      setDynamicHeight={setDynamicHeight}
    />
    <BackgroundSizeComponent
      setCover={setCover}
      setContain={setContain}
      setAuto={setAuto}
      backgroundSize={backgroundSize}
      setIsAuto={setIsAuto}
      isAuto={isAuto}
    />
    <MarginComponent
      setMarginLeft={setMarginLeft}
      setMarginRight={setMarginRight}
      setMarginTop={setMarginTop}
      setMarginBottom={setMarginBottom}
      margin={{ ...margin }}
    />
    {/* <UtilitiesComponent
      deleteComponent={deleteComponent}
      setDeleteComponent={setDeleteComponent}
    /> */}
  </>
);

export default ImageSettings;
