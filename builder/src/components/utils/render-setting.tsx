import React, { FC } from "react";
import ButtonSettings from "components/dashboard/button-settings";
import ImageSettings from "components/dashboard/image-settings";
import ContainerSettings from "components/dashboard/container-settings";
import InputSettings from "components/dashboard/input-settings";
import GeneralSettings from "components/dashboard/general-settings";
import ISettings from "interfaces/settings";
import "styles/components.css";
import "styles/dashboard.css";

export enum ReplaceValue {
  INCREMENT = "increment",
  DECREMENT = "decrement",
  CHANGE = "change",
}
export enum ReplaceSpacingValue {
  LEFT = "left",
  RIGHT = "right",
  TOP = "top",
  BOTTOM = "bottom",
  INCREMENTLEFT = "incrementLeft",
  INCREMENTRIGHT = "incrementRight",
  INCREMENTTOP = "incrementTop",
  INCREMENTBOTTOM = "incrementBottom",
  DECREMENTLEFT = "decrementLeft",
  DECREMENTRIGHT = "decrementRight",
  DECREMENTTOP = "decrementTop",
  DECREMENTBOTTOM = "decrementBottom",
}
export enum ReplaceStyle {
  BOLD = "bold",
  ITALIC = "italic",
  UNDERLINE = "underline",
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}
const SettingComponent: FC<ISettings> = ({
  items,
  setItems,
  selectedItem,
  setLink,
  link,
  setValue,
  value,
  setBold,
  setItalic,
  setUnderline,
  setColor,
  setBgColor,
  setDeleteComponent,
  setLeft,
  setCenter,
  setRight,
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
  setBorderRadius,
  setBorderWidth,
  setSmall,
  setMedium,
  setLarge,
  setOn,
  placeholder,
  setPlaceholder,
  setMarginTop,
  setMarginRight,
  setMarginBottom,
  setMarginLeft,
  setPaddingTop,
  setPaddingRight,
  setPaddingBottom,
  setPaddingLeft,
}) => {
  const handleTextChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceholder(e.target.value);
  };

  switch (selectedItem?.name) {
    case "Button":
      return (
        <ButtonSettings
          borderRadius={selectedItem?.style?.borderRadius}
          selectedItem={selectedItem}
          textVal={value}
          handleTextChange={handleTextChange}
          linkVal={link}
          handleLinkChange={handleLinkChange}
          items={items}
          fontSize={selectedItem?.style?.fontSize}
          bold={selectedItem?.style?.fontWeight}
          italic={selectedItem?.style?.fontStyle}
          underline={selectedItem?.style?.textDecoration}
          color={selectedItem?.style?.color}
          deleteComponent={selectedItem?.style?.deleteComponent}
          setItems={setItems}
          setBold={setBold}
          setItalic={setItalic}
          setUnderline={setUnderline}
          setColor={setColor}
          setBgColor={setBgColor}
          setDeleteComponent={setDeleteComponent}
          setLeft={setLeft}
          setCenter={setCenter}
          setRight={setRight}
          setFontSize={setFontSize}
          setContractConfig={setContractConfig}
          contractConfig={contractConfig}
          setShowComponent={setShowComponent}
          showComponent={showComponent}
          setSelector={setSelector}
          selector={selector}
          elementConfig={elementConfig}
          openTab={openTab}
          setOpenTab={setOpenTab}
          setBorderRadius={setBorderRadius}
          setSmall={setSmall}
          setMedium={setMedium}
          setLarge={setLarge}
          shadow={selectedItem?.style?.shadow}
          setOn={setOn}
          setMarginTop={setMarginTop}
          setMarginRight={setMarginRight}
          setMarginBottom={setMarginBottom}
          setMarginLeft={setMarginLeft}
          setPaddingTop={setPaddingTop}
          setPaddingRight={setPaddingRight}
          setPaddingBottom={setPaddingBottom}
          margin={selectedItem?.style?.margin}
          padding={selectedItem?.style?.padding}
          setPaddingLeft={setPaddingLeft}
        />
      );
    case "Image":
      return (
        <ImageSettings
          selectedItem={selectedItem}
          items={items}
          deleteComponent={selectedItem?.style?.deleteComponent}
          setLeft={setLeft}
          setCenter={setCenter}
          setRight={setRight}
          setMarginTop={setMarginTop}
          setMarginRight={setMarginRight}
          setMarginBottom={setMarginBottom}
          margin={selectedItem?.style?.margin}
        />
      );
    case "Container":
      return (
        <ContainerSettings
          selectedItem={selectedItem}
          items={items}
          color={selectedItem?.style?.color}
          borderRadius={selectedItem?.style?.borderRadius}
          borderWidth={selectedItem?.style?.borderWidth}
          deleteComponent={selectedItem?.style?.deleteComponent}
          setItems={setItems}
          setColor={setColor}
          setBgColor={setBgColor}
          setDeleteComponent={setDeleteComponent}
          setBorderRadius={setBorderRadius}
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
          placeholder={placeholder}
          handlePlaceholderChange={handlePlaceholderChange}
          color={selectedItem?.style?.color}
          shadow={selectedItem?.style?.shadow}
          deleteComponent={selectedItem?.style?.deleteComponent}
          borderRadius={selectedItem?.style?.borderRadius}
          setColor={setColor}
          setDeleteComponent={setDeleteComponent}
          setBorderRadius={setBorderRadius}
          setSmall={setSmall}
          setMedium={setMedium}
          setLarge={setLarge}
          setMarginTop={setMarginTop}
          setMarginRight={setMarginRight}
          setMarginBottom={setMarginBottom}
          margin={selectedItem?.style?.margin}
          setMarginLeft={setMarginLeft}
        />
      );
    default:
      return (
        <GeneralSettings
          selectedItem={selectedItem}
          textVal={value}
          fontSize={selectedItem?.style?.fontSize}
          borderRadius={selectedItem?.style?.borderRadius}
          handleTextChange={handleTextChange}
          linkVal={link}
          handleLinkChange={handleLinkChange}
          bold={selectedItem?.style?.fontWeight}
          italic={selectedItem?.style?.fontStyle}
          underline={selectedItem?.style?.textDecoration}
          color={selectedItem?.style?.color}
          deleteComponent={selectedItem?.style?.deleteComponent}
          setBold={setBold}
          setItalic={setItalic}
          setUnderline={setUnderline}
          setColor={setColor}
          setBgColor={setBgColor}
          setDeleteComponent={setDeleteComponent}
          setLeft={setLeft}
          setCenter={setCenter}
          setRight={setRight}
          setFontSize={setFontSize}
          setMarginTop={setMarginTop}
          setMarginRight={setMarginRight}
          setMarginBottom={setMarginBottom}
          setMarginLeft={setMarginLeft}
          setPaddingTop={setPaddingTop}
          setPaddingRight={setPaddingRight}
          setPaddingBottom={setPaddingBottom}
          setPaddingLeft={setPaddingLeft}
          margin={selectedItem?.style?.margin}
          padding={selectedItem?.style?.padding}
        />
      );
  }
};

export default SettingComponent;
