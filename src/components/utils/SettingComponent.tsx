import React, { useEffect, useRef, useState } from "react";
import "../../styles/Dashboard.css";
import { RiText } from "react-icons/ri";
import { AiOutlineLink, AiOutlineDelete } from "react-icons/ai";
import { VscSymbolColor } from "react-icons/vsc";

export default function SettingComponent({
  classname,
  text,
  link,
  setBrandName = null,
  setMenuArr = null,
  id = null,
  menuArr = null,
}) {
  const [open, setOpen] = useState<Boolean>(false);
  const [textVal, setTextVal] = useState<string>(text || "");
  const [linkVal, setLinkVal] = useState<string>(link || "");
  const [newMenuArr, setNewMenuArr] = useState<Object[]>(menuArr);
  const Id: string = id;
  const ref = useRef(null);

  useEffect(() => {
    let handler = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {}, [setTextVal]);

  const deleteMenu = (e: any, Id: string) => {
    console.log(Id);

    // console.log(2)
    // setOpen(false)
  };

  const handleTextChange = (e: any, Id: string) => {
    setTextVal(e.target.value);
    if (Id === null) {
      setBrandName(e.target.value);
    }
    console.log(newMenuArr);
    let obj = console.log(newMenuArr[parseInt(e.target.name)]);

    // setMenuArr([

    // ])
  };

  const handleLinkChange = (e: any, Id: string) => {
    setLinkVal(e.target.value);
  };

  return (
    <>
      <div
        className={`${classname} rounded-[8px] hover:bg-[#f5efef] py-2 px-4 cursor-pointer relative`}
        onClick={() => setOpen(true)}
      >
        {text}
        {open ? (
          <div className="border shadow-sm menu" ref={ref}>
            <div className="px-3 my-1 text-gray-500">Settings</div>
            <div className="flex items-center px-3 mt-1">
              <RiText className="text-[18px] mr-3" />
              <input
                name={Id}
                value={textVal}
                onChange={(e) => handleTextChange(e, Id)}
                className="changeText"
                type="text"
                placeholder="Name.."
              />
            </div>
            <div className="flex items-center px-3 mt-2">
              <AiOutlineLink className="text-[18px] mr-3" />
              <input
                name={Id}
                value={linkVal}
                onChange={(e) => handleLinkChange(e, Id)}
                className="changeText"
                type="text"
                placeholder="URL..."
              />
            </div>
            <div className="h-[1px] w-full bg-gray-200 mt-3 mb-1"></div>
            <div
              className="flex items-center w-full px-3 py-2 text-gray-600 rounded cursor-pointer hover:bg-slate-100"
              onClick={(e) => deleteMenu(e, Id)}
            >
              <AiOutlineDelete className="text-[18px] mr-3" />
              <span>Delete</span>
            </div>
            <div className="flex items-center w-full px-3 py-2 text-gray-600 cursor-pointer hover:bg-slate-100">
              <VscSymbolColor className="text-[18px] mr-3" />
              <span>Text Color</span>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
