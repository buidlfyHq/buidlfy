import React, { useEffect, useRef, useState, FC } from "react";
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
import ButtonSettings from "./ButtonSettings";
import ImageSettings from "./ImageSettings";
import ContainerSettings from "./ContainerSettings";
import InputSettings from "./InputSettings";
import GeneralSettings from "./GeneralSettings";
import IColor from "interfaces/color";
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
  setColor: (color: IColor) => void;
  color: IColor;
  setBgColor: (backgroundColor: IColor) => void;
  backgroundColor: IColor;
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

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const renderComponent = (selectedItem) => {
    switch (selectedItem?.name) {
      case "Button":
        return (
          <ButtonSettings 
            textVal={textVal}
            handleTextChange={handleTextChange}
            linkVal={linkVal}
            handleLinkChange={handleLinkChange}
            items={items}
            setItems={setItems}
            selectedItem={selectedItem}
            setBold={setBold}
            bold={selectedItem?.style?.fontWeight}
            setItalic={setItalic}
            italic={selectedItem?.style?.fontStyle}
            setUnderline={setUnderline}
            underline={selectedItem?.style?.textDecoration}
            color={selectedItem?.style?.color}
            setColor={setColor}
            setBgColor={setBgColor}
            backgroundColor={selectedItem?.style?.backgroundColor}
            setDeleteComponent={setDeleteComponent}
            deleteComponent={selectedItem?.style?.deleteComponent}
            justifyContent={selectedItem?.style?.justifyContent}
            setLeft={setLeft}
            setCenter={setCenter}
            setRight={setRight}
            setFontSize={setFontSize}
            fontSize={selectedItem?.style?.fontSize}
            setContractConfig={setContractConfig}
            contractConfig={contractConfig}
            setShowComponent={setShowComponent}
            showComponent={showComponent}
            setSelector={setSelector}
            elementConfig={elementConfig}
            openTab={openTab}
            setOpenTab={setOpenTab}
            borderRadius={selectedItem?.style?.borderRadius}
            setBorderRadius={setBorderRadius}
            setSmall={setSmall}
            setMedium={setMedium}
            setLarge={setLarge}
            shadow={selectedItem?.style?.shadow}
            setOn={setOn}
            connectWallet={selectedItem?.connectWallet}
          />
        );

      case "Image":
        return (
          <ImageSettings
            items={items}
            setItems={setItems}
            selectedItem={selectedItem}
            setDeleteComponent={setDeleteComponent}
            deleteComponent={selectedItem?.style?.deleteComponent}
            justifyContent={selectedItem?.style?.justifyContent}
            setLeft={setLeft}
            setCenter={setCenter}
            setRight={setRight}
            setPicture={setPicture}
            setImgData={setImgData}
            imgData={imgData}
          />
        );

      case "Container":
        return (
          <ContainerSettings
            items={items}
            setItems={setItems}
            selectedItem={selectedItem}
            color={selectedItem?.style?.color}
            setColor={setColor}
            setBgColor={setBgColor}
            backgroundColor={selectedItem?.style?.backgroundColor}
            setDeleteComponent={setDeleteComponent}
            deleteComponent={selectedItem?.style?.deleteComponent}
            setPicture={setPicture}
            setImgData={setImgData}
            imgData={imgData}
            borderRadius={selectedItem?.style?.borderRadius}
            setBorderRadius={setBorderRadius}
            borderWidth={selectedItem?.style?.borderWidth}
            setBorderWidth={setBorderWidth}
            setSmall={setSmall}
            setMedium={setMedium}
            setLarge={setLarge}
            shadow={selectedItem?.style?.shadow}
          />
        );
      case "Input":
        return (
          <InputSettings
            selectedItem={selectedItem}            
            color={selectedItem?.style?.color}
            setColor={setColor}
            setDeleteComponent={setDeleteComponent}
            deleteComponent={selectedItem?.style?.deleteComponent}
            borderRadius={selectedItem?.style?.borderRadius}
            setBorderRadius={setBorderRadius}
            setSmall={setSmall}
            setMedium={setMedium}
            setLarge={setLarge}
            shadow={selectedItem?.style?.shadow}
          />
        );

      default:
        return (
          <GeneralSettings
            textVal={textVal}
            handleTextChange={handleTextChange}
            linkVal={linkVal}
            handleLinkChange={handleLinkChange}
            items={items}
            setItems={setItems}
            selectedItem={selectedItem}
            setLink={setLink}
            link={selectedItem?.link}
            setValue={setValue}
            value={selectedItem?.value}
            setBold={setBold}
            bold={selectedItem?.style?.fontWeight}
            setItalic={setItalic}
            italic={selectedItem?.style?.fontStyle}
            setUnderline={setUnderline}
            underline={selectedItem?.style?.textDecoration}
            color={selectedItem?.style?.color}
            setColor={setColor}
            setBgColor={setBgColor}
            backgroundColor={selectedItem?.style?.backgroundColor}
            setDeleteComponent={setDeleteComponent}
            deleteComponent={selectedItem?.style?.deleteComponent}
            justifyContent={selectedItem?.style?.justifyContent}
            setLeft={setLeft}
            setCenter={setCenter}
            setRight={setRight}
            setFontSize={setFontSize}
            fontSize={selectedItem?.style?.fontSize}
            setContractConfig={setContractConfig}
            contractConfig={contractConfig}
            setShowComponent={setShowComponent}
            showComponent={showComponent}
            setSelector={setSelector}
            elementConfig={elementConfig}
            openTab={openTab}
            setOpenTab={setOpenTab}
            setPicture={setPicture}
            setImgData={setImgData}
            imgData={imgData}
            borderRadius={selectedItem?.style?.borderRadius}
            setBorderRadius={setBorderRadius}
            borderWidth={selectedItem?.style?.borderWidth}
            setBorderWidth={setBorderWidth}
            setSmall={setSmall}
            setMedium={setMedium}
            setLarge={setLarge}
            shadow={selectedItem?.style?.shadow}
            setOn={setOn}
            connectWallet={selectedItem?.connectWallet}
          />
        );
    }
  };

  return (
    <>
      <div className="rounded-[8px] py-2 cursor-pointer relative">
        <div className="border shadow-sm sidebar menu" ref={ref}>
          {renderComponent(selectedItem)}
        </div>
      </div>
    </>
  );
};

export default SettingComponent;
