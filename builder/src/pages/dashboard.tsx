import React, { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateWorkspaceElementsArray } from "redux/workspace/workspace.reducers";
import { useWindowSize } from "hooks/use-window-size";
import Navbar from "features/dashboard/navbar";
import Sidebar from "features/dashboard/sidebar";
import SideNavbar from "features/dashboard/side-navbar";
import Workspace from "features/dashboard/workspace";
import Settings from "features/dashboard/settings";
import StartModal from "components/custom-components/modals/start-modal";
import TemplateModal from "components/custom-components/modals/template-modal";
import SingleTemplateDetails from "components/custom-components/modals/single-template-details";
import FinalModal from "components/custom-components/modals/final-modal";
import DefaultSettings from "features/dashboard/default-settings";
import "styles/components.css";
import SelectWallet from "components/custom-components/modals/select-wallet";
import CheckoutModal from "components/custom-components/modals/checkout-modal";

// const CAMPAIGN_CONTRACT_ADDRESS = "0x73ba4B6A58C67C70281C17aC23893b7BD4c8897E";

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const size = useWindowSize();
  const [className, setClassName] = useState<string>(""); // for handling sidebar toggle
  const [openSetting, setOpenSetting] = useState<boolean>(false); // for handling settings toggle
  const [openTab, setOpenTab] = useState<number>(1);
  const [drag, setDrag] = useState<boolean>(true);
  const [isContainerSelected, setIsContainerSelected] =
    useState<boolean>(false);
  const [workspaceBackgroundColor, setWorkspaceBackgroundColor] =
    useState<string>("rgba(255, 255, 255, 1)");
  const [head, setHead] = useState<{
    title: string;
    logo: string | ArrayBuffer;
  }>({
    title: "",
    logo: "",
  });
  const [sideElement, setSideElement] = useState<string>("");
  const [isNavHidden, setIsNavHidden] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenTemplate, setIsOpenTemplate] = useState(false)
  const [isOpenSingleTemplate, setIsOpenSingleTemplate] = useState(false)
  const [isOpenSelectWallet, setIsOpenSelectWallet] = useState(false)
  const [isOpenCheckout, setIsOpenCheckout] = useState(false)
  const [isOpenFinalTemplate, setIsOpenFinalTemplate] = useState(false)

  useEffect(() => {
    setIsOpen(true)
    // storeFiles(makeFileObjects());
  }, []);

  const handleStartFromTemplate = () => {
    setIsOpen(false)
    setIsOpenTemplate(true)
  }
  const handleStartFromScratch = () => {
    setIsOpen(false)
  }

  useEffect(() => {
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
        <section className="flex flex-row w-full min-h-screen columns-3">
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
          <div className="rounded-[8px] py-2 cursor-pointer overflow-y-scroll fixed top-0 right-0 bottom-0">
            {openSetting ? (
              <Settings
                setOpenSetting={setOpenSetting}
                openTab={openTab}
                setOpenTab={setOpenTab}
              />
            ) : (
              <DefaultSettings
                workspaceBackgroundColor={workspaceBackgroundColor}
                setWorkspaceBackgroundColor={setWorkspaceBackgroundColor}
                head={head}
                setHead={setHead}
              />
            )}
          </div>
        </section>
      ) : (
        <h1 className="items-center text-center justify-center flex h-[100vh]">
          Use this on desktop for better experience <br /> Responsive view
          coming soon!
        </h1>
      )}

      {/* Dailogs for template */}
      <StartModal 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        handleStartFromTemplate={handleStartFromTemplate} 
        handleStartFromScratch={handleStartFromScratch}
      />
      <TemplateModal 
        isOpenTemplate={isOpenTemplate}
        setIsOpenTemplate={setIsOpenTemplate}
        setIsOpenSingleTemplate={setIsOpenSingleTemplate}
      />
      <SingleTemplateDetails
        isOpenSingleTemplate={isOpenSingleTemplate}
        setIsOpenSingleTemplate={setIsOpenSingleTemplate} 
        setIsOpenSelectWallet={setIsOpenSelectWallet}
      />
      <SelectWallet 
        isOpenSelectWallet={isOpenSelectWallet}
        setIsOpenSelectWallet={setIsOpenSelectWallet}
        setIsOpenCheckout={setIsOpenCheckout}
      />
      <CheckoutModal 
        isOpenCheckout={isOpenCheckout}
        setIsOpenCheckout={setIsOpenCheckout}
        setIsOpenFinalTemplate={setIsOpenFinalTemplate}
      />
      <FinalModal
        isOpenFinalTemplate={isOpenFinalTemplate}
        setIsOpenFinalTemplate={setIsOpenFinalTemplate}
      />
    </main>
  );
};

export default Dashboard;
