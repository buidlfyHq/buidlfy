import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShortUniqueId from "short-unique-id";
import ReactTooltip from "react-tooltip";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { components } from "config/component";
import { containerCheck } from "utils/container-check";
import { updateWorkspaceElementsArray } from "redux/workspace/workspace.reducers";
import { IRootState } from "redux/root-state.interface";
import {
  IWorkspaceElement,
  ResizeHandles,
} from "redux/workspace/workspace.interfaces";
import defaultImage from "assets/default-image.svg";
import container from "assets/image-container.svg";
import "styles/components.css";

interface IElements {
  isContainerSelected: boolean;
  hideNavbar: boolean;
  setHideNavbar: (hideNavbar: boolean) => void;
}

const Elements: FC<IElements> = ({
  isContainerSelected,
  hideNavbar,
  setHideNavbar,
}) => {
  const uid = new ShortUniqueId();
  const dispatch = useDispatch();
  const workspaceElements = useSelector(
    (state: IRootState) => state.workspace.workspaceElements
  );
  const selectedElement = useSelector(
    (state: IRootState) => state.workspace.selectedElement
  );

  const onClickFunction = (name: string) => {
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
      if (c.name === "Vertical Container" || c.name === "NFT Card") {
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
      if (c.name === "NFT Layout") {
        let newChildren = c.children.map((child) => ({
          ...child,
          i: uid(),
          resizeHandles: [],
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
        id="elements"
        className="tool"
        place="right"
        type="dark"
        effect="solid"
        backgroundColor="#262338"
        arrowColor="#262338"
        scrollHide={true}
        delayShow={200}
      />
      {/* Fix: Add all style to common tailwind  */}
      <div className="element-div">
        <div className="px-[4.1rem] py-4">
          <div className="flex">
            <div data-tip="Click here to add the button" data-for="elements">
              <button
                onClick={() => onClickFunction("Button")}
                className="cursor-pointer element-btn btn-div"
              >
                Button
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="element-div">
        <div className="px-10 py-3">
          <div data-tip="Click here to add the heading" data-for="elements">
            <h1
              className="heading-element font-normal text-2xl mb-4 cursor-pointer hover:text-[#5A4471]"
              onClick={() => onClickFunction("Heading 1")}
            >
              Add Heading 1
            </h1>
          </div>
          <div data-tip="Click here to add the heading" data-for="elements">
            <h2
              onClick={() => onClickFunction("Heading 2")}
              className="heading-element font-normal text-xl mb-4 cursor-pointer hover:text-[#5A4471]"
            >
              Add Heading 2
            </h2>
          </div>
          <div data-tip="Click here to add the heading" data-for="elements">
            <h3
              onClick={() => onClickFunction("Heading 3")}
              className="heading-element font-normal text-lg mb-4 cursor-pointer hover:text-[#5A4471]"
            >
              Add Heading 3
            </h3>
          </div>
          <div data-tip="Click here to add the paragraph" data-for="elements">
            <div
              onClick={() => onClickFunction("Text")}
              className="heading-element font-normal text-[13px] text-four w-[200px] cursor-pointer hover:text-[#5A4471]"
            >
              I am a paragrah. Click here to add your own text and edit me. It's
              easy & simple.
            </div>
          </div>
        </div>
      </div>
      <div className="element-div">
        <div className="px-[1.75rem] py-4">
          <div data-tip="Click here to add the input" data-for="elements">
            <div
              className="cursor-pointer input-container"
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
          <div
            data-tip="Click here to add the image upload"
            data-for="elements"
          >
            <div className="relative image-container">
              <img className="w-[20rem]" src={container} alt="container" />
              <img
                className="absolute w-[2.6rem] bottom-[5rem] left-[6.5rem]"
                src={defaultImage}
                alt="default"
              />
              <h6 className="absolute bottom-[3rem] left-[5.5rem] text-[#666BD3] text-[16px]">
                Add Image
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Components */}
      <div
        className={`fixed pr-3 pl-[1.2rem] py-[1.5rem] mb-[2rem] left-[5rem] flex w-[320px] h-[60px] ${
          hideNavbar
            ? "element-hide-div animate__animated animate__slideOutLeft"
            : "element-heading-div animate__animated animate__slideInLeft"
        }`}
      >
        <h3 className="element-heading mt-[2.5px]">Add Elements</h3>
        <button className="close-btn" onClick={() => setHideNavbar(true)}>
          <MdOutlineClose className="text-[16px]" />
        </button>
      </div>

      {!isContainerSelected ? (
        <div className="mt-[6rem]">
          <div className="element-div">
            <div className="px-4 py-4">
              <div
                data-tip="Click here to add the container"
                data-for="elements"
              >
                <div className="flex">
                  <div
                    className="cursor-pointer element-container"
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
        </div>
      ) : (
        <div className="mt-[6rem]">{elementsList}</div>
      )}
    </>
  );
};

export default Elements;
