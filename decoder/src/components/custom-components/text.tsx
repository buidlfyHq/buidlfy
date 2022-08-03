import { FC } from "react";
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
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
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
        fontWeight: bold,
        fontStyle: italic,
        textDecoration: underline,
        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        display: "flex",
        justifyContent: justifyContent,
        fontSize: `${fontSize}px`,
        backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
        marginLeft: `${marginLeft}px`,
        marginRight: `${marginRight}px`,
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
        paddingLeft: `${paddingLeft}px`,
        paddingRight: `${paddingRight}px`,
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
      }}
      className="flex overflow-hidden items-center justify-center h-full overflow-auto"
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
