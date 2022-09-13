import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import {
  setSelectedElement,
  updateWorkspaceElementsArray,
} from "redux/workspace/workspace.reducers";
import { setSelectorToDefault } from "redux/selector/selector.reducers";
import {
  addSelectedElement,
  createSelectedElement,
  updateSelectedElement,
} from "redux/selected/selected.reducers";
import RenderItem from "components/utils/render-item";
import defaultItem from "config/default-container";
import {
  IColor,
  IWorkspaceElements,
} from "redux/workspace/workspace.interfaces";
import "styles/components.css";

interface IContainer {
  item: IWorkspaceElements;
  children: IWorkspaceElements[];
  backgroundColor: IColor;
  color: IColor;
  imgData; // updating soon
  borderRadius: number;
  borderWidth: number;
  shadow: string;
  setDrag: (drag: boolean) => void;
  setOpenSetting: (open: boolean) => void;
  setOpenTab: (openTab: number) => void;
  setAddContainer: (addContainer: boolean) => void;
  setValue?: (value: string) => void;
}

const Container: FC<IContainer> = ({
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
  setOpenTab,
  setAddContainer,
}) => {
  const dispatch = useDispatch();
  const workspaceElements: IWorkspaceElements[] = useSelector(
    (state: any) => state.workspace.workspaceElements
  );
  const selector = useSelector((state: any) => state.selector);
  const selected = useSelector((state: any) => state.selected);

  // to persist layout changes
  const onLayoutChange = (layout: Layout[]) => {
    let newItemsArr = layout.map((obj: IWorkspaceElements) => {
      let selectedItem = children.filter(
        (item: IWorkspaceElements) => item.i === obj.i
      )[0];
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
      let filterItems = workspaceElements.filter(
        (element) => element.i !== item.i
      );
      dispatch(
        updateWorkspaceElementsArray([...filterItems, newModifiedContainer])
      );
    } else if (layout.length === 0) {
      let removeContainerItems = workspaceElements.filter(
        (element) => element.i !== item.i
      );
      dispatch(updateWorkspaceElementsArray(removeContainerItems));
    } else {
      dispatch(updateWorkspaceElementsArray(workspaceElements));
    }
  };

  const updateElementConfig = (itemName: string, i: string) => {
    // for updating selected element config
    const searchExistingValue = Object.keys(selected).filter(
      (key) => key === selector.name
    );

    if (!searchExistingValue.length || !Object.keys(selected).length) {
      dispatch(
        createSelectedElement({
          name: selector.name,
          element: {
            buttonId: selector.buttonId,
            name: itemName,
            id: i,
          },
        })
      );
    } else {
      Object.keys(selected).map((key) => {
        if (key === selector.name) {
          selected[key].map((obj, index: number) => {
            if (obj.buttonId === selector.buttonId) {
              dispatch(
                updateSelectedElement({
                  name: key,
                  index,
                  id: i,
                })
              );
            } else {
              dispatch(
                addSelectedElement({
                  name: selector.name,
                  element: {
                    buttonId: selector.buttonId,
                    name: itemName,
                    id: i,
                  },
                })
              );
            }
            return obj;
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
      dispatch(setSelectedElement(i));
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
      dispatch(setSelectorToDefault());
    }
  };

  let containerW = document
    ?.getElementById(`${item.i}`)
    ?.getBoundingClientRect().width;

  return (
    <>
      <section
        id={item.i}
        className="h-fit w-full outline outline-1 outline-slate-300 cursor-pointer container-drag overflow-hidden"
      >
        <GridLayout
          layout={children}
          cols={6}
          rowHeight={50}
          width={containerW || 200}
          isBounded={true}
          onLayoutChange={onLayoutChange}
          margin={[0, 0]}
          compactType={null}
          className="h-full"
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
              onMouseOver={() => setDrag(false)}
              onMouseOut={() => setDrag(true)}
            >
              <RenderItem item={defaultItem} setDrag={setDrag} />
            </div>
          ) : (
            children
              ?.filter((c) => c.style?.deleteComponent === 0)
              .map((item: IWorkspaceElements) => {
                const { x, y, w, h, minW, i, resizeHandles } = item;
                return (
                  <div
                    className={`w-full h-full hover:border hover:border-2 ${
                      selector
                        ? "hover:border-orange-300"
                        : "hover:border-slate-300 hover:border-dashed"
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
              })
          )}
        </GridLayout>
        <div className="flex">
          <span id="drag" onClick={() => onComponentClick(item.name, item.i)}>
            {/* <IoMdAddCircleOutline className="text-[16px]" /> */}
          </span>
          {/* <span id="drag" onClick={() => onComponentClick(item.name, item.i)}>
            <AiTwotoneSetting className="text-[16px] " />
          </span> */}
        </div>
        {/* <span id="drag" onClick={() => onComponentClick(item.name, item.i)}>
          <IoMdAddCircleOutline className="text-[16px]" />
        </span> */}
      </section>
    </>
  );
};

export default Container;
