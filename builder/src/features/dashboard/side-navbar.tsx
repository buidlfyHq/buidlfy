import React, { FC } from "react";
import { SidebarEnum } from "redux/workspace/workspace.interfaces";
import elements from "assets/icons/elements.png";
import templates from "assets/icons/templates.png";
import logo from "assets/icons/buidlfy.png";
import "styles/components.css";
import { useDispatch } from "react-redux";
import { toggleModal, toggleModalType } from "redux/modal/modal.reducers";

interface ISideNavbar {
  className: string;
  setSideElement: (sideElement: string) => void;
  showSidebar: () => void;
  hideSettingSidebar: () => void;
}

const SideNavbar: FC<ISideNavbar> = ({
  className,
  setSideElement,
  showSidebar,
  hideSettingSidebar,
}) => {
  const dispatch = useDispatch()

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
        <div
          onClick={() => {
            dispatch(toggleModal(true))
            dispatch(toggleModalType('template'))
          }}
          className="cursor-pointer"
        >
          <div className="side-icon px-3.5 py-4 rounded-full mt-3">
            <img src={templates} alt="Templates" />
          </div>
          <h3 className="side-text mt-1">Templates</h3>
        </div>
        <div
          onClick={() => {
            showSidebar();
            handleSidebar(SidebarEnum.ELEMENTS);
            hideSettingSidebar();
          }}
          className="mt-8 cursor-pointer"
        >
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={elements} alt="Elements" />
          </div>
          <h3 className="side-text mt-1">Elements</h3>
        </div>
        {/* These are commented sidebar elements to be used in future */}
        {/* <div className="mt-8 cursor-pointer">
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={pages} />
          </div>
          <h3 className="side-text mt-1">Pages</h3>
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
            handleSidebar(SidebarEnum.STYLES);
            hideSettingSidebar();
          }}
          className="mt-8 cursor-pointer"
        >
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={styles} alt="Styles" />
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
        </div> */}
      </div>
    </main>
  );
};

export default SideNavbar;
