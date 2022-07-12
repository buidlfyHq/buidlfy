import { FC } from "react";
import ITexts from "interfaces/texts";
import "styles/Components.css";

interface IOutput {
  id: string;
  name: string;
  value: any;
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
      <>
        {outputValue?.length ? (
          outputValue.map((output: IOutput, index: number) => (
            <div key={index}>
              <>
                {output.id === id ? (
                  <>
                    {link?.length > 0 ? (
                      <a href={link} target="_blank">
                        {typeof output.value === "string"
                          ? output.value
                          : output.value.join(", ")}
                      </a>
                    ) : (
                      <>
                        {typeof output.value === "string"
                          ? output.value
                          : output.value.join(", ")}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {link?.length > 0 ? (
                      <a target="_blank" href={link}>
                        {value}
                      </a>
                    ) : (
                      <>{value}</>
                    )}
                  </>
                )}
              </>
            </div>
          ))
        ) : (
          <>
            {link.length > 0 ? (
              <a target="_blank" href={link}>
                {value}
              </a>
            ) : (
              <>{value}</>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default Text;
