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
  const renderValue = (outputLink: string, outputValue: string) => (
    <>
      {outputLink ? (
        <a href={outputLink} target="_blank" rel="noreferrer">
          {outputValue}
        </a>
      ) : (
        <>{outputValue}</>
      )}
    </>
  );

  return (
    <section
      style={{
        height: "-webkit-fill-available",
        fontWeight: bold,
        fontStyle: italic,
        textDecoration: underline,
        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        display: "flex",
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
      className="flex overflow-hidden items-center justify-center h-full"
    >
      <>
        {outputValue ? (
          <>
            {outputValue.find((output) => output.id === id)
              ? renderValue(
                  link,
                  JSON.stringify(
                    outputValue.find((output) => output.id === id).value
                  )
                )
              : renderValue(link, value)}
          </>
        ) : (
          <>renderValue(link, value)</>
        )}
      </>
    </section>
  );
};

export default Text;
