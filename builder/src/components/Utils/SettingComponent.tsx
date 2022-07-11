import React, { useEffect, useRef, useState, FC } from "react";
import { RiText } from "react-icons/ri";
import { AiOutlineLink } from "react-icons/ai";
import AlignComponent from "./AlignComponent";
import FontStyleComponent from "./FontStyleComponent";
import UtilitiesComponent from "./UtilitiesComponent";
import ColorComponent from "./ColorComponent";
import BgColorComponent from "./BgColorComponent";
import FontSizeComponent from "./FontSizeComponent";
import AdvanceComponent from "./AdvanceComponent";
import IItems from "interfaces/items";
import UploadComponent from "./UploadComponent";
import BorderComponent from "./BorderComponent";
import BorderRadiusComponent from "./BorderRadiusComponent";
import ShadowComponent from "./ShadowComponent";
import ConnectSwitchComponent from "./ConnectSwitchComponent";
import "../../styles/Components.css";
import "../../styles/Dashboard.css";

interface ISettingComponent {
  items: IItems[];
  setItems: (items: IItems[]) => void;
  selectedItem: IItems;
  setLink: (link: string) => void;
  link: string;
  setValue: (value: string) => void;
  value: string;
  setBold: (bold: string | boolean) => void;
  bold: string;
  setItalic: (italic: string | boolean) => void;
  italic: string;
  setUnderline: (underline: string | boolean) => void;
  underline: string;
  setColor: (color: any) => void;
  color: any;
  setBgColor: (backgroundColor: any) => void;
  backgroundColor: any;
  setDeleteComponent: (deleteComponent: number) => void;
  deleteComponent: number;
  justifyContent: string;
  setLeft: (justifyContent: string | boolean) => void;
  setCenter: (justifyContent: string | boolean) => void;
  setRight: (justifyContent: string | boolean) => void;
  setFontSize: (fontSize: number) => void;
  fontSize: number;
  setContractConfig: (contractConfig: { abi: string; address: string }) => void;
  contractConfig: { abi: string; address: string };
  setShowComponent: (showComponent: { id: string; value: IItems }) => void;
  showComponent: {
    id: string;
    value: {
      name: string;
      inputs: object[];
      outputs: object[];
      stateMutability: string;
    };
  };
  setSelector: (selector: {
    methodName: string;
    type: string;
    name: string;
  }) => void;
  elementConfig: object;
  openTab: number;
  setOpenTab: (openTab: number) => void;
  setPicture: (picture: string) => void;
  setImgData: (imgData: { id: string; data: string | ArrayBuffer }[]) => void;
  imgData: { id: string; data: string | ArrayBuffer }[];
  borderRadius: number;
  setBorderRadius: (borderRadius: number) => void;
  borderWidth: number;
  setBorderWidth: (borderWidth: number) => void;
  setSmall: (shadow: string | boolean) => void;
  setMedium: (shadow: string | boolean) => void;
  setLarge: (shadow: string | boolean) => void;
  shadow: string;
  setOn: (connectWallet: string | boolean) => void;
  connectWallet: string;
}

