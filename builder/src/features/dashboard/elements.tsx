import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShortUniqueId from "short-unique-id";
import { components } from "config/component";
import { containerCheck } from "utils/container-check";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import ReactTooltip from "react-tooltip";
import { updateWorkspaceElementsArray } from "redux/workspace/workspace.reducers";
import { IRootState } from "redux/root-state.interface";
import {
  IWorkspaceElement,
  ResizeHandles,
} from "redux/workspace/workspace.interfaces";
import "styles/components.css";

interface IElements {
  isContainerSelected: boolean;
  hideSidebar: () => void;
  hideSettingSidebar: () => void;
}

const Elements: FC<IElements> = ({
  isContainerSelected,
  hideSidebar,
  hideSettingSidebar,
}) => {
  const uid = new ShortUniqueId();
  const dispatch = useDispatch();
  const workspaceElements: IWorkspaceElement[] = useSelector(
    (state: IRootState) => state.workspace.workspaceElements
  );
  const selectedElement: IWorkspaceElement = useSelector(
    (state: IRootState) => state.workspace.selectedElement
  );

  const onClickFunction = (name) => {
    let c = components?.find((component) => component.name === name);
    if (isContainerSelected) {
      const availableHandles: ResizeHandles = ["se"];
      let y = checkContainerY(selectedElement);
      let newC = {
        ...c,
        i: uid(),
        x: 0,
        y,
        w: 6,
        minW: 1,
        resizeHandles: availableHandles,
      };
      let updatedItem = {
        ...selectedElement,
        h: y + c.h,
        children: [...selectedElement.children, newC],
      };
      const elementsIndex = workspaceElements.findIndex(
        (item) => item.i === selectedElement.i
      );
      let newArray = [...workspaceElements];
      newArray[elementsIndex] = updatedItem;
      dispatch(updateWorkspaceElementsArray(newArray));
    } else {
      const availableHandles: ResizeHandles = ["se"];
      const containerHandles: ResizeHandles = ["e"];
      let y = checkY(workspaceElements);
      let newC = {
        ...c,
        i: uid(),
        x: 0,
        y: y,
        w: 6,
        minW: 1,
        minH: 1,
        resizeHandles: containerCheck(c) ? containerHandles : availableHandles,
      };
      if (c.name === "Vertical Container") {
        newC.w = 2;
      }
      if (
        c.name === "Horizontal Container" ||
        c.name === "Vertical Container"
      ) {
        let newChildren = c.children.map((child) => ({
          ...child,
          i: uid(),
        }));
        newC.children = newChildren;
      }
      dispatch(updateWorkspaceElementsArray([...workspaceElements, newC]));
    }
  };
  const checkY = (items: IWorkspaceElement[]) => {
    if (items.length === 0) return 0;
    else {
      let arr = items.map((item) => {
        return containerCheck(item)
          ? Math.max(
              ...item.children.map((obj: IWorkspaceElement) => obj.y),
              item.y
            )
          : item.y;
      });
      return Math.max(...arr) + 1;
    }
  };

  const checkContainerY = (selectedElement: IWorkspaceElement) => {
    if (selectedElement.children.length === 0) return 0;
    else {
      let arr = selectedElement.children.map(
        (item: IWorkspaceElement) => item.y
      );
      return Math.max(...arr) + 1;
    }
  };

  const elementsList = (
    <>
      <ReactTooltip
        className="tool"
        place="right"
        type="dark"
        effect="solid"
        backgroundColor="#262338"
        arrowColor="#262338"
        scrollHide={true}
      />
      {/* Fix: Add all style to common tailwind  */}
      <div className="element-div">
        <div className="px-[4.1rem] py-4">
          <div className="flex">
            <div data-tip="Click here to add the button">
              <button
                onClick={() => onClickFunction("Button")}
                className="element-btn cursor-pointer btn-div"
              >
                Button
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="element-div">
        <div className="py-3 px-10">
          <div data-tip="Click here to add the heading">
            <h1
              className="font-normal text-2xl mb-4 cursor-pointer hover:text-[#5A4471]"
              onClick={() => onClickFunction("Heading 1")}
            >
              Add Heading 1
            </h1>
          </div>
          <div data-tip="Click here to add the heading">
            <h2
              onClick={() => onClickFunction("Heading 2")}
              className="font-normal text-xl mb-4 cursor-pointer hover:text-[#5A4471]"
            >
              Add Heading 2
            </h2>
          </div>
          <div data-tip="Click here to add the heading">
            <h3
              onClick={() => onClickFunction("Heading 3")}
              className="font-normal text-lg mb-4 cursor-pointer hover:text-[#5A4471]"
            >
              Add Heading 3
            </h3>
          </div>
          <div data-tip="Click here to add the paragraph">
            <div
              onClick={() => onClickFunction("Text")}
              className="font-normal text-[13px] text-four w-[200px] cursor-pointer hover:text-[#5A4471]"
            >
              I am a paragrah. Click here to add your own text and edit me. It's
              easy & simple.
            </div>
          </div>
        </div>
      </div>
      <div className="element-div">
        <div className="px-[1.75rem] py-4">
          <div data-tip="Click here to add the input">
            <div
              className="input-container cursor-pointer"
              onClick={() => onClickFunction("Input")}
            >
              <h1 className="element-input-text">Add Input</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="element-div">
        <div
          onClick={() => onClickFunction("Image")}
          className="px-4 py-4 cursor-pointer"
        >
          <div data-tip="Click here to add the image upload">
            <div className="image-container pt-2">
              <span className="element-text ml-[1rem] my-[0.7rem] text-black">
                File Upload
              </span>
              <div className="element-upload mx-4">
                <span className="image-label text-[10px]">
                  Drag and drop a file, or{" "}
                  <span className="purple-label">browse</span>
                </span>
              </div>
              <div className="flex justify-center">
                <button className="upload-btn mx-2 mt-4">Upload</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return (
    <>
      {/* Components */}
      <div className="element-heading-div pr-3 pl-[1.2rem] py-[1.5rem] mb-[2rem]">
        <h3 className="element-heading">Add Elements</h3>
        <MdOutlineClose
          onClick={() => {
            hideSidebar();
            hideSettingSidebar();
          }}
          className="text-[16px]"
        />
      </div>
      {!isContainerSelected ? (
        <>
          <div className="element-div">
            <div className="px-4 py-4">
              <div data-tip="Click here to add the container">
                <div className="flex">
                  <div
                    className="element-container cursor-pointer"
                    onClick={() => onClickFunction("Container")}
                  >
                    <span className="element-text">
                      Add Container
                      <IoIosAddCircleOutline className="text-[16px] ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {elementsList}
        </>
      ) : (
        elementsList
      )}
    </>
  );
};

export default Elements;
