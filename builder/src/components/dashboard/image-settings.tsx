import React, { FC } from "react";
import AlignComponent from "components/settings/align-component";
import UtilitiesComponent from "components/settings/utilities-component";
import UploadComponent from "components/settings/upload-component";
import ISettings from "interfaces/settings";
import MarginComponent from "components/settings/margin-component";

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
    <MarginComponent
      setMarginLeft={setMarginLeft}
      setMarginRight={setMarginRight}
      setMarginTop={setMarginTop}
      setMarginBottom={setMarginBottom}
      margin={{ ...margin }}
    />
    <UtilitiesComponent
      deleteComponent={deleteComponent}
      setDeleteComponent={setDeleteComponent}
    />
  </>
);

export default ImageSettings;
