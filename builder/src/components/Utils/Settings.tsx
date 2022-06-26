import React, { useState, FC } from "react";
import SettingComponent from "./SettingComponent";
import IItems from "interfaces/items";

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
}) => {
  const [showComponent, setShowComponent] = useState<any>(null); // for abi method component
  const selectedItem = items.find((item) => item.i === settingItemId);

  const setLink = (link: string) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      if (item.i === settingItemId) {
        return { ...item, link };
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
      if (item.i === settingItemId) {
        return { ...item, value };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const setBold = (fontWeight: boolean) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      if (item.i === settingItemId) {
        return {
          ...item,
          style: {
            ...item["style"],
            fontWeight: fontWeight ? "bold" : "normal",
          },
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const setItalic = (fontStyle: boolean) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      if (item.i === settingItemId) {
        return {
          ...item,
          style: {
            ...item["style"],
            fontStyle: fontStyle ? "italic" : "normal",
          },
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const setUnderline = (textDecoration: boolean) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      if (item.i === settingItemId) {
        return {
          ...item,
          style: {
            ...item["style"],
            textDecoration: textDecoration ? "underline" : "none",
          },
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const setColor = (color: { rgb: any }) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      if (item.i === settingItemId) {
        return {
          ...item,
          style: {
            ...item["style"],
            color: color,
          },
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const setBgColor = (backgroundColor: { rgb: any }) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      if (item.i === settingItemId) {
        return {
          ...item,
          style: {
            ...item["style"],
            backgroundColor: backgroundColor,
          },
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const setDeleteComponent = (deleteComponent: any) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      if (item.i === settingItemId) {
        return {
          ...item,
          style: {
            ...item["style"],
            deleteComponent: deleteComponent,
          },
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const setCenter = (justifyContent: boolean) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      if (item.i === settingItemId) {
        return {
          ...item,
          style: {
            ...item["style"],
            justifyContent: justifyContent ? "center" : "inherit",
          },
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const setLeft = (justifyContent: boolean) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      if (item.i === settingItemId) {
        return {
          ...item,
          style: {
            ...item["style"],
            justifyContent: justifyContent ? "left" : "inherit",
          },
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const setRight = (justifyContent: boolean) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      if (item.i === settingItemId) {
        return {
          ...item,
          style: {
            ...item["style"],
            justifyContent: justifyContent ? "right" : "inherit",
          },
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const setFontSize = (fontSize: any) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      if (item.i === settingItemId) {
        return {
          ...item,
          style: {
            ...item["style"],
            fontSize: fontSize,
          },
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  console.log(items);

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
          setColor={setColor}
          color={selectedItem?.style?.fontStyle}
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
        />
      ) : null}
    </>
  );
};

export default Settings;
