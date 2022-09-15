import { FC, useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import RenderItem from "utils/render-item";
import IBgContainer from "interfaces/container";
import IItems from "interfaces/items";
import "styles/components.css";

const Container: FC<IBgContainer> = ({
  item,
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
  padding,
}) => {
  const [containerW, setContainerW] = useState(null);

  useEffect(() => {
    const cw = document
      ?.getElementById(`${item.i}`)
      ?.getBoundingClientRect().width;
    if (cw) setContainerW(cw);
  }, []);
  let finalPadding = padding.paddingLeft + padding.paddingRight;

  return (
    <section
      id={item.i}
      style={{
        paddingLeft: `${padding.paddingLeft}px`,
        paddingRight: `${padding.paddingRight}px`,
      }}
      className="w-full h-fit"
    >
      {containerW && (
        <GridLayout
          layout={children}
          cols={6}
          rowHeight={50}
          width={containerW - finalPadding || 1000}
          isDraggable={false}
          isResizable={false}
          compactType={null}
          margin={[0, 0]}
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
      )}
    </section>
  );
};

export default Container;
