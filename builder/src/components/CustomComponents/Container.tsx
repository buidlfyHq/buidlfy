import React, { FC,  useState } from "react";
import GridLayout from "react-grid-layout";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import {BiGridHorizontal} from 'react-icons/bi'
import IItems from "interfaces/items";

const ResponsiveGridLayout = WidthProvider(Responsive); // for responsive grid layout

const Container = ({
  setDrag
}) => {

  // layout mein minimum ek element needed hai to perform drop functionality
  const [templay, setTempLay] = useState<object[]>([
    { i: "2", x: 1, y: 0, w: 1, h: 2, minW: 1},
    // { i: "3", x: 4, y: 0, w: 1, h: 2, minW: 1}
  ])

  // on layout change
  // to persist layout changes
  const onLayoutChange = (layout: Layout[], layouts: Layouts) => {
    let newItemsArr = layout.map((obj: IItems) => {
      let selectedItem = templay.filter((item: IItems) =>  item.i === obj.i)[0];
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
  //       let newArray = [...items];
  //       newArray[index] = updatedItem;
  //       setItems(newArray);
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
  //       let newArray = [...items];
  //       newArray[index] = updatedItem;
  //       setItems(newArray);
  //     }
  //     setSelector(null);
  //   }
  // };

  const handleDrop = (layout, layoutItem) => {
    // console.log(layout, layoutItem)
    // alert(`Dropped element props:\n${JSON.stringify(layoutItem, ['x', 'y', 'w', 'h'], 2)}`)

    // *********** yh kra tha to remove a default element that we use as initail stage but kuch fuckup hora ***********
    // let removeDrop = templay.filter((item:IItems) => item.i === "drop here")
    // setTempLay([...removeDrop])

    // *********** layout item ke props leke use as a new data grid premanently add krne ke liye ***********
    // const {h, minW, x, y, w } = layoutItem
    // setTempLay([
    //   ...templay,
    //   {
    //     h,
    //     minW,
    //     x,
    //     y,
    //     w,
    //     i: "abcd"
    //   }
    // ]) 
  }
  //  *********** main chahea ki kisi tarah original id mil jaaye element ki taaki id se component identify kr sake ***********
  return (
    <main>
      <section 
        // id="container-drag"
        className="relative pt-2 bg-green-300 cursor-pointer"
      >
        <ResponsiveGridLayout
          className="layout"
          onLayoutChange={onLayoutChange}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={50}
          width={window.innerWidth - 250}
          // *********** on drop needed when elements are needed to be dropped ***********
          onDrop={handleDrop}
          isDroppable={true}
          isBounded={true}
          compactType="horizontal"
          resizeHandles={["nw", "se"]}
          margin={[0, 0]}
        >
          {templay.map((item: IItems) => {
              const { x, y, w, h, minW, i } = item;
              return (
                <div 
                  draggable={false}
                  key={i}
                  data-grid={{ x, y, w, h, minW }}
                  onMouseOver={() => setDrag(false)}
                  onMouseOut={() => setDrag(true)} 
                >
                  {i}
                </div>
              )
          })}
        </ResponsiveGridLayout>
      </section>
    </main>
  );
};

export default Container;