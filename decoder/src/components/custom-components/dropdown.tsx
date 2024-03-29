import { FC } from "react";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import ITexts from "interfaces/texts";
import { gradientCheck } from "utils/gradient-check";
import "styles/components.css";

const Dropdown: FC<ITexts> = ({
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
  borderWidth,
  borderColor,
  borderRadius,
  shadow,
  listOptions,
}) => {
  const gradientCondition = color?.indexOf("gradient") !== -1;
  return (
    <section
      style={{
        height: "-webkit-fill-available",
        textDecoration: underline,
        justifyContent: `${justifyContent}` as CanvasTextAlign,
        margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
      }}
      className="flex overflow-hidden"
    >
      <span
        style={{
          WebkitTextFillColor: gradientCheck(color, false),
          fontWeight: fontWeight,
          fontStyle: italic,
          textDecoration: underline,
          textDecorationColor: `${gradientCondition ? "black" : color}`,
          fontSize: `${fontSize}px`,
          fontFamily: fontFamily,
          color: "black",
          padding: `${padding?.paddingTop}px ${padding?.paddingRight}px ${padding?.paddingBottom}px ${padding?.paddingLeft}px`,
        }}
        className="relative inline-block dropdown"
      >
        <button
          style={{
            fontWeight: fontWeight,
            fontStyle: italic,
            fontFamily: fontFamily,
            border: `${borderWidth}px solid ${borderColor}`,
            borderImage: borderColor,
            display: "flex",
            justifyContent: "left",
            borderRadius: `${borderRadius}px`,
            fontSize: `${fontSize}px`,
            background: backgroundColor,
            boxShadow: shadow,
            alignItems: "left",
            padding: `${padding?.paddingTop}px ${padding?.paddingRight}px ${padding?.paddingBottom}px ${padding?.paddingLeft}px`,
          }}
          className="btn-border flex items-center dropdown-btn cursor-pointer btn whitespace-nowrap"
        >
          <span
            style={{
              background: gradientCheck(color, true),
              WebkitTextFillColor: gradientCheck(color, false),
              textDecoration: underline,
              textDecorationColor: color,
            }}
            className="text-class"
          >
            {link.length > 0 ? (
              <a
                href={link}
                style={{
                  background: gradientCheck(color, true),
                  WebkitTextFillColor: gradientCheck(color, false),
                  textDecoration: underline,
                  textDecorationColor: color,
                }}
                rel="noreferrer"
                target="_blank"
              >
                {value}
              </a>
            ) : (
              value
            )}
          </span>
          <IoMdArrowDropright
            style={{ color: borderColor }}
            className="flex items-center text-[18px] ml-[5rem] icon-left"
          />
          <IoMdArrowDropdown
            style={{ color: borderColor }}
            className=" items-center text-[18px] ml-[5rem] icon-down"
          />
        </button>
        <span
          style={{
            background: gradientCheck(color, true),
            WebkitTextFillColor: gradientCheck(color, false),
            textDecoration: underline,
            textDecorationColor: color,
          }}
          className="text-class absolute dropdown-content mt-2 text-left pl-[20px] pt-[10px] pb-[10px] w-[13rem]"
        >
          {listOptions
            ?.filter((list) => list.i === i)
            .map((list) => {
              return (
                <>
                  {list.link ? (
                    <a target="_blank" href={list.link}>
                      <h6 key={list.id} className="mt-4">
                        {list.value}
                      </h6>
                    </a>
                  ) : (
                    <h6 key={list.id} className="mt-4">
                      {list.value}
                    </h6>
                  )}
                </>
              );
            })}
        </span>
      </span>
    </section>
  );
};

export default Dropdown;
