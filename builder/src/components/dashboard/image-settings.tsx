import React, { FC } from "react";
import AlignComponent from "components/settings/align-component";
import UtilitiesComponent from "components/settings/utilities-component";
import UploadComponent from "components/settings/upload-component";
import ISettings from "interfaces/settings";
import MarginComponent from "components/settings/margin-component";

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
    <UtilitiesComponent setDeleteComponent={setDeleteComponent} />
  </>
);

export default ImageSettings;
