import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
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
import {
  IWorkspaceElement,
} from "redux/workspace/workspace.interfaces";
import {
  IContractElementSelected,
  IContractElementSelector,
} from "redux/contract/contract.interfaces";
import "styles/components.css";

const ResponsiveGridLayout = WidthProvider(Responsive); // for responsive grid layout

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
  dynamicWidth?: number;
  dynamicHeight?: number;
  setDynamicWidth?: (dynamicWidth?: number) => void;
  setDynamicHeight?: (dynamicHeight?: number) => void;
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
  dynamicHeight,
  dynamicWidth,
  setDynamicHeight,
  setDynamicWidth,
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

  const [currentSize, setCurrentSize] = useState<number>(6);
  // const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isNavHidden && !openSetting) {
      setCurrentSize(6);
    } else {
      setCurrentSize(7.5);
    }
  }, [isNavHidden, openSetting]);

  const onLayoutChange = (layout: Layout[], layouts: Layouts) => {
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
      // setOpenSetting(false);
    } else {
      setIsContainerSelected(false);
      hideSidebar();
    }
    if (e.target.id === "") {
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
          id={name}
          unselectable="on"
          data-grid={{ x, y, w, h, minW, minH, resizeHandles }}
          className={`justify-center transition-colors duration-150 ease-in-out cursor-pointer droppable-element hover:border hover:border-2 ${
            !containerCheck(item)
              ? contractElementSelector
                ? "border-hover"
                : "hover:border-slate-300 hover:border-dashed"
              : null
          }`}
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
    <div
      style={{ width: "-webkit-fill-available" }}
      className="main-div h-full"
    >
      <main onClick={handleCheckIsContainer}>
        {isNavHidden && !openSetting ? (
          <section
            style={{
              width: "-webkit-fill-available",
              background: workspaceBackgroundColor,
            }}
            className="mt-[100px] z-[100] overflow-y-scroll bg-white ml-[110px] mr-[40px] mb-[20px] min-h-[87vh] shadow-2xl"
          >
            <ResponsiveGridLayout
              layouts={{ lg: workspaceElements }}
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
                  background: workspaceBackgroundColor,
                }}
                className="mt-[100px] z-[100] overflow-y-scroll bg-white ml-[120px] mr-[302px] mb-[20px] min-h-[87vh] shadow-2xl"
              >
                <ResponsiveGridLayout
                  layouts={{ lg: workspaceElements }}
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
                  background: workspaceBackgroundColor,
                }}
                className="mt-[100px] z-[100] overflow-y-scroll bg-white ml-[390px] mr-[32px] mb-[20px] min-h-[87vh] shadow-2xl"
              >
                <ResponsiveGridLayout
                  layouts={{ lg: workspaceElements }}
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
