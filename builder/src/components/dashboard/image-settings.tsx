import React, { FC } from "react";
import AlignComponent from "components/settings/align-component";
import UploadComponent from "components/settings/upload-component";
import MarginComponent from "components/settings/margin-component";
import SizeComponent from "components/settings/image-size-component";
import BackgroundSizeComponent from "components/settings/background-size-component";
import ISettings from "interfaces/settings";

const ImageSettings: FC<ISettings> = ({ selectedItem }) => (
  <>
    <h3 className="ml-[1rem]">
      {selectedItem ? (
        <span className="setting-text">{selectedItem.name}</span>
      ) : null}
    </h3>
    <UploadComponent i={selectedItem.i} />
    <AlignComponent
      i={selectedItem.i}
      justifyContent={selectedItem.style?.justifyContent}
    />

    <SizeComponent
      i={selectedItem.i}
      width={selectedItem.style?.width}
      height={selectedItem.style?.height}
    />
    <BackgroundSizeComponent
      i={selectedItem.i}
      backgroundSize={selectedItem.style?.backgroundSize}
    />
    <MarginComponent i={selectedItem.i} margin={selectedItem.style?.margin} />
  </>
);

export default ImageSettings;
