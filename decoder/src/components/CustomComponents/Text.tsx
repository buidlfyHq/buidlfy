import { FC } from "react";
import ITexts from "interfaces/texts";
import "styles/Components.css";

interface IOutput {
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
      }}
      className="flex items-center justify-center h-full overflow-auto"
    >
      {contractFunction ? (
        <>
          {outputValue.length ? (
            outputValue.map((output: IOutput, index: number) => (
              <div key={index}>
                {output.name === contractFunction.outputName && (
                  <>{output.value}</>
                )}
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
