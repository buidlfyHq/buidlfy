import React, { useState, useRef, FC } from "react";
import { useSelector } from "react-redux";
import SettingComponent from "components/utils/render-setting";
import { IRootState } from "redux/root-state.interface";
import { ISettings, IWorkspaceElements } from "redux/workspace/workspace.interfaces";

const Settings: FC<ISettings> = ({ openTab, setOpenTab }) => {
  const ref = useRef(null);
  const selectedItem: IWorkspaceElements = useSelector(
    (state: IRootState) => state.workspace.selectedElement
  );

  const [showComponent, setShowComponent] =
    useState<{
      id: string;
      value: {
        name: string;
        inputs: object[];
        outputs: object[];
        stateMutability: string;
      };
    }>(null); // for abi method component

  return (
    <>
      {selectedItem.i ? (
        <>
          <div className="rounded-[8px] py-2 cursor-pointer overflow-y-scroll fixed top-0 right-0 bottom-0">
            <div
              className="border shadow-sm overflow-x-hidden mt-[40px] sidebar menu"
              ref={ref}
            >
              <SettingComponent
                setShowComponent={setShowComponent}
                showComponent={showComponent}
                openTab={openTab}
                setOpenTab={setOpenTab}
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Settings;
