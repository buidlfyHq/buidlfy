import React, { FC, useContext, useEffect, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { BiGridHorizontal } from "react-icons/bi";
import ShortUniqueId from "short-unique-id";
import { ComponentContext } from "components/Context/ComponentContext";
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
  backgroundColor,
  color,
  imgData,
  borderRadius,
  borderWidth,
  shadow,
  setDrag,
  // boxShadow,
  // zIndex,
  // border,
  // backgroundImg,
}) => {
  // context
  const { newComp, setNewComp } = useContext(ComponentContext);
  const uid = new ShortUniqueId();
  // layout mein minimum ek element needed hai to perform drop functionality
  const [templay, setTempLay] = useState<object[]>([]);

  // const checkY = (items: IItems[]) => {
  //   if(items.length === 0) return 1
  //   else{
  //     let arr = items.map(item => item.y)
  //     return Math.max(...arr)+1
  //   }
  // }

  useEffect(() => {
    let c = components.filter((c) => c.name === newComp)[0];
    // let y = checkY(items)
    console.log(c);
    if (c) {
      console.log(1);
      let newItem = {
        ...c,
        i: uid(),
        x: 0,
        y: 0,
        w: 12,
        h: 1,
        minW: 1,
      };

      console.log(templay, newItem);

      setTempLay([...templay, newItem]);

      setNewComp("");
    }
  }, [newComp]);

  // on layout change
  // to persist layout changes
  const onLayoutChange = (layout: Layout[], layouts: Layouts) => {
    let newItemsArr = layout.map((obj: IItems) => {
      let selectedItem = templay.filter((item: IItems) => item.i === obj.i)[0];
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

  return (
    <main>
      <section
        id="container-drag"
        className="relative pt-2 border cursor-pointer"
        // className="flex items-center justify-center h-full"
        style={{
          backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
          borderColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          border: "solid",
          borderRadius: `${borderRadius}px`,
          borderWidth: `${borderWidth}px`,
          // border: border,
          // zIndex,
          backgroundImage: `url(${imgData})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          boxShadow: shadow,
          // boxShadow,
        }}
      >
        <ResponsiveGridLayout
          // layouts={{lg: templay}}
          className="layout"
          onLayoutChange={onLayoutChange}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={50}
          width={window.innerWidth - 250}
          // *********** on drop needed when elements are needed to be dropee
          // onDrop={handleDrop}
          // isDroppable={true}
          isBounded={true}
          compactType="horizontal"
          resizeHandles={["nw", "se"]}
          margin={[0, 0]}
        >
          {templay.map((item: IItems, index: number) => {
            const { x, y, w, h, minW, i } = item;
            return (
              <div
                // draggable={false}
                key={i}
                data-grid={{ x, y, w, h, minW }}
                onMouseOver={() => setDrag(false)}
                onMouseOut={() => setDrag(true)}
                // onClick={() => onComponentClick(item, i, index)}
              >
                <RenderItem item={item} setDrag={setDrag} />
              </div>
            );
          })}
        </ResponsiveGridLayout>
        <BiGridHorizontal id="drag" />
      </section>
    </main>
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
