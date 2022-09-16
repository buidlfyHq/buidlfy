import { FC } from "react";
import ITexts from "interfaces/texts";
import "styles/components.css";
import { MARGIN_VARIABLE } from "config/constants";

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
        className="flex text-class overflow-hidden items-center justify-center h-full w-full"
      >
        {outputValue ? (
          outputValue.find((output) => output.id === id) ? (
            link ? (
              <a href={link} target="_blank" rel="noreferrer">
                {JSON.stringify(
                  outputValue.find((output) => output.id === id).value
                )}
              </a>
            ) : (
              JSON.stringify(
                outputValue.find((output) => output.id === id).value
              )
            )
          ) : link ? (
            <a href={link} target="_blank" rel="noreferrer">
              {value}
            </a>
          ) : (
            value
          )
        ) : (
          value
        )}
      </textarea>
    </section>
  );
};

export default Text;
