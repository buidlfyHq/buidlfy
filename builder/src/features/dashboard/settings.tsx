import React, { useState, useRef, FC } from "react";
import SettingComponent from "components/utils/render-setting";
import IItems from "interfaces/items";
import ISettings from "interfaces/settings";
import IColor from "interfaces/color";

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
  BORDER_COLOR = "borderColor",
  BACKGROUND_COLOR = "backgroundColor",
  DELETE_COMPONENT = "deleteComponent",
  JUSTIFY_CONTENT = "justifyContent",
  BACKGROUND_SIZE = "backgroundSize",
  SHADOW = "shadow",
  BORDER_RADIUS = "borderRadius",
  BORDER_WIDTH = "borderWidth",
  MARGIN_LEFT = "marginLeft",
  MARGIN_RIGHT = "marginRight",
  MARGIN_TOP = "marginTop",
  MARGIN_BOTTOM = "marginBottom",
  PADDING_LEFT = "paddingLeft",
  PADDING_RIGHT = "paddingRight",
  PADDING_TOP = "paddingTop",
  PADDING_BOTTOM = "paddingBottom",
  WIDTH = "width",
  HEIGHT = "height",
  AUTO = "isAuto",
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
  dynamicHeight,
  dynamicWidth,
  setDynamicHeight,
  setDynamicWidth,
}) => {
  const ref = useRef(null);
  const [showComponent, setShowComponent] = useState<{
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
    item.children?.find((child: IItems) => child.i === settingItemId)
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
        (child: IItems) => child.i === settingItemId
      );
      if (item.i === settingItemId) {
        return { ...item, link };
      } else if (selectedChild?.i === settingItemId) {
        let child = {
          ...selectedChild,
          link,
        };

        const childIndex = item.children?.findIndex(
          (c: IItems) => c.i === settingItemId
        );
        let newChildren = [...item.children];
        newChildren[childIndex] = child;

        return {
          ...item,
          children: newChildren,
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
        (child: IItems) => child.i === settingItemId
      );
      if (item.i === settingItemId) {
        return { ...item, placeholder };
      } else if (selectedChild?.i === settingItemId) {
        let child = {
          ...selectedChild,
          placeholder,
        };

        const childIndex = item.children?.findIndex(
          (c: IItems) => c.i === settingItemId
        );
        let newChildren = [...item.children];
        newChildren[childIndex] = child;

        return {
          ...item,
          children: newChildren,
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
        (child: IItems) => child.i === settingItemId
      );
      if (item.i === settingItemId) {
        return { ...item, value };
      } else if (selectedChild?.i === settingItemId) {
        let child = {
          ...selectedChild,
          value,
        };

        const childIndex = item.children?.findIndex(
          (c: IItems) => c.i === settingItemId
        );
        let newChildren = [...item.children];
        newChildren[childIndex] = child;

        return {
          ...item,
          children: newChildren,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };
  const singleImageSizeFunction = (
    styleProp: functionEnum,
    property: number | IColor | boolean
  ) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      let selectedChild = item.children?.find(
        (child: IItems) => child.i === settingItemId
      );
      if (item.i === settingItemId) {
        return {
          ...item,
          style: {
            ...item["style"],
            isAuto: false,
            [styleProp]: property,
          },
        };
      } else if (selectedChild?.i === settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            isAuto: false,
            [styleProp]: property,
          },
        };

        const childIndex = item.children?.findIndex(
          (c: IItems) => c.i === settingItemId
        );
        let newChildren = [...item.children];
        newChildren[childIndex] = child;

        return {
          ...item,
          children: newChildren,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };
  const backgroundSizeFunction = (
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
        (child: IItems) => child.i === settingItemId
      );
      if (item.i === settingItemId) {
        return {
          ...item,
          style: {
            ...item["style"],
            isAuto: true,
            [styleProp]: property ? valueFirst : valueSecond,
          },
        };
      } else if (selectedChild?.i === settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            isAuto: true,
            [styleProp]: property ? valueFirst : valueSecond,
          },
        };
        const childIndex = item.children?.findIndex(
          (c: IItems) => c.i === settingItemId
        );
        let newChildren = [...item.children];
        newChildren[childIndex] = child;

        return {
          ...item,
          children: newChildren,
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
        (child: IItems) => child.i === settingItemId
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
          (c: IItems) => c.i === settingItemId
        );
        let newChildren = [...item.children];
        newChildren[childIndex] = child;

        return {
          ...item,
          children: newChildren,
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
    property: number | IColor | boolean | string
  ) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      let selectedChild = item.children?.find(
        (child: IItems) => child.i === settingItemId
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
          (c: IItems) => c.i === settingItemId
        );
        let newChildren = [...item.children];
        newChildren[childIndex] = child;

        return {
          ...item,
          children: newChildren,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };
  const marginWorkFunction = (
    styleProp: functionEnum,
    property: number | IColor
  ) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      let selectedChild = item.children?.find(
        (child: IItems) => child.i === settingItemId
      );
      if (item.i === settingItemId) {
        return {
          ...item,
          style: {
            ...item["style"],
            margin: { ...item.style.margin, [styleProp]: property },
          },
        };
      } else if (selectedChild?.i === settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            margin: { ...selectedChild.style.margin, [styleProp]: property },
          },
        };

        const childIndex = item.children?.findIndex(
          (c: IItems) => c.i === settingItemId
        );
        let newChildren = [...item.children];
        newChildren[childIndex] = child;

        return {
          ...item,
          children: newChildren,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };
  const paddingWorkFunction = (
    styleProp: functionEnum,
    property: number | IColor
  ) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      let selectedChild = item.children?.find(
        (child: IItems) => child.i === settingItemId
      );
      if (item.i === settingItemId) {
        return {
          ...item,
          style: {
            ...item["style"],
            padding: { ...item.style.padding, [styleProp]: property },
          },
        };
      } else if (selectedChild?.i === settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            padding: { ...selectedChild.style.padding, [styleProp]: property },
          },
        };

        const childIndex = item.children?.findIndex(
          (c: IItems) => c.i === settingItemId
        );
        let newChildren = [...item.children];
        newChildren[childIndex] = child;

        return {
          ...item,
          children: newChildren,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };
  const setColor = (color: string) => {
    singleWorkFunction(functionEnum.COLOR, color);
  };
  const setBorderColor = (borderColor: string) => {
    singleWorkFunction(functionEnum.BORDER_COLOR, borderColor);
  };

  const setBgColor = (backgroundColor: string) => {
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
  const setIsAuto = (isAuto: boolean) => {
    singleWorkFunction(functionEnum.AUTO, isAuto);
  };
  const setContain = (backgroundSize: boolean) => {
    backgroundSizeFunction(
      functionEnum.BACKGROUND_SIZE,
      backgroundSize,
      "contain",
      "contain"
    );
  };
  const setCover = (backgroundSize: boolean) => {
    backgroundSizeFunction(
      functionEnum.BACKGROUND_SIZE,
      backgroundSize,
      "cover",
      "contain"
    );
  };
  const setAuto = (backgroundSize: boolean) => {
    backgroundSizeFunction(
      functionEnum.BACKGROUND_SIZE,
      backgroundSize,
      "auto",
      "contain"
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
        (child: IItems) => child.i === settingItemId
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
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            fontSize: fontSize,
          },
        };

        const childIndex = item.children?.findIndex(
          (c: IItems) => c.i === settingItemId
        );
        let newChildren = [...item.children];
        newChildren[childIndex] = child;

        return {
          ...item,
          children: newChildren,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const setWidth = (width: number) => {
    singleImageSizeFunction(functionEnum.WIDTH, width);
  };
  const setHeight = (height: number) => {
    singleImageSizeFunction(functionEnum.HEIGHT, height);
  };
  const setBorderRadius = (borderRadius: number) => {
    singleWorkFunction(functionEnum.BORDER_RADIUS, borderRadius);
  };
  const setMarginLeft = (marginLeft: number) => {
    marginWorkFunction(functionEnum.MARGIN_LEFT, marginLeft);
  };
  const setMarginRight = (marginRight: number) => {
    marginWorkFunction(functionEnum.MARGIN_RIGHT, marginRight);
  };
  const setMarginTop = (marginTop: number) => {
    marginWorkFunction(functionEnum.MARGIN_TOP, marginTop);
  };
  const setMarginBottom = (marginBottom: number) => {
    marginWorkFunction(functionEnum.MARGIN_BOTTOM, marginBottom);
  };
  const setPaddingLeft = (paddingLeft: number) => {
    paddingWorkFunction(functionEnum.PADDING_LEFT, paddingLeft);
  };
  const setPaddingRight = (paddingRight: number) => {
    paddingWorkFunction(functionEnum.PADDING_RIGHT, paddingRight);
  };
  const setPaddingTop = (paddingTop: number) => {
    paddingWorkFunction(functionEnum.PADDING_TOP, paddingTop);
  };
  const setPaddingBottom = (paddingBottom: number) => {
    paddingWorkFunction(functionEnum.PADDING_BOTTOM, paddingBottom);
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
        (child: IItems) => child.i === settingItemId
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
          (c: IItems) => c.i === settingItemId
        );
        let newChildren = [...item.children];
        newChildren[childIndex] = child;

        return {
          ...item,
          children: newChildren,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  // const handleOpenSetting = () => {
  //   setOpenSetting(false);
  // };

  return (
    <>
      {settingItemId ? (
        <>
          <div className="rounded-[8px] py-2 cursor-pointer overflow-y-scroll fixed top-0 right-0 bottom-0">
            <div
              className="border shadow-sm overflow-x-hidden mt-[40px] sidebar menu"
              ref={ref}
            >
              {/* <div className="delete-div py-3 pl-3">
                <div>Delete</div>
              </div> */}
              {/* <div className="py-4 px-2 text-sm" onClick={handleOpenSetting}>
              {"<"}
              <span className="ml-2">Site Settings</span>
            </div> */}
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
                borderColor={selectedItem?.style?.borderColor}
                width={selectedItem?.style?.width}
                height={selectedItem?.style?.height}
                setWidth={setWidth}
                setHeight={setHeight}
                setBorderColor={setBorderColor}
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
                setCover={setCover}
                setContain={setContain}
                setAuto={setAuto}
                backgroundSize={selectedItem?.style?.backgroundSize}
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
                setMarginLeft={setMarginLeft}
                setMarginRight={setMarginRight}
                setMarginTop={setMarginTop}
                setMarginBottom={setMarginBottom}
                setPaddingLeft={setPaddingLeft}
                setPaddingRight={setPaddingRight}
                setPaddingTop={setPaddingTop}
                setPaddingBottom={setPaddingBottom}
                setSmall={setSmall}
                setMedium={setMedium}
                setLarge={setLarge}
                shadow={selectedItem?.style?.shadow}
                setOn={setOn}
                setIsAuto={setIsAuto}
                isAuto={selectedItem?.style?.isAuto}
                setPlaceholder={setPlaceholder}
                placeholder={selectedItem?.placeholder}
                dynamicWidth={dynamicWidth}
                dynamicHeight={dynamicHeight}
                setDynamicWidth={setDynamicWidth}
                setDynamicHeight={setDynamicHeight}
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Settings;
