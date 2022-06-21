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

export default function SettingContent({
  text = null,
  link,
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
  items,
  value,
  setLink = null,
  abi,
  setAbi,
  showComponent,
  setShowComponent,
  setSelector,
  elementConfig,
  setElementConfig,
  openTab,
  setOpenTab,
}) {
  const [textVal, setTextVal] = useState<string>("");
  const [linkVal, setLinkVal] = useState<string>("");
  // const [openTab, setOpenTab] = React.useState(1);
  const [isOpen, setIsOpen] = useState(false); // for connect contract modal

  const Id: string = id;
  const ref = useRef(null);

  useEffect(() => {
    setTextVal(value || "");
  }, [value]);

  useEffect(() => {
    setLinkVal(link || "");
  }, [link]);

  const handleTextChange = (e: any, Id: string) => {
    setTextVal(e.target.value);
    if (Id === null) {
      setValue(e.target.value);
    }
  };

  const handleLinkChange = (e: any, Id: string) => {
    setLinkVal(e.target.value);
  };
  return (
    <>
      {" "}
      <h3 className="mb-3 ml-8">
        Component -{" "}
        {items ? <span className="font-bold">{items.name}</span> : null}
      </h3>
      <div className="flex items-center px-3 mt-1 text-black">
        <RiText className="text-[18px] mr-3" />

        <input
          name={Id}
          value={textVal}
          onChange={(e) => handleTextChange(e, Id)}
          className="changeText"
          type="text"
          placeholder="Name..."
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
    </>
  );
}
