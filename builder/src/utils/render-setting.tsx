import React, { FC } from "react";
import ButtonSettings from "components/dashboard/button-settings";
import ImageSettings from "components/dashboard/image-settings";
import ContainerSettings from "components/dashboard/container-settings";
import InputSettings from "components/dashboard/input-settings";
import NftCardSettings from "components/dashboard/nft-card-settings";
import GeneralSettings from "components/dashboard/general-settings";
import ISettings from "interfaces/settings";
import UtilitiesComponent from "components/settings/utilities-component";
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
  setPlaceholder,
  setMarginTop,
  setMarginRight,
  setMarginBottom,
  setMarginLeft,
  setPaddingTop,
  setPaddingRight,
  setPaddingBottom,
  setPaddingLeft,
  setWallet,
  setSlug,
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
          selectedItem={selectedItem}
          textVal={value}
          handleTextChange={handleTextChange}
          linkVal={link}
          handleLinkChange={handleLinkChange}
          items={items}
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
          setPaddingLeft={setPaddingLeft}
        />
      );
    case "Image":
      return (
        <ImageSettings
          selectedItem={selectedItem}
          items={items}
          setItems={setItems}
          setDeleteComponent={setDeleteComponent}
          setLeft={setLeft}
          setCenter={setCenter}
          setRight={setRight}
          setMarginTop={setMarginTop}
          setMarginRight={setMarginRight}
          setMarginBottom={setMarginBottom}
          setMarginLeft={setMarginLeft}
        />
      );
    case "Container":
      return (
        <ContainerSettings
          selectedItem={selectedItem}
          items={items}
          setItems={setItems}
          setColor={setColor}
          setBgColor={setBgColor}
          setDeleteComponent={setDeleteComponent}
          setBorderRadius={setBorderRadius}
          setBorderWidth={setBorderWidth}
          setSmall={setSmall}
          setMedium={setMedium}
          setLarge={setLarge}
        />
      );
    case "Horizontal Container":
      return (
        <ContainerSettings
          selectedItem={selectedItem}
          items={items}
          setItems={setItems}
          setColor={setColor}
          setBgColor={setBgColor}
          setDeleteComponent={setDeleteComponent}
          setBorderRadius={setBorderRadius}
          setBorderWidth={setBorderWidth}
          setSmall={setSmall}
          setMedium={setMedium}
          setLarge={setLarge}
        />
      );
    case "Vertical Container":
      return (
        <ContainerSettings
          selectedItem={selectedItem}
          items={items}
          setItems={setItems}
          setColor={setColor}
          setBgColor={setBgColor}
          setDeleteComponent={setDeleteComponent}
          setBorderRadius={setBorderRadius}
          setBorderWidth={setBorderWidth}
          setSmall={setSmall}
          setMedium={setMedium}
          setLarge={setLarge}
        />
      );
    case "Input":
      return (
        <InputSettings
          selectedItem={selectedItem}
          placeholder={selectedItem?.placeholder}
          handlePlaceholderChange={handlePlaceholderChange}
          setColor={setColor}
          setDeleteComponent={setDeleteComponent}
          setBorderRadius={setBorderRadius}
          setSmall={setSmall}
          setMedium={setMedium}
          setLarge={setLarge}
          setMarginTop={setMarginTop}
          setMarginRight={setMarginRight}
          setMarginBottom={setMarginBottom}
          setMarginLeft={setMarginLeft}
        />
      );
    case "NFT Card":
      return (
        <NftCardSettings
          selectedItem={selectedItem}
          setWallet={setWallet}
          setSlug={setSlug}
        />
      );
    case "NFT Layout":
      return (
        <>
          <h3 className="mb-3 ml-8">
            Component -
            {selectedItem ? (
              <span className="font-bold">{selectedItem.name}</span>
            ) : null}
          </h3>
          <UtilitiesComponent setDeleteComponent={setDeleteComponent} />
        </>
      );
    default:
      return (
        <GeneralSettings
          selectedItem={selectedItem}
          textVal={value}
          handleTextChange={handleTextChange}
          linkVal={link}
          handleLinkChange={handleLinkChange}
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
        />
      );
  }
};

export default SettingComponent;
