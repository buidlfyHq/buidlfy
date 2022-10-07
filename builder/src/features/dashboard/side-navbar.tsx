import React, { FC } from "react";
import { SidebarEnum } from "redux/workspace/workspace.interfaces";
import elements from "assets/icons/elements.png";
import templates from "assets/icons/templates.png";
import logo from "assets/icons/buidlfy.png";
import "styles/components.css";

interface ISideNavbar {
  className: string;
  setSideElement: (sideElement: string) => void;
  showSidebar;
  hideSettingSidebar;
}

const SideNavbar: FC<ISideNavbar> = ({
  className,
  setSideElement,
  showSidebar,
  hideSettingSidebar,
}) => {
  const handleSidebar = (selectedSidebarElements: string) => {
    setSideElement(selectedSidebarElements);
  };

  return (
    <main
      className={`w-[80px] sidenav z-[100] fixed top-0 bottom-0 left-0 ${className}`}
    >
      {/* Components */}
      <img src={logo} className="w-[2.4rem] mx-[1.3rem] my-[0.65rem]" />
      <div className="side-border px-4 pt-[1rem]">
        {/* <div className="mt-8 cursor-pointer">
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={pages} />
          </div>
          <h3 className="side-text mt-1">Pages</h3>
        </div> */}
        <div
          onClick={() => {
            showSidebar(true);
            handleSidebar(SidebarEnum.ELEMENTS);
            hideSettingSidebar();
          }}
          className="cursor-pointer"
        >
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={elements} alt="Elements" />
          </div>
          <h3 className="side-text mt-1">Elements</h3>
        </div>
        {/* <div className="mt-8 cursor-pointer">
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={media} />
          </div>
          <h3 className="side-text mt-1">Media</h3>
        </div> */}
        {/* <div
          onClick={() => {
            showSidebar(true);
            handleSidebar(SidebarEnum.STYLES);
            hideSettingSidebar();
          }}
          className="mt-8 cursor-pointer"
        >
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={styles} alt="Styles" />
          </div>
          <h3 className="side-text mt-1">Styles</h3>
        </div> */}
        {/* <div className="mt-8 cursor-pointer">
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
        </div> */}
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
