import React, { FC, useRef } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import Template from "pages/templates";
import Elements from "features/dashboard/elements";
import DefaultSettings from "features/dashboard/default-settings";
import { SidebarEnum } from "redux/workspace/workspace.interfaces";
import "styles/components.css";

interface ISidebar {
  isContainerSelected: boolean;
  sideElement: string;
  isNavHidden: boolean;
  setIsNavHidden: (isNavHidden: boolean) => void;
  showSidebar;
  hideSidebar;
  hideSettingSidebar;
  workspaceBackgroundColor: string;
  setWorkspaceBackgroundColor: (backgroundColor: string) => void;
  head: {
    title: string;
    logo: string | ArrayBuffer;
  };
  setHead: (head: { title: string; logo: string | ArrayBuffer }) => void;
}

const Sidebar: FC<ISidebar> = ({
  isContainerSelected,
  sideElement,
  isNavHidden,
  setIsNavHidden,
  hideSidebar,
  showSidebar,
  hideSettingSidebar,
  workspaceBackgroundColor,
  setWorkspaceBackgroundColor,
  head,
  setHead,
}) => {
  const ref = useRef(null);

  return (
    <main
      ref={ref}
      className={`sidebar ease-in-out duration-200 transition fixed left-[80px] overflow-scroll shadow-xl bottom-0 top-[60px] w-[320px]  z-100 ${
        isNavHidden ? "hidden" : ""
      }`}
    >
      {/* user name */}
      {/* It will be used for a later code */}
      {/* <section className="flex flex-row justify-between items-center h-[60px]">
        <Popover className="relative p-3 bg-white">
          <Popover.Button>
            <span className="bg-blue-300 mr-2 rounded-[50%] p-1">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            User Name
          </Popover.Button>

          <Popover.Panel className="absolute bg-white z-10 mt-5 rounded-md shadow-sm border w-[225px] p-2">
            <div className="flex flex-row items-center justify-start">
              <span className="bg-blue-300 mr-2 rounded-[50%] p-3">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <div className="flex flex-col">
                <div>User Name</div>
                <div>xyz.spheron.com</div>
              </div>
            </div>
            <hr className="my-2" />
            <div>
              <div>All Sites</div>
              <div>Create a new Site</div>
            </div>
            <hr className="my-2" />
            <div>Logout</div>
          </Popover.Panel>
        </Popover> */}
      {/* <div>
        <div
          onClick={hideSidebar}
          className="mt-10 border shadow-lg p-4 rounded-full text-slate-600 text-[18px] hover:bg-slate-100 hover:rounded-md cursor-pointer"
        >
          <AiOutlineDoubleLeft />
        </div>
      </div> */}
      {/* </section> */}
      {/* <div className="flex justify-end absolute">
        <div
          onClick={() => {
            hideSidebar();
            hideSettingSidebar();
          }}
          className="mt-[4.25rem] ml-[16.5rem] px-2.5 py-2.5 bg-white rounded-full w-10 shadow-lg fixed left-[70px] z-[100]"
        >
          <AiOutlineLeft className="text-[18px] mr-3 text-[#8350F0] font-black" />
        </div>
      </div> */}
      {/* Components */}
      {sideElement === SidebarEnum.ELEMENTS ? (
        <Elements
          hideSidebar={hideSidebar}
          isContainerSelected={isContainerSelected}
          hideSettingSidebar={hideSettingSidebar}
        />
      ) : null}
      {sideElement === SidebarEnum.TEMPLATES ? <Template /> : null}
      {sideElement === SidebarEnum.STYLES ? (
        <DefaultSettings
          workspaceBackgroundColor={workspaceBackgroundColor}
          setWorkspaceBackgroundColor={setWorkspaceBackgroundColor}
          head={head}
          setHead={setHead}
        />
      ) : null}
    </main>
  );
};

export default Sidebar;
