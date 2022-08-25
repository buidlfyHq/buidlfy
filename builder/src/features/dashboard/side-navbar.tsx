import React, { FC } from "react";
import ShortUniqueId from "short-unique-id";
import { components } from "config/component";
import { containerCheck } from "utils/container-check";
import IItems from "interfaces/items";
import { ResizeHandles } from "interfaces/handle";
import { Link } from "react-router-dom";
import elements from "assets/elements.png";
import help from "assets/help.png";
import media from "assets/media.png";
import pages from "assets/pages.png";
import setting from "assets/setting.png";
import styles from "assets/styles.png";
import templates from "assets/templates.png";
import "styles/components.css";
import { sidebarEnum } from "pages/dashboard";

interface ISideNavbar {
  className: string;
  setClassName: (className: string) => void;
  items: IItems[];
  setItems: (items: IItems[]) => void;
  addContainer: boolean;
  settingItemId: string;
  sideElement: string;
  setSideElement: (sideElement: string) => void;
  isNavHidden: boolean;
  setIsNavHidden: (isNavHidden: boolean) => void;
  showSidebar;
  hideSidebar;
  hideSettingSidebar;
}

const SideNavbar: FC<ISideNavbar> = ({
  className,
  setClassName,
  items,
  setItems,
  addContainer,
  settingItemId,
  sideElement,
  setSideElement,
  isNavHidden,
  setIsNavHidden,
  hideSidebar,
  showSidebar,
  hideSettingSidebar,
}) => {
  const handleSidebar = (selectedSidebarElements: string) => {
    setSideElement(selectedSidebarElements);
  };

  return (
    <main
      className={`w-[80px] fixed top-0 bottom-0 left-0 border-r ${className}`}
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
        </Popover>
        <div
          onClick={hideSidebar}
          className="m-2 p-2 text-slate-600 text-[18px] hover:bg-slate-100 hover:rounded-md cursor-pointer"
        >
          <AiOutlineDoubleLeft />
        </div>
      </section> */}

      {/* Components */}
      <div className="side-border px-4 py-3">
        <div
          onClick={() => {
            showSidebar(true);
            handleSidebar(sidebarEnum.TEMPLATES);
            hideSettingSidebar();
          }}
          className="cursor-pointer"
        >
          <div className="side-icon px-3.5 py-4 rounded-full mt-3">
            <img src={templates} />
          </div>
          <h3 className="side-text mt-1">Templates</h3>
        </div>
        <div className="mt-8 cursor-pointer">
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={pages} />
          </div>
          <h3 className="side-text mt-1">Pages</h3>
        </div>
        <div
          onClick={() => {
            showSidebar(true);
            handleSidebar(sidebarEnum.ELEMENTS);
            hideSettingSidebar();
          }}
          className="mt-8 cursor-pointer"
        >
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={elements} />
          </div>
          <h3 className="side-text mt-1">Elements</h3>
        </div>
        <div className="mt-8 cursor-pointer">
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={media} />
          </div>
          <h3 className="side-text mt-1">Media</h3>
        </div>
        <div
          onClick={() => {
            showSidebar(true);
            handleSidebar(sidebarEnum.STYLES);
            hideSettingSidebar();
          }}
          className="mt-8 cursor-pointer"
        >
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={styles} />
          </div>
          <h3 className="side-text mt-1">Styles</h3>
        </div>
        <div className="mt-8 cursor-pointer">
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={help} />
          </div>
          <h3 className="side-text mt-1">Help</h3>
        </div>
        <div className="mt-8 cursor-pointer">
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={setting} />
          </div>
          <h3 className="side-text mt-1">Settings</h3>
        </div>
      </div>

      {/* <Link to="/templates" className="hover:text-black">
        <div className="mx-6 px-4 py-3 mt-10 rounded-xl hover:bg-blue-100">
          Templates
        </div>
      </Link> */}
    </main>
  );
};

export default SideNavbar;
