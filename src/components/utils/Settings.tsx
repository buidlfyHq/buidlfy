import React, { useState } from "react";
import SettingComponent from "./SettingComponent";

const Settings = ({items, setItems}) => {
  const [open, setOpen] = useState<Boolean>(false);
  const [settingItem, setSettingItem] = useState(null);

  const setLink = (link: any) => {
    if (!settingItem) {
      return;
    }
    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItem.id) {
        const newO = structuredClone(o);
        if (link) {
          newO.link = link;
        }
        currentItems[i] = newO;
        setItems(currentItems);
        setSettingItem(currentItems[i]);
        return true; // stop searching
      }
    });
  };

  const setValue = (value: any) => {
    if (!settingItem) {
      return;
    }
    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItem.id) {
        const newO = structuredClone(o);
        if (value) {
          newO.value = value;
        }
        currentItems[i] = newO;
        setItems(currentItems);
        setSettingItem(currentItems[i]);
        return true; // stop searching
      }
    });
  };

  const setBold = (fontWeight: boolean) => {
    if (!settingItem) {
      return;
    }

    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItem.id) {
        const newO = structuredClone(o);
        if (fontWeight) {
          newO.style.fontWeight = "bold";
        } else {
          newO.style.fontWeight = "normal";
        }
        currentItems[i] = newO;
        setItems(currentItems);
        setSettingItem(currentItems[i]);
        return true; // stop searching
      }
    });
  };

  const setItalic = (fontStyle: boolean) => {
    if (!settingItem) {
      return;
    }
    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItem.id) {
        const newO = structuredClone(o);
        if (fontStyle) {
          newO.style.fontStyle = "italic";
        } else {
          newO.style.fontStyle = "normal";
        }
        currentItems[i] = newO;
        setItems(currentItems);
        setSettingItem(currentItems[i]);
        return true; // stop searching
      }
    });
  };

  const setUnderline = (textDecoration: boolean) => {
    if (!settingItem) {
      return;
    }
    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItem.id) {
        const newO = structuredClone(o);
        if (textDecoration) {
          newO.style.textDecoration = "underline";
        } else {
          newO.style.textDecoration = "none";
        }
        currentItems[i] = newO;
        setItems(currentItems);
        setSettingItem(currentItems[i]);
        return true; // stop searching
      }
    });
  };

  const setColor = (color: { rgb: any }) => {
    if (!settingItem) {
      return;
    }
    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItem.id) {
        const newO = structuredClone(o);
        if (color) {
          newO.style.color = color;
        }
        currentItems[i] = newO;
        setItems(currentItems);
        setSettingItem(currentItems[i]);
        return true; // stop searching
      }
    });
  };

  const setDeleteComponent = (deleteComponent: any) => {
    if (!settingItem) {
      return;
    }
    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItem.id) {
        const newO = structuredClone(o);
        if (deleteComponent) {
          newO.style.deleteComponent = 1;
        }
        currentItems[i] = newO;
        setItems(currentItems);
        setSettingItem(currentItems[i]);
        return true; // stop searching
      }
    });
  };

  const setCenter = (justifyContent: boolean) => {
    if (!settingItem) {
      return;
    }
    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItem.id) {
        const newO = structuredClone(o);
        if (justifyContent) {
          newO.style.justifyContent = "center";
        } else {
          newO.style.justifyContent = "inherit";
        }
        currentItems[i] = newO;
        setItems(currentItems);
        setSettingItem(currentItems[i]);
        return true; // stop searching
      }
    });
  };

  const setLeft = (justifyContent: boolean) => {
    if (!settingItem) {
      return;
    }
    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItem.id) {
        const newO = structuredClone(o);
        if (justifyContent) {
          newO.style.justifyContent = "left";
        } else {
          newO.style.justifyContent = "inherit";
        }
        currentItems[i] = newO;
        setItems(currentItems);
        setSettingItem(currentItems[i]);
        return true; // stop searching
      }
    });
  };

  const setRight = (justifyContent: boolean) => {
    if (!settingItem) {
      return;
    }
    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItem.id) {
        const newO = structuredClone(o);
        if (justifyContent) {
          newO.style.justifyContent = "right";
        } else {
          newO.style.justifyContent = "inherit";
        }
        currentItems[i] = newO;
        setItems(currentItems);
        setSettingItem(currentItems[i]);
        return true; // stop searching
      }
    });
  };

  const setFontSize = (fontSize: any) => {
    if (!settingItem) {
      return;
    }
    let currentItems = [...items];
    currentItems.map((o, i) => {
      if (o.id === settingItem.id) {
        const newO = structuredClone(o);
        if (fontSize) {
          newO.style.fontSize = fontSize;
        }
        currentItems[i] = newO;
        setItems(currentItems);
        setSettingItem(currentItems[i]);
        return true; // stop searching
      }
    });
  };

  return (
    <>
      {open ? (
        <span>
          {settingItem ? (
            <SettingComponent
              open={open}
              setOpen={setOpen}
              setLink={setLink}
              link={settingItem?.link}
              setValue={setValue}
              value={settingItem?.value}
              setBold={setBold}
              bold={settingItem?.style?.fontWeight}
              setItalic={setItalic}
              italic={settingItem?.style?.fontStyle}
              setUnderline={setUnderline}
              underline={settingItem?.style?.textDecoration}
              color={settingItem?.style?.fontStyle}
              setColor={setColor}
              setDeleteComponent={setDeleteComponent}
              deleteComponent={settingItem?.style?.deleteComponent}
              setCenter={setCenter}
              setLeft={setLeft}
              justifyContent={settingItem?.style?.justifyContent}
              setRight={setRight}
              fontSize={settingItem?.style?.fontSize}
              setFontSize={setFontSize}
            />
          ) : null}
        </span>
      ) : null}
    </>
  );
};

export default Settings;
