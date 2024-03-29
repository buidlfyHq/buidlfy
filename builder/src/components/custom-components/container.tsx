import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridLayout, { Layout } from 'react-grid-layout';
import RenderItem from 'components/utils/render-item';
import { setSelectedElement, updateWorkspaceElementsArray, updateWorkspaceElementStyle } from 'redux/workspace/workspace.reducers';
import { setSelectorToDefault, addSelectedElement, createSelectedElement, updateSelectedElement } from 'redux/contract/contract.reducers';
import { setOracleSelectorToDefault, updateOracleOutputId } from 'redux/oracle/oracle.reducers';
import { IRootState } from 'redux/root-state.interface';
import { IUploadedImageData, IWorkspaceElement, SidebarEnum } from 'redux/workspace/workspace.interfaces';
import add from 'assets/icons/add.png';
import edit from 'assets/icons/edit.png';
import deleteContainer from 'assets/icons/delete.png';
import dragImg from 'assets/icons/drag.png';
import 'styles/components.css';

interface IContainer {
  item: IWorkspaceElement;
  children: IWorkspaceElement[];
  backgroundColor: string;
  color: string;
  borderRadius: number;
  borderWidth: number;
  shadow: string;
  setDrag: (drag: boolean) => void;
  setOpenSetting: (openSetting: boolean) => void;
  setOpenTab: (openTab: number) => void;
  setIsContainerSelected: (isContainerSelected: boolean) => void;
  setValue?: (value: string) => void;
  setSideElement: (sideElement: string) => void;
  setHideNavbar: (hideNavbar: boolean) => void;
  hideSettingSidebar?: () => void;
  backgroundSize?: string;
  padding?: {
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
  };
  margin?: {
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
  };
  imgData?: string | ArrayBuffer;
}

