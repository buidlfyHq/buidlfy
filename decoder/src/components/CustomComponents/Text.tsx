import React, { FC } from "react";
import ITexts from "interfaces/texts";
import "styles/Components.css";

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
  setOutputValue,
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
          {Object.keys(outputValue)[0] ? (
            Object.keys(outputValue).map((key, i) => (
              <div key={i}>
                {key === contractFunction.outputName && (
                  <>{outputValue[key].join(", ")}</>
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
