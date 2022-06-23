import React, { useState } from "react";
import SettingComponent from "./SettingComponent";
import IItems from "interfaces/items";

const Settings = ({
  items,
  setItems,
  settingItemId,
  contractConfig,
  setContractConfig,
  setOpen,
  setSelector,
  elementConfig,
  setElementConfig,
  openTab,
  setOpenTab,
  selectedElements,
  setSelectedElements,
}) => {
  const [showComponent, setShowComponent] = useState<any>(null); // for abi method component
  const selectedItem: IItems = items.find((item) => item.i === settingItemId);

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
    const updatedItems = items.map((item: { [x: string]: any; i: any }) => {
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

  return (
    <>
      {settingItemId ? (
        <SettingComponent
          items={items}
          setItems={setItems}
          selectedItem={selectedItem}
          setOpen={setOpen}
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
          color={{ r: 0, g: 0, b: 0, a: 100 }}
          setColor={setColor}
          setDeleteComponent={setDeleteComponent}
          deleteComponent={selectedItem?.style?.deleteComponent}
          setCenter={setCenter}
          setLeft={setLeft}
          justifyContent={selectedItem?.style?.justifyContent}
          setRight={setRight}
          fontSize={selectedItem?.style?.fontSize}
          setFontSize={setFontSize}
          contractConfig={contractConfig}
          setContractConfig={setContractConfig}
          showComponent={showComponent}
          setShowComponent={setShowComponent}
          setSelector={setSelector}
          elementConfig={elementConfig}
          setElementConfig={setElementConfig}
          openTab={openTab}
          setOpenTab={setOpenTab}
          selectedElements={selectedElements}
          setSelectedElements={setSelectedElements}
        />
      ) : null}
    </>
  );
};

export default Settings;
