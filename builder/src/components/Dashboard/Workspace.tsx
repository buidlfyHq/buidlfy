import React, { FC, Dispatch, SetStateAction } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import RenderItem from "./RenderItem";
import IItems from "interfaces/items";

const ResponsiveGridLayout = WidthProvider(Responsive); // for responsive grid layout

interface IWorkspace {
  items: IItems[];
  setItems: (items: IItems[]) => void;
  className: string;
  setSettingItemId: (item: string) => void;
  setOpenSetting: (open: boolean) => void;
  selector: {
    methodName: string;
    type: string;
    name: string;
    buttonId: string;
  };
  setSelector: (selector: {
    methodName: string;
    type: string;
    name: string;
    buttonId: string;
  }) => void;
  elementConfig;
  setElementConfig: Dispatch<SetStateAction<object>>;
  setOpenTab: Dispatch<SetStateAction<number>>;
  imgData: { id: string; data: string | ArrayBuffer }[];
  drag: boolean;
  setDrag: React.Dispatch<React.SetStateAction<boolean>>;
  setAddContainer;
  backgroundColor;
}

const Workspace: FC<IWorkspace> = ({
  items,
  setItems,
  className,
  setOpenSetting,
  setSettingItemId,
  selector,
  setSelector,
  elementConfig,
  setElementConfig,
  setOpenTab,
  imgData,
  drag,
  setDrag,
  setAddContainer,
  backgroundColor,
}) => {
  // const onLayoutChange = (layout: Layout[], layouts: Layouts) => {
  //   // console.log(layout)
  //   let newItemsArr = layout.map((obj: IItems) => {
  //     let selectedItem = items.filter((item) => item.i === obj.i)[0];
  //     let height: number;
  //     const { h, minW, x, y, w, i } = obj;
  //     if(selectedItem.children){
  //       if(selectedItem.children.length > 0){
  //         // let maxY = Math.max(...selectedItem.children.map(item => item.y))
  //         // let el = newItemsArr.filter(item => item.y === maxY)[0]
  //         // let height = el.h + el.y
  //         height = Math.max(...selectedItem.children.map(child => child.y))+1
  //         // console.log(height, selectedItem)
  //         return (selectedItem = {
  //           ...selectedItem,
  //           h: height + h,
  //           minW,
  //           x,
  //           y,
  //           w,
  //           i,
  //         });
  //       }
  //     }
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
  //   newItemsArr.length > 0 ? setItems(newItemsArr) : setItems(items);
  // };

  const onLayoutChange = (layout: Layout[], layouts: Layouts) => {
    let newItemsArr = layout.map((obj: IItems) => {
      let selectedItem = items.filter((item) => item.i === obj.i)[0];
      let height: number;
      if (selectedItem.children) {
        height = Math.max(...selectedItem.children.map((child) => child.y)) + 1;
      }
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
    newItemsArr.length > 0 ? setItems(newItemsArr) : setItems(items);
  };

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

  const handleCheckIsContainer = (e: any) => {
    if (
      e.target.id === "Container" ||
      e.target.parentNode.id === "Container" ||
      e.target.parentNode.parentNode.id === "Container" ||
      e.target.parentNode.parentNode.parentNode.id === "Container"
    ) {
    } else {
      setAddContainer(false);
    }
    if (e.target.id === "") setOpenSetting(false);
  };

  return (
    <main
      className={
        className === ""
          ? `ml-[250px] mr-[250px] h-full w-[calc(100%-500px)] h-[calc(100%-60px)]`
          : `w-full mr-[250px] h-full w-[calc(100%-250px)]`
      }
      style={{
        backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
      }}
      onClick={handleCheckIsContainer}
    >
      <section className="mt-[60px] ">
        <ResponsiveGridLayout
          layouts={{ lg: items }}
          // breakpoints={{ lg: 2000, md: 1400, sm: 992, xs: 480, xxs: 0 }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={50}
          width={window.innerWidth - 250}
          compactType="horizontal"
          resizeHandles={["se"]}
          isDraggable={drag}
          onLayoutChange={onLayoutChange}
          margin={[0, 0]}
          className="h-fit"
        >
          {items
            ?.filter((i) => i.style?.deleteComponent === 0)
            .map((item: IItems, index: number) => {
              const { x, y, w, h, minW, i, name, resizeHandles } = item;
              return (
                <div
                  key={i}
                  id={name}
                  unselectable="on"
                  data-grid={{ x, y, w, h, minW, resizeHandles }}
                  className={`h-fit justify-center transition-colors duration-150 ease-in-out cursor-pointer droppable-element ${
                    selector
                      ? "hover:outline-orange-300 hover:outline"
                      : "hover:outline-slate-300 hover:outline-dashed"
                  }`}
                  // open item setting on click
                  onClick={(e) =>
                    item.name === "Container"
                      ? null
                      : onComponentClick(item.name, i)
                  }
                >
                  <RenderItem
                    item={item}
                    items={items}
                    setItems={setItems}
                    imgData={imgData}
                    setDrag={setDrag}
                    setOpenSetting={setOpenSetting}
                    setSettingItemId={setSettingItemId}
                    setOpenTab={setOpenTab}
                    setAddContainer={setAddContainer}
                    selector={selector}
                    setSelector={setSelector}
                    elementConfig={elementConfig}
                    setElementConfig={setElementConfig}
                  />
                </div>
              );
            })}
        </ResponsiveGridLayout>
      </section>
    </main>
  );
};

export default Workspace;
