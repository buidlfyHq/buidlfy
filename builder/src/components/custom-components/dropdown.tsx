import React, { FC } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io';
import { IText } from 'redux/workspace/workspace.interfaces';
import 'styles/components.css';
import { gradientCheck } from 'utils/gradient-check';

const Dropdown: FC<IText> = ({
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
}) => {
  const gradientCondition = color?.indexOf('gradient') !== -1;
  return (
    <div
      key={i}
      style={{
        height: '-webkit-fill-available',
        textDecoration: underline,
        // textDecorationColor: color,
        // background: backgroundColor,
        justifyContent: `${justifyContent}` as CanvasTextAlign,
        margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
      }}
      className="flex overflow-hidden"
    >
      <div
        key={i}
        style={{
          WebkitTextFillColor: gradientCheck(color, false),
          fontWeight: fontWeight,
          fontStyle: italic,
          // background: gradientCheck(color, true),
          textDecoration: underline,
          textDecorationColor: `${gradientCondition ? 'black' : color}`,
          fontSize: `${fontSize}px`,
          fontFamily: fontFamily,
          // listStyleType: 'disc',
          color: 'black',
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
            display: 'flex',
            justifyContent: 'left',
            borderRadius: `${borderRadius}px`,
            fontSize: `${fontSize}px`,
            background: backgroundColor,
            boxShadow: shadow,
            alignItems: 'left',
            margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
            padding: `${padding?.paddingTop}px ${padding?.paddingRight}px ${padding?.paddingBottom}px ${padding?.paddingLeft}px`,
          }}
          id={i}
          className="btn-border flex items-center dropdown-btn cursor-pointer btn whitespace-nowrap"
        >
          <span
            style={{
              background: gradientCheck(color, true),
              WebkitTextFillColor: gradientCheck(color, false),
              textDecoration: underline,
              textDecorationColor: color,
            }}
            id={i}
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
          <IoMdArrowDropright style={{ color: borderColor }} className="flex items-center text-[18px] ml-[5rem] icon-left" />
          <IoMdArrowDropdown style={{ color: borderColor }} className=" items-center text-[18px] ml-[5rem] icon-down" />
        </button>
        <div
          key={i}
          className="absolute dropdown-content mt-2 text-left pl-[20px] pr-[118px] pt-[10px] pb-[10px]"
          style={{
            background: backgroundColor,
            boxShadow: shadow,
            border: `${borderWidth}px solid ${borderColor}`,
            borderImage: borderColor,
            borderRadius: `${borderRadius}px`,
          }}
        >
          <h6 style={{ color: 'black' }}>{value}</h6>
          <h6 className="mt-4" style={{ color: 'black' }}>
            {value}
          </h6>
          <h6 className="mt-4" style={{ color: 'black' }}>
            {value}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
