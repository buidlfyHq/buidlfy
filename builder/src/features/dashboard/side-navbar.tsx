import React, { FC } from "react";
import elements from "assets/elements.svg";
import templates from "assets/templates.svg";
import { SidebarEnum } from "redux/workspace/workspace.interfaces";
import logo from "assets/buidlfy.png";
import "styles/components.css";

interface ISideNavbar {
  setSideElement: (sideElement: string) => void;
  showSidebar: () => void;
  hideSettingSidebar: () => void;
}

const SideNavbar: FC<ISideNavbar> = ({
  setSideElement,
  showSidebar,
  hideSettingSidebar,
}) => {
  const handleSidebar = (selectedSidebarElements: string) => {
    setSideElement(selectedSidebarElements);
  };

  return (
    <main className="w-[80px] sidenav z-[1] fixed top-0 bottom-0 left-0">
      {/* Components */}
      <img
        src={logo}
        className="w-[2.4rem] mx-[1.3rem] my-[0.65rem]"
        alt="logo"
      />
      <div className="side-border px-4 pt-[1rem]">
        <div
          onClick={() => {
            showSidebar();
            handleSidebar(SidebarEnum.TEMPLATES);
            hideSettingSidebar();
          }}
          className="cursor-pointer icon-div"
        >
          <div className="side-icon w-[3.2rem] h-[3.2rem] flex items-center justify-center rounded-full mt-3">
            {/* <img src={templates} alt="Templates" /> */}
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="element-svg"
                d="M15.56 1.55457H3.44196C2.88967 1.55457 2.44196 2.00228 2.44196 2.55457V9.96658C2.44196 10.5189 2.88967 10.9666 3.44196 10.9666H11.7952C12.3475 10.9666 12.7952 10.5189 12.7952 9.96658V8.20178C12.7952 7.64949 13.2429 7.20178 13.7952 7.20178H15.56C16.1123 7.20178 16.56 6.75406 16.56 6.20178V2.55457C16.56 2.00228 16.1123 1.55457 15.56 1.55457Z"
                fill="#A4B3FF"
                fill-opacity="0.07"
                stroke="#70709F"
                stroke-width="1.25"
                stroke-linejoin="round"
              />
              <path
                className="element-svg"
                d="M17.443 7.20172H13.7958C13.2435 7.20172 12.7958 7.64944 12.7958 8.20172V12.7901C12.7958 13.3424 13.2435 13.7901 13.7958 13.7901H17.443C17.9953 13.7901 18.443 13.3424 18.443 12.7901V8.20172C18.443 7.64944 17.9953 7.20172 17.443 7.20172Z"
                fill="#A4B3FF"
                fill-opacity="0.07"
                stroke="#70709F"
                stroke-width="1.25"
                stroke-linejoin="round"
              />
              <path
                className="element-svg"
                d="M1.50177 12.7902V11.9666C1.50177 11.4143 1.94948 10.9666 2.50177 10.9666H11.7962C12.3485 10.9666 12.7962 11.4143 12.7962 11.9666V12.7902C12.7962 13.3425 12.3485 13.7902 11.7962 13.7902H2.50177C1.94949 13.7902 1.50177 13.3425 1.50177 12.7902Z"
                fill="#A4B3FF"
                fill-opacity="0.07"
                stroke="#70709F"
                stroke-width="1.25"
                stroke-linejoin="round"
              />
              <path
                className="element-svg"
                d="M12.7958 15.6136V14.79C12.7958 14.2377 13.2435 13.79 13.7958 13.79H17.443C17.9953 13.79 18.443 14.2377 18.443 14.79V15.6136C18.443 16.1659 17.9953 16.6136 17.443 16.6136H13.7958C13.2435 16.6136 12.7958 16.1659 12.7958 15.6136Z"
                fill="#A4B3FF"
                fill-opacity="0.07"
                stroke="#70709F"
                stroke-width="1.25"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h3 className="side-text mt-1">Templates</h3>
        </div>
        {/* <div className="mt-8 cursor-pointer">
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={pages} />
          </div>
          <h3 className="side-text mt-1">Pages</h3>
        </div> */}
        <div
          onClick={() => {
            showSidebar();
            handleSidebar(SidebarEnum.ELEMENTS);
            hideSettingSidebar();
          }}
          className="mt-8 icon-div cursor-pointer"
        >
          <div className="side-icon w-[3.2rem] h-[3.2rem] flex items-center justify-center rounded-full mt-5">
            {/* <img src={elements} alt="Elements" /> */}
            <svg
              width="20"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="element-svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.0768 13.5713L2.09067 9.3373C0.636444 8.56619 0.636444 6.48276 2.09067 5.71055L10.0768 1.47768C11.2802 0.840773 12.719 0.840773 13.9224 1.47768L21.9086 5.71055C23.3639 6.48276 23.3639 8.56619 21.9086 9.3373L13.8652 13.6274C12.664 14.2654 11.2802 14.2082 10.0768 13.5713Z"
                stroke="#8484AA"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                className="element-svg"
                d="M21.9086 14.6617C23.3639 15.4328 23.3639 17.5184 21.9086 18.2895L13.9224 22.5224C12.719 23.1593 11.2802 23.1593 10.0768 22.5224L2.09067 18.2895C0.636444 17.5184 0.636444 15.4328 2.09067 14.6617"
                stroke="#8484AA"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
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
