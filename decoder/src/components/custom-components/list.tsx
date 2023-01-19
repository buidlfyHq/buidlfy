import ITexts from "interfaces/texts";
import { FC } from "react";
import "styles/components.css";
import { gradientCheck } from "utils/gradient-check";

const List: FC<ITexts> = ({
  i,
  fontWeight,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  value,
  backgroundColor,
  margin,
  padding,
  link,
  fontFamily,
  listType,
  listOptions,
}) => {
  const gradientCondition = color?.indexOf("gradient") !== -1;
  return (
    <section
      style={{
        height: "100%",
      }}
    >
      <span
        style={{
          height: "100%",
          textDecoration: underline,
          textDecorationColor: color,
          background: backgroundColor,
          justifyContent: `${justifyContent}` as CanvasTextAlign,
          margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
        }}
        className="flex overflow-hidden items-center"
      >
        <ul
          style={{
            WebkitTextFillColor: gradientCheck(color, false),
            fontWeight: fontWeight,
            fontStyle: italic,
            background: gradientCheck(color, true),
            textDecoration: underline,
            textDecorationColor: `${gradientCondition ? "black" : color}`,
            fontSize: `${fontSize}px`,
            fontFamily: fontFamily,
            listStyleType: listType,
            padding: `${padding?.paddingTop}px ${padding?.paddingRight}px ${padding?.paddingBottom}px ${padding?.paddingLeft}px`,
          }}
          className="text-class"
        >
          {listOptions
            ?.filter((list) => list.i === i)
            .map((list) => {
              return (
                <>
                  {list.link ? (
                    <a target="_blank" href={list.link}>
                      <li key={list.id}>{list.value}</li>
                    </a>
                  ) : (
                    <li key={list.id}>{list.value}</li>
                  )}
                </>
              );
            })}
        </ul>
      </span>
    </section>
  );
};

export default List;
