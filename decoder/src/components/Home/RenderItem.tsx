import { FC } from "react";
import Container from "../CustomComponents/Container";
import Button from "../CustomComponents/Button";
import HeadingOne from "../CustomComponents/HeadingOne";
import Text from "../CustomComponents/Text";
import Link from "../CustomComponents/Link";
import Input from "../CustomComponents/Input";
import HeadingThree from "../CustomComponents/HeadingThree";
import HeadingTwo from "../CustomComponents/HeadingTwo";
import Divider from "../CustomComponents/Divider";
import Image from "../CustomComponents/Image";
import IItems from "interfaces/items";
import ConnectWallet from "components/ConnectWallet";

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
      return (
        <Container
          backgroundColor={item.style.backgroundColor}
          color={item.style.color}
          imgData={item.imgData}
          borderRadius={item.style.borderRadius}
          borderWidth={item.style.borderWidth}
          shadow={item.style.shadow}
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
          borderRadius={item.style.borderRadius}
          value={item.value}
          link={item.link}
          backgroundColor={item.style.backgroundColor}
          contractFunction={item.contract}
          inputValue={inputValue}
          setInputValue={setInputValue}
          outputValue={outputValue}
          setOutputValue={setOutputValue}
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
        <HeadingOne
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
        <HeadingTwo
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
        <HeadingThree
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
          borderRadius={item.style.borderRadius}
          shadow={item.style.shadow}
        />
      );
    case "Divider":
      return <Divider />;
    case "Image":
      return <Image imgData={item.imgData} />;
    default:
      return <></>;
  }
};

export default RenderItem;
