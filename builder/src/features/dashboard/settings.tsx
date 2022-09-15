import React, { useRef, FC } from "react";
import { useSelector } from "react-redux";
import SettingComponent from "components/utils/render-setting";
import IItems from "interfaces/items";
import ISettings from "interfaces/settings";

const Settings: FC<ISettings> = ({
  settingItemId,
  elementConfig,
  openTab,
  setOpenTab,
}) => {
  const ref = useRef(null);
  const items: IItems[] = useSelector((state: any) => state.items);

  const selectedChildren = items.map((item) =>
    item.children?.find((child: IItems) => child.i === settingItemId)
  );

  const selectedItem =
    items?.find((item) => item.i === settingItemId) ||
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
