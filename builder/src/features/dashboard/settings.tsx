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
  MARGIN = "margin",
  MARGIN_LEFT = "marginLeft",
  MARGIN_RIGHT = "marginRight",
  MARGIN_TOP = "marginTop",
  MARGIN_BOTTOM = "marginBottom",
  PADDING = "padding",
  PADDING_LEFT = "paddingLeft",
  PADDING_RIGHT = "paddingRight",
  PADDING_TOP = "paddingTop",
  PADDING_BOTTOM = "paddingBottom",
}

const Settings: FC<ISettings> = ({
  items,
  setItems,
  setOpenSetting,
  settingItemId,
  contractConfig,
  setContractConfig,
  selector,
  setSelector,
  elementConfig,
  openTab,
  setOpenTab,
}) => {
  const ref = useRef(null);
  
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

  const setPlaceholder = (placeholder: string) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      let selectedChild = item.children?.find(
        (child) => child.i === settingItemId
      );
      if (item.i === settingItemId) {
        return { ...item, placeholder };
      } else if (selectedChild?.i === settingItemId) {
        let child = {
          ...selectedChild,
          placeholder,
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

  const setColumnNumber = (columns: number) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      if (item.i === settingItemId) {
        return {
          ...item,
          w: 6 / columns,
          columns,
        };
      }
      return item;
    });
    setItems(updatedItems);
    console.log(items);
  };

  const spacingWorkFunction = (
    styleProp: functionEnum,
    stylePropChild: functionEnum,
    property: number
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
            [styleProp]: {
              ...item.style[styleProp],
              [stylePropChild]: property,
            },
          },
        };
      } else if (selectedChild?.i === settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            [styleProp]: {
              ...selectedChild.style[styleProp],
              [stylePropChild]: property,
            },
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

  const setMarginTop = (marginTop: number) => {
    spacingWorkFunction(
      functionEnum.MARGIN,
      functionEnum.MARGIN_TOP,
      marginTop
    );
  };

  const setMarginRight = (marginRight: number) => {
    spacingWorkFunction(
      functionEnum.MARGIN,
      functionEnum.MARGIN_RIGHT,
      marginRight
    );
  };

  const setMarginBottom = (marginBottom: number) => {
    spacingWorkFunction(
      functionEnum.MARGIN,
      functionEnum.MARGIN_BOTTOM,
      marginBottom
    );
  };

  const setMarginLeft = (marginLeft: number) => {
    spacingWorkFunction(
      functionEnum.MARGIN,
      functionEnum.MARGIN_LEFT,
      marginLeft
    );
  };

  const setPaddingTop = (paddingTop: number) => {
    spacingWorkFunction(
      functionEnum.PADDING,
      functionEnum.PADDING_TOP,
      paddingTop
    );
  };

  const setPaddingRight = (paddingRight: number) => {
    spacingWorkFunction(
      functionEnum.PADDING,
      functionEnum.PADDING_RIGHT,
      paddingRight
    );
  };

  const setPaddingBottom = (paddingBottom: number) => {
    spacingWorkFunction(
      functionEnum.PADDING,
      functionEnum.PADDING_BOTTOM,
      paddingBottom
    );
  };

  const setPaddingLeft = (paddingLeft: number) => {
    spacingWorkFunction(
      functionEnum.PADDING,
      functionEnum.PADDING_LEFT,
      paddingLeft
    );
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

  const setSlug = (slug: string) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      if (item.i === settingItemId) {
        return { ...item, slug };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleOpenSetting = () => {
    setOpenSetting(false);
  };

  return (
    <>
      {settingItemId ? (
        <div className="rounded-[8px] py-2 cursor-pointer relative">
          <div
            className="pt-1 border shadow-sm sidebar menu"
            ref={ref}
            style={{ paddingTop: "2px" }}
          >
            <div className="px-2 py-4 text-sm" onClick={handleOpenSetting}>
              {"<"}
              <span className="ml-2">Site Settings</span>
            </div>
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
              setPlaceholder={setPlaceholder}
              setMarginTop={setMarginTop}
              setMarginRight={setMarginRight}
              setMarginBottom={setMarginBottom}
              setMarginLeft={setMarginLeft}
              setPaddingTop={setPaddingTop}
              setPaddingRight={setPaddingRight}
              setPaddingBottom={setPaddingBottom}
              setPaddingLeft={setPaddingLeft}
              // columns={columns}
              setColumnNumber={setColumnNumber}
              setSlug={setSlug}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Settings;
