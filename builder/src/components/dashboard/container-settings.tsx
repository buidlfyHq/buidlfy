import React, { FC } from "react";
import UtilitiesComponent from "components/settings/utilities-component";
import ColorComponent from "components/settings/color-component";
import BgColorComponent from "components/settings/bg-color-component";
import UploadComponent from "components/settings/upload-component";
import BorderComponent from "components/settings/border-component";
import BorderRadiusComponent from "components/settings/border-radius-component";
import ShadowComponent from "components/settings/shadow-component";
import { containerCheck } from "utils/container-check";
import ISettings from "interfaces/settings";

const ContainerSettings: FC<ISettings> = ({ selectedItem }) => (
  <>
    <h3 className="ml-[1rem]">
      {selectedItem ? (
        <span className="setting-text">{selectedItem.name}</span>
      ) : null}
    </h3>
    <UploadComponent i={selectedItem.i} />
    <BgColorComponent
      i={selectedItem.i}
      elementBackgroundColor={selectedItem.style.backgroundColor}
    />
    <ColorComponent
      i={selectedItem.i}
      color={selectedItem.style.color}
      isContainer={containerCheck(selectedItem)}
    />
    <BorderRadiusComponent
      i={selectedItem.i}
      borderRadius={selectedItem.style.borderRadius}
    />
    <BorderComponent
      i={selectedItem.i}
      borderWidth={selectedItem.style.borderWidth}
    />
    <ShadowComponent i={selectedItem.i} shadow={selectedItem.style.shadow} />
    <UtilitiesComponent i={selectedItem.i} />
  </>
);

export default ContainerSettings;
