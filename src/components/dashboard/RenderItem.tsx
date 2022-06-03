import React from "react";
import Container from "../Container";
import Button from "../Button";
import HeadingOne from "../HeadingOne";
import Text from "../Text";
import Link from "../Link";
import Image from "../Image";
import Input from "../Input";
import HeadingThree from "../HeadingThree";
import HeadingTwo from "../HeadingTwo";
import Divider from "../Divider";

const RenderItem = ({ item }) => {
  switch (item.name) {
    case "Container":
      return <Container deleteComponent={item.style.deleteComponent} />;
    case "Button":
      return (
        <Button
          bold={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          deleteComponent={item.style.deleteComponent}
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
          deleteComponent={item.style.deleteComponent}
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
          deleteComponent={item.style.deleteComponent}
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
          deleteComponent={item.style.deleteComponent}
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
          deleteComponent={item.style.deleteComponent}
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
          deleteComponent={item.style.deleteComponent}
          value={item.value}
          link={item.link}
        />
      );
    case "Input":
      return <Input deleteComponent={item.style.deleteComponent} />;
    case "Image":
      return <Image deleteComponent={item.style.deleteComponent} />;
    case "Divider":
      return <Divider deleteComponent={item.style.deleteComponent} />;
    default:
      return <></>;
  }
};

export default RenderItem;
