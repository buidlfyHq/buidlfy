import React, { FC } from 'react';
import { gradientCheck } from 'utils/gradient-check';
import { IText } from 'redux/workspace/workspace.interfaces';
import 'styles/components.css';

const Text: FC<IText> = ({
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
}) => {
  const gradientCondition = color?.indexOf("gradient") !== -1;
  const textAreaContent = (
    <textarea
      readOnly
      id={i}
      value={value}
      style={{
        height: '-webkit-fill-available',
        WebkitTextFillColor: gradientCheck(color, false),
        fontWeight: fontWeight,
        fontStyle: italic,
        background: gradientCheck(color, true),
        display: 'flex',
        justifyContent,
        alignItems: 'center',
        textDecoration: underline,
        textDecorationColor: `${gradientCondition ? 'black' : color}`,
        textAlign: `${justifyContent}` as CanvasTextAlign,
        fontSize: `${fontSize}px`,
        fontFamily: fontFamily,
        padding: `${padding?.paddingTop}px ${padding?.paddingRight}px ${padding?.paddingBottom}px ${padding?.paddingLeft}px`,
      }}
      className={`text-class w-full outline-none text-center overflow-hidden cursor-pointer h-full resize-none`}
    />
  );

  return (
    <section
      id="text-one"
      style={{
        height: '-webkit-fill-available',
        textDecoration: underline,
        textDecorationColor: color,
        background: backgroundColor,
        margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
      }}
      className="flex overflow-hidden items-center justify-center w-auto h-full"
    >
      <>
        {link?.length > 0 ? (
          <a
            rel="noreferrer"
            target="_blank"
            href={link}
            id="text-two"
            className="text-class flex overflow-hidden items-center justify-center w-auto h-full"
          >
            {textAreaContent}
          </a>
        ) : (
          textAreaContent
        )}
      </>
    </section>
  );
};

export default Text;
