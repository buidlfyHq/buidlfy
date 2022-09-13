import React, { FC } from "react";
import AlignComponent from "components/settings/align-component";
import UtilitiesComponent from "components/settings/utilities-component";
import UploadComponent from "components/settings/upload-component";
import MarginComponent from "components/settings/margin-component";
import ISettings from "interfaces/settings";

const ImageSettings: FC<ISettings> = ({
  selectedItem,
  items,
  setItems,
  setDeleteComponent,
  setLeft,
  setCenter,
  setRight,
  setMarginTop,
  setMarginRight,
  setMarginBottom,
  setMarginLeft,
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
      justifyContent={selectedItem?.style?.justifyContent}
      setLeft={setLeft}
      setRight={setRight}
      setCenter={setCenter}
    />
    <MarginComponent
      margin={selectedItem?.style?.margin}
      setMarginTop={setMarginTop}
      setMarginRight={setMarginRight}
      setMarginBottom={setMarginBottom}
      setMarginLeft={setMarginLeft}
    />
    <UtilitiesComponent
      deleteComponent={selectedItem?.style?.deleteComponent}
      setDeleteComponent={setDeleteComponent}
    />
  </>
);

export default ImageSettings;
