import React, { useState, useRef, FC } from "react";
import SettingComponent from "utils/render-setting";
import IColor from "interfaces/color";
import ISettings from "interfaces/settings";

enum fontEnum {
  BOLD = "bold",
  ITALIC = "italic",
  NORMAL = "normal",
}

enum functionEnum {
  FONT_WEIGHT = "fontWeight",
  FONT_STYLE = "fontStyle",
  TEXT_DECORATION = "textDecoration",
  COLOR = "color",
  BACKGROUND_COLOR = "backgroundColor",
  DELETE_COMPONENT = "deleteComponent",
  JUSTIFY_CONTENT = "justifyContent",
  SHADOW = "shadow",
  BORDER_RADIUS = "borderRadius",
  BORDER_WIDTH = "borderWidth",
}

const Settings: FC<ISettings> = ({
  items,
  setItems,
  settingItemId,
  contractConfig,
  setContractConfig,
  selector,
  setSelector,
  elementConfig,
  openTab,
  setOpenTab,
}) => {
  const [showComponent, setShowComponent] =
    useState<{
      id: string;
      value: {
        name: string;
        inputs: object[];
        outputs: object[];
        stateMutability: string;
      };
    }>(null); // for abi method component
  const ref = useRef(null);

  // work in progress
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

  const utilityFunction = (
    styleProp: functionEnum,
    property: boolean,
    valueFirst: string,
    valueSecond: string
  ) => {
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
            [styleProp]: property ? valueFirst : valueSecond,
          },
        };
      } else if (selectedChild?.i === settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            [styleProp]: property ? valueFirst : valueSecond,
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
    utilityFunction(
      functionEnum.FONT_WEIGHT,
      fontWeight,
      fontEnum.BOLD,
      fontEnum.NORMAL
    );
  };

  const setItalic = (fontStyle: boolean) => {
    utilityFunction(
      functionEnum.FONT_STYLE,
      fontStyle,
      fontEnum.ITALIC,
      fontEnum.NORMAL
    );
  };

  const setUnderline = (textDecoration: boolean) => {
    utilityFunction(
      functionEnum.TEXT_DECORATION,
      textDecoration,
      "underline",
      "none"
    );
  };

  const singleWorkFunction = (
    styleProp: functionEnum,
    property: number | IColor
  ) => {
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

  const setColor = (color: IColor) => {
    singleWorkFunction(functionEnum.COLOR, color);
  };

  const setBgColor = (backgroundColor: IColor) => {
    singleWorkFunction(functionEnum.BACKGROUND_COLOR, backgroundColor);
  };

  const setDeleteComponent = (deleteComponent: number) => {
    singleWorkFunction(functionEnum.DELETE_COMPONENT, deleteComponent);
  };

  const setCenter = (justifyContent: boolean) => {
    utilityFunction(
      functionEnum.JUSTIFY_CONTENT,
      justifyContent,
      "center",
      "inherit"
    );
  };

  const setLeft = (justifyContent: boolean) => {
    utilityFunction(
      functionEnum.JUSTIFY_CONTENT,
      justifyContent,
      "left",
      "inherit"
    );
  };

  const setRight = (justifyContent: boolean) => {
    utilityFunction(
      functionEnum.JUSTIFY_CONTENT,
      justifyContent,
      "right",
      "inherit"
    );
  };

  const setSmall = (shadow: boolean) => {
    utilityFunction(
      functionEnum.SHADOW,
      shadow,
      "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      "none"
    );
  };

  const setMedium = (shadow: boolean) => {
    utilityFunction(
      functionEnum.SHADOW,
      shadow,
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      "inherit"
    );
  };

  const setLarge = (shadow: boolean) => {
    utilityFunction(
      functionEnum.SHADOW,
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
    singleWorkFunction(functionEnum.BORDER_RADIUS, borderRadius);
  };

  const setBorderWidth = (borderWidth: number) => {
    singleWorkFunction(functionEnum.BORDER_WIDTH, borderWidth);
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
        <div className="rounded-[8px] py-2 cursor-pointer relative">
          <div className="border shadow-sm sidebar menu" ref={ref}>
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
              selector={selector}
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
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Settings;
