import { FC } from "react";
import Container from "../CustomComponents/Container";
import Button from "../CustomComponents/Button";
import HeadingOne from "../CustomComponents/HeadingOne";
import Text from "../CustomComponents/Text";
import Link from "../CustomComponents/Link";
// import Image from "../CustomComponents/Image";
import Input from "../CustomComponents/Input";
import HeadingThree from "../CustomComponents/HeadingThree";
import HeadingTwo from "../CustomComponents/HeadingTwo";
import Divider from "../CustomComponents/Divider";
import IItems from "interfaces/items";

const RenderItem: FC<{
  item: IItems;
  inputValue: object;
  setInputValue: (inputValue: object) => void;
}> = ({ item, inputValue, setInputValue }) => {
  switch (item.name) {
    case "Container":
      return <Container />;
    case "Button":
      return (
        <Button
          bold={item.styles.fontWeight}
          italic={item.styles.fontStyle}
          underline={item.styles.textDecoration}
          color={item.styles.color}
          justifyContent={item.styles.justifyContent}
          fontSize={item.styles.fontSize}
          value={item.value}
          link={item.link}
          contractFunction={item.contract}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      );
    case "Text":
      return (
        <Text
          bold={item.styles.fontWeight}
          italic={item.styles.fontStyle}
          underline={item.styles.textDecoration}
          color={item.styles.color}
          justifyContent={item.styles.justifyContent}
          fontSize={item.styles.fontSize}
          value={item.value}
          link={item.link}
        />
      );
    case "Link":
      return (
        <Link
          bold={item.styles.fontWeight}
          italic={item.styles.fontStyle}
          underline={item.styles.textDecoration}
          color={item.styles.color}
          justifyContent={item.styles.justifyContent}
          fontSize={item.styles.fontSize}
          value={item.value}
          link={item.link}
        />
      );
    case "Heading 1":
      return (
        <HeadingOne
          bold={item.styles.fontWeight}
          italic={item.styles.fontStyle}
          underline={item.styles.textDecoration}
          color={item.styles.color}
          justifyContent={item.styles.justifyContent}
          fontSize={item.styles.fontSize}
          value={item.value}
          link={item.link}
        />
      );
    case "Heading 2":
      return (
        <HeadingTwo
          bold={item.styles.fontWeight}
          italic={item.styles.fontStyle}
          underline={item.styles.textDecoration}
          color={item.styles.color}
          justifyContent={item.styles.justifyContent}
          fontSize={item.styles.fontSize}
          value={item.value}
          link={item.link}
        />
      );
    case "Heading 3":
      return (
        <HeadingThree
          bold={item.styles.fontWeight}
          italic={item.styles.fontStyle}
          underline={item.styles.textDecoration}
          color={item.styles.color}
          justifyContent={item.styles.justifyContent}
          fontSize={item.styles.fontSize}
          value={item.value}
          link={item.link}
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
