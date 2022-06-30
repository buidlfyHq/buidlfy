import { FC } from "react";
import ITexts from "interfaces/texts";
import "styles/Components.css";

interface IOutput {
  id: string;
  name: string;
  value: any;
}

const Text: FC<ITexts> = ({
  bold,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  value,
  link,
  contractFunction,
  outputValue,
  backgroundColor,
}) => {
  return (
    <div
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
      {contractFunction ? (
        <>
          {outputValue?.length ? (
            outputValue.map((output: IOutput, index: number) => (
              <div key={index}>
                <>
                  {output.id === contractFunction.id && (
                    <>
                      {typeof output.value === "string"
                        ? output.value
                        : output.value.join(", ")}
                    </>
                  )}
                </>
              </div>
            ))
          ) : (
            <>{value}</>
          )}
        </>
      ) : (
        <>{value}</>
      )}
    </div>
  );
};

export default Text;
