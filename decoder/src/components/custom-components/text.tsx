import { FC, useEffect, useState } from "react";
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
  const handleOnChange = () => {
    if (outputValue && outputValue.find((output) => output.id === id)) {
      const val = JSON.stringify(
        outputValue.find((output) => output.id === id).value
      );
      setIsValue(val);
    } else {
      setIsValue(value);
    }
  };
  useEffect(() => {
    handleOnChange();
  }, [outputValue]);

  const textArea = (
    <textarea
      readOnly
      style={{
        fontWeight: bold,
        fontStyle: italic,
        textDecoration: underline,
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
      className="flex focus-visible:outline-[transparent] resize-none cursor-auto text-class overflow-hidden items-center justify-center h-full w-full"
    />
  );
  return (
    <section
      id="text-one"
      style={{
        height: "-webkit-fill-available",
        background: backgroundColor,
        margin: `${margin.marginTop}px ${margin.marginRight}px ${margin.marginBottom}px ${margin.marginLeft}px`,
      }}
      className="flex overflow-hidden items-center justify-center w-auto h-full"
    >
      {link ? (
        <a target="_blank" className="cursor-pointer" href={link}>
          {textArea}
        </a>
      ) : (
        textArea
      )}
    </section>
  );
};

export default Text;
