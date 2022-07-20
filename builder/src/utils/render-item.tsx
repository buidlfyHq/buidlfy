import React, { FC } from "react";
import Container from "components/custom-components/containers";
import Button from "components/custom-components/buttons";
import Text from "components/custom-components/texts";
import Link from "components/custom-components/links";
import Image from "components/custom-components/images";
import Input from "components/custom-components/inputs";
import Divider from "components/custom-components/dividers";
import IItems from "interfaces/items";

interface IRenderItem {
  item: IItems;
  items?: IItems[];
  setItems?: (items?: IItems[]) => void;
  setDrag: (drag?: boolean) => void;
  setOpenSetting?: (openSetting: boolean) => void;
  setSettingItemId?: (settingItemId: string) => void;
  setOpenTab?: (openTab: number) => void;
  setAddContainer?: (addContainer: boolean) => void;
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
  setElementConfig?: (elementConfig: object) => void;
}

const RenderItem: FC<IRenderItem> = ({
  item,
  items,
  setItems,
  setDrag,
  setOpenSetting,
  setSettingItemId,
  setOpenTab,
  setAddContainer,
  selector,
  setSelector,
  elementConfig,
  setElementConfig,
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
          setAddContainer={setAddContainer}
          selector={selector}
          setSelector={setSelector}
          elementConfig={elementConfig}
          setElementConfig={setElementConfig}
        />
      );
    case "Button":
      return (
        <Button
          bold={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          backgroundColor={item.style.backgroundColor}
          link={item.link}
          borderRadius={item.style.borderRadius}
          shadow={item.style.shadow}
          connectWallet={item.connectWallet}
        />
      );
    case "Text":
      return (
        <Text
          bold={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          backgroundColor={item.style.backgroundColor}
          link={item.link}
        />
      );
    case "Link":
      return (
        <Link
          bold={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          backgroundColor={item.style.backgroundColor}
          link={item.link}
        />
      );
    case "Heading 1":
      return (
        <Text
          bold={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          backgroundColor={item.style.backgroundColor}
          link={item.link}
        />
      );
    case "Heading 2":
      return (
        <Text
          bold={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          backgroundColor={item.style.backgroundColor}
          link={item.link}
        />
      );
    case "Heading 3":
      return (
        <Text
          bold={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          backgroundColor={item.style.backgroundColor}
          link={item.link}
        />
      );
    case "Input":
      return (
        <Input
          borderRadius={item.style.borderRadius}
          shadow={item.style.shadow}
          color={item.style.color}
        />
      );
    case "Image":
      return (
        <Image
          imgData={item.imgData}
          justifyContent={item.style.justifyContent}
        />
      );
    case "Divider":
      return <Divider />;
    default:
      return <></>;
  }
};

export default RenderItem;
