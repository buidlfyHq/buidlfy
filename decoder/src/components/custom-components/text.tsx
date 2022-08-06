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
  margin,
  padding,
}) => {
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
        margin: `${margin.marginTop}px ${margin.marginRight}px ${margin.marginBottom}px ${margin.marginLeft}px`,
        padding: `${padding.paddingTop}px ${padding.paddingRight}px ${padding.paddingBottom}px ${padding.paddingLeft}px`,
      }}
      className="flex overflow-hidden items-center justify-center h-full"
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
    </textarea>
  );
};

export default Text