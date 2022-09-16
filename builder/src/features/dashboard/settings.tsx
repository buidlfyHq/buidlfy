import React, { useRef, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { updateItems } from "reducers/itemsReducer";
import SettingComponent from "components/utils/render-setting";
import IItems from "interfaces/items";
import ISettings from "interfaces/settings";
import "styles/components.css";

const Settings: FC<ISettings> = ({
  settingItemId,
  elementConfig,
  openTab,
  setOpenTab,
}) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const items: IItems[] = useSelector((state: any) => state.items);

  const selectedChildren = items.map((item) =>
    item.children?.find((child: IItems) => child.i === settingItemId)
  );

  const selectedItem =
    items?.find((item) => item.i === settingItemId) ||
    selectedChildren.filter(Boolean)[0];

  const handleDelete = () => {
    dispatch(
      updateItems({
        level: 1,
        settingItemId: selectedItem.i,
        propertyName: "deleteComponent",
        propertyValue: true,
      })
    );
  };

  return (
    <>
      {settingItemId ? (
        <>
          <div className="rounded-[8px] py-2 cursor-pointer overflow-y-scroll fixed top-0 right-0 bottom-0">
            <div
              className="border shadow-sm overflow-x-hidden mt-[40px] sidebar menu"
              ref={ref}
            >
              <div className="delete-div flex py-2 pl-3">
                <div
                  onClick={handleDelete}
                  className="flex delete-btn px-2 py-[0.1rem]"
                >
                  <span className="flex text-[12px]">
                    Remove
                    <MdOutlineDeleteOutline className="text-[12px]  mt-1 ml-1" />
                  </span>
                </div>
                {/* It will be used in next update */}
                {/* <div className="flex delete-btn px-2 py-[0.1rem] ml-2">
                  <span className="flex text-[12px]">
                    Reset
                    <GrPowerReset className="text-[12px] mt-1 ml-1" />
                  </span>
                </div> */}
              </div>

              <div style={{ marginTop: "3rem" }}>
                <SettingComponent
                  selectedItem={selectedItem}
                  elementConfig={elementConfig}
                  openTab={openTab}
                  setOpenTab={setOpenTab}
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Settings;
