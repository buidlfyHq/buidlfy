import React, { FC } from "react";
import { RiText } from "react-icons/ri";
import { AiOutlineLink } from "react-icons/ai";
import AlignComponent from "components/settings/align-component";
import FontStyleComponent from "components/settings/font-style-component";
import UtilitiesComponent from "components/settings/utilities-component";
import ColorComponent from "components/settings/color-component";
import BgColorComponent from "components/settings/bg-color-component";
import FontSizeComponent from "components/settings/font-size-component";
import AdvanceComponent from "components/settings/advance-component";
import BorderRadiusComponent from "components/settings/border-radius-component";
import ShadowComponent from "components/settings/shadow-component";
import ConnectSwitchComponent from "components/settings/connect-switch-component";
import ISettings from "interfaces/settings";
import MarginComponent from "components/settings/margin-component";
import PaddingComponent from "components/settings/padding-component";

const ButtonSettings: FC<ISettings> = ({
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
  selector,
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
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  setMarginLeft,
  setMarginRight,
  setMarginTop,
  setMarginBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  setPaddingLeft,
  setPaddingRight,
  setPaddingBottom,
  setPaddingTop,
}) => {
  const handleToggleTab = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    num: number
  ) => {
    e.preventDefault();
    setOpenTab(num);
    if (num === 1) {
      setSelector(null);
    }
  };

  return (
    <main className="flex flex-wrap">
      <section className="w-full">
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
              <div className={openTab === 1 ? "block" : "hidden"} id="link-one">
                <h3 className="mb-3 ml-8">
                  Component -
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
                <MarginComponent
                  setMarginLeft={setMarginLeft}
                  setMarginRight={setMarginRight}
                  setMarginTop={setMarginTop}
                  setMarginBottom={setMarginBottom}
                  marginLeft={marginLeft}
                  marginRight={marginRight}
                  marginTop={marginTop}
                  marginBottom={marginBottom}
                />
                <PaddingComponent
                  setPaddingLeft={setPaddingLeft}
                  setPaddingRight={setPaddingRight}
                  setPaddingTop={setPaddingTop}
                  setPaddingBottom={setPaddingBottom}
                  paddingLeft={paddingLeft}
                  paddingRight={paddingRight}
                  paddingTop={paddingTop}
                  paddingBottom={paddingBottom}
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
              <div className={openTab === 2 ? "block" : "hidden"} id="link-two">
                <AdvanceComponent
                  contractConfig={contractConfig}
                  setContractConfig={setContractConfig}
                  showComponent={showComponent}
                  setShowComponent={setShowComponent}
                  selector={selector}
                  setSelector={setSelector}
                  elementConfig={elementConfig}
                  selectedItem={selectedItem}
                  items={items}
                  setItems={setItems}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ButtonSettings;
