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
  // made imgdata optional to test container
  imgData?: { id: string; data: string | ArrayBuffer }[];
  setDrag: React.Dispatch<React.SetStateAction<boolean>>
}

const RenderItem: FC<IRenderItem> = ({ 
  item, 
  imgData, 
  setDrag
}) => {
  switch (item.name) {
    case "Container":
      return (
        <Container setDrag={setDrag} />
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
      return <Input />;
    case "Image":
      return <Image imgData={item.imgData} />;
    case "Divider":
      return <Divider />;
    default:
      return <></>;
  }
};

export default RenderItem;
