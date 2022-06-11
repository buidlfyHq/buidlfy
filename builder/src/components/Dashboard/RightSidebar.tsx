import React, { FC, useState } from "react";
import { GiClick } from "react-icons/gi";

import Settings from "components/Utils/Settings";

const RightSidebar: FC = () => {
  const [items, setItems] = useState([]); // for storing components
  const [settingItemId, setSettingItemId] = useState(""); // for storing current element id for settings
  const [openSetting, setOpenSetting] = useState<Boolean>(false); // for handling settings toggle

  return (
    <main className={`fixed right-0 top-16 z-0 w-[250px] border-l h-full`}>
      <div className="m-3 border h-24 p-3">
        <GiClick className="mx-20 my-2" />
        Please select an element
      </div>
      {openSetting && (
        <Settings
          items={items}
          setItems={setItems}
          settingItemId={settingItemId}
          setOpen={setOpenSetting}
        />
      )}
    </main>
  );
};

export default RightSidebar;
