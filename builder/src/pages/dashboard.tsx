import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "components/Dashboard/Navbar";
import Sidebar from "components/Dashboard/Sidebar";
import Workspace from "components/Dashboard/Workspace";
import Settings from "components/Utils/Settings";
import BgColorComponent from "components/Utils/BgColorComponent";
import { useWindowSize } from "hooks/useWindowSize";
import IItems from "interfaces/items";
import IColor from "interfaces/color";

const BACKEND_ADDR = "http://localhost:8000/api"; // backend url
// const CAMPAIGN_CONTRACT_ADDRESS = "0x73ba4B6A58C67C70281C17aC23893b7BD4c8897E";

const Dashboard: FC = () => {
  const navigate = useNavigate();
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
  const [selector, setSelector] = useState<{
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

  const size = useWindowSize();

  const handleSave = () => {
    if (items?.length > 0) {
      localStorage.setItem("items", JSON.stringify(items));
    }
  };

  const handleClear = () => {
    localStorage.removeItem("items");
    setItems([]);
  };

  return (
    <main>
      <>
        {size.width > 1024 ? (
          <div className="flex flex-row w-full min-h-screen">
            {/* Sidebar */}
            <Sidebar
              className={className}
              setClassName={setClassName}
              items={items}
              setItems={setItems}
              setSelector={setSelector}
              elementConfig={elementConfig}
              addContainer={addContainer}
              settingItemId={settingItemId}
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
            />

            <section className="flex-1">
              {/* Navbar */}
              <Navbar
                className={className}
                setClassName={setClassName}
                items={items}
                contractConfig={contractConfig}
                handleSave={handleSave}
                handleClear={handleClear}
              />

              {/* Main section */}
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
            </section>

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
                className={`fixed right-0 top-[60px] z-0 w-[250px] border-l h-full`}
              >
                <div className="mx-3 my-2">
                  <h3 className="mb-2 text-xl">Site Settings</h3>
                  <div className="mb-3">
                    <BgColorComponent
                      color={backgroundColor}
                      setBgColor={setBackgroundColor}
                      siteSetting={true}
                    />
                  </div>
                </div>
              </main>
            )}
          </div>
        ) : (
          <h1 className="items-center text-center justify-center flex h-[100vh]">
            Use this on desktop for better experience <br /> Responsive view
            coming soon!
          </h1>
        )}
      </>
    </main>
  );
};

export default Dashboard;
