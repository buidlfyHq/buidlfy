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
  color,
  setColor = null,
  deleteComponent = 0,
  setDeleteComponent = null,
  justifyContent = null,
  setLeft = null,
  setRight = null,
  setCenter = null,
  fontSize = 16,
  setFontSize = null,
  items,
  setItems,
  selectedItem,
  value,
  setLink = null,
  contractConfig,
  setContractConfig,
  showComponent,
  setShowComponent,
  setSelector,
  elementConfig,
  setElementConfig,
  openTab,
  setOpenTab,
  selectedElements,
  setSelectedElements,
}) {
  const [linkVal, setLinkVal] = useState<string>("");

  const Id: string = id;
  const ref = useRef(null);

  useEffect(() => {
    setLinkVal(link || "");
  }, [link]);

  const handleLinkChange = (e: any, Id: string) => {
    setLinkVal(e.target.value);
  };

  const showTabs = () => (
    <ul
      className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
      role="tablist"
    >
      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
        <a
          className={
            "text-xs font-bold uppercase" +
            (openTab === 1
              ? "text-black bg-" + "-transparent"
              : "text-" + "-black bg-transparent")
          }
          onClick={(e) => {
            e.preventDefault();
            setOpenTab(1);
          }}
          data-toggle="tab"
          href="#link1"
          role="tablist"
        >
          <i className="fas fa-space-shuttle text-base mr-1"></i> Setting
        </a>
      </li>
      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
        <a
          className={
            "text-xs font-bold uppercase" +
            (openTab === 2
              ? "text-black bg-" + "-transparent"
              : "text-" + "-black bg-transparent")
          }
          onClick={(e) => {
            e.preventDefault();
            setOpenTab(2);
          }}
          data-toggle="tab"
          href="#link3"
          role="tablist"
        >
          <i className="fas fa-briefcase text-base mr-1"></i> Contract
        </a>
      </li>
    </ul>
  );

  const renderSections = () => (
    <>
      <h3 className="mb-3 ml-8">
        Component -{" "}
        {selectedItem ? (
          <span className="font-bold">{selectedItem.name}</span>
        ) : null}
      </h3>
      <div className="flex items-center px-3 mt-1 text-black">
        <RiText className="text-[18px] mr-3" />

        <input
          name={Id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
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

  return (
    <main className="rounded-[8px] py-2 px-4 cursor-pointer relative">
      <section className="sidebar border shadow-sm menu" ref={ref}>
        {selectedItem?.name === "Button" ? (
          <>
            <section className="flex flex-wrap">
              <div className="w-full">
                {showTabs()}
                <section className="relative flex flex-col min-w-0 break-words">
                  <section className="px-2 py-2 flex-auto">
                    <div className="tab-content tab-space">
                      <div
                        className={openTab === 1 ? "block" : "hidden"}
                        id="link1"
                      >
                        {renderSections()}
                      </div>
                    </div>
                  </section>
                </section>
              </div>
            </section>
          </>
        ) : (
          <>{renderSections()}</>
        )}
      </section>
    </main>
  );
}
