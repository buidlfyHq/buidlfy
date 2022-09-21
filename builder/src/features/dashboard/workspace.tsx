import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GridLayout, { Layout } from "react-grid-layout";
import {
  setSelectedElement,
  updateWorkspaceElementsArray,
} from "redux/workspace/workspace.reducers";
import {
  setSelectorToDefault,
  addSelectedElement,
  createSelectedElement,
  updateSelectedElement,
} from "redux/contract/contract.reducers";
import RenderItem from "components/utils/render-item";
import { containerCheck } from "utils/container-check";
import { IRootState } from "redux/root-state.interface";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";
import {
  IContractElementSelected,
  IContractElementSelector,
} from "redux/contract/contract.interfaces";
import "styles/components.css";

interface IWorkspaceComponent {
  setOpenSetting: (open: boolean) => void;
  setOpenTab: (openTab?: number) => void;
  drag: boolean;
  setDrag: (drag: boolean) => void;
  setIsContainerSelected: (isContainerSelected?: boolean) => void;
  workspaceBackgroundColor: string;
  hideSidebar?: () => void;
  showSidebar?: () => void;
  showSettingSidebar?: () => void;
  isNavHidden?: boolean;
  openSetting?: boolean;
  setIsNavHidden?: (isNavHidden?: boolean) => void;
  setSideElement?: (sideElement?: string) => void;
  dragContainer?: boolean;
  setDragContainer?: (dragContainer?: boolean) => void;
  hideSettingSidebar?: () => void;
}

