import React, { useState, useRef, FC } from "react";
import { useSelector } from "react-redux";
import SettingComponent from "components/utils/render-setting";
import ISettings from "interfaces/settings";
import IWorkspace from "interfaces/workspace";

const Settings: FC<ISettings> = ({
  settingItemId,
  elementConfig,
  openTab,
  setOpenTab,
}) => {
  const ref = useRef(null);
  const workspace: IWorkspace[] = useSelector((state: any) => state.workspace);

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

  // work in progress
  const selectedChildren = workspace.map((item) =>
    item.children?.find((child) => child.i === settingItemId)
  );

  const selectedItem =
    workspace?.find((item) => item.i === settingItemId) ||
    selectedChildren.filter(Boolean)[0];

  return (
    <>
      {settingItemId ? (
        <>
          <div className="rounded-[8px] py-2 cursor-pointer overflow-y-scroll fixed top-0 right-0 bottom-0">
            <div
              className="border shadow-sm overflow-x-hidden mt-[40px] sidebar menu"
              ref={ref}
            >
              <SettingComponent
                selectedItem={selectedItem}
                setShowComponent={setShowComponent}
                showComponent={showComponent}
                elementConfig={elementConfig}
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
