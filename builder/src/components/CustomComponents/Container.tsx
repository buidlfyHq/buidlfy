import React, { FC, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { BiGridHorizontal } from "react-icons/bi";
import ShortUniqueId from "short-unique-id";
import GridLayout from "react-grid-layout";
import { components } from "components/Dashboard/component";
import RenderItem from "components/Dashboard/RenderItem";
import IItems from "interfaces/items";
import "styles/Components.css";

interface IWidth {
  containerWidth: number;
  margin: [number, number];
  cols: number;
  containerPadding: [number, number];
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
  selector,
  setSelector,
  elementConfig,
  setElementConfig,
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

  const updateElementConfig = (itemName: string, i: string) => {
    // for updating selected element config
    const searchExistingValue = Object.keys(elementConfig).filter(
      (key) => key === selector.name
    );

    if (!searchExistingValue.length || !Object.keys(elementConfig).length) {
      setElementConfig({
        ...elementConfig,
        [selector.name]: [
          {
            buttonId: selector.buttonId,
            name: itemName,
            id: i,
          },
        ],
      });
    } else {
      Object.keys(elementConfig).map((key) => {
        if (key === selector.name) {
          let elementArray = [
            ...elementConfig[key],
            {
              buttonId: selector.buttonId,
              name: itemName,
              id: i,
            },
          ];

          setElementConfig({
            ...elementConfig,
            [selector.name]: elementArray,
          });
        }
        return key;
      });
    }
  };

  const onComponentClick = (itemName: string, i: string) => {
    setAddContainer(true);

    // checks if the selector is active
    if (selector === null) {
      setOpenSetting(true);
      setSettingItemId(i);
      setOpenTab(1);
    } else {
      //   // Add validation for selection
      if (selector.type === "input" && itemName === "Input") {
        updateElementConfig(itemName, i);
      } else if (
        selector.type === "output" &&
        (itemName === "Text" ||
          itemName === "Heading 1" ||
          itemName === "Heading 2" ||
          itemName === "Heading 3")
      ) {
        updateElementConfig(itemName, i);
      }
      setSelector(null);
    }
  };

  let containerW = document
    .querySelector(`#${item.i}`)
    ?.getBoundingClientRect().width;

  return (
    <section
      id={item.i}
      className="container-drag relative w-full pt-2 border cursor-pointer h-fit"
    >
      <GridLayout
        layout={children}
        // breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        // cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
        cols={6}
        rowHeight={50}
        width={containerW}
        isBounded={true}
        compactType="horizontal"
        resizeHandles={["nw", "se"]}
        margin={[0, 0]}
        className="h-full"
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
        {!children.length ? (
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
            .map((item: IItems) => {
              const { x, y, w, h, minW, i } = item;
              return (
                <div
                  className="w-full h-full"
                  key={i}
                  data-grid={{ x, y, w, h, minW }}
                  onMouseOver={() => setDrag(false)}
                  onMouseOut={() => setDrag(true)}
                  onClick={() => onComponentClick(item.name, i)}
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
