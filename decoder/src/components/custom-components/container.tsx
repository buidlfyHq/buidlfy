import { FC } from "react";
import GridLayout from "react-grid-layout";
import RenderItem from "utils/render-item";
import IBgContainer from "interfaces/container";
import IItems from "interfaces/items";
import "styles/components.css";

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
    <GridLayout
      layout={children}
      cols={6}
      rowHeight={50}
      compactType="horizontal"
      isDraggable={false}
      isResizable={false}
      style={{
        backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
        borderColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
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
      {children.map((c: IItems) => {
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
    </GridLayout>
  );
};

export default Container;
