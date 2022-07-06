import React, { FC, useContext, useEffect, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { BiGridHorizontal } from "react-icons/bi";
import ShortUniqueId from "short-unique-id";

import { components } from "components/Dashboard/component";
import RenderItem from "components/Dashboard/RenderItem";
import IBgContainer from "interfaces/container";
import ITexts from "interfaces/texts";
import IItems from "interfaces/items";
import "styles/Components.css";

const ResponsiveGridLayout = WidthProvider(Responsive); // for responsive grid layout

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
  // at least one element is needed in layout to perform drop functionality
  const [templay, setTempLay] = useState<Layout[]>([]);

  // const checkY = (items: IItems[]) => {
  //   if(items.length === 0) return 1
  //   else{
  //     let arr = items.map(item => item.y)
  //     return Math.max(...arr)+1
  //   }
  // }

  // on layout change
  // to persist layout changes
  const onLayoutChange = (layout: Layout[], layouts: Layouts) => {
    let newItemsArr = layout.map((obj: IItems) => {
      let selectedItem = children.filter((item: IItems) => item.i === obj.i)[0];
      const { h, minW, x, y, w, i } = obj;
      return (selectedItem = {
        ...selectedItem,
        h,
        minW,
        x,
        y,
        w,
        i,
      });
    });
    newItemsArr.length > 0 ? setTempLay(newItemsArr) : setTempLay(templay);
  };

  const onComponentClick = (item: IItems, i: string) => {
    setAddContainer(true);

    // checks if the selector is active
    // if (selector === null) {
    setOpenSetting(true);
    setSettingItemId(i);
    setOpenTab(1);

    // } else {
    //   // Add validation for selection
    //   if (selector.type === "input" && item.name === "Input") {
    //     updateElementConfig(item, i);
    //   } else if (
    //     selector.type === "output" &&
    //     (item.name === "Text" ||
    //       item.name === "Heading 1" ||
    //       item.name === "Heading 2" ||
    //       item.name === "Heading 3")
    //   ) {
    //     updateElementConfig(item, i);
    //   }
    //   setSelector(null);
    // }
  };

  return (
    <section
      id="container-drag"
      className="relative pt-2 border cursor-pointer h-fit"
      // className="flex items-center justify-center h-full"
    >
      <ResponsiveGridLayout
        layouts={{ lg: children }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={50}
        width={window.innerWidth - 250}
        // *********** on drop needed when elements are needed to be dropped
        // onDrop={handleDrop}
        // isDroppable={true}
        isBounded={true}
        compactType="horizontal"
        resizeHandles={["nw", "se"]}
        onLayoutChange={onLayoutChange}
        margin={[0, 0]}
        className="h-full"
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
          // boxShadow,
        }}
      >
        {children.map((item: IItems, index: number) => {
          const { x, y, w, h, minW, i } = item;
          return (
            <div
              // draggable={false}
              className="z-100"
              key={i}
              data-grid={{ x, y, w, h, minW }}
              onMouseOver={() => setDrag(false)}
              onMouseOut={() => setDrag(true)}
              onClick={() => onComponentClick(item, i)}
            >
              <RenderItem item={item} setDrag={setDrag} />
            </div>
          );
        })}
      </ResponsiveGridLayout>
      <BiGridHorizontal
        id="drag"
        onClick={() => onComponentClick(item, item.i)}
      />
    </section>
  );
};

export default Container;

// *********** for later purpose ***********

// const onComponentClick = (item: IItems, i: string, index: number) => {
//   // checks if the selector is active
//   if (selector === null) {
//     setOpenSetting(true);
//     setSettingItemId(i);
//     setOpenTab(1);
//   } else {
//     // Add validation for selection
//     if (selector.type === "input" && item.name === "Input") {
//       // for updating selector with item name and item id
//       setElementConfig({
//         ...elementConfig,
//         [selector.name]: { name: item.name, id: i },
//       });
//       let updatedItem = {
//         ...item,
//         contract: {
//           name: selector.methodName,
//           inputName: selector.name,
//         },
//       };
//       let newArray = [...templay];
//       newArray[index] = updatedItem;
//       setTempLay(newArray);
//     } else if (
//       selector.type === "output" &&
//       (item.name === "Text" ||
//         item.name === "Heading 1" ||
//         item.name === "Heading 2" ||
//         item.name === "Heading 3")
//     ) {
//       // for updating selector with item name and item id
//       setElementConfig({
//         ...elementConfig,
//         [selector.name]: { name: item.name, id: i },
//       });
//       let updatedItem = {
//         ...item,
//         contract: {
//           name: selector.methodName,
//           outputName: selector.name,
//         },
//       };
//       let newArray = [...templay];
//       newArray[index] = updatedItem;
//       setTempLay(newArray);
//     }
//     setSelector(null);
//   }
// };
