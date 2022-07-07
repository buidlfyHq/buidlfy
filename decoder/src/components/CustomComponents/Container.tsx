import React, { FC } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import RenderItem from "components/Home/RenderItem";
import ITexts from "interfaces/texts";
import IBgContainer from "interfaces/container";
import "styles/Components.css";

const ResponsiveGridLayout = WidthProvider(Responsive); // for responsive grid layout

const Container: FC<IBgContainer> = ({
  children,
  backgroundColor,
  color,
  imgData,
  borderRadius,
  borderWidth,
  shadow,
  inputValue,
  setInputValue,
  outputValue,
  setOutputValue,
}) => {
  return (
    <ResponsiveGridLayout
      layouts={children}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={50}
      compactType="horizontal"
      isDraggable={false}
      isResizable={false}
      style={{
        backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
        borderColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        border: "solid",
        borderRadius: `${borderRadius}px`,
        borderWidth: `${borderWidth}px`,
        backgroundImage: `url(${imgData})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        boxShadow: shadow,
      }}
      className="flex items-center justify-center h-full"
    >
      {children.map((c) => {
        const { x, y, w, h, minW, i } = c;
        return (
          <div key={i} data-grid={{ x, y, w, h, minW }}>
            <RenderItem
              item={c}
              inputValue={inputValue}
              setInputValue={setInputValue}
              outputValue={outputValue}
              setOutputValue={setOutputValue}
            />
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
};

export default Container;
