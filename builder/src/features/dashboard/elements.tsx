import React, { FC } from "react";
import ShortUniqueId from "short-unique-id";
import { components } from "config/component";
import { containerCheck } from "utils/container-check";
import IItems from "interfaces/items";
import { ResizeHandles } from "interfaces/handle";
import { Link } from "react-router-dom";
import "styles/components.css";
import image from "assets/image.png";

interface IElements {
  className: string;
  setClassName: (className: string) => void;
  items: IItems[];
  setItems: (items: IItems[]) => void;
  addContainer: boolean;
  settingItemId: string;
}

const Elements: FC<IElements> = ({
  className,
  setClassName,
  items,
  setItems,
  addContainer,
  settingItemId,
}) => {
  const uid = new ShortUniqueId();
  // const [indexValue, setIndexValue] = useState<number>(0);

  const selectedItem =
    items?.find((item) => item.i === settingItemId) ||
    items?.map((item) =>
      item.children?.find((child: IItems) => child.i === settingItemId)
    )[0];

  // const hideSidebar = () => {
  //   setClassName("hidden");
  // };
  const onClickFunction = (name) => {
    let c = components?.find((component) => component.name == name);
    if (addContainer) {
      const availableHandles: ResizeHandles = ["se"];
      let y = checkContainerY(selectedItem);
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
        ...selectedItem,
        h: y + c.h,
        children: [...selectedItem.children, newC],
      };
      const elementsIndex = items.findIndex(
        (item) => item.i === selectedItem.i
      );
      let newArray = [...items];
      newArray[elementsIndex] = updatedItem;
      setItems(newArray);
    } else {
      const availableHandles: ResizeHandles = ["se"];
      const containerHandles: ResizeHandles = ["e"];
      let y = checkY(items);
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
      setItems([...items, newC]);
    }
  };
  const checkY = (items: IItems[]) => {
    if (items.length === 0) return 0;
    else {
      let arr = items.map((item) => {
        return containerCheck(item)
          ? Math.max(...item.children.map((obj: IItems) => obj.y), item.y)
          : item.y;
      });
      return Math.max(...arr) + 1;
    }
  };

  const checkContainerY = (selectedItem: IItems) => {
    if (selectedItem.children.length === 0) return 0;
    else {
      let arr = selectedItem.children.map((item: IItems) => item.y);
      return Math.max(...arr) + 1;
    }
  };

  const onClickContainerFunction = (name) => {
    const availableHandles: ResizeHandles = ["se"];
    let y = checkContainerY(selectedItem);
    let c = components?.find((component) => component.name == name);
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
      ...selectedItem,
      h: y + c.h,
      children: [...selectedItem.children, newC],
    };
    const elementsIndex = items.findIndex((item) => item.i === selectedItem.i);
    let newArray = [...items];
    newArray[elementsIndex] = updatedItem;
    setItems(newArray);
  };

  // const renderContainerComponents = components
  //   .filter((c) => !containerCheck(c))
  //   ?.map((c, index) => {
  //     const availableHandles: ResizeHandles = ["se"];
  //     return (
  //       <div
  //         key={index}
  //         className="px-4 py-2 my-1 transition-colors duration-150 ease-in-out rounded-lg cursor-pointer hover:bg-slate-100"
  //         onClick={() => {
  //           let y = checkContainerY(selectedItem);
  //           let newC = {
  //             ...c,
  //             i: uid(),
  //             x: 0,
  //             y,
  //             w: 6,
  //             minW: 1,
  //             resizeHandles: availableHandles,
  //           };
  //           let updatedItem = {
  //             ...selectedItem,
  //             h: y + c.h,
  //             children: [...selectedItem.children, newC],
  //           };
  //           const elementsIndex = items.findIndex(
  //             (item) => item.i === selectedItem.i
  //           );
  //           let newArray = [...items];
  //           newArray[elementsIndex] = updatedItem;
  //           setItems(newArray);
  //         }}
  //       >
  //         {c.name}
  //       </div>
  //     );
  //   });

  // const renderComponents = components?.map((c, index) => {
  //   const availableHandles: ResizeHandles = ["se"];
  //   const containerHandles: ResizeHandles = ["e"];
  //   return (
  //     <div
  //       key={index}
  //       className="py-2 my-1 transition-colors duration-150 ease-in-out rounded-lg cursor-pointer hover:bg-slate-100"
  //       onClick={() => {
  //         let y = checkY(items);
  //         let newC = {
  //           ...c,
  //           i: uid(),
  //           x: 0,
  //           y: y,
  //           w: 6,
  //           minW: 1,
  //           minH: 1,
  //           resizeHandles: containerCheck(c)
  //             ? containerHandles
  //             : availableHandles,
  //         };
  //         if (c.name === "Vertical Container") {
  //           newC.w = 2;
  //         }
  //         if (
  //           c.name === "Horizontal Container" ||
  //           c.name === "Vertical Container"
  //         ) {
  //           let newChildren = c.children.map((child) => ({
  //             ...child,
  //             i: uid(),
  //           }));
  //           newC.children = newChildren;
  //         }
  //         setItems([...items, newC]);
  //       }}
  //     >
  //       {c.name}
  //     </div>
  //   );
  // });

  return (
    <>
      {/* Components */}

      <form className="flex items-center mb-5">
        <div className="relative mt-[4rem] mx-3 w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="search rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 "
            placeholder="Search"
            required
          />
        </div>
      </form>
      <div className="mx-9">
        <span className="badge mt-12 px-2.5 py-2.5">Default</span>
        <span className="badge ml-2.5 mt-12 px-2.5 py-2.5">Default</span>
        <span className="badge ml-2.5 mt-12 px-2.5 py-2.5">Default</span>
      </div>
      {!addContainer ? (
        <>
          {" "}
          <div className="mt-6 px-4">
            <span className="element-text">Button</span>
            <div className="flex">
              <button
                onClick={() => onClickFunction("Button")}
                className="element-btn mt-3 px-4 py-2 rounded-xl"
              >
                Button
              </button>
            </div>
          </div>
          <div className="mt-6 px-4">
            <span className="element-text">Container</span>
            <div className="flex">
              <div
                className="element-container"
                onClick={() => onClickFunction("Container")}
              ></div>
            </div>
          </div>
          <div className="mt-6 px-4">
            <span className="element-text">Text</span>
            <div>
              <div
                className="heading-container mt-3 py-2 pl-3"
                onClick={() => onClickFunction("Heading 1")}
              >
                <h1 className="text-2xl">Heading 1</h1>
              </div>
              <div
                className="heading-container mt-3 py-2.5 pl-3"
                onClick={() => onClickFunction("Heading 2")}
              >
                <h2 className="text-xl">Heading 2</h2>
              </div>
              <div
                className="heading-container mt-3 py-2 pl-3"
                onClick={() => onClickFunction("Heading 3")}
              >
                <h3 className="text-lg">Heading 3</h3>
              </div>
              <div
                className="paragraph-container mt-3 py-3 pl-3"
                onClick={() => onClickFunction("Text")}
              >
                <span className="text-sm">Paragraph</span>
              </div>
            </div>
          </div>
          <div className="mt-6 px-4">
            <span className="element-text">Input</span>
            <div>
              <div
                className="heading-container mt-3 py-2.5 pl-3"
                onClick={() => onClickFunction("Input")}
              >
                <h1 className="text-base">Input</h1>
              </div>
            </div>
          </div>
          <div onClick={() => onClickFunction("Image")} className="mt-6 px-4">
            <span className="element-text">Image Upload</span>
            <div className="image-container mt-2 pt-2">
              <div className="upload-img mx-6">
                <span className="image-label">
                  Drag and drop a file, or{" "}
                  <span className="purple-label">browse</span>
                </span>
              </div>
              <div className="flex justify-center">
                <button className="upload-btn mx-2 mt-4">Upload</button>
              </div>
            </div>
            {/* <img src={image} /> */}
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="mt-6 px-4">
            <span className="element-text">Button</span>
            <div className="flex">
              <button
                onClick={() => onClickFunction("Button")}
                className="element-btn mt-3 px-4 py-2 rounded-xl"
              >
                Button
              </button>
            </div>
          </div>
          <div className="mt-6 px-4">
            <span className="element-text">Text</span>
            <div>
              <div
                className="heading-container mt-3 py-2 pl-3"
                onClick={() => onClickFunction("Heading 1")}
              >
                <h1 className="text-2xl">Heading 1</h1>
              </div>
              <div
                className="heading-container mt-3 py-2.5 pl-3"
                onClick={() => onClickFunction("Heading 2")}
              >
                <h2 className="text-xl">Heading 2</h2>
              </div>
              <div
                className="heading-container mt-3 py-2 pl-3"
                onClick={() => onClickFunction("Heading 3")}
              >
                <h3 className="text-lg">Heading 3</h3>
              </div>
              <div
                className="paragraph-container mt-3 py-3 pl-3"
                onClick={() => onClickFunction("Text")}
              >
                <span className="text-sm">Paragraph</span>
              </div>
            </div>
          </div>
          <div className="mt-6 px-4">
            <span className="element-text">Input</span>
            <div>
              <div
                className="heading-container mt-3 py-2.5 pl-3"
                onClick={() => onClickFunction("Input")}
              >
                <h1 className="text-base">Input</h1>
              </div>
            </div>
          </div>
          <div onClick={() => onClickFunction("Image")} className="mt-6 px-4">
            <span className="element-text">Image Upload</span>
            <div className="image-container mt-2 pt-2">
              <div className="upload-img mx-6">
                <span className="image-label">
                  Drag and drop a file, or{" "}
                  <span className="purple-label">browse</span>
                </span>
              </div>
              <div className="flex justify-center">
                <button className="upload-btn mx-2 mt-4">Upload</button>
              </div>
            </div>
            {/* <img src={image} /> */}
          </div>
        </>
      )}

      {/* <div className="px-6 py-3 mt-4">
        {addContainer ? (
          <>{renderContainerComponents}</>
        ) : (
          <>{renderComponents}</>
        )}
      </div> */}

      {/* <Link to="/templates" className="hover:text-black">
        <div className="mx-6 px-4 py-3 mt-10 rounded-xl hover:bg-blue-100">
          Templates
        </div>
      </Link> */}
    </>
  );
};

export default Elements;