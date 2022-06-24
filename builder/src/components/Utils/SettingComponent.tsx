import React, { useEffect, useRef, useState, FC } from "react";
import "../../styles/Dashboard.css";
import { RiText } from "react-icons/ri";
import { AiOutlineLink } from "react-icons/ai";
import "../../styles/Components.css";
import AlignComponent from "./AlignComponent";
import FontStyleComponent from "./FontStyleComponent";
import UtilitiesComponent from "./UtilitiesComponent";
import ColorComponent from "./ColorComponent";
import FontSizeComponent from "./FontSizeComponent";
import AdvanceComponent from "./AdvanceComponent";
import IItems from "interfaces/items";

interface ISettingComponent {
  setSelector: (selector: {
    methodName: string;
    type: string;
    name: string;
  }) => void;
  showComponent: {
    id: string;
    value: { name: string; inputs: object[]; outputs: object[] };
  };
  setShowComponent: (showComponent: { id: string; value: IItems }) => void;
  contractConfig: { abi: string; address: string };
  setContractConfig: (contractConfig: { abi: string; address: string }) => void;
  selectedItem: IItems;
  items: IItems[];
  setItems: (items: IItems[]) => void;
  elementConfig: object;
  selectedElements: object;
  setSelectedElements: (selectedElements: object) => void;
  setElementConfig: (elementConfig: object) => void;
  deleteComponent: number;
  setDeleteComponent: (deleteComponent: number) => void;
  setLeft: (justifyContent: string | boolean) => void;
  setRight: (justifyContent: string | boolean) => void;
  setCenter: (justifyContent: string | boolean) => void;
  justifyContent: string;
  color: any;
  setColor: (color: any) => void;
  fontSize: number;
  setFontSize: (fontSize: number) => void;
  bold: string;
  italic: string;
  underline: string;
  setBold: (bold: string | boolean) => void;
  setItalic: (italic: string | boolean) => void;
  setUnderline: (underline: string | boolean) => void;
  value: string;
  setValue: (value: string) => void;
  link: string;
  setLink: (link: string) => void;
  openTab: number;
  setOpenTab: (openTab: number) => void;
}

const SettingComponent: FC<ISettingComponent> = ({
  link,
  setValue = null,
  setBold = null,
  bold = null,
  italic = null,
  setItalic = null,
  underline = null,
  setUnderline = null,
  color = { r: 0, g: 0, b: 0, a: 100 },
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
  openTab,
  setOpenTab,
}) => {
  const [textVal, setTextVal] = useState<string>("");
  const [linkVal, setLinkVal] = useState<string>("");

  const ref = useRef(null);

  useEffect(() => {
    setTextVal(value || "");
  }, [value]);

  useEffect(() => {
    setLinkVal(link || "");
  }, [link]);

  const handleTextChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleLinkChange = (e: any) => {
    setLinkVal(e.target.value);
  };
  return (
    <>
      <div className="rounded-[8px] py-2 px-4 cursor-pointer relative">
        <div className="sidebar border shadow-sm menu" ref={ref}>
          {selectedItem?.name === "Button" ? (
            <>
              <div className="flex flex-wrap">
                <div className="w-full">
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
                        <i className="fas fa-space-shuttle text-base mr-1"></i>{" "}
                        Setting
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
                        <i className="fas fa-briefcase text-base mr-1"></i>{" "}
                        Contract
                      </a>
                    </li>
                  </ul>
                  <div className="relative flex flex-col min-w-0 break-words">
                    <div className="px-2 py-2 flex-auto">
                      <div className="tab-content tab-space">
                        <div
                          className={openTab === 1 ? "block" : "hidden"}
                          id="link1"
                        >
                          <h3 className="mb-3 ml-8">
                            Component -{" "}
                            {selectedItem ? (
                              <span className="font-bold">
                                {selectedItem.name}
                              </span>
                            ) : null}
                          </h3>

                          <div className="flex items-center px-3 mt-1 text-black">
                            <RiText className="text-[18px] mr-3" />

                            <input
                              value={textVal}
                              onChange={(e) => handleTextChange(e)}
                              className="changeText"
                              type="text"
                              placeholder="Name..."
                            />
                          </div>
                          <div className="flex items-center px-3 mt-2 text-black">
                            <AiOutlineLink className="text-[18px] mr-3" />
                            <input
                              value={linkVal}
                              onChange={(e) => handleLinkChange(e)}
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

                          <FontSizeComponent
                            fontSize={fontSize}
                            setFontSize={setFontSize}
                          />
                          <ColorComponent color={color} setColor={setColor} />

                          <UtilitiesComponent
                            deleteComponent={deleteComponent}
                            setDeleteComponent={setDeleteComponent}
                          />
                        </div>
                        <div
                          className={openTab === 2 ? "block" : "hidden"}
                          id="link3"
                        >
                          <AdvanceComponent
                            contractConfig={contractConfig}
                            setContractConfig={setContractConfig}
                            showComponent={showComponent}
                            setShowComponent={setShowComponent}
                            setSelector={setSelector}
                            elementConfig={elementConfig}
                            selector={undefined}
                            selectedItem={selectedItem}
                            items={items}
                            setItems={setItems}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {" "}
              <h3 className="mb-3 ml-8">
                Component -{" "}
                {selectedItem ? (
                  <span className="font-bold">{selectedItem.name}</span>
                ) : null}
              </h3>
              <div className="flex items-center px-3 mt-1 text-black">
                <RiText className="text-[18px] mr-3" />

                <input
                  value={textVal}
                  onChange={(e) => handleTextChange(e)}
                  className="changeText"
                  type="text"
                  placeholder="Name..."
                />
              </div>
              <div className="flex items-center px-3 mt-2 text-black">
                <AiOutlineLink className="text-[18px] mr-3" />
                <input
                  value={linkVal}
                  onChange={(e) => handleLinkChange(e)}
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
              <FontSizeComponent
                fontSize={fontSize}
                setFontSize={setFontSize}
              />
              <ColorComponent color={color} setColor={setColor} />
              <UtilitiesComponent
                deleteComponent={deleteComponent}
                setDeleteComponent={setDeleteComponent}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SettingComponent;
