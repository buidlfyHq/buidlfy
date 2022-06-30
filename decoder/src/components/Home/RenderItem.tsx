import { FC } from "react";
import Container from "../CustomComponents/Container";
import Button from "../CustomComponents/Button";
import Text from "../CustomComponents/Text";
import Link from "../CustomComponents/Link";
// import Image from "../CustomComponents/Image";
import Input from "../CustomComponents/Input";
import Divider from "../CustomComponents/Divider";
import IItems from "interfaces/items";

interface IRenderItem {
  item: IItems;
  inputValue: object[];
  setInputValue: (inputValue: object[]) => void;
  outputValue: object[];
  setOutputValue: (outputValue: object[]) => void;
}

const RenderItem: FC<IRenderItem> = ({
  item,
  inputValue,
  setInputValue,
  outputValue,
  setOutputValue,
}) => {
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
          backgroundColor={item.style.backgroundColor}
          contractFunction={item.contract}
          inputValue={inputValue}
          setInputValue={setInputValue}
          outputValue={outputValue}
          setOutputValue={setOutputValue}
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
          backgroundColor={item.style.backgroundColor}
          contractFunction={item.contract}
          outputValue={outputValue}
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
          backgroundColor={item.style.backgroundColor}
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
          link={item.link}
          backgroundColor={item.style.backgroundColor}
          contractFunction={item.contract}
          outputValue={outputValue}
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
          link={item.link}
          backgroundColor={item.style.backgroundColor}
          contractFunction={item.contract}
          outputValue={outputValue}
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
          link={item.link}
          backgroundColor={item.style.backgroundColor}
          contractFunction={item.contract}
          outputValue={outputValue}
        />
      );
    case "Input":
      return (
        <Input
          contractFunction={item.contract}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      );
    case "Divider":
      return <Divider />;
    default:
      return <></>;
  }
};

export default RenderItem;
