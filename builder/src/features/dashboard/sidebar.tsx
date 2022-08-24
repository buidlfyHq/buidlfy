import React, { FC, useState, useRef, useEffect } from "react";
import ShortUniqueId from "short-unique-id";
import { components } from "config/component";
import { containerCheck } from "utils/container-check";
import IItems from "interfaces/items";
import { ResizeHandles } from "interfaces/handle";
import { Link } from "react-router-dom";
import Elements from "./elements";
import Template from "pages/templates";
import "styles/components.css";
import { AiOutlineLeft } from "react-icons/ai";
import { sidebarEnum } from "pages/dashboard";
import DefaultSettings from "features/dashboard/default-settings";
import IColor from "interfaces/color";

interface ISidebar {
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
  backgroundColor: IColor;
  setBackgroundColor: (backgroundColor: IColor) => void;
  head: {
    title: string;
    logo: string | ArrayBuffer;
  };
  setHead: (head: { title: string; logo: string | ArrayBuffer }) => void;
}

const Sidebar: FC<ISidebar> = ({
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
  backgroundColor,
  setBackgroundColor,
  head,
  setHead,
}) => {
  // const [indexValue, setIndexValue] = useState<number>(0);
  // const ref = useRef<HTMLDivElement>();

  // useEffect(() => {
  //   // FIX: find a suitable type for this event
  //   const handleOutsideClick = (event) => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       setIsNavHidden(false);
  //     }
  //   };
  //   console.log(isNavHidden, "NAV");
  //   document.addEventListener("click", handleOutsideClick);
  //   return () => document.removeEventListener("click", handleOutsideClick);
  // }, [ref]);
  const ref = useRef(null);

  return (
    <main
      ref={ref}
      className={`sidebar overflow-scroll inherit left-[80px] bottom-0 top-[30px] w-[280px] pb-8 border-r ${
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
      <div className="flex justify-end absolute">
        <div
          onClick={() => {
            hideSidebar();
            hideSettingSidebar();
          }}
          className="mt-[6.25rem] ml-[16.5rem] px-2.5 py-2.5 bg-white rounded-full w-10 shadow-lg relative z-[100]"
        >
          <AiOutlineLeft className="text-[18px] mr-3 text-[#8350F0] font-black" />
        </div>
      </div>
      {/* Components */}
      {sideElement == sidebarEnum.ELEMENTS ? (
        <Elements
          className={className}
          setClassName={setClassName}
          items={items}
          setItems={setItems}
          addContainer={addContainer}
          settingItemId={settingItemId}
        />
      ) : null}
      {sideElement == sidebarEnum.TEMPLATES ? (
        <Template setItems={setItems} />
      ) : null}
      {sideElement == sidebarEnum.STYLES ? (
        <DefaultSettings
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          head={head}
          setHead={setHead}
        />
      ) : null}
    </main>
  );
};

export default Sidebar;
