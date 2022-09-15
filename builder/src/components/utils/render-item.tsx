import React, { FC } from "react";
import Container from "components/custom-components/container";
import Button from "components/custom-components/button";
import Text from "components/custom-components/text";
import Image from "components/custom-components/image";
import Input from "components/custom-components/input";
import Divider from "components/custom-components/divider";
import IItems from "interfaces/items";

interface IRenderItem {
  item: IItems;
  items?: IItems[];
  setItems?: (items?: IItems[]) => void;
  setDrag: (drag?: boolean) => void;
  setOpenSetting?: (openSetting: boolean) => void;
  setSettingItemId?: (settingItemId: string) => void;
  setOpenTab?: (openTab: number) => void;
  setIsContainerSelected?: (isContainerSelected: boolean) => void;
  selector?: {
    methodName: string;
    type: string;
    name: string;
    buttonId: string;
  };
  setSelector?: (selector: {
    methodName: string;
    type: string;
    name: string;
    buttonId: string;
  }) => void;
  elementConfig?: object;
  setSideElement: (sideElement: string) => void;
  setElementConfig?: (elementConfig: object) => void;
  dragContainer?: boolean;
  setDragContainer?: (dragContainer?: boolean) => void;
  showSidebar?: () => void;
  hideSidebar?: () => void;
  hideSettingSidebar?: () => void;
}

const RenderItem: FC<IRenderItem> = ({
  item,
  items,
  setItems,
  setDrag,
  setOpenSetting,
  setSettingItemId,
  setOpenTab,
  setIsContainerSelected,
  selector,
  setSelector,
  elementConfig,
  setElementConfig,
  setSideElement,
  dragContainer,
  setDragContainer,
  showSidebar,
  hideSidebar,
  hideSettingSidebar,
}) => {
  switch (item.name) {
    case "Container":
      return (
        <Container
          item={item}
          items={items}
          setItems={setItems}
          children={item.children}
          backgroundColor={item.style.backgroundColor}
          color={item.style.color}
          imgData={item.imgData}
          borderRadius={item.style.borderRadius}
          borderWidth={item.style.borderWidth}
          shadow={item.style.shadow}
          setOpenSetting={setOpenSetting}
          setSettingItemId={setSettingItemId}
          setOpenTab={setOpenTab}
          setDrag={setDrag}
          setIsContainerSelected={setIsContainerSelected}
          selector={selector}
          setSelector={setSelector}
          elementConfig={elementConfig}
          setElementConfig={setElementConfig}
          setSideElement={setSideElement}
          dragContainer={dragContainer}
          setDragContainer={setDragContainer}
          showSidebar={showSidebar}
          hideSidebar={hideSidebar}
          hideSettingSidebar={hideSettingSidebar}
          padding={item.style.padding}
        />
      );
    case "Button":
      return (
        <Button
          bold={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          borderColor={item.style.borderColor}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          backgroundColor={item.style.backgroundColor}
          link={item.link}
          borderRadius={item.style.borderRadius}
          shadow={item.style.shadow}
          connectWallet={item.connectWallet}
          margin={item.style.margin}
          padding={item.style.padding}
        />
      );
    case "Text":
      return (
        <Text
          item={item}
          items={items}
          bold={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          backgroundColor={item.style.backgroundColor}
          link={item.link}
          margin={item.style.margin}
          padding={item.style.padding}
        />
      );
    case "Heading 1":
      return (
        <Text
          item={item}
          items={items}
          bold={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          backgroundColor={item.style.backgroundColor}
          link={item.link}
          margin={item.style.margin}
          padding={item.style.padding}
        />
      );
    case "Heading 2":
      return (
        <Text
          item={item}
          items={items}
          bold={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          backgroundColor={item.style.backgroundColor}
          link={item.link}
          margin={item.style.margin}
          padding={item.style.padding}
        />
      );
    case "Heading 3":
      return (
        <Text
          item={item}
          items={items}
          bold={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          backgroundColor={item.style.backgroundColor}
          link={item.link}
          margin={item.style.margin}
          padding={item.style.padding}
        />
      );
    case "Input":
      return (
        <Input
          placeholder={item.placeholder}
          borderRadius={item.style.borderRadius}
          shadow={item.style.shadow}
          color={item.style.color}
          margin={item.style.margin}
        />
      );
    case "Image":
      return (
        <Image
          imgData={item.imgData}
          justifyContent={item.style.justifyContent}
          margin={item.style.margin}
        />
      );
    case "Divider":
      return <Divider />;
    case "Horizontal Container":
      return (
        <Container
          item={item}
          items={items}
          setItems={setItems}
          children={item.children}
          backgroundColor={item.style.backgroundColor}
          color={item.style.color}
          imgData={item.imgData}
          borderRadius={item.style.borderRadius}
          borderWidth={item.style.borderWidth}
          shadow={item.style.shadow}
          setOpenSetting={setOpenSetting}
          setSettingItemId={setSettingItemId}
          setOpenTab={setOpenTab}
          setDrag={setDrag}
          setIsContainerSelected={setIsContainerSelected}
          selector={selector}
          setSelector={setSelector}
          elementConfig={elementConfig}
          setElementConfig={setElementConfig}
          setSideElement={setSideElement}
          dragContainer={dragContainer}
          setDragContainer={setDragContainer}
          showSidebar={showSidebar}
          hideSidebar={hideSidebar}
          hideSettingSidebar={hideSettingSidebar}
          padding={item.style.padding}
        />
      );
    case "Vertical Container":
      return (
        <Container
          item={item}
          items={items}
          setItems={setItems}
          children={item.children}
          backgroundColor={item.style.backgroundColor}
          color={item.style.color}
          imgData={item.imgData}
          borderRadius={item.style.borderRadius}
          borderWidth={item.style.borderWidth}
          shadow={item.style.shadow}
          setOpenSetting={setOpenSetting}
          setSettingItemId={setSettingItemId}
          setOpenTab={setOpenTab}
          setDrag={setDrag}
          setIsContainerSelected={setIsContainerSelected}
          selector={selector}
          setSelector={setSelector}
          elementConfig={elementConfig}
          setElementConfig={setElementConfig}
          setSideElement={setSideElement}
          dragContainer={dragContainer}
          setDragContainer={setDragContainer}
          showSidebar={showSidebar}
          hideSidebar={hideSidebar}
          hideSettingSidebar={hideSettingSidebar}
          padding={item.style.padding}
        />
      );
    default:
      return <></>;
  }
};

export default RenderItem;
