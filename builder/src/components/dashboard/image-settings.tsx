import React, { FC } from "react";
import { useSelector } from "react-redux";
import AlignComponent from "components/settings/align-component";
import UploadComponent from "components/settings/upload-component";
import MarginComponent from "components/settings/margin-component";
import SizeComponent from "components/settings/image-size-component";
import BackgroundSizeComponent from "components/settings/background-size-component";
import { IRootState } from "redux/root-state.interface";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";

const ImageSettings: FC = () => {
  const selectedElement: IWorkspaceElement = useSelector(
    (state: IRootState) => state.workspace.selectedElement
  );

  return (
    <>
      <h3 className="ml-[0.5rem] mt-[1.5rem]">
        {selectedElement ? (
          <span className="setting-text">{selectedElement.name}</span>
        ) : null}
      </h3>
      <UploadComponent i={selectedElement.i} />
      <AlignComponent
        i={selectedElement.i}
        justifyContent={selectedElement.style.justifyContent}
      />
      <SizeComponent
        i={selectedElement.i}
        width={selectedElement.style?.width}
        height={selectedElement.style?.height}
      />
      <BackgroundSizeComponent
        i={selectedElement.i}
        backgroundSize={selectedElement.style?.backgroundSize}
      />
      <MarginComponent
        i={selectedElement.i}
        margin={selectedElement.style.margin}
      />
    </>
  );
};

export default ImageSettings;
