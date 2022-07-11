import { FC } from "react";
import ITexts from "interfaces/texts";
import "styles/components.css";

interface IOutput {
  id: string;
  name: string;
  value: any; // can be string or array
}

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
      }}
      className="flex items-center justify-center h-full overflow-auto"
    >
      <>
        {outputValue?.length
          ? outputValue.map((output: IOutput, index: number) => (
              <div key={output.id}>
                {output.id === id ? (
                  <>
                    {typeof output.value === "string"
                      ? renderValue(link, output.value)
                      : renderValue(link, output.value.join(", "))}
                  </>
                ) : (
                  renderValue(link, value)
                )}
              </div>
            ))
          : renderValue(link, value)}
      </>
    </section>
  );
};

export default Text;
