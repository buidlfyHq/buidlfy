import { FC, useEffect, useState } from "react";
import { ethers } from "ethers";
import ITexts from "interfaces/texts";
import "styles/components.css";

const Text: FC<ITexts> = ({
  id,
  bold,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  value,
  link,
  outputValue,
  backgroundColor,
  margin,
  padding,
}) => {
  const [isValue, setIsValue] = useState<string>(value);
  const gradientCondition = color?.indexOf("gradient") !== -1;

  useEffect(() => {
    handleOnChange();
  }, [outputValue]);

  const handleOnChange = () => {
    if (outputValue && outputValue.find((output) => output.id === id)) {
      // const val = JSON.stringify(
      //   outputValue.find((output) => output.id === id).value
      // );
      const val = outputValue.find((output) => output.id === id).value;
      setIsValue(ethers.utils.formatUnits(val));
    } else {
      setIsValue(value);
    }
  };

  const textArea = (
    <textarea
      readOnly
      style={{
        fontWeight: bold,
        fontStyle: italic,
        textDecoration: underline,
        textDecorationColor: `${gradientCondition ? "black" : color}`,
        background: color,
        WebkitTextFillColor: "transparent",
        display: "flex",
        justifyContent,
        alignItems: "center",
        textAlign: `${justifyContent}` as CanvasTextAlign,
        fontSize: `${fontSize}px`,
        padding: `${padding.paddingTop}px ${padding.paddingRight}px ${padding.paddingBottom}px ${padding.paddingLeft}px`,
      }}
      value={isValue}
      className="flex text-area resize-none cursor-auto text-class overflow-hidden items-center justify-center h-full w-full"
    />
  );

  return (
    <section
      id="text-one"
      style={{
        height: "-webkit-fill-available",
        background: backgroundColor,
        textDecoration: underline,
        textDecorationColor: color,
        margin: `${margin.marginTop}px ${margin.marginRight}px ${margin.marginBottom}px ${margin.marginLeft}px`,
      }}
      className="flex overflow-hidden items-center justify-center w-auto h-full"
    >
      {link ? (
        <a
          target="_blank"
          href={link}
          className="text-class cursor-pointer flex overflow-hidden items-center justify-center w-auto h-full"
        >
          {textArea}
        </a>
      ) : (
        textArea
      )}
    </section>
  );
};

export default Text;
