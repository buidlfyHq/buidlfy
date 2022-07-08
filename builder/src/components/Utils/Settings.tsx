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
      } else if (selectedChild?.i == settingItemId) {
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
      } else if (selectedChild?.i == settingItemId) {
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

  const utilityFunction = (style,property, value1, value2) => {
    console.log(property)
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
            fontWeight: property ? value1 : value2,
          },
        };
      } else if (selectedChild?.i == settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            fontWeight: property ? value1 : value2,
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
    // utilityFunction("fontWeight", fontWeight, "bold", "normal")
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
            fontWeight: fontWeight ? "bold" : "normal",
          },
        };
      } else if (selectedChild?.i == settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            fontWeight: fontWeight ? "bold" : "normal",
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

  const setItalic = (fontStyle: boolean) => {
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
            fontStyle: fontStyle ? "italic" : "normal",
          },
        };
      } else if (selectedChild?.i == settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            fontStyle: fontStyle ? "italic" : "normal",
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

  const setUnderline = (textDecoration: boolean) => {
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
            textDecoration: textDecoration ? "underline" : "none",
          },
        };
      } else if (selectedChild?.i == settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            textDecoration: textDecoration ? "underline" : "none",
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

  const setColor = (color: { rgb: any }) => {
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
            color: color,
          },
        };
      } else if (selectedChild?.i == settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            color: color,
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

  const setBgColor = (backgroundColor: { rgb: any }) => {
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
            backgroundColor: backgroundColor,
          },
        };
      } else if (selectedChild?.i == settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            backgroundColor: backgroundColor,
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
            deleteComponent: deleteComponent,
          },
        };
      } else if (selectedChild?.i == settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            deleteComponent: deleteComponent,
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

  const setCenter = (justifyContent: boolean) => {
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
            justifyContent: justifyContent ? "center" : "inherit",
          },
        };
      } else if (selectedChild?.i == settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            justifyContent: justifyContent ? "center" : "inherit",
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

  const setLeft = (justifyContent: boolean) => {
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
            justifyContent: justifyContent ? "left" : "inherit",
          },
        };
      } else if (selectedChild?.i == settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            justifyContent: justifyContent ? "left" : "inherit",
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

  const setRight = (justifyContent: boolean) => {
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
            justifyContent: justifyContent ? "right" : "inherit",
          },
        };
      } else if (selectedChild?.i == settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            justifyContent: justifyContent ? "right" : "inherit",
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

  const setSmall = (shadow: boolean) => {
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
            shadow: shadow ? "0 1px 2px 0 rgb(0 0 0 / 0.05)" : "none",
          },
        };
      } else if (selectedChild?.i == settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            shadow: shadow ? "0 1px 2px 0 rgb(0 0 0 / 0.05)" : "none",
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

  const setMedium = (shadow: boolean) => {
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
            shadow: shadow
              ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
              : "inherit",
          },
        };
      } else if (selectedChild?.i == settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            shadow: shadow
              ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
              : "inherit",
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

  const setLarge = (shadow: boolean) => {
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
            shadow: shadow
              ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
              : "inherit",
          },
        };
      } else if (selectedChild?.i == settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            shadow: shadow
              ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
              : "inherit",
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
  const setFontSize = (fontSize: any) => {
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
      } else if (selectedChild?.i == settingItemId) {
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

  const setBorderRadius = (borderRadius: any) => {
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
            borderRadius: borderRadius,
          },
        };
      } else if (selectedChild?.i == settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            borderRadius: borderRadius,
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

  const setBorderWidth = (borderWidth: any) => {
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
            borderWidth: borderWidth,
          },
        };
      } else if (selectedChild?.i == settingItemId) {
        let child = {
          ...selectedChild,
          style: {
            ...selectedChild["style"],
            borderWidth: borderWidth,
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
      } else if (selectedChild?.i == settingItemId) {
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
