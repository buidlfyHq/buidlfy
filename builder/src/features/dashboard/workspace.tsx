import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridLayout, { Layout } from 'react-grid-layout';
import DefaultBuilder from './deafult-builder';
import RenderItem from 'components/utils/render-item';
import { containerCheck } from 'utils/container-check';
import { setSelectedElement, updateWorkspaceElementsArray } from 'redux/workspace/workspace.reducers';
import { setSelectorToDefault, addSelectedElement, createSelectedElement, updateSelectedElement } from 'redux/contract/contract.reducers';
import { setOracleSelectorToDefault, updateOracleOutputId } from 'redux/oracle/oracle.reducers';
import { IRootState } from 'redux/root-state.interface';
import { IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import 'styles/components.css';

interface IWorkspaceComponent {
  setOpenSetting: (openSetting: boolean) => void;
  setOpenTab: (openTab?: number) => void;
  drag: boolean;
  setDrag: (drag: boolean) => void;
  setIsContainerSelected: (isContainerSelected?: boolean) => void;
  hideNavbar?: boolean;
  setHideNavbar?: (hideNavbar?: boolean) => void;
  openSetting?: boolean;
  setSideElement?: (sideElement?: string) => void;
  hideSettingSidebar?: () => void;
}

const Workspace: FC<IWorkspaceComponent> = ({
  setOpenSetting,
  setOpenTab,
  drag,
  setDrag,
  setIsContainerSelected,
  hideNavbar,
  setHideNavbar,
  openSetting,
  setSideElement,
  hideSettingSidebar,
}) => {
  const dispatch = useDispatch();
  const workspaceElements = useSelector((state: IRootState) => state.workspace.workspaceElements);
  const workspaceBackgroundColor = useSelector((state: IRootState) => state.workspace.workspaceBackgroundColor);
  const contractElementSelector = useSelector((state: IRootState) => state.contract.contractElementSelector);
  const contractElementSelected = useSelector((state: IRootState) => state.contract.contractElementSelected);
  const oracleElementSelector = useSelector((state: IRootState) => state.oracle.oracleElementSelector);
  const elementHoverStyles =
    contractElementSelector || oracleElementSelector
      ? 'border border-[transparent] border-hover'
      : 'border border-[transparent] hover:border-slate-300 hover:border-dashed';

  const [fullViewWidth, setFullViewWidth] = useState<number>(1200);
  useEffect(() => {
    let fullView = document?.getElementById('full-view')?.getBoundingClientRect().width;
    setFullViewWidth(fullViewWidth => fullView);
  }, [hideNavbar, openSetting]);

  const onLayoutChange = (layout: Layout[]) => {
    if (layout.length === 0) setIsContainerSelected(false);
    let newItemsArr = layout.map((obj: IWorkspaceElement) => {
      let selectedElement = workspaceElements.filter(item => item.i === obj.i)[0];
      let height: number;
      const { h, minW, minH, x, y, w, i } = obj;
      if (containerCheck(selectedElement)) {
        let maxY = Math.max(...selectedElement.children.map(item => item.y));
        let el = selectedElement.children?.filter(item => item.y === maxY)[0];
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
    newItemsArr.length > 0 ? dispatch(updateWorkspaceElementsArray(newItemsArr)) : dispatch(updateWorkspaceElementsArray(workspaceElements));
  };

  // to update selected element config
  const updateElementConfig = (itemName: string, i: string) => {
    const searchExistingValue = Object.keys(contractElementSelected).filter(key => key === contractElementSelector.name);
    if (!searchExistingValue.length || !Object.keys(contractElementSelected).length) {
      dispatch(
        createSelectedElement({
          name: contractElementSelector.name,
          element: {
            buttonId: contractElementSelector.buttonId,
            name: itemName,
            id: i,
          },
        }),
      );
    } else {
      Object.keys(contractElementSelected).map(key => {
        if (key === contractElementSelector.name) {
          contractElementSelected[key].map((obj, index: number) => {
            if (obj.buttonId === contractElementSelector.buttonId) {
              dispatch(
                updateSelectedElement({
                  name: key,
                  index,
                  id: i,
                }),
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
                }),
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
    (document.getElementById(id).childNodes[1] as HTMLElement).style.visibility = 'visible';
  };

  const handleMouseOut = (id: string) => {
    (document.getElementById(id).childNodes[1] as HTMLElement).style.visibility = 'hidden';
  };

  const onComponentClick = (itemName: string, i: string) => {
    setIsContainerSelected(true);
    setOpenSetting(true);
    // checks if the selector is active
    if (contractElementSelector === null && oracleElementSelector === null) {
      dispatch(setSelectedElement(i));
      setOpenTab(1);
    }
    if (contractElementSelector !== null) {
      // checks selector type
      if (contractElementSelector.type === 'input' && itemName === 'Input') {
        updateElementConfig(itemName, i);
        dispatch(setSelectorToDefault());
      } else if (
        contractElementSelector.type === 'output' &&
        (itemName === 'Text' || itemName === 'Heading 1' || itemName === 'Heading 2' || itemName === 'Heading 3')
      ) {
        updateElementConfig(itemName, i);
        dispatch(setSelectorToDefault());
      }
    }
    if (oracleElementSelector !== null) {
      if (itemName === 'Text' || itemName === 'Heading 1' || itemName === 'Heading 2' || itemName === 'Heading 3') {
        dispatch(updateOracleOutputId(i));
        dispatch(setOracleSelectorToDefault());
      }
    }
  };

  // FIX: find a suitable type for this event
  const handleCheckIsContainer = e => {
    if (
      !(
        e.target.id.slice(6) === 'Container' ||
        e.target.parentNode.id.slice(6) === 'Container' ||
        e.target.parentNode.parentNode.id.slice(6) === 'Container' ||
        e.target.parentNode.parentNode.parentNode.id.slice(6) === 'Container' ||
        e.target.id.slice(6) === 'NFT Layout' ||
        e.target.parentNode.id.slice(6) === 'NFT Layout' ||
        e.target.parentNode.parentNode.id.slice(6) === 'NFT Layout' ||
        e.target.parentNode.parentNode.parentNode.id.slice(6) === 'NFT Layout'
      )
    ) {
      setIsContainerSelected(false);
      setHideNavbar(true);
    }
    if (e.target.id === 'full-view' || e.target.id === 'left-side-view' || e.target.id === 'right-side-view' || e.target.id === '') {
      setOpenSetting(false);
    }
  };

  const renderItemFunction = workspaceElements
    ?.filter(i => i.style?.deleteComponent === false)
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
          onMouseOver={() => handleMouseOver(i + name)}
          onMouseOut={() => handleMouseOut(i + name)}
          // open item setting on click
          onClick={() => (containerCheck(item) ? null : onComponentClick(item.name, i))}
        >
          <RenderItem
            item={item}
            setDrag={setDrag}
            setOpenSetting={setOpenSetting}
            setOpenTab={setOpenTab}
            setIsContainerSelected={setIsContainerSelected}
            setSideElement={setSideElement}
            setHideNavbar={setHideNavbar}
            hideSettingSidebar={hideSettingSidebar}
          />
        </div>
      );
    });

  return (
    <main
      style={{
        width: '-webkit-fill-available',
      }}
      className="h-full main-div"
    >
      {workspaceElements?.length > 0 ? (
        <section onClick={handleCheckIsContainer} className="z-100">
          <section
            id="full-view"
            style={{
              width: '-webkit-fill-available',
              background: workspaceBackgroundColor,
            }}
            className="mt-[90px] z-[100] ml-[120px] mb-[20px] min-h-[87vh] main-grid mr-[290px]"
          >
            <GridLayout
              layout={workspaceElements}
              cols={6}
              rowHeight={50}
              width={fullViewWidth || 1200}
              resizeHandles={['se']}
              isDraggable={drag}
              onLayoutChange={onLayoutChange}
              compactType="vertical"
              margin={[0, 0]}
              className="overflow-hidden h-fit"
            >
              {renderItemFunction}
            </GridLayout>
          </section>
        </section>
      ) : (
        <DefaultBuilder setHideNavbar={setHideNavbar} setSideElement={setSideElement} />
      )}
    </main>
  );
};

export default Workspace;
