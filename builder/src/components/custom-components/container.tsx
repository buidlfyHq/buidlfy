import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import GridLayout, { Layout } from "react-grid-layout";
import {
  setSelectedElement,
  updateWorkspaceElementsArray,
  updateWorkspaceElementStyle,
} from "redux/workspace/workspace.reducers";
import {
  setSelectorToDefault,
  addSelectedElement,
  createSelectedElement,
  updateSelectedElement,
} from "redux/contract/contract.reducers";
import RenderItem from "components/utils/render-item";
import { IRootState } from "redux/root-state.interface";
import {
  IWorkspaceElement,
  SidebarEnum,
} from "redux/workspace/workspace.interfaces";
import {
  IContractElementSelected,
  IContractElementSelector,
} from "redux/contract/contract.interfaces";
import add from "assets/add.png";
import edit from "assets/edit.png";
import deleteContainer from "assets/delete.png";
import dragImg from "assets/drag.png";
import { IoIosAddCircleOutline } from "react-icons/io";
import "styles/components.css";

interface IContainer {
  item: IWorkspaceElement;
  children: IWorkspaceElement[];
  backgroundColor: string;
  color: string;
  imgData; // updating soon
  borderRadius: number;
  borderWidth: number;
  shadow: string;
  setDrag: (drag: boolean) => void;
  setOpenSetting: (open: boolean) => void;
  setOpenTab: (openTab: number) => void;
  setIsContainerSelected: (isContainerSelected: boolean) => void;
  setValue?: (value: string) => void;
  setSideElement: (sideElement: string) => void;
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
  setIsContainerSelected,
  setSideElement,
  showSidebar,
  hideSidebar,
  padding,
}) => {
  const dispatch = useDispatch();
  const workspaceElements: IWorkspaceElement[] = useSelector(
    (state: IRootState) => state.workspace.workspaceElements
  );
  const contractElementSelector: IContractElementSelector = useSelector(
    (state: IRootState) => state.contract.contractElementSelector
  );
  const contractElementSelected: IContractElementSelected = useSelector(
    (state: IRootState) => state.contract.contractElementSelected
  );
  const handleDelete = () => {
    dispatch(
      updateWorkspaceElementStyle({
        settingItemId: item.i,
        propertyName: "deleteComponent",
        propertyValue: true,
      })
    );
  };

  let containerW = document
    ?.getElementById(`${item.i}`)
    ?.getBoundingClientRect().width;
  let finalPadding = padding.paddingLeft + padding.paddingRight;

  const elementHoverStyles = contractElementSelector
    ? "border border-[transparent] border-hover"
    : "border border-[transparent] hover:border-slate-300 hover:border-dashed ";

  // to persist layout changes
  const onLayoutChange = (layout: Layout[]) => {
    let newItemsArr = layout.map((obj: IWorkspaceElement) => {
      let selectedElement = children.filter(
        (item: IWorkspaceElement) => item.i === obj.i
      )[0];
      const { h, minW, x, y, w, i, minH } = obj;
      return (selectedElement = {
        ...selectedElement,
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
    const searchExistingValue = Object.keys(contractElementSelected).filter(
      (key) => key === contractElementSelector.name
    );

    if (
      !searchExistingValue.length ||
      !Object.keys(contractElementSelected).length
    ) {
      dispatch(
        createSelectedElement({
          name: contractElementSelector.name,
          element: {
            buttonId: contractElementSelector.buttonId,
            name: itemName,
            id: i,
          },
        })
      );
    } else {
      Object.keys(contractElementSelected).map((key) => {
        if (key === contractElementSelector.name) {
          contractElementSelected[key].map((obj, index: number) => {
            if (obj.buttonId === contractElementSelector.buttonId) {
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
                  name: contractElementSelector.name,
                  element: {
                    buttonId: contractElementSelector.buttonId,
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

  const handleMouseOver = (id: string) => {
    setDrag(false);
    (
      document.getElementById(id).parentNode.parentNode
        .childNodes[1] as HTMLElement
    ).style.visibility = "visible";
  };

  const handleMouseOut = (id: string) => {
    setDrag(true);
    (
      document.getElementById(id).parentNode.parentNode
        .childNodes[1] as HTMLElement
    ).style.visibility = "hidden";
  };

  const handleSidebar = (selectedSidebarElements: string) => {
    setSideElement(selectedSidebarElements);
  };

  const onComponentAddClick = (i: string) => {
    setIsContainerSelected(true);
    showSidebar();
    handleSidebar(SidebarEnum.ELEMENTS);
    dispatch(setSelectedElement(i));
    setOpenSetting(false);
  };
  const onComponentDeleteClick = (i: string) => {
    handleDelete();
    dispatch(setSelectedElement(i));
  };
  const onComponentClick = (itemName: string, i: string) => {
    if (contractElementSelector === null) {
      dispatch(setSelectedElement(i));
      setOpenSetting(true);
      setOpenTab(1);
    } else {
      // Add validation for selection
      if (contractElementSelector.type === "input" && itemName === "Input") {
        updateElementConfig(itemName, i);
      } else if (
        contractElementSelector.type === "output" &&
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

  const onComponentEditClick = (i: string) => {
    setIsContainerSelected(false);
    dispatch(setSelectedElement(i));
    setOpenSetting(true);
    hideSidebar();
  };

  return (
    <>
      <section
        id={item.i}
        style={{
          paddingLeft: `${padding.paddingLeft}px`,
          paddingRight: `${padding.paddingRight}px`,
          borderRadius: `${borderRadius}px`,
          borderWidth: borderWidth,
          borderStyle: "solid",
          borderColor: color,
          borderImage: color,
        }}
        className="h-fit w-full cursor-pointer container-drag overflow-hidden btn-border"
      >
        <GridLayout
          layout={children}
          cols={6}
          rowHeight={
            children?.length
              ? 50 - (borderWidth ? borderWidth * 2 : 0) / children?.length
              : 50
          }
          width={containerW - (finalPadding + borderWidth * 2) || 200}
          isBounded={true}
          onLayoutChange={onLayoutChange}
          margin={[0, 0]}
          compactType={null}
          className="h-fit"
          style={{
            background: backgroundColor,
            backgroundImage: `url(${imgData})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            boxShadow: shadow,
          }}
        >
          {!children?.length ? (
            <div
              className="w-full h-full py-10 default-container"
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
              <div className="container-div">
                <span className="container-text">
                  Add Elements
                  <IoIosAddCircleOutline className="text-[18px] ml-1 mt-[2px]" />
                </span>
              </div>
            </div>
          ) : (
            children
              ?.filter((c) => c.style?.deleteComponent === false)
              .map((item: IWorkspaceElement) => {
                const { x, y, w, h, minW, i, resizeHandles } = item;
                return (
                  <div
                    className={`w-full h-full ${elementHoverStyles}`}
                    key={i}
                    data-grid={{ x, y, w, h, minW, resizeHandles }}
                    onMouseOver={() => handleMouseOver(i)}
                    onMouseOut={() => handleMouseOut(i)}
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
            onMouseOut={() => setDrag(true)}
            onMouseOver={() => setDrag(true)}
          >
            <img className="" src={dragImg} alt="drag" />
          </span>
          <div
            onMouseOut={() => setDrag(true)}
            onMouseOver={() => setDrag(false)}
            className="w-[30px] h-[30px] rounded-[25px] flex justify-center items-center content-center bg-white"
            id="add-img"
            onClick={() => onComponentAddClick(item.i)}
          >
            <img className="w-[11px] h-[11px]" src={add} />
          </div>
          {children?.length ? (
            <div
              onMouseOut={() => setDrag(true)}
              onMouseOver={() => setDrag(false)}
              className="w-[30px] h-[30px] rounded-[25px] flex justify-center items-center content-center bg-white"
              id="edit-img"
              onClick={() => onComponentEditClick(item.i)}
            >
              <img className="w-[13px] h-[13px]" src={edit} />
            </div>
          ) : (
            <div
              onMouseOut={() => setDrag(true)}
              onMouseOver={() => setDrag(false)}
              className="w-[30px] h-[30px] rounded-[25px] flex justify-center items-center content-center bg-white"
              id="delete-img"
              onClick={() => onComponentDeleteClick(item.i)}
            >
              <img className="w-[13px] h-[13px]" src={deleteContainer} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Container;
