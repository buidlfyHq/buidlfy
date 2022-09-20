import React, { FC } from "react";
import Container from "components/custom-components/container";
import Button from "components/custom-components/button";
import Text from "components/custom-components/text";
import Image from "components/custom-components/image";
import Input from "components/custom-components/input";
import Divider from "components/custom-components/divider";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";

interface IRenderItem {
  item: IWorkspaceElement;
  setDrag?: (drag?: boolean) => void;
  setOpenSetting?: (openSetting: boolean) => void;
  setOpenTab?: (openTab: number) => void;
  setIsContainerSelected?: (isContainerSelected: boolean) => void;
  setSideElement?: (sideElement: string) => void;
  dragContainer?: boolean;
  setDragContainer?: (dragContainer?: boolean) => void;
  showSidebar?: () => void;
  hideSidebar?: () => void;
  hideSettingSidebar?: () => void;
}

const RenderItem: FC<IRenderItem> = ({
  item,
  setDrag,
  setOpenSetting,
  setOpenTab,
  setIsContainerSelected,
  setSideElement,
  dragContainer,
  setDragContainer,
  showSidebar,
  hideSidebar,
  hideSettingSidebar,
}) => {
  switch (item.name) {
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
    case "Heading 1":
    case "Heading 2":
    case "Heading 3":
      return (
        <Text
          item={item}
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
          padding={item.style.padding}
        />
      );
    case "Image":
      return (
        <Image
          i={item.i}
          imgData={item.imgData}
          justifyContent={item.style.justifyContent}
          width={item.style.width}
          height={item.style.height}
          backgroundSize={item.style.backgroundSize}
          isAuto={item.style.isAuto}
          margin={item.style.margin}
        />
      );
    case "Divider":
      return <Divider />;
    case "Container":
    case "Horizontal Container":
    case "Vertical Container":
      return (
        <Container
          item={item}
          children={item.children}
          backgroundColor={item.style.backgroundColor}
          color={item.style.color}
          imgData={item.imgData}
          borderRadius={item.style.borderRadius}
          borderWidth={item.style.borderWidth}
          shadow={item.style.shadow}
          setOpenSetting={setOpenSetting}
          setOpenTab={setOpenTab}
          setDrag={setDrag}
          setIsContainerSelected={setIsContainerSelected}
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
