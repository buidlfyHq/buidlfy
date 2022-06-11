import React, { useEffect, useRef, useState } from "react";
import "../../styles/Dashboard.css";
import { RiText } from "react-icons/ri";
import { AiOutlineLink } from "react-icons/ai";
import "../../styles/Components.css";
import AlignComponent from "./AlignComponent";
import FontStyleComponent from "./FontStyleComponent";
import UtilitiesComponent from "./UtilitiesComponent";
import ColorComponent from "./ColorComponent";
import FontSizeComponent from "./FontSizeComponent";

export default function SettingComponent({
  text = null,
  link,
  // open,
  setOpen,
  setValue = null,
  setMenuArr = null,
  id = null,
  menuArr = null,
  setBold = null,
  bold = null,
  italic = null,
  setItalic = null,
  underline = null,
  setUnderline = null,
  color = { r: 0, g: 0, b: 0, a: 100 },
  setColor = null,
  deleteComponent = "0",
  setDeleteComponent = null,
  justifyContent = null,
  setLeft = null,
  setRight = null,
  setCenter = null,
  fontSize = 16,
  setFontSize = null,
  item = {},
  items = [],
  value = "Text",
  setLink = null,
}) {
  const [textVal, setTextVal] = useState<string>(value || "");
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

  const handleTextChange = (e: any, Id: string) => {
    if (value) {
      setTextVal(e.target.value);
      if (Id === null) {
        setValue(e.target.value);
      }
      let obj = console.log(newMenuArr[parseInt(e.target.name)]);
      // setMenuArr([
    }
    // ])
  };

  const handleLinkChange = (e: any, Id: string) => {
    setLinkVal(e.target.value);
  };

  return (
    <>
      <div
        className="rounded-[8px] py-2 px-4 cursor-pointer relative"
        // onClick={() => setOpen(true)}
      >
        {/* {open ? ( */}
        <div className="sidebar border shadow-sm menu" ref={ref}>
          <div className="px-3 my-1 text-xl text-gray-500 font-regular font-normal not-italic mx-4">
            Settings
          </div>
          <div className="flex items-center px-3 mt-1 text-black">
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
          <div className="flex items-center px-3 mt-2 text-black">
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

          <FontStyleComponent
            bold={bold}
            italic={italic}
            underline={underline}
            setBold={setBold}
            setItalic={setItalic}
            setUnderline={setUnderline}
          />

          <AlignComponent
            justifyContent={justifyContent}
            setLeft={setLeft}
            setRight={setRight}
            setCenter={setCenter}
          />

          <FontSizeComponent fontSize={fontSize} setFontSize={setFontSize} />
          <ColorComponent color={color} setColor={setColor} />

          <UtilitiesComponent
            deleteComponent={deleteComponent}
            setDeleteComponent={setDeleteComponent}
          />
        </div>
        {/* ) : null} */}
      </div>
    </>
  );
}
