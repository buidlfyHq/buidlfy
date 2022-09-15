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
    <textarea
      readOnly
      style={{
        height: "-webkit-fill-available",
        resize: "none",
        fontWeight: bold,
        fontStyle: italic,
        textDecoration: underline,
        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        display: "flex",
        textAlign: "center",
        justifyContent: justifyContent,
        fontSize: `${fontSize}px`,
        backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
        margin: `${margin.marginTop * MARGIN_VARIABLE}px ${
          margin.marginRight * MARGIN_VARIABLE
        }px ${margin.marginBottom * MARGIN_VARIABLE}px ${
          margin.marginLeft * MARGIN_VARIABLE
        }px`,
        padding: `${padding.paddingTop}px ${padding.paddingRight}px ${padding.paddingBottom}px ${padding.paddingLeft}px`,
      }}
      className="flex overflow-hidden items-center justify-center h-full w-full"
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
            JSON.stringify(outputValue.find((output) => output.id === id).value)
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
  );
};

export default Text;
