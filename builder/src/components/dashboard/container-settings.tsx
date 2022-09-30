import React, { FC } from "react";
import { useSelector } from "react-redux";
import ColorComponent from "components/settings/color-component";
import BgColorComponent from "components/settings/bg-color-component";
import UploadComponent from "components/settings/upload-component";
import BorderComponent from "components/settings/border-component";
import BorderRadiusComponent from "components/settings/border-radius-component";
import ShadowComponent from "components/settings/shadow-component";
import { IRootState } from "redux/root-state.interface";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";
import PaddingComponent from "components/settings/padding-component";

const ContainerSettings: FC = () => {
  const selectedElement: IWorkspaceElement = useSelector(
    (state: IRootState) => state.workspace.selectedElement
  );

  return (
    <>
      <h3 className="ml-[0.7rem]">
        {selectedElement ? (
          <span className="setting-text">{selectedElement.name}</span>
        ) : null}
      </h3>
      <UploadComponent i={selectedElement.i} />
      <BgColorComponent
        i={selectedElement.i}
        elementBackgroundColor={selectedElement.style.backgroundColor}
      />
      <ColorComponent
        i={selectedElement.i}
        color={selectedElement.style.color}
      />
      <BorderRadiusComponent
        i={selectedElement.i}
        borderRadius={selectedElement.style.borderRadius}
        borderColor={selectedElement.style.color}
      />
      <BorderComponent
        i={selectedElement.i}
        borderWidth={selectedElement.style.borderWidth}
      />
      <PaddingComponent
        i={selectedElement.i}
        padding={selectedElement.style.padding}
        name={selectedElement.name}
      />
      <ShadowComponent
        i={selectedElement.i}
        shadow={selectedElement.style.shadow}
      />
    </>
  );
};

export default ContainerSettings;
