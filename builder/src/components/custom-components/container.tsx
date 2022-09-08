import React, { Dispatch, FC, SetStateAction } from "react";
import { Layout } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import RenderItem from "components/utils/render-item";
import defaultItem from "config/default-container";
import IItems from "interfaces/items";
import IColor from "interfaces/color";
import add from "assets/add.png";
import edit from "assets/edit.png";
import dragImg from "assets/drag.png";
import { sidebarEnum } from "pages/dashboard";
import "styles/components.css";

interface IContainer {
  item: IItems;
  items?: IItems[];
  setItems?: (items?: IItems[]) => void;
  children: IItems[];
  backgroundColor: string;
  color: string;
  imgData; // updating soon
  borderRadius: number;
  borderWidth: number;
  shadow: string;
  setDrag: (drag: boolean) => void;
  setSettingItemId: (item: string) => void;
  setOpenSetting: (open: boolean) => void;
  setOpenTab: Dispatch<SetStateAction<number>>;
  setAddContainer: (addContainer: boolean) => void;
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
  setElementConfig: Dispatch<SetStateAction<object>>;
  setValue?: (value: string) => void;
  setSideElement: (sideElement: string) => void;
  addContainerElements?: boolean;
  setAddContainerElements?: (addContainerElements?: boolean) => void;
  dragContainer?: boolean;
  setDragContainer?: (dragContainer?: boolean) => void;
  showSidebar?: () => void;
  hideSidebar?: () => void;
  hideSettingSidebar?: () => void;
  padding?: {
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
  };
}

const Container: FC<IContainer> = ({
  item,
  items,
  setItems,
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
  setSideElement,
  showSidebar,
  hideSidebar,
  padding,
}) => {
  // to persist layout changes
  const onLayoutChange = (layout: Layout[]) => {
    let newItemsArr = layout.map((obj: IItems) => {
      let selectedItem = children.filter((item: IItems) => item.i === obj.i)[0];
      const { h, minW, x, y, w, i, minH } = obj;
      return (selectedItem = {
        ...selectedItem,
        h,
        minW,
        minH,
        x,
        y,
        w,
        i,
      });
    });

    // check to see if container array has only default element or children
    if (newItemsArr[0]?.i !== "DefaultElement" && newItemsArr.length) {
      let maxY = Math.max(...newItemsArr.map((item) => item.y + item.h));
      let el = newItemsArr?.filter((item) => item.y + item.h === maxY)[0];
      let maxH = el.h + el.y;
      let newModifiedContainer = {
        ...item,
        h: maxH,
        children: newItemsArr,
      };
      let filterItems = items.filter((element) => element.i !== item.i);
      setItems([...filterItems, newModifiedContainer]);
    } else if (layout.length === 0) {
      let removeContainerItems = items.filter(
        (element) => element.i !== item.i
      );
      setItems(removeContainerItems);
    } else {
      setItems(items);
    }
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
  const handleSidebar = (selectedSidebarElements: string) => {
    setSideElement(selectedSidebarElements);
    // handleSidebar(sidebarEnum.ELEMENTS);
  };

  const onComponentAddClick = (itemName: string, i: string) => {
    setAddContainer(true);
    showSidebar();
    handleSidebar(sidebarEnum.ELEMENTS);
    setOpenSetting(false);
    setSettingItemId(i);
  };
  const onComponentClick = (itemName: string, i: string) => {
    if (selector === null) {
      setOpenSetting(true);
      setSettingItemId(i);
      setOpenTab(1);
    } else {
      // Add validation for selection
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
  const onComponentEditClick = (itemName: string, i: string) => {
    setAddContainer(false);
    setOpenSetting(true);
    hideSidebar();
    setSettingItemId(i);
  };

  let containerW = document
    ?.getElementById(`${item.i}`)
    ?.getBoundingClientRect().width;
  let finalPadding = padding.paddingLeft + padding.paddingRight;
  return (
    <>
      <section
        id={item.i}
        style={{
          paddingLeft: `${padding.paddingLeft}px`,
          paddingRight: `${padding.paddingRight}px`,
        }}
        className="h-fit w-full outline outline-1 outline-slate-300 cursor-pointer container-drag overflow-hidden"
      >
        <GridLayout
          layout={children}
          cols={6}
          rowHeight={50}
          width={containerW - finalPadding || 200}
          isBounded={true}
          onLayoutChange={onLayoutChange}
          margin={[0, 0]}
          compactType={null}
          className="h-full btn-border"
          style={{
            background: backgroundColor,
            border: `1px solid ${color}`,
            borderImage: color,
            borderRadius: `${borderRadius}px`,
            borderWidth: `${borderWidth}px`,
            backgroundImage: `url(${imgData})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            boxShadow: shadow,
          }}
        >
          {!children?.length ? (
            <div
              className="w-full h-full py-10"
              key={"DefaultElement"}
              data-grid={{
                x: 0,
                y: 0,
                w: 6,
                h: 2,
                minH: 1,
                minW: 1,
                resizeHandles: [],
              }}
            >
              <RenderItem
                setSideElement={setSideElement}
                item={defaultItem}
                setDrag={setDrag}
              />
            </div>
          ) : (
            children
              ?.filter((c) => c.style?.deleteComponent === 0)
              .map((item: IItems) => {
                const { x, y, w, h, minW, i, resizeHandles } = item;
                return (
                  <div
                    className={`w-full h-full hover:border hover:border-2 ${
                      selector
                        ? "border-hover"
                        : "hover:border-slate-300 hover:border-dashed"
                    }`}
                    key={i}
                    data-grid={{ x, y, w, h, minW, resizeHandles }}
                    onMouseOver={() => setDrag(false)}
                    onMouseOut={() => setDrag(true)}
                    onClick={() => onComponentClick(item.name, i)}
                  >
                    <RenderItem
                      setSideElement={setSideElement}
                      item={item}
                      setDrag={setDrag}
                    />
                  </div>
                );
              })
          )}
        </GridLayout>
        <div className="flex">
          <span
            id="drag"
            onMouseOut={() => setDrag(false)}
            onMouseOver={() => setDrag(true)}
          >
            <img className="" src={dragImg} />
          </span>
          <span
            id="add-img"
            onMouseOut={() => setDrag(false)}
            onMouseOver={() => setDrag(false)}
            onClick={() => onComponentAddClick(item.name, item.i)}
          >
            <img src={add} />
          </span>
          <span
            onMouseOut={() => setDrag(false)}
            onMouseOver={() => setDrag(false)}
            id="edit-img"
            onClick={() => onComponentEditClick(item.name, item.i)}
          >
            <img src={edit} />
          </span>
        </div>
      </section>
    </>
  );
};

export default Container;
