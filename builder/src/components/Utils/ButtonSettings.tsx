import React from "react";
import { RiText } from "react-icons/ri";
import { AiOutlineLink } from "react-icons/ai";
import AlignComponent from "./AlignComponent";
import FontStyleComponent from "./FontStyleComponent";
import UtilitiesComponent from "./UtilitiesComponent";
import ColorComponent from "./ColorComponent";
import BgColorComponent from "./BgColorComponent";
import FontSizeComponent from "./FontSizeComponent";
import AdvanceComponent from "./AdvanceComponent";
import BorderRadiusComponent from "./BorderRadiusComponent";
import ShadowComponent from "./ShadowComponent";
import ConnectSwitchComponent from "./ConnectSwitchComponent";

const ButtonSettings = ({
  textVal,
  handleTextChange,
  linkVal,
  handleLinkChange,
  items,
  setItems,
  selectedItem,
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
  borderRadius,
  setBorderRadius,
  setSmall,
  setMedium,
  setLarge,
  shadow,
  setOn,
  connectWallet,
}) => {
  const handleToggleTab = (e, num: number) => {
    e.preventDefault();
    setOpenTab(num);
  };

  return (
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
                onClick={(e) => handleToggleTab(e, 1)}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <i className="mr-1 text-base fas fa-space-shuttle"></i> Setting
              </a>
            </li>
            <li className="flex-auto mr-2 -mb-px text-center last:mr-0">
              <a
                className="text-xs font-bold text-black uppercase bg-transparent"
                onClick={(e) => handleToggleTab(e, 2)}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                <i className="mr-1 text-base fas fa-briefcase"></i> Contract
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words">
            <div className="flex-auto px-2 py-2">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
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
                <div className={openTab === 2 ? "block" : "hidden"} id="link3">
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
  );
};

export default ButtonSettings;
