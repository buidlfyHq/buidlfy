import React, { FC } from "react";
import ShortUniqueId from "short-unique-id";
import { components } from "./component";
import IItems from "interfaces/items";
import { ResizeHandles } from "interfaces/handle";

interface ISidebar {
  className: string;
  setClassName: (className: string) => void;
  items: IItems[];
  setItems: (items: IItems[]) => void;
  addContainer: boolean;
  settingItemId: string;
}

const Sidebar: FC<ISidebar> = ({
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
      item.children?.find((child) => child.i === settingItemId)
    )[0];

  // const hideSidebar = () => {
  //   setClassName("hidden");
  // };

  const checkY = (items: IItems[]) => {
    if (items.length === 0) return 0;
    else {
      let arr = items.map((item) => {
        return item.name === "Container"
          ? Math.max(...item.children.map((obj) => obj.y), item.y)
          : item.y;
      });
      return Math.max(...arr) + 1;
    }
  };

  const checkContainerY = (selectedItem: IItems) => {
    if (selectedItem.children.length === 0) return 0;
    else {
      let arr = selectedItem.children.map((item) => item.y);
      return Math.max(...arr) + 1;
    }
  };

  const renderContainerComponents = components
    .filter((c) => c.name !== "Container")
    ?.map((c, index) => {
      const availableHandles: ResizeHandles = ["nw", "se"];
      return (
        <div
          key={index}
          className="px-4 py-2 my-1 transition-colors duration-150 ease-in-out rounded-lg cursor-pointer hover:bg-slate-100"
          onClick={() => {
            console.log(selectedItem);
            let y = checkContainerY(selectedItem);
            let newC = {
              ...c,
              i: uid(),
              x: 0,
              y,
              w: 12,
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
          }}
        >
          {c.name}
        </div>
      );
    });

  const renderComponents = components?.map((c, index) => {
    const availableHandles: ResizeHandles = ["nw", "se"];
    const containerHandles: ResizeHandles = ["w", "e"];
    return (
      <div
        key={index}
        className="px-4 py-2 my-1 transition-colors duration-150 ease-in-out rounded-lg cursor-pointer hover:bg-slate-100"
        onClick={() => {
          let y = checkY(items);
          let newC = {
            ...c,
            i: uid(),
            x: 0,
            y: y,
            w: 12,
            minW: 1,
            minH: 1,
            resizeHandles:
              c.name === "Container" ? containerHandles : availableHandles,
          };
          setItems([...items, newC]);
        }}
      >
        {c.name}
      </div>
    );
  });

  return (
    <main
      className={`fixed left-0 top-0 z-0 w-[250px] border-r h-full ${className}`}
    >
      {/* user name */}
      {/* It will be used for a later code */}
      {/* <section className="flex flex-row justify-between items-center h-[60px]">
        <Popover className="relative p-3 bg-white">
          <Popover.Button>
            <span className="bg-blue-300 mr-2 rounded-[50%] p-1">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            User Name
          </Popover.Button>

          <Popover.Panel className="absolute bg-white z-10 mt-5 rounded-md shadow-sm border w-[225px] p-2">
            <div className="flex flex-row items-center justify-start">
              <span className="bg-blue-300 mr-2 rounded-[50%] p-3">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <div className="flex flex-col">
                <div>User Name</div>
                <div>xyz.spheron.com</div>
              </div>
            </div>
            <hr className="my-2" />
            <div>
              <div>All Sites</div>
              <div>Create a new Site</div>
            </div>
            <hr className="my-2" />
            <div>Logout</div>
          </Popover.Panel>
        </Popover>
        <div
          onClick={hideSidebar}
          className="m-2 p-2 text-slate-600 text-[18px] hover:bg-slate-100 hover:rounded-md cursor-pointer"
        >
          <AiOutlineDoubleLeft />
        </div>
      </section> */}

      {/* Components */}
      <div className="px-6 py-3 mt-10">
        {addContainer ? (
          <>{renderContainerComponents}</>
        ) : (
          <>{renderComponents}</>
        )}
      </div>
    </main>
  );
};

export default Sidebar;
