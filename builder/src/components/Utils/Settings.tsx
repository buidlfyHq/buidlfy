import React, { useState, FC } from "react";
import SettingComponent from "./SettingComponent";
import IItems from "interfaces/items";
import IColor from "interfaces/color";

interface ISetting {
  items: IItems[];
  setItems: (items: IItems[]) => void;
  contractConfig: { abi: string; address: string };
  setContractConfig: (contractConfig: { abi: string; address: string }) => void;
  setSelector: (selector: {
    methodName: string;
    type: string;
    name: string;
  }) => void;
  elementConfig: object;
  openTab: number;
  setOpenTab: (openTab: number) => void;
  settingItemId: string;
  setPicture: (picture: string) => void;
  setImgData: (imgData: { id: string; data: string | ArrayBuffer }[]) => void;
  imgData: { id: string; data: string | ArrayBuffer }[];
}

const Settings: FC<ISetting> = ({
  items,
  setItems,
  settingItemId,
  contractConfig,
  setContractConfig,
  setSelector,
  elementConfig,
  openTab,
  setOpenTab,
  setPicture,
  setImgData,
  imgData,
}) => {
  const [showComponent, setShowComponent] = useState(null); // for abi method component

  const selectedChildren = items.map((item) =>
    item.children?.find((child) => child.i === settingItemId)
  );

  const selectedItem =
    items?.find((item) => item.i === settingItemId) ||
    selectedChildren.filter(Boolean)[0];

  const setLink = (link: string) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      let selectedChild = item.children?.find(
        (child) => child.i === settingItemId
      );
      if (item.i === settingItemId) {
        return { ...item, link };
      } else if (selectedChild?.i === settingItemId) {
        let child = {
          ...selectedChild,
          link,
        };

        const childIndex = item.children?.findIndex(
          (c) => c.i === settingItemId
        );
        let newArray = [...item.children];
        newArray[childIndex] = child;

        return {
          ...item,
          children: newArray,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const setValue = (value: string) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      let selectedChild = item.children?.find(
        (child) => child.i === settingItemId
      );
      if (item.i === settingItemId) {
        return { ...item, value };
      } else if (selectedChild?.i === settingItemId) {
        let child = {
          ...selectedChild,
          value,
        };

        const childIndex = item.children?.findIndex(
          (c) => c.i === settingItemId
        );
        let newArray = [...item.children];
        newArray[childIndex] = child;

        return {
          ...item,
          children: newArray,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const utilityFunction = (styleProp, property, value1, value2) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      let selectedChild = item.children?.find(
        (child) => child.i === settingItemId
      );
      if (item.i === settingItemId) {
        return {
          ...item,
          style: {
            ...item["style"],
            [styleProp]: property ? value1 : value2,
          },
        };
      } else if (selectedChild?.i == settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            [styleProp]: property ? value1 : value2,
          },
        };
        const childIndex = item.children?.findIndex(
          (c) => c.i === settingItemId
        );
        let newArray = [...item.children];
        newArray[childIndex] = child;

        return {
          ...item,
          children: newArray,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const setBold = (fontWeight: boolean) => {
    utilityFunction("fontWeight", fontWeight, "bold", "normal");
  };

  const setItalic = (fontStyle: boolean) => {
    utilityFunction("fontStyle", fontStyle, "italic", "normal");
  };

  const setUnderline = (textDecoration: boolean) => {
    utilityFunction("textDecoration", textDecoration, "underline", "none");
  };

  const setColor = (color: IColor) => {
    singleWorkFunction("color", color);
  };

  const setBgColor = (backgroundColor: IColor) => {
    singleWorkFunction("backgroundColor", backgroundColor);
  };

  const singleWorkFunction = (styleProp, property) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      let selectedChild = item.children?.find(
        (child) => child.i === settingItemId
      );
      if (item.i === settingItemId) {
        return {
          ...item,
          style: {
            ...item["style"],
            [styleProp]: property,
          },
        };
      } else if (selectedChild?.i === settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            [styleProp]: property,
          },
        };

        const childIndex = item.children?.findIndex(
          (c) => c.i === settingItemId
        );
        let newArray = [...item.children];
        newArray[childIndex] = child;

        return {
          ...item,
          children: newArray,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const setDeleteComponent = (deleteComponent: number) => {
    singleWorkFunction("deleteComponent", deleteComponent);
  };

  const setCenter = (justifyContent: boolean) => {
    utilityFunction("justifyContent", justifyContent, "center", "inherit");
  };

  const setLeft = (justifyContent: boolean) => {
    utilityFunction("justifyContent", justifyContent, "left", "inherit");
  };

  const setRight = (justifyContent: boolean) => {
    utilityFunction("justifyContent", justifyContent, "right", "inherit");
  };

  const setSmall = (shadow: boolean) => {
    utilityFunction("shadow", shadow, "0 1px 2px 0 rgb(0 0 0 / 0.05)", "none");
  };

  const setMedium = (shadow: boolean) => {
    utilityFunction(
      "shadow",
      shadow,
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      "inherit"
    );
  };

  const setLarge = (shadow: boolean) => {
    utilityFunction(
      "shadow",
      shadow,
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      "inherit"
    );
  };

  const setFontSize = (fontSize: number) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      let selectedChild = item.children?.find(
        (child) => child.i === settingItemId
      );
      if (item.i === settingItemId) {
        return {
          ...item,
          style: {
            ...item["style"],
            fontSize: fontSize,
          },
        };
      } else if (selectedChild?.i === settingItemId) {
        let selectedChild = item.children?.find(
          (child) => child.i === settingItemId
        );
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            fontSize: fontSize,
          },
        };

        const childIndex = item.children?.findIndex(
          (c) => c.i === settingItemId
        );
        let newArray = [...item.children];
        newArray[childIndex] = child;

        return {
          ...item,
          children: newArray,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const setBorderRadius = (borderRadius: number) => {
    singleWorkFunction("borderRadius", borderRadius);
  };

  const setBorderWidth = (borderWidth: number) => {
    singleWorkFunction("borderWidth", borderWidth);
  };

  const setOn = (connectWallet: boolean) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      let selectedChild = item.children?.find(
        (child) => child.i === settingItemId
      );
      if (item.i === settingItemId) {
        return {
          ...item,
          connectWallet: connectWallet ? "on" : "off",
        };
      } else if (selectedChild?.i === settingItemId) {
        let child = {
          ...selectedChild,
          connectWallet: connectWallet ? "on" : "off",
        };

        const childIndex = item.children?.findIndex(
          (c) => c.i === settingItemId
        );
        let newArray = [...item.children];
        newArray[childIndex] = child;

        return {
          ...item,
          children: newArray,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <>
      {settingItemId ? (
        <SettingComponent
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
      ) : null}
    </>
  );
};

export default Settings;
