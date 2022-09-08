import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateItems } from "reducers/itemsReducer";
import Navbar from "features/dashboard/navbar";
import Sidebar from "features/dashboard/sidebar";
import SideNavbar from "features/dashboard/side-navbar";
import Workspace from "features/dashboard/workspace";
import Settings from "features/dashboard/settings";
import { useWindowSize } from "hooks/use-window-size";
import IColor from "interfaces/color";

const BACKEND_ADDR = "http://localhost:8000/api"; // backend url
// const CAMPAIGN_CONTRACT_ADDRESS = "0x73ba4B6A58C67C70281C17aC23893b7BD4c8897E";

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const size = useWindowSize();
  const [className, setClassName] = useState<string>(""); // for handling sidebar toggle
  const [openSetting, setOpenSetting] = useState<boolean>(false); // for handling settings toggle
  const [settingItemId, setSettingItemId] = useState<string>(""); // for storing current element id for settings
  const [openTab, setOpenTab] = useState<number>(1);
  const [elementConfig, setElementConfig] = useState<object>({});
  const [drag, setDrag] = useState<boolean>(true);
  const [addContainer, setAddContainer] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<IColor>({
    r: "0",
    g: "0",
    b: "0",
  });
  const [head, setHead] = useState<{
    title: string;
    logo: string | ArrayBuffer;
  }>({
    title: "",
    logo: "",
  });
  const [sideElement, setSideElement] = useState<string>("");

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
      dispatch(updateItems(JSON.parse(saveItems)));
    }
  }, []); // eslint-disable-line

  const [isNavHidden, setIsNavHidden] = useState<boolean>(true);
  // const [isSettingHidden, setIsSettingHidden] = useState<boolean>(false);

  const showSidebar = () => {
    setIsNavHidden(false);
    setOpenSetting(true);
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
            className={className}
            setClassName={setClassName}
            addContainer={addContainer}
            settingItemId={settingItemId}
            sideElement={sideElement}
            setSideElement={setSideElement}
            isNavHidden={isNavHidden}
            setIsNavHidden={setIsNavHidden}
            showSidebar={showSidebar}
            hideSidebar={hideSidebar}
            hideSettingSidebar={hideSettingSidebar}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            head={head}
            setHead={setHead}
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
              head={head}
            />

            {/* Main section */}
            <aside className="flex h-full">
              {/* Workspace */}
              <Workspace
                className={className}
                setOpenSetting={setOpenSetting}
                setSettingItemId={setSettingItemId}
                elementConfig={elementConfig}
                setElementConfig={setElementConfig}
                setOpenTab={setOpenTab}
                drag={drag}
                setDrag={setDrag}
                setAddContainer={setAddContainer}
                backgroundColor={backgroundColor}
                hideSidebar={hideSidebar}
                showSettingSidebar={showSettingSidebar}
                showSidebar={showSidebar}
                isNavHidden={isNavHidden}
                openSetting={openSetting}
                setIsNavHidden={setIsNavHidden}
              />
              {/* Right Sidebar Settings */}
            </aside>
          </section>
          {/* {isSettingHidden ? (
            <> */}
          {openSetting ? (
            <Settings
              setOpenSetting={setOpenSetting}
              settingItemId={settingItemId}
              elementConfig={elementConfig}
              openTab={openTab}
              setOpenTab={setOpenTab}
            />
          ) : null}
          {/* </>
          ) : null} */}
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