const SettingComponent: FC<ISettingComponent> = ({
  items,
  setItems,
  selectedItem,
  setLink,
  link,
  setValue,
  value,
  setBold,
  bold,
  setItalic,
  italic,
  setUnderline,
  underline,
  setColor,
  color,
  setBgColor,
  backgroundColor,
  setDeleteComponent,
  deleteComponent,
  justifyContent,
  setLeft,
  setCenter,
  setRight,
  fontSize,
  setFontSize,
  contractConfig,
  setContractConfig,
  showComponent,
  setShowComponent,
  setSelector,
  elementConfig,
  openTab,
  setOpenTab,
  setPicture,
  setImgData,
  imgData,
  borderRadius,
  setBorderRadius,
  borderWidth,
  setBorderWidth,
  setSmall,
  setMedium,
  setLarge,
  shadow,
  setOn,
  connectWallet,
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
    setLink(e.target.value);
  };

  return (
    <>
      <div className="rounded-[8px] py-2 cursor-pointer relative"> 
        <div className="border shadow-sm sidebar menu" ref={ref}>
          {selectedItem?.name === "Button" ? (
            <>
              <div className="flex flex-wrap">
                <div className="w-full">
                  <ul
                    className="flex flex-row flex-wrap pt-3 pb-4 mb-0 list-none"
                    role="tablist"
                  >
                    <li className="flex-auto mr-2 -mb-px text-center last:mr-0">
                      <a
                        className="text-xs font-bold text-black uppercase bg-transparent"
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenTab(1);
                        }}
                        data-toggle="tab"
                        href="#link1"
                        role="tablist"
                      >
                        <i className="mr-1 text-base fas fa-space-shuttle"></i>{" "}
                        Setting
                      </a>
                    </li>
                    <li className="flex-auto mr-2 -mb-px text-center last:mr-0">
                      <a
                        className="text-xs font-bold text-black uppercase bg-transparent"
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenTab(2);
                        }}
                        data-toggle="tab"
                        href="#link3"
                        role="tablist"
                      >
                        <i className="mr-1 text-base fas fa-briefcase"></i>{" "}
                        Contract
                      </a>
                    </li>
                  </ul>
                  <div className="relative flex flex-col min-w-0 break-words">
                    <div className="flex-auto px-2 py-2">
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
                          <ConnectSwitchComponent
                            setOn={setOn}
                            connectWallet={connectWallet}
                          />
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
                          <BorderRadiusComponent
                            borderRadius={borderRadius}
                            setBorderRadius={setBorderRadius}
                          />
                          <ShadowComponent
                            setSmall={setSmall}
                            setMedium={setMedium}
                            setLarge={setLarge}
                            shadow={shadow}
                          />

                          <ColorComponent
                            color={color}
                            setColor={setColor}
                            selectedItem={selectedItem}
                          />

                          <BgColorComponent
                            color={backgroundColor}
                            setBgColor={setBgColor}
                          />

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
              {selectedItem?.name === "Image" ? (
                <>
                  <h3 className="mb-3 ml-8">
                    Component -{" "}
                    {selectedItem ? (
                      <span className="font-bold">{selectedItem.name}</span>
                    ) : null}
                  </h3>
                  <UploadComponent
                    setPicture={setPicture}
                    setImgData={setImgData}
                    imgData={imgData}
                    selectedItem={selectedItem}
                    items={items}
                    setItems={setItems}
                  />
                  <AlignComponent
                    justifyContent={justifyContent}
                    setLeft={setLeft}
                    setRight={setRight}
                    setCenter={setCenter}
                  />

                  <UtilitiesComponent
                    deleteComponent={deleteComponent}
                    setDeleteComponent={setDeleteComponent}
                  />
                </>
              ) : (
                <>
                  {selectedItem?.name === "Container" ? (
                    <>
                      <h3 className="mb-3 ml-8">
                        Component -{" "}
                        {selectedItem ? (
                          <span className="font-bold">{selectedItem.name}</span>
                        ) : null}
                      </h3>
                      <UploadComponent
                        setPicture={setPicture}
                        setImgData={setImgData}
                        imgData={imgData}
                        selectedItem={selectedItem}
                        items={items}
                        setItems={setItems}
                      />
                      <BgColorComponent
                        color={backgroundColor}
                        setBgColor={setBgColor}
                      />
                      <ColorComponent
                        color={color}
                        setColor={setColor}
                        selectedItem={selectedItem}
                      />
                      <BorderRadiusComponent
                        borderRadius={borderRadius}
                        setBorderRadius={setBorderRadius}
                      />
                      <BorderComponent
                        borderWidth={borderWidth}
                        setBorderWidth={setBorderWidth}
                      />
                      <ShadowComponent
                        setSmall={setSmall}
                        setMedium={setMedium}
                        setLarge={setLarge}
                        shadow={shadow}
                      />
                      <UtilitiesComponent
                        deleteComponent={deleteComponent}
                        setDeleteComponent={setDeleteComponent}
                      />
                    </>
                  ) : (
                    <>
                      {selectedItem?.name === "Input" ? (
                        <>
                          <h3 className="mb-3 ml-8">
                            Component -{" "}
                            {selectedItem ? (
                              <span className="font-bold">
                                {selectedItem.name}
                              </span>
                            ) : null}
                          </h3>
                          <BorderRadiusComponent
                            borderRadius={borderRadius}
                            setBorderRadius={setBorderRadius}
                          />

                          <ColorComponent
                            color={color}
                            setColor={setColor}
                            selectedItem={selectedItem}
                          />
                          <ShadowComponent
                            setSmall={setSmall}
                            setMedium={setMedium}
                            setLarge={setLarge}
                            shadow={shadow}
                          />
                          <UtilitiesComponent
                            deleteComponent={deleteComponent}
                            setDeleteComponent={setDeleteComponent}
                          />
                        </>
                      ) : (
                        <>
                          {" "}
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
                          <ColorComponent
                            color={color}
                            setColor={setColor}
                            selectedItem={selectedItem}
                          />
                          <BgColorComponent
                            color={backgroundColor}
                            setBgColor={setBgColor}
                          />
                          <UtilitiesComponent
                            deleteComponent={deleteComponent}
                            setDeleteComponent={setDeleteComponent}
                          />
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SettingComponent;
