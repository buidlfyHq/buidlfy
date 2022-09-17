import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateWorkspaceElementsArray } from "redux/workspace/workspace.reducers";
import { useWindowSize } from "hooks/use-window-size";
import Navbar from "features/dashboard/navbar";
import Sidebar from "features/dashboard/sidebar";
import SideNavbar from "features/dashboard/side-navbar";
import Workspace from "features/dashboard/workspace";
import Settings from "features/dashboard/settings";

const BACKEND_ADDR = "http://localhost:8000/api"; // backend url
// const CAMPAIGN_CONTRACT_ADDRESS = "0x73ba4B6A58C67C70281C17aC23893b7BD4c8897E";

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const size = useWindowSize();
  const [className, setClassName] = useState<string>(""); // for handling sidebar toggle
  const [openSetting, setOpenSetting] = useState<boolean>(false); // for handling settings toggle
  const [openTab, setOpenTab] = useState<number>(1);
  const [drag, setDrag] = useState<boolean>(true);
  const [isContainerSelected, setIsContainerSelected] =
    useState<boolean>(false);
  const [workspaceBackgroundColor, setWorkspaceBackgroundColor] = useState<string>(
    "rgba(255, 255, 255, 0)"
  );
  const [head, setHead] = useState<{
    title: string;
    logo: string | ArrayBuffer;
  }>({
    title: "",
    logo: "",
  });
  const [sideElement, setSideElement] = useState<string>("");
  const [isNavHidden, setIsNavHidden] = useState<boolean>(true);

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
      dispatch(updateWorkspaceElementsArray(JSON.parse(saveItems)));
    }
  }, []); // eslint-disable-line

  const showSidebar = () => {
    setIsNavHidden(false);
    setOpenSetting(false);
  };
  const hideSidebar = () => {
    setIsNavHidden(true);
    setOpenSetting(true);
  };
  const showSettingSidebar = () => {
    // setIsNavHidden(true);
    setOpenSetting(true);
  };
  const hideSettingSidebar = () => {
    // setIsNavHidden(false);
    setOpenSetting(false);
  };
  
  return (
    <main>
      {size.width > 1024 ? (
        <section className="flex columns-3 flex-row w-full min-h-screen">
          {/* Sidebar */}
          <SideNavbar
            className={className}
            setSideElement={setSideElement}
            showSidebar={showSidebar}
            hideSettingSidebar={hideSettingSidebar}
          />
          <Sidebar
            isContainerSelected={isContainerSelected}
            sideElement={sideElement}
            isNavHidden={isNavHidden}
            setIsNavHidden={setIsNavHidden}
            showSidebar={showSidebar}
            hideSidebar={hideSidebar}
            hideSettingSidebar={hideSettingSidebar}
            workspaceBackgroundColor={workspaceBackgroundColor}
            setWorkspaceBackgroundColor={setWorkspaceBackgroundColor}
            head={head}
            setHead={setHead}
          />

          <section className="flex-1">
            {/* Navbar */}
            <Navbar
              className={className}
              workspaceBackgroundColor={workspaceBackgroundColor}
              head={head}
            />

            {/* Main section */}
            <aside className="flex h-full">
              {/* Workspace */}
              <Workspace
                setOpenSetting={setOpenSetting}
                setOpenTab={setOpenTab}
                drag={drag}
                setDrag={setDrag}
                workspaceBackgroundColor={workspaceBackgroundColor}
                setIsContainerSelected={setIsContainerSelected}
                hideSidebar={hideSidebar}
                showSettingSidebar={showSettingSidebar}
                showSidebar={showSidebar}
                isNavHidden={isNavHidden}
                openSetting={openSetting}
                setIsNavHidden={setIsNavHidden}
                setSideElement={setSideElement}
                hideSettingSidebar={undefined}
              />
              {/* Right Sidebar Settings */}
            </aside>
          </section>
          {openSetting ? (
            <Settings
              openTab={openTab}
              setOpenTab={setOpenTab}
            />
          ) : null}
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
