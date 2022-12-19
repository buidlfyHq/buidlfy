import React, { FC } from 'react';
import { IText } from 'redux/workspace/workspace.interfaces';
import 'styles/components.css';
import { gradientCheck } from 'utils/gradient-check';

const List: FC<IText> = ({
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
  listValue,
}) => {
  const gradientCondition = color?.indexOf('gradient') !== -1;
  return (
    <section key={i}>
      <span
        style={{
          height: '-webkit-fill-available',
          textDecoration: underline,
          textDecorationColor: color,
          background: backgroundColor,
          justifyContent: `${justifyContent}` as CanvasTextAlign,
          margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
        }}
        className="flex overflow-hidden"
        key={i}
      >
        <ul
          key={i}
          style={{
            WebkitTextFillColor: gradientCheck(color, false),
            fontWeight: fontWeight,
            fontStyle: italic,
            background: gradientCheck(color, true),
            textDecoration: underline,
            textDecorationColor: `${gradientCondition ? 'black' : color}`,
            fontSize: `${fontSize}px`,
            fontFamily: fontFamily,
            listStyleType: listType,
            padding: `${padding?.paddingTop}px ${padding?.paddingRight}px ${padding?.paddingBottom}px ${padding?.paddingLeft}px`,
          }}
        >
          <li key={i}>{value}</li>
          <li key={i}>{value}</li>
          <li key={i}>{value}</li>
        </ul>
      </span>
    </section>
  );
};

export default List;
