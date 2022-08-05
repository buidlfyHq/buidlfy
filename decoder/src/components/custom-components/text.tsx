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
  console.log(outputValue, value)
  return (
    <textarea
    readOnly
        style={{
          resize: 'none',
        fontWeight: bold,
        fontStyle: italic,
        textDecoration: underline,
        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        display: "flex",
        textAlign: "center",
        justifyContent: justifyContent,
        fontSize: `${fontSize}px`,
        backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
      }}
      className="flex items-center outline-none justify-center w-full h-full overflow-auto"
    >
      {outputValue ? 
       (outputValue.find((output) => output.id === id) ? 
       link ? (
         <a href={link} target="_blank" rel="noreferrer">
           {
             JSON.stringify(
               outputValue.find((output) => output.id === id).value
             )
           }
         </a>
       ) : (
         JSON.stringify(
           outputValue.find((output) => output.id === id).value
         )
       ) : link ? (
         <a href={link} target="_blank" rel="noreferrer">
           {value}
         </a>
       ) : (
         value
       ))
       : value}
      {/* <>
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
          renderValue(link, value)
        )}
      </> */}
    </textarea>
  );
};

export default Text