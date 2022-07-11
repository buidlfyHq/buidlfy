import React, { FC, useContext, useEffect, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { BiGridHorizontal } from "react-icons/bi";
import ShortUniqueId from "short-unique-id";
import GridLayout from "react-grid-layout";
import { components } from "components/Dashboard/component";
import RenderItem from "components/Dashboard/RenderItem";
import IBgContainer from "interfaces/container";
import ITexts from "interfaces/texts";
import IItems from "interfaces/items";
import "styles/Components.css";

interface IWidth {
  containerWidth: number, 
  margin: [number, number], 
  cols: number, 
  containerPadding: [number, number]
}

// interface IWorkspace {
//   setSettingItemId: (item: string) => void;
//   setOpenSetting: (open: boolean) => void;
//   selector: {
//     methodName: string;
//     type: string;
//     name: string;
//   };
//   setSelector: (selector: {
//     methodName: string;
//     type: string;
//     name: string;
//   }) => void;
//   elementConfig: object;
//   setElementConfig: any;
//   setOpenTab: any;
//   imgData: { id: string; data: string | ArrayBuffer }[];
// }

const Container = ({
  item,
  children,
  backgroundColor,
  color,
  imgData,
  borderRadius,
  borderWidth,
  shadow,
  setDrag,
  setOpenSetting,
  setSettingItemId,
  setOpenTab,
  setAddContainer,
  // boxShadow,
  // zIndex,
  // border,
  // backgroundImg,
}) => {
  // console.log(item)
  const [templay, setTempLay] = useState<Layout[]>([]);

  // on layout change
  // to persist layout changes
  // const onLayoutChange = (layout: Layout[], layouts: Layouts) => {
  //   let newItemsArr = layout.map((obj: IItems) => {
  //     let selectedItem = children.filter((item: IItems) => item.i === obj.i)[0];
  //     const { h, minW, x, y, w, i } = obj;
  //     return (selectedItem = {
  //       ...selectedItem,
  //       h,
  //       minW,
  //       x,
  //       y,
  //       w,
  //       i,
  //     });
  //   });
  //   newItemsArr.length > 0 ? setTempLay(newItemsArr) : setTempLay(templay);
  // };

  const onComponentClick = (item: IItems, i: string) => {
    setAddContainer(true);
    setOpenSetting(true);
    setSettingItemId(i);
    setOpenTab(1);
  };



  let containerW = document.querySelector(`#${item.i}`)?.getBoundingClientRect().width

  return (
    <section
      id={item.i}
      className="bg-orange-300 container-drag relative w-full pt-2 border cursor-pointer h-fit"
    >
      <GridLayout
        layout={ children }
        // breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        // cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
        cols={6}
        rowHeight={50}
        width={containerW}
        isBounded={true}
        compactType="horizontal"
        resizeHandles={["nw", "se"]}
        margin={[0, 0]}
        className='h-full'
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
      >
        {children.length == 0 ? (
          <div
            className="w-full h-full"
            key={"Dop"}
            data-grid={{ x: 0, y: 0, w: 12, h: 2, minW: 1 }}
            onMouseOver={() => setDrag(false)}
            onMouseOut={() => setDrag(true)}
          >
            <RenderItem
              item={{
                i: "Dop",
                link: "",
                minW: 1,
                name: "Text",
                style: {
                  color: { r: "0", g: "0", b: "0", a: "100" },
                  backgroundColor: { r: "0", g: "0", b: "0" },
                  fontWeight: "normal",
                  fontStyle: "normal",
                  textDecoration: "none",
                  justifyContent: "center",
                  fontSize: 16,
                },
                value: "Hover and click on drag to add components in container",
                w: 12,
                x: 0,
                y: 0,
                h: 2,
              }}
              setDrag={setDrag}
            />
          </div>
        ) : (
          children
            ?.filter((c) => c.style?.deleteComponent === 0)
            .map((item: IItems, index: number) => {
              const { x, y, w, h, minW, i, name } = item;
              return (
                <div
                  className="w-full h-full"
                  key={i}
                  data-grid={{ x, y, w, h, minW }}
                  onMouseOver={() => setDrag(false)}
                  onMouseOut={() => setDrag(true)}
                  onClick={() => onComponentClick(item, i)}
                >
                  <RenderItem item={item} setDrag={setDrag} />
                </div>
              );
            })
        )}
      </GridLayout>
      <BiGridHorizontal
        id="drag"
        onClick={() => onComponentClick(item, item.i)}
      />
    </section>
  );
};

export default Container;