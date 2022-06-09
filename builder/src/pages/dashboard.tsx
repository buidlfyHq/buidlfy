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
  const [showComponent, setShowComponent] = useState<number[]>([]); // for abi method component
  const [openSetting, setOpenSetting] = useState<Boolean>(false); // for handling settings toggle
  const [settingItemId, setSettingItemId] = useState(""); // for storing current element id for settings

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
        />
      </section>

      <RightSidebar
        rightClassName={rightClassName}
        setRightClassName={setRightClassName}
        abi={abi}
        setAbi={setAbi}
        showComponent={showComponent}
        setShowComponent={setShowComponent}
      />

      {/* Settings */}
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

export default Dashboard;
