import React, { FC } from "react";
import ButtonSettings from "components/dashboard/button-settings";
import ImageSettings from "components/dashboard/image-settings";
import ContainerSettings from "components/dashboard/container-settings";
import InputSettings from "components/dashboard/input-settings";
import GeneralSettings from "components/dashboard/general-settings";
import ISettings from "interfaces/settings";
import "styles/components.css";
import "styles/dashboard.css";

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
  setMarginLeft,
  setMarginRight,
  setMarginTop,
  setMarginBottom,
  setPaddingLeft,
  setPaddingRight,
  setPaddingBottom,
  setPaddingTop,
  setBorderColor,
  borderColor,
  width,
  height,
  setWidth,
  setHeight,
  setCover,
  setContain,
  setAuto,
  backgroundSize,
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
          textVal={value}
          handleTextChange={handleTextChange}
          linkVal={link}
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
          selector={selector}
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
          setMarginLeft={setMarginLeft}
          setMarginRight={setMarginRight}
          setMarginTop={setMarginTop}
          setMarginBottom={setMarginBottom}
          setPaddingLeft={setPaddingLeft}
          setPaddingRight={setPaddingRight}
          setPaddingTop={setPaddingTop}
          setPaddingBottom={setPaddingBottom}
          margin={selectedItem?.style?.margin}
          padding={selectedItem?.style?.padding}
          borderColor={borderColor}
          setBorderColor={setBorderColor}
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
          setMarginLeft={setMarginLeft}
          setMarginRight={setMarginRight}
          setMarginTop={setMarginTop}
          setMarginBottom={setMarginBottom}
          margin={selectedItem?.style?.margin}
          width={width}
          height={height}
          setWidth={setWidth}
          setHeight={setHeight}
          setCover={setCover}
          setContain={setContain}
          setAuto={setAuto}
          backgroundSize={selectedItem?.style?.backgroundSize}
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
          borderRadius={selectedItem?.style?.borderRadius}
          setBorderRadius={setBorderRadius}
          borderWidth={selectedItem?.style?.borderWidth}
          setBorderWidth={setBorderWidth}
          setSmall={setSmall}
          setMedium={setMedium}
          setLarge={setLarge}
          shadow={selectedItem?.style?.shadow}
          setPaddingLeft={setPaddingLeft}
          setPaddingRight={setPaddingRight}
          setPaddingTop={setPaddingTop}
          setPaddingBottom={setPaddingBottom}
          padding={selectedItem?.style?.padding}
        />
      );
    case "Horizontal Container":
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
          borderRadius={selectedItem?.style?.borderRadius}
          setBorderRadius={setBorderRadius}
          borderWidth={selectedItem?.style?.borderWidth}
          setBorderWidth={setBorderWidth}
          setSmall={setSmall}
          setMedium={setMedium}
          setLarge={setLarge}
          shadow={selectedItem?.style?.shadow}
          setPaddingLeft={setPaddingLeft}
          setPaddingRight={setPaddingRight}
          setPaddingTop={setPaddingTop}
          setPaddingBottom={setPaddingBottom}
          padding={selectedItem?.style?.padding}
        />
      );
    case "Vertical Container":
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
          borderRadius={selectedItem?.style?.borderRadius}
          setBorderRadius={setBorderRadius}
          borderWidth={selectedItem?.style?.borderWidth}
          setBorderWidth={setBorderWidth}
          setSmall={setSmall}
          setMedium={setMedium}
          setLarge={setLarge}
          shadow={selectedItem?.style?.shadow}
          setPaddingLeft={setPaddingLeft}
          setPaddingRight={setPaddingRight}
          setPaddingTop={setPaddingTop}
          setPaddingBottom={setPaddingBottom}
          padding={selectedItem?.style?.padding}
        />
      );
    case "Input":
      return (
        <InputSettings
          placeholder={placeholder}
          handlePlaceholderChange={handlePlaceholderChange}
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
          setMarginLeft={setMarginLeft}
          setMarginRight={setMarginRight}
          setMarginTop={setMarginTop}
          setMarginBottom={setMarginBottom}
          margin={selectedItem?.style?.margin}
        />
      );
    default:
      return (
        <GeneralSettings
          textVal={value}
          handleTextChange={handleTextChange}
          linkVal={link}
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
          borderWidth={selectedItem?.style?.borderWidth}
          setBorderWidth={setBorderWidth}
          setSmall={setSmall}
          setMedium={setMedium}
          setLarge={setLarge}
          shadow={selectedItem?.style?.shadow}
          setOn={setOn}
          connectWallet={selectedItem?.connectWallet}
          setMarginLeft={setMarginLeft}
          setMarginRight={setMarginRight}
          setMarginTop={setMarginTop}
          setMarginBottom={setMarginBottom}
          setPaddingLeft={setPaddingLeft}
          setPaddingRight={setPaddingRight}
          setPaddingTop={setPaddingTop}
          setPaddingBottom={setPaddingBottom}
          margin={selectedItem?.style?.margin}
          padding={selectedItem?.style?.padding}
        />
      );
  }
};

export default SettingComponent;
