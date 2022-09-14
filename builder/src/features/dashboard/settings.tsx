import React, { useState, useRef, FC } from "react";
import SettingComponent from "components/utils/render-setting";
import IItems from "interfaces/items";
import ISettings from "interfaces/settings";
import IColor from "interfaces/color";

enum FontEnum {
  BOLD = "bold",
  ITALIC = "italic",
  NORMAL = "normal",
}

enum FunctionEnum {
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

enum BackgroundFunction {
  CONTAIN = "setContain",
  COVER = "setCover",
  AUTO = "setAuto",
  WIDTH = "setWidth",
  HEIGHT = "setHeight",
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
    styleProp: FunctionEnum,
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
    styleProp: FunctionEnum,
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
    styleProp: FunctionEnum,
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
      FunctionEnum.FONT_WEIGHT,
      fontWeight,
      FontEnum.BOLD,
      FontEnum.NORMAL
    );
  };

  const setItalic = (fontStyle: boolean) => {
    utilityFunction(
      FunctionEnum.FONT_STYLE,
      fontStyle,
      FontEnum.ITALIC,
      FontEnum.NORMAL
    );
  };

  const setUnderline = (textDecoration: boolean) => {
    utilityFunction(
      FunctionEnum.TEXT_DECORATION,
      textDecoration,
      "underline",
      "none"
    );
  };

  const singleWorkFunction = (
    styleProp: FunctionEnum,
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
    styleProp: FunctionEnum,
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
    styleProp: FunctionEnum,
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
    singleWorkFunction(FunctionEnum.COLOR, color);
  };
  const setBorderColor = (borderColor: string) => {
    singleWorkFunction(FunctionEnum.BORDER_COLOR, borderColor);
  };

  const setBackgroundColor = (backgroundColor: string) => {
    singleWorkFunction(FunctionEnum.BACKGROUND_COLOR, backgroundColor);
  };

  const setDeleteComponent = (deleteComponent: number) => {
    singleWorkFunction(FunctionEnum.DELETE_COMPONENT, deleteComponent);
  };

  const setCenter = (justifyContent: boolean) => {
    utilityFunction(
      FunctionEnum.JUSTIFY_CONTENT,
      justifyContent,
      "center",
      "inherit"
    );
  };
  const setIsAuto = (isAuto: boolean) => {
    singleWorkFunction(FunctionEnum.AUTO, isAuto);
  };
  const handleBackground = (
    action: BackgroundFunction,
    width?: number,
    height?: number,
    backgroundSize?: boolean
  ) => {
    if (action == BackgroundFunction.CONTAIN) {
      backgroundSizeFunction(
        FunctionEnum.BACKGROUND_SIZE,
        backgroundSize,
        "contain",
        "contain"
      );
    } else if (action == BackgroundFunction.COVER) {
      backgroundSizeFunction(
        FunctionEnum.BACKGROUND_SIZE,
        backgroundSize,
        "cover",
        "contain"
      );
    } else if (action == BackgroundFunction.AUTO) {
      backgroundSizeFunction(
        FunctionEnum.BACKGROUND_SIZE,
        backgroundSize,
        "auto",
        "contain"
      );
    } else if (action == BackgroundFunction.WIDTH) {
      singleImageSizeFunction(FunctionEnum.WIDTH, width);
    } else if (action == BackgroundFunction.HEIGHT) {
      singleImageSizeFunction(FunctionEnum.HEIGHT, height);
    }
  };

  const setLeft = (justifyContent: boolean) => {
    utilityFunction(
      FunctionEnum.JUSTIFY_CONTENT,
      justifyContent,
      "left",
      "inherit"
    );
  };

  const setRight = (justifyContent: boolean) => {
    utilityFunction(
      FunctionEnum.JUSTIFY_CONTENT,
      justifyContent,
      "right",
      "inherit"
    );
  };

  const setSmall = (shadow: boolean) => {
    utilityFunction(
      FunctionEnum.SHADOW,
      shadow,
      "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      "none"
    );
  };

  const setMedium = (shadow: boolean) => {
    utilityFunction(
      FunctionEnum.SHADOW,
      shadow,
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      "inherit"
    );
  };

  const setLarge = (shadow: boolean) => {
    utilityFunction(
      FunctionEnum.SHADOW,
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

  const setBorderRadius = (borderRadius: number) => {
    singleWorkFunction(FunctionEnum.BORDER_RADIUS, borderRadius);
  };
  const setMarginLeft = (marginLeft: number) => {
    marginWorkFunction(FunctionEnum.MARGIN_LEFT, marginLeft);
  };
  const setMarginRight = (marginRight: number) => {
    marginWorkFunction(FunctionEnum.MARGIN_RIGHT, marginRight);
  };
  const setMarginTop = (marginTop: number) => {
    marginWorkFunction(FunctionEnum.MARGIN_TOP, marginTop);
  };
  const setMarginBottom = (marginBottom: number) => {
    marginWorkFunction(FunctionEnum.MARGIN_BOTTOM, marginBottom);
  };
  const setPaddingLeft = (paddingLeft: number) => {
    paddingWorkFunction(FunctionEnum.PADDING_LEFT, paddingLeft);
  };
  const setPaddingRight = (paddingRight: number) => {
    paddingWorkFunction(FunctionEnum.PADDING_RIGHT, paddingRight);
  };
  const setPaddingTop = (paddingTop: number) => {
    paddingWorkFunction(FunctionEnum.PADDING_TOP, paddingTop);
  };
  const setPaddingBottom = (paddingBottom: number) => {
    paddingWorkFunction(FunctionEnum.PADDING_BOTTOM, paddingBottom);
  };
  const setBorderWidth = (borderWidth: number) => {
    singleWorkFunction(FunctionEnum.BORDER_WIDTH, borderWidth);
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
                setWidth={(width) =>
                  handleBackground(BackgroundFunction.WIDTH, width)
                }
                setHeight={(height) =>
                  handleBackground(BackgroundFunction.HEIGHT, undefined, height)
                }
                setBorderColor={setBorderColor}
                setColor={setColor}
                setBackgroundColor={setBackgroundColor}
                backgroundColor={selectedItem?.style?.backgroundColor}
                setDeleteComponent={setDeleteComponent}
                deleteComponent={selectedItem?.style?.deleteComponent}
                justifyContent={selectedItem?.style?.justifyContent}
                setLeft={setLeft}
                setCenter={setCenter}
                setRight={setRight}
                setFontSize={setFontSize}
                setCover={(backgroundSize: boolean) =>
                  handleBackground(
                    BackgroundFunction.COVER,
                    undefined,
                    undefined,
                    backgroundSize
                  )
                }
                setContain={(backgroundSize: boolean) =>
                  handleBackground(
                    BackgroundFunction.CONTAIN,
                    undefined,
                    undefined,
                    backgroundSize
                  )
                }
                setAuto={(backgroundSize: boolean) =>
                  handleBackground(
                    BackgroundFunction.AUTO,
                    undefined,
                    undefined,
                    backgroundSize
                  )
                }
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
