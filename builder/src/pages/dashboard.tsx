import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "components/Dashboard/Navbar";
import Sidebar from "components/Dashboard/Sidebar";
import { GiClick } from "react-icons/gi";
import Workspace from "components/Dashboard/Workspace";
import Settings from "components/Utils/Settings";
import IItems from "interfaces/items";

const BACKEND_ADDR = "http://localhost:8000/api"; // backend url
// const CAMPAIGN_CONTRACT_ADDRESS = "0x73ba4B6A58C67C70281C17aC23893b7BD4c8897E";

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState([]);

  // types for items ************************
  const [items, setItems] = useState<IItems[]>([]); // for storing components
  const [className, setClassName] = useState<string>(""); // for handling sidebar toggle
  const [contractConfig, setContractConfig] = useState({
    abi: "",
    address: "",
  }); // for storing contract abi and address
  const [openSetting, setOpenSetting] = useState<boolean>(false); // for handling settings toggle
  const [settingItemId, setSettingItemId] = useState(""); // for storing current element id for settings
  // for selecting an element for contract
  const [selector, setSelector] = useState(null);
  const [openTab, setOpenTab] = useState<number>(1);
  const [elementConfig, setElementConfig] = useState<object>({});

  console.log(items);
  
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
  }, []); // eslint-disable-line

  return (
    <>
      <main className="flex flex-row w-full min-h-screen">
        {/* Sidebar */}
        <Sidebar
          className={className}
          setClassName={setClassName}
          items={items}
          setItems={setItems}
          setSelector={setSelector}
          elementConfig={elementConfig}
        />

        <section className="flex-1">
          {/* Navbar */}
          <Navbar
            className={className}
            setClassName={setClassName}
            items={items}
            contractConfig={contractConfig}
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
            imgData={imgData}
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
            setPicture={setPicture}
            setImgData={setImgData}
            imgData={imgData}
          />
        ) : (
          <main
            className={`fixed right-0 top-16 z-0 w-[250px] border-l h-full`}
          >
            <div className="m-3 border h-24 p-3">
              <GiClick className="mx-20 my-2" />
              Please select an element
            </div>
          </main>
        )}
      </main>
    </>
  );
};

export default Dashboard;
