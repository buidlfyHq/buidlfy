import React, { FC } from "react";
import Container from "../CustomComponents/Container";
import Button from "../CustomComponents/Button";
import Text from "../CustomComponents/Text";
import Link from "../CustomComponents/Link";
import Image from "../CustomComponents/Image";
import Input from "../CustomComponents/Input";
import Divider from "../CustomComponents/Divider";
import IItems from "interfaces/items";

interface IRenderItem {
  item: IItems;
  imgData: { id: string; data: string | ArrayBuffer }[];
}

const RenderItem: FC<IRenderItem> = ({ item, imgData }) => {
  switch (item.name) {
    case "Container":
      return (
        <Container
          backgroundColor={item.style.backgroundColor}
          color={item.style.color}
          imgData={item.imgData}
          borderRadius={item.style.borderRadius}
          borderWidth={item.style.borderWidth}
          shadow={item.style.shadow}
          // borderRadius={item.style.borderRadius}
          // boxShadow={item.style.boxShadow}
          // zIndex={item.style.zIndex}
          // border={item.style.border}
          // backgroundImg={item.style.backgroundImg}
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
        />
      );
    case "Image":
      return <Image imgData={item.imgData} />;
    case "Divider":
      return <Divider />;
    default:
      return <></>;
  }
};

export default RenderItem;
