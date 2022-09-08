import React, { FC } from "react";
import AlignComponent from "components/settings/align-component";
import UtilitiesComponent from "components/settings/utilities-component";
import UploadComponent from "components/settings/upload-component";
import ISettings from "interfaces/settings";
import MarginComponent from "components/settings/margin-component";

const ImageSettings: FC<ISettings> = ({ selectedItem }) => (
  <>
    <h3 className="ml-[1rem]">
      {selectedItem ? (
        <span className="setting-text">{selectedItem.name}</span>
      ) : null}
    </h3>
    <UploadComponent selectedItem={selectedItem} />
    <AlignComponent selectedItem={selectedItem} />
    <MarginComponent selectedItem={selectedItem} />
    <UtilitiesComponent selectedItem={selectedItem} />
  </>
);

export default ImageSettings;
