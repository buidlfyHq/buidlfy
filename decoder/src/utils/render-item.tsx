import { FC } from "react";
import Container from "components/custom-components/container";
import Button from "components/custom-components/button";
import Text from "components/custom-components/text";
import Input from "components/custom-components/input";
import Divider from "components/custom-components/divider";
import Image from "components/custom-components/image";
import IWorkspace from "interfaces/workspace";
import { IInput, IOutput } from "interfaces/value";
import LensterWidget from "components/custom-components/lenster-widget";
import List from "components/custom-components/list";
import Dropdown from "components/custom-components/dropdown";
import Checkbox from "components/custom-components/checkbox";
import RadioButton from "components/custom-components/radio";
import Badge from "components/custom-components/badge";

interface IRenderItem {
  item: IWorkspace;
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
    case "Container" || "Horizontal Container" || "Vertical Container":
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
          padding={item.style.padding}
          margin={item.style.margin}
          backgroundSize={item.style.backgroundSize}
        />
      );
    case "Button":
      return (
        <Button
          fontWeight={item.style.fontWeight}
          italic={item.style.fontStyle}
          underline={item.style.textDecoration}
          color={item.style.color}
          borderColor={item.style.borderColor}
          justifyContent={item.style.justifyContent}
          fontSize={item.style.fontSize}
          borderRadius={item.style.borderRadius}
          borderWidth={item.style.borderWidth}
          value={item.value}
          link={item.link}
          backgroundColor={item.style.backgroundColor}
          contractFunction={item.contract}
          oracleFunction={item.oracle}
          inputValue={inputValue}
          setInputValue={setInputValue}
          outputValue={outputValue}
          setOutputValue={setOutputValue}
          shadow={item.style.shadow}
          connectWallet={item.connectWallet}
          margin={item.style.margin}
          padding={item.style.padding}
          fontFamily={item.style.fontFamily}
        />
      );
    case "Text":
    case "Heading 1":
    case "Heading 2":
    case "Heading 3":
      return (
        <Text
          id={item.i}
          fontWeight={item.style.fontWeight}
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
          fontFamily={item.style.fontFamily}
        />
      );
    case "Input":
      return (
        <Input
          i={item.i}
          inputValue={inputValue}
          setInputValue={setInputValue}
          borderRadius={item.style.borderRadius}
          shadow={item.style.shadow}
          color={item.style.color}
          margin={item.style.margin}
          padding={item.style.padding}
          placeholder={item.placeholder}
          backgroundColor={item.style.backgroundColor}
          borderColor={item.style.borderColor}
        />
      );
    case "Image":
      return (
        <Image
          imgData={item.imgData}
          justifyContent={item.style.justifyContent}
          width={item.style.width}
          height={item.style.height}
          backgroundSize={item.style.backgroundSize}
          isAuto={item.style.isAuto}
          margin={item.style.margin}
          link={item.link}
        />
      );
    case "Divider":
      return (
        <Divider
          margin={item.style.margin}
          borderRadius={item.style.borderRadius}
          borderWidth={item.style.borderWidth}
          borderColor={item.style.borderColor}
        />
      );
    case "List":
      return (
        <List
          i={item.i}
          fontWeight={item.style.fontWeight}
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
          fontFamily={item.style.fontFamily}
          listType={item.style.listType}
          listOptions={item.listOptions}
        />
      );
    case "Dropdown":
      return (
        <Dropdown
          i={item.i}
          fontWeight={item.style.fontWeight}
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
          fontFamily={item.style.fontFamily}
          borderRadius={item.style.borderRadius}
          borderWidth={item.style.borderWidth}
          shadow={item.style.shadow}
          borderColor={item.style.borderColor}
          listOptions={item.listOptions}
        />
      );
    case "Checkbox":
      return (
        <Checkbox
          fontWeight={item.style.fontWeight}
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
          fontFamily={item.style.fontFamily}
        />
      );
    case "Radio":
      return (
        <RadioButton
          fontWeight={item.style.fontWeight}
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
          fontFamily={item.style.fontFamily}
        />
      );
    case "Badge":
    case "Status":
      return (
        <Badge
          fontWeight={item.style.fontWeight}
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
          borderWidth={item.style.borderWidth}
          shadow={item.style.shadow}
          connectWallet={item.connectWallet}
          margin={item.style.margin}
          padding={item.style.padding}
          fontFamily={item.style.fontFamily}
        />
      );
    case "Lenster Card":
      return (
        <LensterWidget
          i={item.i}
          backgroundColor={item.style.backgroundColor}
          posts={item.posts}
        />
      );
    default:
      return <></>;
  }
};

export default RenderItem;
