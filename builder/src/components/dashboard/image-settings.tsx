import React, { FC } from "react";
import AlignComponent from "components/settings/align-component";
import UtilitiesComponent from "components/settings/utilities-component";
import UploadComponent from "components/settings/upload-component";
import ISettings from "interfaces/settings";

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
}) => (
  <>
    <h3 className="mb-3 ml-8">
      Component -
      {selectedItem ? (
        <span className="font-bold">{selectedItem.name}</span>
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
    <UtilitiesComponent
      deleteComponent={deleteComponent}
      setDeleteComponent={setDeleteComponent}
    />
  </>
);

export default ImageSettings;
