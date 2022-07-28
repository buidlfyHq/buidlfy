import React, { useEffect, useState, FC } from "react";
import ButtonSettings from "components/dashboard/button-settings";
import ImageSettings from "components/dashboard/image-settings";
import ContainerSettings from "components/dashboard/container-settings";
import InputSettings from "components/dashboard/input-settings";
import DefaultSettings from "components/dashboard/default-settings";
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
  setPlaceholder
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        />
      );

    default:
      return (
        <DefaultSettings
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
        />
      );
  }
};

export default SettingComponent;
