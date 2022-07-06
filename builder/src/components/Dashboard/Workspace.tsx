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
}) => {
  const onLayoutChange = (layout: Layout[], layouts: Layouts) => {
    let newItemsArr = layout.map((obj: IItems) => {
      let selectedItem = items.filter((item) => item.i === obj.i)[0];
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
    console.log(layout, "layout");
  };

  const updateElementConfig = (item: IItems, i: string) => {
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
            name: item.name,
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
              name: item.name,
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

  const onComponentClick = (item: IItems, i: string) => {
    // checks if the selector is active
    if (selector === null) {
      setOpenSetting(true);
      setSettingItemId(i);
      setOpenTab(1);
    } else {
      // Add validation for selection
      if (selector.type === "input" && item.name === "Input") {
        updateElementConfig(item, i);
      } else if (
        selector.type === "output" &&
        (item.name === "Text" ||
          item.name === "Heading 1" ||
          item.name === "Heading 2" ||
          item.name === "Heading 3")
      ) {
        updateElementConfig(item, i);
      }
      setSelector(null);
    }
  };

  const handleCheckIsContainer = (e: any) => {
    if (
      e.target.id === "Container" ||
      e.target.parentNode.parentNode.id === "Container" ||
      e.target.parentNode.id === "Container" ||
      e.target.parentNode.parentNode.parentNode.id === "Container" 
    ) {
    } else {
      setAddContainer(false);
    }
  }

  return (
    <main
      className={
        className === ""
          ? `ml-[250px] mr-[250px] h-full w-[calc(100%-500px)] h-[calc(100%-60px)]`
          : `w-full`
      }
      onClick={handleCheckIsContainer}
    >
      <section className="pt-2 mt-16">
        <ResponsiveGridLayout
          layouts={{ lg: items }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={50}
          width={window.innerWidth - 250}
          compactType="horizontal"
          resizeHandles={["nw", "se"]}
          isDraggable={drag}
          onLayoutChange={onLayoutChange}
          margin={[0, 0]}
          className="h-full"
        >
          {items
            ?.filter((i) => i.style?.deleteComponent === 0)
            .map((item: IItems, index: number) => {
              const { x, y, w, h, minW, i, name } = item;
              return (
                <div
                  key={i}
                  id={name}
                  // draggable={true}
                  unselectable="on"
                  data-grid={{ x, y, w, h, minW }}
                  className={`h-fit justify-center transition-colors duration-150 ease-in-out cursor-pointer droppable-element ${
                    selector
                      ? "hover:outline-orange-300 hover:outline"
                      : "hover:outline-slate-300 hover:outline-dashed"
                  }`}
                  // open item setting on click
                  onClick={(e) =>
                    item.name === "Container"
                      ? null
                      : onComponentClick(item, i)
                  }
                >
                  <RenderItem
                    item={item}
                    imgData={imgData}
                    setDrag={setDrag}
                    setOpenSetting={setOpenSetting}
                    setSettingItemId={setSettingItemId}
                    setOpenTab={setOpenTab}
                    setAddContainer={setAddContainer}
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
