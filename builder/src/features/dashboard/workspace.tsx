import React, { FC, useEffect, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import RenderItem from "components/utils/render-item";
import { containerCheck } from "utils/container-check";
import IItems from "interfaces/items";
import IColor from "interfaces/color";
import "styles/components.css";

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
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  hideSidebar?: () => void;
  showSidebar?: () => void;
  showSettingSidebar?: () => void;
  isNavHidden?: boolean;
  openSetting?: boolean;
  setIsNavHidden?: (isNavHidden?: boolean) => void;
  setSideElement?: (sideElement?: string) => void;
  addContainerElements?: boolean;
  setAddContainerElements?: (addContainerElements?: boolean) => void;
  dragContainer?: boolean;
  setDragContainer?: (dragContainer?: boolean) => void;
  hideSettingSidebar?: () => void;
  updateBackgroundSize?: boolean;
  setUpdateBackgroundSize?: (updateBackgroundSize?: boolean) => void;
  dynamicWidth?: number;
  dynamicHeight?: number;
  setDynamicWidth?: (dynamicWidth?: number) => void;
  setDynamicHeight?: (dynamicHeight?: number) => void;
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
  hideSidebar,
  showSidebar,
  isNavHidden,
  openSetting,
  setSideElement,
  addContainerElements,
  setAddContainerElements,
  dragContainer,
  setDragContainer,
  hideSettingSidebar,
  updateBackgroundSize,
  setUpdateBackgroundSize,
  dynamicHeight,
  dynamicWidth,
  setDynamicHeight,
  setDynamicWidth,
}) => {
  const [currentSize, setCurrentSize] = useState<number>(6);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isNavHidden && !openSetting) {
      setCurrentSize(6);
    } else {
      setCurrentSize(7.5);
    }
  }, [isNavHidden, openSetting]);
  const onLayoutChange = (layout: Layout[], layouts: Layouts) => {
    if (layout.length === 0) setAddContainer(false);
    let newItemsArr = layout.map((obj: IItems) => {
      let selectedItem = items.filter((item) => item.i === obj.i)[0];
      let height: number;
      const { h, minW, minH, x, y, w, i } = obj;
      if (containerCheck(selectedItem)) {
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

  // to update selected element config
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
              newArray = [
                ...elementConfig[key],
                {
                  buttonId: selector.buttonId,
                  name: itemName,
                  id: i,
                },
              ];
              return newArray;
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
    hideSidebar();
    // checks if the selector is active
    if (selector === null) {
      setOpenSetting(true);
      setSettingItemId(i);
      setOpenTab(1);
    } else {
      // checks selector type
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
      e.target.parentNode.parentNode.parentNode.id === "Container" ||
      e.target.id === "Horizontal Container" ||
      e.target.parentNode.id === "Horizontal Container" ||
      e.target.parentNode.parentNode.id === "Horizontal Container" ||
      e.target.parentNode.parentNode.parentNode.id === "Horizontal Container" ||
      e.target.id === "Vertical Container" ||
      e.target.parentNode.id === "Vertical Container" ||
      e.target.parentNode.parentNode.id === "Vertical Container" ||
      e.target.parentNode.parentNode.parentNode.id === "Vertical Container"
    ) {
    } else {
      setAddContainer(false);
      hideSidebar();
    }
    if (e.target.id === "") {
      setOpenSetting(false);
    }
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
          className={`justify-center transition-colors duration-150 ease-in-out cursor-pointer droppable-element hover:border hover:border-2 ${
            !containerCheck(item)
              ? selector
                ? "border-hover"
                : "hover:border-slate-300 hover:border-dashed"
              : null
          }`}
          // open item setting on click
          onClick={(e) =>
            containerCheck(item) ? null : onComponentClick(item.name, i)
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
            setSideElement={setSideElement}
            addContainerElements={addContainerElements}
            setAddContainerElements={setAddContainerElements}
            dragContainer={dragContainer}
            setDragContainer={setDragContainer}
            showSidebar={showSidebar}
            hideSidebar={hideSidebar}
            hideSettingSidebar={hideSettingSidebar}
            updateBackgroundSize={updateBackgroundSize}
            setUpdateBackgroundSize={setUpdateBackgroundSize}
            dynamicWidth={dynamicWidth}
            dynamicHeight={dynamicHeight}
            setDynamicWidth={setDynamicWidth}
            setDynamicHeight={setDynamicHeight}
          />
        </div>
      );
    });
  return (
    <div
      style={{ width: "-webkit-fill-available" }}
      className="main-div h-full"
    >
      <main
        className=""
        // ${
        //   className === "" ? "mr-[250px]" : "mr-[250px]"
        // }

        style={{}}
        onClick={handleCheckIsContainer}
      >
        {isNavHidden && !openSetting ? (
          <section
            style={{
              width: "-webkit-fill-available",
              backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
            }}
            className="mt-[100px] z-[100] overflow-y-scroll bg-white ml-[110px] mr-[40px] mb-[20px] min-h-[87vh] shadow-2xl"
          >
            <ResponsiveGridLayout
              layouts={{ lg: items }}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{
                lg: currentSize,
                md: currentSize,
                sm: 6,
                xs: 4,
                xxs: 2,
              }}
              rowHeight={50}
              // width={window.innerWidth - 250}
              resizeHandles={["se"]}
              isDraggable={drag}
              onLayoutChange={onLayoutChange}
              compactType={null}
              margin={[0, 0]}
              className="h-fit overflow-hidden"
            >
              {renderItemFunction}
            </ResponsiveGridLayout>
          </section>
        ) : (
          <>
            {openSetting ? (
              <section
                style={{
                  width: "-webkit-fill-available",
                  backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
                }}
                className="mt-[100px] z-[100] overflow-y-scroll bg-white ml-[120px] mr-[302px] mb-[20px] min-h-[87vh] shadow-2xl"
              >
                <ResponsiveGridLayout
                  layouts={{ lg: items }}
                  breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                  cols={{
                    lg: currentSize,
                    md: currentSize,
                    sm: 6,
                    xs: 4,
                    xxs: 2,
                  }}
                  rowHeight={50}
                  // width={window.innerWidth - 250}
                  resizeHandles={["se"]}
                  isDraggable={drag}
                  onLayoutChange={onLayoutChange}
                  compactType={null}
                  margin={[0, 0]}
                  className="h-fit overflow-hidden"
                >
                  {renderItemFunction}
                </ResponsiveGridLayout>
              </section>
            ) : (
              <section
                style={{
                  width: "-webkit-fill-available",
                  backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
                }}
                className="mt-[100px] z-[100] overflow-y-scroll bg-white ml-[390px] mr-[32px] mb-[20px] min-h-[87vh] shadow-2xl"
              >
                <ResponsiveGridLayout
                  layouts={{ lg: items }}
                  breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                  cols={{
                    lg: currentSize,
                    md: currentSize,
                    sm: 6,
                    xs: 4,
                    xxs: 2,
                  }}
                  rowHeight={50}
                  // width={window.innerWidth - 250}
                  resizeHandles={["se"]}
                  isDraggable={drag}
                  onLayoutChange={onLayoutChange}
                  compactType={null}
                  margin={[0, 0]}
                  className="h-fit overflow-hidden"
                >
                  {renderItemFunction}
                </ResponsiveGridLayout>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Workspace;
