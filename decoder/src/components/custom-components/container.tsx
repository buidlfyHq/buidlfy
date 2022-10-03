import { FC, useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import RenderItem from "utils/render-item";
import IBgContainer from "interfaces/container";
import IWorkspace from "interfaces/workspace";
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
  margin,
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
        background: backgroundColor,
        marginLeft: `${margin?.marginLeft}px`,
        marginRight: `${margin?.marginRight}px`,
        boxShadow: shadow,
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
          className="btn-border"
          style={{
            background: backgroundColor,
            border: `1px solid ${color}`,
            borderImage: color,
            borderRadius: `${borderRadius}px`,
            borderWidth: `${borderWidth}px`,
            backgroundImage: `url(${imgData})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            paddingLeft: `${padding.paddingLeft}px`,
            paddingRight: `${padding.paddingRight}px`,
          }}
        >
          {children.map((c: IWorkspace) => {
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
