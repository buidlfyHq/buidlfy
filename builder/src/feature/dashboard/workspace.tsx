import React, { FC } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import RenderItem from "utils/render-item";
import IItems from "interfaces/items";
import IColor from "interfaces/color";

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
  elementConfig: object;
  setElementConfig: (elementConfig: object) => void;
  setOpenTab: (openTab?: number) => void;
  drag: boolean;
  setDrag: (drag: boolean) => void;
  setAddContainer: (addContainer?: boolean) => void;
  backgroundColor: IColor;
  setValue?: (value: string) => void;
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
  drag,
  setDrag,
  setAddContainer,
  backgroundColor,
  setValue,
}) => {
  // to persist layout changes
  const onLayoutChange = (layout: Layout[], layouts: Layouts) => {
    let newItemsArr = layout.map((obj: IItems) => {
      let selectedItem = items.filter((item) => item.i === obj.i)[0];
      let height: number;
      const { h, minW, minH, x, y, w, i } = obj;
      if (selectedItem.name === "Container") {
        let maxY = Math.max(...selectedItem.children.map((item) => item.y));
        let el = selectedItem.children?.filter((item) => item.y === maxY)[0];
        height = el ? el.h + el.y : minH;
      }
      return (selectedItem = {
        ...selectedItem,
        h,
        minW,
        minH: height,
        x,
        y,
        w,
        i,
      });
    });
    newItemsArr.length > 0 ? setItems(newItemsArr) : setItems(items);
  };

  // for updating selected element config
  const updateElementConfig = (itemName: string, i: string) => {
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
          let newArray = [];
          elementConfig[key].map((obj, index: number) => {
            if (obj.buttonId === selector.buttonId) {
              let updatedElement = {
                ...elementConfig[key][index],
                id: i,
              };
              newArray = [...elementConfig[key]];
              newArray[index] = updatedElement;
              return newArray;
            } else {
              return [
                ...elementConfig[key],
                {
                  buttonId: selector.buttonId,
                  name: itemName,
                  id: i,
                },
              ];
            }
          });

          let elementArray = newArray;

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
        setSelector(null);
      } else if (
        selector.type === "output" &&
        (itemName === "Text" ||
          itemName === "Heading 1" ||
          itemName === "Heading 2" ||
          itemName === "Heading 3")
      ) {
        updateElementConfig(itemName, i);
        setSelector(null);
      }
    }
  };

  // FIX: find a suitable type for this event
  const handleCheckIsContainer = (e) => {
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

  const renderItemFunction = items
    ?.filter((i) => i.style?.deleteComponent === 0)
    .map((item: IItems) => {
      const { x, y, w, h, minW, minH, i, name, resizeHandles } = item;
      return (
        <div
          key={i}
          id={name}
          unselectable="on"
          data-grid={{ x, y, w, h, minW, minH, resizeHandles }}
          className={`h-fit justify-center transition-colors duration-150 ease-in-out cursor-pointer droppable-element ${
            name !== "Container"
              ? selector
                ? "hover:outline-orange-300 hover:outline"
                : "hover:outline-slate-300 hover:outline-dashed"
              : null
          }`}
          // open item setting on click
          onClick={(e) =>
            item.name === "Container" ? null : onComponentClick(item.name, i)
          }
        >
          <RenderItem
            item={item}
            items={items}
            setItems={setItems}
            setDrag={setDrag}
            setOpenSetting={setOpenSetting}
            setSettingItemId={setSettingItemId}
            setOpenTab={setOpenTab}
            setAddContainer={setAddContainer}
            selector={selector}
            setSelector={setSelector}
            elementConfig={elementConfig}
            setElementConfig={setElementConfig}
            setValue={setValue}
          />
        </div>
      );
    });

  return (
    <main
      className={`w-[calc(100%-500px)] h-[calc(100%-60px)] mt-1 z-10 ${
        className === "" ? "mx-[250px]" : "mr-[250px]"
      }`}
      style={{
        backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
      }}
      onClick={handleCheckIsContainer}
    >
      <section className="mt-[60px]">
        <ResponsiveGridLayout
          layouts={{ lg: items }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={50}
          width={window.innerWidth - 250}
          resizeHandles={["se"]}
          isDraggable={drag}
          onLayoutChange={onLayoutChange}
          margin={[0, 0]}
          className="h-fit"
        >
          {renderItemFunction}
        </ResponsiveGridLayout>
      </section>
    </main>
  );
};

export default Workspace;