const Workspace: FC<IWorkspaceComponent> = ({
  setOpenSetting,
  setOpenTab,
  drag,
  setDrag,
  setIsContainerSelected,
  workspaceBackgroundColor,
  hideSidebar,
  showSidebar,
  isNavHidden,
  openSetting,
  setSideElement,
  dragContainer,
  setDragContainer,
  hideSettingSidebar,
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

  const elementHoverStyles = contractElementSelector
    ? "border-2 border-[transparent] hover:border-slate-300 hover:border-dashed"
    : "border-2 border-[transparent] border-hover";

  const [fullViewWidth, setFullViewWidth] = useState<number>(1200);
  const [leftSideViewWidth, setLeftSideViewWidth] = useState<number>(996);
  const [rightSideViewWidth, setRightSideViewWidth] = useState<number>(996);

  useEffect(() => {
    let fullView = document
      ?.getElementById("full-view")
      ?.getBoundingClientRect().width;

    let leftSideView = document
      ?.getElementById("left-side-view")
      ?.getBoundingClientRect().width;

    let rightSideView = document
      ?.getElementById("right-side-view")
      ?.getBoundingClientRect().width;

    setFullViewWidth((fullViewWidth) => fullView);
    setLeftSideViewWidth((leftSideViewWidth) => leftSideView);
    setRightSideViewWidth((rightSideViewWidth) => rightSideView);
  }, [isNavHidden, openSetting]);

  const onLayoutChange = (layout: Layout[]) => {
    if (layout.length === 0) setIsContainerSelected(false);
    let newItemsArr = layout.map((obj: IWorkspaceElement) => {
      let selectedElement = workspaceElements.filter(
        (item) => item.i === obj.i
      )[0];
      let height: number;
      const { h, minW, minH, x, y, w, i } = obj;
      if (containerCheck(selectedElement)) {
        let maxY = Math.max(...selectedElement.children.map((item) => item.y));
        let el = selectedElement.children?.filter((item) => item.y === maxY)[0];
        height = el ? el.h + el.y : minH;
      }
      return (selectedElement = {
        ...selectedElement,
        h,
        minW,
        minH: height,
        x,
        y,
        w,
        i,
      });
    });
    newItemsArr.length > 0
      ? dispatch(updateWorkspaceElementsArray(newItemsArr))
      : dispatch(updateWorkspaceElementsArray(workspaceElements));
  };

  // to update selected element config
  const updateElementConfig = (itemName: string, i: string) => {
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

    dispatch(setSelectorToDefault());
  };

  const handleMouseOver = (id: string) => {
    (
      document.getElementById(id).childNodes[1] as HTMLElement
    ).style.visibility = "visible";
  };

  const handleMouseOut = (id: string) => {
    (
      document.getElementById(id).childNodes[1] as HTMLElement
    ).style.visibility = "hidden";
  };

  const onComponentClick = (itemName: string, i: string) => {
    setIsContainerSelected(true);
    hideSidebar();
    // checks if the selector is active
    if (contractElementSelector === null) {
      setOpenSetting(true);
      dispatch(setSelectedElement(i));
      setOpenTab(1);
    } else {
      // checks selector type
      if (contractElementSelector.type === "input" && itemName === "Input") {
        updateElementConfig(itemName, i);
        dispatch(setSelectorToDefault());
      } else if (
        contractElementSelector.type === "output" &&
        (itemName === "Text" ||
          itemName === "Heading 1" ||
          itemName === "Heading 2" ||
          itemName === "Heading 3")
      ) {
        updateElementConfig(itemName, i);
        dispatch(setSelectorToDefault());
      }
    }
  };

  // FIX: find a suitable type for this event
  const handleCheckIsContainer = (e) => {
    if (
      e.target.id.slice(6) === "Container" ||
      e.target.parentNode.id.slice(6) === "Container" ||
      e.target.parentNode.parentNode.id.slice(6) === "Container" ||
      e.target.parentNode.parentNode.parentNode.id.slice(6) === "Container"
    ) {
      setIsContainerSelected(true);
    } else {
      setIsContainerSelected(false);
      hideSidebar();
    }
    if (
      e.target.id === "full-view" ||
      e.target.id === "left-side-view" ||
      e.target.id === "right-side-view" ||
      e.target.id === ""
    ) {
      setOpenSetting(false);
    }
  };

  const renderItemFunction = workspaceElements
    ?.filter((i) => i.style?.deleteComponent === false)
    .map((item: IWorkspaceElement) => {
      const { x, y, w, h, minW, minH, i, name, resizeHandles } = item;
      return (
        <div
          key={i}
          id={i + name}
          unselectable="on"
          data-grid={{ x, y, w, h, minW, minH, resizeHandles }}
          className={`justify-center transition-colors duration-150 ease-in-out cursor-pointer droppable-element ${
            !containerCheck(item) && elementHoverStyles
          }`}
          onMouseOver={() => !containerCheck(item) && handleMouseOver(i + name)}
          onMouseOut={() => !containerCheck(item) && handleMouseOut(i + name)}
          // open item setting on click
          onClick={() =>
            containerCheck(item) ? null : onComponentClick(item.name, i)
          }
        >
          <RenderItem
            item={item}
            setDrag={setDrag}
            setOpenSetting={setOpenSetting}
            setOpenTab={setOpenTab}
            setIsContainerSelected={setIsContainerSelected}
            setSideElement={setSideElement}
            dragContainer={dragContainer}
            setDragContainer={setDragContainer}
            showSidebar={showSidebar}
            hideSidebar={hideSidebar}
            hideSettingSidebar={hideSettingSidebar}
          />
        </div>
      );
    });

  return (
    <main
      style={{ width: "-webkit-fill-available" }}
      className="main-div h-full"
    >
      <section onClick={handleCheckIsContainer}>
        {isNavHidden && !openSetting ? (
          <section
            id="full-view"
            style={{
              width: "-webkit-fill-available",
              background: workspaceBackgroundColor,
            }}
            className="mt-[100px] z-[100] overflow-y-scroll bg-white ml-[110px] mr-[40px] mb-[20px] min-h-[87vh] shadow-2xl"
          >
            <GridLayout
              layout={workspaceElements}
              cols={6}
              rowHeight={50}
              width={fullViewWidth || 1200}
              resizeHandles={["se"]}
              isDraggable={drag}
              onLayoutChange={onLayoutChange}
              compactType={null}
              margin={[0, 0]}
              className="h-fit overflow-hidden"
            >
              {renderItemFunction}
            </GridLayout>
          </section>
        ) : (
          <>
            {openSetting ? (
              <section
                id="left-side-view"
                style={{
                  width: "-webkit-fill-available",
                  background: workspaceBackgroundColor,
                }}
                className="mt-[100px] z-[100] overflow-y-scroll bg-white ml-[120px] mr-[302px] mb-[20px] min-h-[87vh] shadow-2xl"
              >
                <GridLayout
                  layout={workspaceElements}
                  cols={6}
                  rowHeight={50}
                  width={leftSideViewWidth || 1200}
                  resizeHandles={["se"]}
                  isDraggable={drag}
                  onLayoutChange={onLayoutChange}
                  compactType={null}
                  margin={[0, 0]}
                  className="h-fit overflow-hidden"
                >
                  {renderItemFunction}
                </GridLayout>
              </section>
            ) : (
              <section
                id="right-side-view"
                style={{
                  width: "-webkit-fill-available",
                  background: workspaceBackgroundColor,
                }}
                className="mt-[100px] z-[100] overflow-y-scroll bg-white ml-[390px] mr-[32px] mb-[20px] min-h-[87vh] shadow-2xl"
              >
                <GridLayout
                  layout={workspaceElements}
                  cols={6}
                  rowHeight={50}
                  width={rightSideViewWidth || 1200}
                  resizeHandles={["se"]}
                  isDraggable={drag}
                  onLayoutChange={onLayoutChange}
                  compactType={null}
                  margin={[0, 0]}
                  className="h-fit overflow-hidden"
                >
                  {renderItemFunction}
                </GridLayout>
              </section>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Workspace;
