import React from "react";
import SettingComponent from "./SettingComponent";

const Settings = ({ items, setItems, settingItemId, setOpen }) => {
  const selectedItem = items.find((item) => item.id === settingItemId);

  const setLink = (link: any) => {
    if (!settingItemId) {
      return;
    }
    const updatedItems = items.map((item) => {
      if (item.id === settingItemId) {
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
      if (item.id === settingItemId) {
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

    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItemId) {
        const newO = structuredClone(o);
        if (fontWeight) {
          newO.style.fontWeight = "bold";
        } else {
          newO.style.fontWeight = "normal";
        }
        currentItems[i] = newO;
        setItems(currentItems);
        return true; // stop searching
      }
    });
  };

  const setItalic = (fontStyle: boolean) => {
    if (!settingItemId) {
      return;
    }
    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItemId) {
        const newO = structuredClone(o);
        if (fontStyle) {
          newO.style.fontStyle = "italic";
        } else {
          newO.style.fontStyle = "normal";
        }
        currentItems[i] = newO;
        setItems(currentItems);
        return true; // stop searching
      }
    });
  };

  const setUnderline = (textDecoration: boolean) => {
    if (!settingItemId) {
      return;
    }
    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItemId) {
        const newO = structuredClone(o);
        if (textDecoration) {
          newO.style.textDecoration = "underline";
        } else {
          newO.style.textDecoration = "none";
        }
        currentItems[i] = newO;
        setItems(currentItems);
        return true; // stop searching
      }
    });
  };

  const setColor = (color: { rgb: any }) => {
    if (!settingItemId) {
      return;
    }
    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItemId) {
        const newO = structuredClone(o);
        if (color) {
          newO.style.color = color;
        }
        currentItems[i] = newO;
        setItems(currentItems);
        return true; // stop searching
      }
    });
  };

  const setDeleteComponent = (deleteComponent: any) => {
    if (!settingItemId) {
      return;
    }
    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItemId) {
        const newO = structuredClone(o);
        if (deleteComponent) {
          newO.style.deleteComponent = 1;
        }
        currentItems[i] = newO;
        setItems(currentItems);
        return true; // stop searching
      }
    });
  };

  const setCenter = (justifyContent: boolean) => {
    if (!settingItemId) {
      return;
    }
    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItemId) {
        const newO = structuredClone(o);
        if (justifyContent) {
          newO.style.justifyContent = "center";
        } else {
          newO.style.justifyContent = "inherit";
        }
        currentItems[i] = newO;
        setItems(currentItems);
        return true; // stop searching
      }
    });
  };

  const setLeft = (justifyContent: boolean) => {
    if (!settingItemId) {
      return;
    }
    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItemId) {
        const newO = structuredClone(o);
        if (justifyContent) {
          newO.style.justifyContent = "left";
        } else {
          newO.style.justifyContent = "inherit";
        }
        currentItems[i] = newO;
        setItems(currentItems);
        return true; // stop searching
      }
    });
  };

  const setRight = (justifyContent: boolean) => {
    if (!settingItemId) {
      return;
    }
    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItemId) {
        const newO = structuredClone(o);
        if (justifyContent) {
          newO.style.justifyContent = "right";
        } else {
          newO.style.justifyContent = "inherit";
        }
        currentItems[i] = newO;
        setItems(currentItems);
        return true; // stop searching
      }
    });
  };

  const setFontSize = (fontSize: any) => {
    if (!settingItemId) {
      return;
    }
    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItemId) {
        const newO = structuredClone(o);
        if (fontSize) {
          newO.style.fontSize = fontSize;
        }
        currentItems[i] = newO;
        setItems(currentItems);
        return true; // stop searching
      }
    });
  };

  return (
    <>
      {settingItemId ? (
        <SettingComponent
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
          color={selectedItem?.style?.fontStyle}
          setColor={setColor}
          setDeleteComponent={setDeleteComponent}
          deleteComponent={selectedItem?.style?.deleteComponent}
          setCenter={setCenter}
          setLeft={setLeft}
          justifyContent={selectedItem?.style?.justifyContent}
          setRight={setRight}
          fontSize={selectedItem?.style?.fontSize}
          setFontSize={setFontSize}
        />
      ) : null}
    </>
  );
};

export default Settings;
