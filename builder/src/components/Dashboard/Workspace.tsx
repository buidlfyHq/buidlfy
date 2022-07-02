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

  const onComponentClick = (item: IItems, i: string, index: number) => {
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

  return (
    <main
      className={
        className === ""
          ? `fixed ml-[250px] mr-[250px] h-full w-[calc(100%-500px)] h-[calc(100%-60px)]`
          : `w-full`
      }
    >
      <section className="pt-2">
        <ResponsiveGridLayout
          layouts={{ lg: items }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={50}
          width={window.innerWidth - 250}
          compactType="horizontal"
          resizeHandles={["nw", "se"]}
          onLayoutChange={onLayoutChange}
          margin={[0, 0]}
        >
          {items
            ?.filter((i) => i.style.deleteComponent === 0)
            .map((item: IItems, index: number) => {
              const { x, y, w, h, minW, i } = item;
              return (
                <div
                  key={i}
                  data-grid={{ x, y, w, h, minW }}
                  className={`justify-center transition-colors duration-150 ease-in-out ${
                    selector
                      ? "hover:outline-orange-300 hover:outline"
                      : "hover:outline-slate-300 hover:outline-dashed"
                  }`}
                  // open item setting on click
                  onClick={() => onComponentClick(item, i, index)}
                >
                  <RenderItem item={item} />
                </div>
              );
            })}
        </ResponsiveGridLayout>
      </section>
    </main>
  );
};

export default Workspace;
