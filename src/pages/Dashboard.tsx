import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import Workspace from "../components/dashboard/Workspace";
import Settings from "../components/utils/Settings";

const BACKEND_ADDR = "http://localhost:8000/api"; // backend url

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]); // for storing components
  const [className, setClassName] = useState<string>(""); // for handling sidebar toggle
  const [abi, setAbi] = useState<string>(""); // for storing abi
  const [showComponent, setShowComponent] = useState<number[]>([]); // for abi method component

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
        />
      </section>
      <Settings items={items} setItems={setItems} />
    </main>
  );
};

export default Dashboard;
