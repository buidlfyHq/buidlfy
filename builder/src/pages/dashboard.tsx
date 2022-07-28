import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "features/dashboard/navbar";
import Sidebar from "features/dashboard/sidebar";
import Workspace from "features/dashboard/workspace";
import Settings from "features/dashboard/settings";
import BgColorComponent from "components/settings/bg-color-component";
import { useWindowSize } from "hooks/use-window-size";
import IItems from "interfaces/items";
import IColor from "interfaces/color";

const BACKEND_ADDR = "http://localhost:8000/api"; // backend url
// const CAMPAIGN_CONTRACT_ADDRESS = "0x73ba4B6A58C67C70281C17aC23893b7BD4c8897E";

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const size = useWindowSize();
  const [items, setItems] = useState<IItems[]>([]); // for storing components
  const [className, setClassName] = useState<string>(""); // for handling sidebar toggle
  const [contractConfig, setContractConfig] = useState<{
    abi: string;
    address: string;
  }>({
    abi: "",
    address: "",
  }); // for storing contract abi and address
  const [openSetting, setOpenSetting] = useState<boolean>(false); // for handling settings toggle
  const [settingItemId, setSettingItemId] = useState<string>(""); // for storing current element id for settings
  // for selecting an element for contract
  const [selector, setSelector] =
    useState<{
      methodName: string;
      type: string;
      name: string;
      buttonId: string;
    }>(null);
  const [openTab, setOpenTab] = useState<number>(1);
  const [elementConfig, setElementConfig] = useState<object>({});
  const [drag, setDrag] = useState<boolean>(true);
  const [addContainer, setAddContainer] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<IColor>({
    r: "0",
    g: "0",
    b: "0",
  });

  useEffect(() => {
    // Checks if user is authenticated
    const getInformation = async () => {
      const res = await fetch(`${BACKEND_ADDR}/is_authenticated`, {
        credentials: "include",
      });
      const response = await res.text();
      // If not authenticated redirect to sign-in page
      if (JSON.parse(response).error) {
        navigate("/");
      }
    };
    getInformation();

    // checks for stored config
    let saveItems = localStorage.getItem("items");
    if (saveItems) {
      setItems(JSON.parse(saveItems));
    }
  }, []); // eslint-disable-line

  return (
    <main>
      {size.width > 1024 ? (
        <section className="flex flex-row w-full min-h-screen">
          {/* Sidebar */}
          <Sidebar
            className={className}
            setClassName={setClassName}
            items={items}
            setItems={setItems}
            addContainer={addContainer}
            settingItemId={settingItemId}
          />

          <section className="flex-1">
            {/* Navbar */}
            <Navbar
              className={className}
              setClassName={setClassName}
              items={items}
              setItems={setItems}
              setSelector={setSelector}
              contractConfig={contractConfig}
              backgroundColor={backgroundColor}
            />

            {/* Main section */}
            <aside className="flex h-full">
              {/* Workspace */}
              <Workspace
                items={items}
                setItems={setItems}
                className={className}
                setOpenSetting={setOpenSetting}
                setSettingItemId={setSettingItemId}
                selector={selector}
                setSelector={setSelector}
                elementConfig={elementConfig}
                setElementConfig={setElementConfig}
                setOpenTab={setOpenTab}
                drag={drag}
                setDrag={setDrag}
                setAddContainer={setAddContainer}
                backgroundColor={backgroundColor}
              />
              {/* Right Sidebar Settings */}
              {openSetting ? (
                <Settings
                  items={items}
                  setItems={setItems}
                  settingItemId={settingItemId}
                  contractConfig={contractConfig}
                  setContractConfig={setContractConfig}
                  setSelector={setSelector}
                  elementConfig={elementConfig}
                  openTab={openTab}
                  setOpenTab={setOpenTab}
                />
              ) : (
                <main
                  className={`fixed right-0 top-[60px] w-[250px] border-l h-full`}
                >
                  <div className="mx-3 my-2">
                    <h3 className="mb-2 text-xl">Site Settings</h3>
                    <div className="mb-3">
                      <BgColorComponent
                        color={backgroundColor}
                        setBgColor={setBackgroundColor}
                      />
                    </div>
                  </div>
                </main>
              )}
            </aside>
          </section>
        </section>
      ) : (
        <h1 className="items-center text-center justify-center flex h-[100vh]">
          Use this on desktop for better experience <br /> Responsive view
          coming soon!
        </h1>
      )}
    </main>
  );
};

export default Dashboard;
