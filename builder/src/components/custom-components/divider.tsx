import React, { FC } from 'react';
import 'styles/components.css';

interface IDivider {
  borderColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  margin?: {
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
  };
}
const Divider: FC<IDivider> = ({ borderColor, borderRadius, borderWidth, margin }) => (
  <hr
    style={{
      margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
      borderRadius: `${borderRadius}px`,
      borderColor: borderColor,
      borderTopWidth: borderWidth,
    }}
  />
);
export default Divider;
