import React, { FC } from "react";
import { useSelector } from "react-redux";
import AlignComponent from "components/settings/align-component";
import UtilitiesComponent from "components/settings/utilities-component";
import UploadComponent from "components/settings/upload-component";
import MarginComponent from "components/settings/margin-component";
import { IWorkspaceElements } from "redux/workspace/workspace.interfaces";

const ImageSettings: FC = () => {
  const selectedItem: IWorkspaceElements = useSelector(
    (state: any) => state.workspace.selectedElement
  );

  return (
    <>
      <h3 className="ml-[1rem]">
        {selectedItem ? (
          <span className="setting-text">{selectedItem.name}</span>
        ) : null}
      </h3>
      <UploadComponent i={selectedItem.i} />
      <AlignComponent
        i={selectedItem.i}
        justifyContent={selectedItem.style.justifyContent}
      />
      <MarginComponent i={selectedItem.i} margin={selectedItem.style.margin} />
      <UtilitiesComponent i={selectedItem.i} />
    </>
  );
};

export default ImageSettings;
