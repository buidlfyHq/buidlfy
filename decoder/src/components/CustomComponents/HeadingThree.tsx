import React, { FC } from "react";
import ITexts from "interfaces/texts";
import "styles/Components.css";

interface IOutput {
  name: string;
  value: any;
}

const HeadingThree: FC<ITexts> = ({
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
      className="flex items-center justify-center"
    >
      {contractFunction ? (
        <>
          {outputValue.length ? (
            outputValue.map((output: IOutput, index: number) => (
              <div key={index} className="h-[50px] overflow-auto">
                {output.name === contractFunction.outputName && (
                  <>
                    {typeof output.value === "string"
                      ? output.value
                      : output.value.join(", ")}
                  </>
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

export default HeadingThree;
