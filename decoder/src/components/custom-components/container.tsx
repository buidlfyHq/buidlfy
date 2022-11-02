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
  backgroundSize,
}) => {
  const [containerW, setContainerW] = useState(null);
  const backgroundSolid =
    backgroundColor.slice(0, 4) === "rgba" ? backgroundColor : null;
  const backgroundLinearGradient =
    backgroundColor.slice(0, 4) === "rgba" ? null : backgroundColor;

  useEffect(() => {
    const cw = document
      ?.getElementById(`${item.i}`)
      ?.getBoundingClientRect().width;
    if (cw) setContainerW(cw);
  }, []);

  let finalSpacing =
    margin?.marginLeft +
    margin?.marginRight +
    padding?.paddingLeft +
    padding?.paddingRight;

  return (
    <section
      id={item.i}
      style={{
        paddingLeft: `${margin?.marginLeft}px`,
        paddingRight: `${margin?.marginRight}px`,
      }}
      className="w-full h-fit"
    >
      {containerW && (
        <GridLayout
          layout={children}
          cols={6}
          rowHeight={
            children?.length
              ? 50 - (borderWidth ? borderWidth * 2 : 0) / children?.length
              : 50
          }
          width={containerW - (finalSpacing + borderWidth * 2) || 1000}
          isDraggable={false}
          isResizable={false}
          compactType={null}
          margin={[0, 0]}
          className="btn-border"
          style={{
            backgroundColor: backgroundSolid,
            backgroundImage: `url(${imgData}), ${backgroundLinearGradient}`,
            backgroundSize: backgroundSize,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            border: `${borderWidth}px solid ${color}`,
            borderRadius: `${borderRadius}px`,
            borderImage: color,
            boxShadow: shadow,
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
