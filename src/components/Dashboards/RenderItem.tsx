import React, { FC } from "react";
import Container from "../CustomComponents/Container";
import Button from "../CustomComponents/Button";
import HeadingOne from "../CustomComponents/HeadingOne";
import Text from "../CustomComponents/Text";
import Link from "../CustomComponents/Link";
import Image from "../CustomComponents/Image";
import Input from "../CustomComponents/Input";
import HeadingThree from "../CustomComponents/HeadingThree";
import HeadingTwo from "../CustomComponents/HeadingTwo";
import Divider from "../CustomComponents/Divider";
import IItems from "interfaces/items";

const RenderItem: FC<{ item: IItems }> = ({ item }) => {
  switch (item.name) {
    case "Container":
      return <Container />;
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
          link={item.link}
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
          link={item.link}
        />
      );
    case "Heading 1":
      return (
        <HeadingOne
          bold={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          link={item.link}
        />
      );
    case "Heading 2":
      return (
        <HeadingTwo
          bold={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          link={item.link}
        />
      );
    case "Heading 3":
      return (
        <HeadingThree
          bold={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          link={item.link}
        />
      );
    case "Input":
      return <Input />;
    case "Image":
      return <Image />;
    case "Divider":
      return <Divider />;
    default:
      return <></>;
  }
};

export default RenderItem;
