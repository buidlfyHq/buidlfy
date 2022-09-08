import React, { FC } from "react";
import UtilitiesComponent from "components/settings/utilities-component";
import ColorComponent from "components/settings/color-component";
import BgColorComponent from "components/settings/bg-color-component";
import UploadComponent from "components/settings/upload-component";
import BorderComponent from "components/settings/border-component";
import BorderRadiusComponent from "components/settings/border-radius-component";
import ShadowComponent from "components/settings/shadow-component";
import ISettings from "interfaces/settings";

const ContainerSettings: FC<ISettings> = ({ selectedItem }) => (
  <>
    <h3 className="ml-[1rem]">
      {selectedItem ? (
        <span className="setting-text">{selectedItem.name}</span>
      ) : null}
    </h3>
    <UploadComponent selectedItem={selectedItem} />
    <BgColorComponent selectedItem={selectedItem} />
    <ColorComponent selectedItem={selectedItem} />
    <BorderRadiusComponent selectedItem={selectedItem} />
    <BorderComponent selectedItem={selectedItem} />
    <ShadowComponent selectedItem={selectedItem} />
    <UtilitiesComponent selectedItem={selectedItem} />
  </>
);

export default ContainerSettings;
