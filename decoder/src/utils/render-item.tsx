import { FC } from "react";
import Container from "components/custom-components/container";
import Button from "components/custom-components/button";
import Text from "components/custom-components/text";
import Input from "components/custom-components/input";
import Divider from "components/custom-components/divider";
import Image from "components/custom-components/image";
import NftCard from "components/custom-components/nft-card";
import IItems from "interfaces/items";
import { IInput, IOutput } from "interfaces/value";

interface IRenderItem {
  item: IItems;
  inputValue: IInput[];
  setInputValue: (inputValue: IInput[]) => void;
  outputValue: IOutput[];
  setOutputValue: (outputValue: IOutput[]) => void;
}

const RenderItem: FC<IRenderItem> = ({
  item,
  inputValue,
  setInputValue,
  outputValue,
  setOutputValue,
}) => {
  switch (item.name) {
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
          id={item.i}
          bold={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          value={item.value}
          link={item.link}
          backgroundColor={item.style.backgroundColor}
          outputValue={outputValue}
          margin={item.style.margin}
          padding={item.style.padding}
        />
      );
    case "Input":
      return (
        <Input
          id={item.i}
          inputValue={inputValue}
          setInputValue={setInputValue}
          borderRadius={item.style.borderRadius}
          shadow={item.style.shadow}
          color={item.style.color}
          margin={{ ...item.style.margin }}
        />
      );
    case "Image":
      return (
        <Image
          imgData={item.imgData}
          justifyContent={item.style.justifyContent}
          margin={{ ...item.style.margin }}
        />
      );
    case "Divider":
      return <Divider />;
    case "Container":
    case "Horizontal Container":
    case "Vertical Container":
    case "NFT Container":
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
          inputValue={inputValue}
          setInputValue={setInputValue}
          outputValue={outputValue}
          setOutputValue={setOutputValue}
        />
      );
    case "NFT Card":
    case "NFT Layout":
      return (
        <NftCard
          image={item.image}
          collection={item.collection}
          title={item.title}
          price={item.price}
          highestBid={item.highestBid}
        />
      );
    default:
      return <></>;
  }
};

export default RenderItem;
