import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "components/Dashboard/Navbar";
import Sidebar from "components/Dashboard/Sidebar";
import RightSidebar from "components/Dashboard/RightSidebar";
import Workspace from "components/Dashboard/Workspace";
import Settings from "components/Utils/Settings";

const BACKEND_ADDR = "http://localhost:8000/api"; // backend url

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]); // for storing components
  const [className, setClassName] = useState<string>(""); // for handling sidebar toggle
  const [rightClassName, setRightClassName] = useState<string>(""); // for handling sidebar toggle
  const [abi, setAbi] = useState<string>(""); // for storing abi
  const [showComponent, setShowComponent] = useState<any>(null); // for abi method component
  const [openSetting, setOpenSetting] = useState<Boolean>(false); // for handling settings toggle
  const [settingItemId, setSettingItemId] = useState(""); // for storing current element id for settings
  // for selecting an element for contract
  const [selector, setSelector] = useState(false);
  const [elementConfig, setElementConfig] = useState([
    { name: "Hover over an element", id: "", show: false },
  ]);
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
    <main className="flex flex-row w-full min-h-screen">
      {/* Sidebar */}
      <Sidebar
        className={className}
        setClassName={setClassName}
        items={items}
        setItems={setItems}
        abi={abi}
        setAbi={setAbi}
        showComponent={showComponent}
        setShowComponent={setShowComponent}
        setSelector={setSelector}
        elementConfig={elementConfig}
      />

      <section className="flex-1">
        {/* Navbar */}
        <Navbar className={className} setClassName={setClassName} />

        {/* Main section */}
        <Workspace
          abi={abi}
          showComponent={showComponent}
          setShowComponent={setShowComponent}
          items={items}
          setItems={setItems}
          className={className}
          setOpenSetting={setOpenSetting}
          setSettingItemId={setSettingItemId}
          selector={selector}
          setSelector={setSelector}
          setElementConfig={setElementConfig}
        />
      </section>

      <RightSidebar
        rightClassName={rightClassName}
        setRightClassName={setRightClassName}
        abi={abi}
        setAbi={setAbi}
        showComponent={showComponent}
        setShowComponent={setShowComponent}
        setSelector={setSelector}
        elementConfig={elementConfig}
        setElementConfig={setElementConfig}
      />

      {/* Settings */}
      {openSetting && (
        <Settings
          items={items}
          setItems={setItems}
          settingItemId={settingItemId}
          setOpen={setOpenSetting}
          setSelector={setSelector}
          elementConfig={elementConfig}
          setElementConfig={setElementConfig}
        />
      )}
    </main>
  );
};

export default Dashboard;