const Container: FC<IContainer> = ({
  item,
  children,
  backgroundColor,
  color,
  borderRadius,
  borderWidth,
  shadow,
  setDrag,
  setOpenSetting,
  setOpenTab,
  setIsContainerSelected,
  setSideElement,
  setHideNavbar,
  backgroundSize,
  padding,
  margin,
  imgData,
}) => {
  const dispatch = useDispatch();
  const workspaceElements = useSelector((state: IRootState) => state.workspace.workspaceElements);
  const contractElementSelector = useSelector((state: IRootState) => state.contract.contractElementSelector);
  const contractElementSelected = useSelector((state: IRootState) => state.contract.contractElementSelected);
  const oracleElementSelector = useSelector((state: IRootState) => state.oracle.oracleElementSelector);
  const imageData = useSelector((state: IRootState) =>
    state.workspace.uploadedImagesData.find((image: IUploadedImageData) => image.settingItemId === item.i),
  );

  let containerW = document?.getElementById(`${item.i}`)?.getBoundingClientRect().width;

  let finalSpacing = margin.marginLeft + margin.marginRight + padding.paddingLeft + padding.paddingRight;

  const elementHoverStyles =
    contractElementSelector || oracleElementSelector
      ? 'border border-[transparent] border-hover'
      : 'border border-[transparent] hover:border-slate-300 hover:border-dashed ';

  // to persist layout changes
  const onLayoutChange = (layout: Layout[]) => {
    let newItemsArr = layout.map((obj: IWorkspaceElement) => {
      let selectedElement = children.filter((item: IWorkspaceElement) => item.i === obj.i)[0];
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
    if (newItemsArr[0]?.i !== 'DefaultElement' && newItemsArr.length) {
      let maxY = Math.max(...newItemsArr.map(item => item.y + item.h));
      let el = newItemsArr?.filter(item => item.y + item.h === maxY)[0];
      let maxH = el.h + el.y;
      let newModifiedContainer = {
        ...item,
        h: maxH,
        children: newItemsArr,
      };
      let filterItems = workspaceElements.filter(element => element.i !== item.i);
      dispatch(updateWorkspaceElementsArray([...filterItems, newModifiedContainer]));
    } else if (layout.length === 0) {
      let removeContainerItems = workspaceElements.filter(element => element.i !== item.i);
      dispatch(updateWorkspaceElementsArray(removeContainerItems));
    } else {
      dispatch(updateWorkspaceElementsArray(workspaceElements));
    }
  };

  const updateElementConfig = (itemName: string, i: string) => {
    // for updating selected element config
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
  };

  const handleMouseOver = (id: string) => {
    setDrag(false);
    (document.getElementById(id).parentNode.parentNode.childNodes[1] as HTMLElement).style.visibility = 'visible';
  };

  const handleMouseOut = (id: string) => {
    setDrag(true);
    (document.getElementById(id).parentNode.parentNode.childNodes[1] as HTMLElement).style.visibility = 'hidden';
  };

  const handleSidebar = (selectedSidebarElements: string) => {
    setSideElement(selectedSidebarElements);
  };

  const handleDelete = () => {
    dispatch(
      updateWorkspaceElementStyle({
        settingItemId: item.i,
        propertyName: 'deleteComponent',
        propertyValue: true,
      }),
    );
  };

  const onComponentAddClick = (i: string) => {
    setIsContainerSelected(true);
    setHideNavbar(false);
    handleSidebar(SidebarEnum.ELEMENTS);
    dispatch(setSelectedElement(i));
    setOpenSetting(false);
  };

  const onComponentDeleteClick = (i: string) => {
    handleDelete();
    dispatch(setSelectedElement(i));
  };

  const onComponentClick = (itemName: string, i: string) => {
    if (contractElementSelector === null && oracleElementSelector === null) {
      dispatch(setSelectedElement(i));
      setOpenSetting(true);
      setOpenTab(1);
    }
    if (contractElementSelector !== null) {
      // Add validation for selection
      if (contractElementSelector.type === 'input' && itemName === 'Input') {
        updateElementConfig(itemName, i);
      } else if (
        contractElementSelector.type === 'output' &&
        (itemName === 'Text' || itemName === 'Heading 1' || itemName === 'Heading 2' || itemName === 'Heading 3')
      ) {
        updateElementConfig(itemName, i);
      }
      dispatch(setSelectorToDefault());
    }
    if (oracleElementSelector !== null) {
      if (itemName === 'Text' || itemName === 'Heading 1' || itemName === 'Heading 2' || itemName === 'Heading 3') {
        dispatch(updateOracleOutputId(i));
        dispatch(setOracleSelectorToDefault());
      }
    }
  };

  const onComponentEditClick = (i: string) => {
    setIsContainerSelected(false);
    dispatch(setSelectedElement(i));
    setOpenSetting(true);
    setHideNavbar(true);
  };

  return (
    <>
      <section
        id={item.i}
        style={{
          paddingLeft: `${margin.marginLeft}px`,
          paddingRight: `${margin.marginRight}px`,
        }}
        className="w-full overflow-hidden cursor-pointer h-fit container-drag"
      >
        <GridLayout
          layout={children}
          cols={6}
          rowHeight={children?.length ? 50 - (borderWidth ? borderWidth * 2 : 0) / children?.length : 50}
          width={containerW - (finalSpacing + borderWidth * 2) || 1000}
          isBounded={true}
          onLayoutChange={onLayoutChange}
          compactType="vertical"
          margin={[0, 0]}
          className="h-fit btn-border"
          style={{
            backgroundColor: backgroundColor.slice(0, 4) === 'rgba' ? backgroundColor : null,
            backgroundImage:
              imageData?.uploadedImageData || imgData
                ? `url(${imageData?.uploadedImageData || imgData})`
                : backgroundColor.slice(0, 4) === 'rgba'
                ? null
                : `${backgroundColor}`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: backgroundSize,
            border: `${borderWidth}px solid ${color}`,
            borderRadius: `${borderRadius}px`,
            borderImage: color,
            boxShadow: shadow,
            paddingLeft: `${padding.paddingLeft}px`,
            paddingRight: `${padding.paddingRight}px`,
          }}
        >
          {!children?.length ? (
            <div
              className="w-full h-full py-10 default-container "
              key={'DefaultElement'}
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
                <span className="container-text">Add Elements</span>
              </div>
            </div>
          ) : (
            children
              ?.filter(c => c.style?.deleteComponent === false)
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
                    <RenderItem setSideElement={setSideElement} item={item} setDrag={setDrag} />
                  </div>
                );
              })
          )}
        </GridLayout>
        <div className="flex">
          <div
            id="drag"
            onMouseOut={() => setDrag(true)}
            onMouseOver={() => setDrag(true)}
            className="w-[30px] h-[30px] rounded-[25px] flex justify-center items-center content-center bg-white"
          >
            <img className="w-[13px] h-[13px]" src={dragImg} alt="drag" />
          </div>
          {item.name !== 'NFT Layout' && (
            <div
              onMouseOut={() => setDrag(true)}
              onMouseOver={() => setDrag(false)}
              className="w-[30px] h-[30px] rounded-[25px] flex justify-center items-center content-center bg-white"
              id="add-img"
              onClick={() => onComponentAddClick(item.i)}
            >
              <img className="w-[11px] h-[11px]" src={add} alt="add" />
            </div>
          )}
          {children?.length ? (
            <div
              onMouseOut={() => setDrag(true)}
              onMouseOver={() => setDrag(false)}
              className="w-[30px] h-[30px] rounded-[25px] flex justify-center items-center content-center bg-white"
              id="edit-img"
              onClick={() => onComponentEditClick(item.i)}
            >
              <img className="w-[13px] h-[13px]" src={edit} alt="edit" />
            </div>
          ) : (
            <div
              onMouseOut={() => setDrag(true)}
              onMouseOver={() => setDrag(false)}
              className="w-[30px] h-[30px] rounded-[25px] flex justify-center items-center content-center bg-white"
              id="delete-img"
              onClick={() => onComponentDeleteClick(item.i)}
            >
              <img className="w-[13px] h-[13px]" src={deleteContainer} alt="delete" />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Container;
