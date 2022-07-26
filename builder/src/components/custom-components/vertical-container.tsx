import React, { Dispatch, FC, SetStateAction } from "react";
import { Layout } from "react-grid-layout";
import { BiGridHorizontal } from "react-icons/bi";
import GridLayout from "react-grid-layout";
import RenderItem from "utils/render-item";
import IItems from "interfaces/items";
import IColor from "interfaces/color";
import "styles/components.css";

interface IContainer {
  item: IItems;
  items?: IItems[];
  setItems?: (items?: IItems[]) => void;
  children: IItems[];
  backgroundColor: IColor;
  color: IColor;
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
}

const VerticalContainer: FC<IContainer> = ({
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
    console.log(layout, "layout");
    // check to see if container array has only default element or children
    if (newItemsArr[0]?.i !== "DefaultElement") {
      let maxY = Math.max(...newItemsArr.map((item) => item.y + item.h));
      let el = newItemsArr?.filter((item) => item.y + item.h === maxY)[0];
      let maxH = el?.h + el?.y;
      console.log(maxH);
      let newModifiedContainer = {
        ...item,
        h: maxH,
        children: newItemsArr,
      };
      let filterItems = items.filter((element) => element.i !== item.i);
      setItems([...filterItems, newModifiedContainer]);
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
    ?.querySelector(`#${item?.i}`)
    ?.getBoundingClientRect().width;
  console.log(containerW, "containerW");
  return (
    <>
      <section
        id={item.i}
        className="relative border cursor-pointer container-drag h-fit shadow-lg"
      >
        <GridLayout
          layout={children}
          cols={6}
          rowHeight={50}
          width={containerW || 200}
          isBounded={true}
          onLayoutChange={onLayoutChange}
          compactType="horizontal"
          margin={[0, 0]}
          className="h-full w-[35%]"
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
          {children
            ?.filter((c) => c.style?.deleteComponent === 0)
            .map((item: IItems) => {
              const { x, y, w, h, minW, i, resizeHandles } = item;
              return (
                <div
                  className={`w-full h-full ${
                    selector
                      ? "hover:outline-orange-300 hover:outline"
                      : "hover:outline-slate-300 hover:outline-dashed"
                  }`}
                  key={i}
                  data-grid={{ x, y, w, h, minW, resizeHandles }}
                  onMouseOver={() => setDrag(false)}
                  onMouseOut={() => setDrag(true)}
                  onClick={() => onComponentClick(item.name, i)}
                >
                  <RenderItem item={item} setDrag={setDrag} />
                </div>
              );
            })}
        </GridLayout>
        <BiGridHorizontal
          id="drag"
          onClick={() => onComponentClick(item.name, item.i)}
        />
      </section>
    </>
  );
};

export default VerticalContainer;
