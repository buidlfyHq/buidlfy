import React, { FC, useState } from "react";
import { Popover } from "@headlessui/react";
import ShortUniqueId from "short-unique-id";
import { AiOutlineDoubleLeft, AiOutlineSetting } from "react-icons/ai";
import { BiGridSmall } from "react-icons/bi";
import { components } from "./component";
import IItems from "interfaces/items";

interface ISidebar {
  className: string;
  setClassName: (className: string) => void;
  items: IItems[];
  setItems: (items: IItems[]) => void;
  setSelector: (selector: {
    methodName: string;
    type: string;
    name: string;
  }) => void;
  elementConfig: object;
}

const Sidebar: FC<ISidebar> = ({
  className,
  setClassName,
  items,
  setItems,
  setSelector,
  elementConfig,
}) => {
  const uid = new ShortUniqueId();
  const [indexValue, setIndexValue] = useState(2);

  const hideSidebar = () => {
    setClassName("hidden");
  };

  const incrementIndex = () => {
    setIndexValue(indexValue + 1);
  };

  return (
    <main
      className={`fixed left-0 top-0 z-0 w-[250px] border-r h-full ${className}`}
    >
      <section className="flex flex-row justify-between items-center h-[60px]">
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
        {/* Toggle button */}
        <div
          onClick={hideSidebar}
          className="m-2 p-2 text-slate-600 text-[18px] hover:bg-slate-100 hover:rounded-md cursor-pointer"
        >
          <AiOutlineDoubleLeft />
        </div>
      </section>

      {/* Site settings */}
      <div className="p-3 mt-16">
        <div className="flex flex-row items-center cursor-pointer">
          <span className="ml-1 mr-1 text-2xl">
            <BiGridSmall />
          </span>{" "}
          All Sites
        </div>
        <div className="flex flex-row items-center mt-1 cursor-pointer">
          <span className="mx-2">
            <AiOutlineSetting />
          </span>{" "}
          Site Settings
        </div>
      </div>

      {/* Components */}
      <div className="px-6 py-3 mt-10">
        {components?.map((c, index) => (
          <div
            key={index}
            className="px-4 py-2 transition-colors duration-150 ease-in-out bg-white rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => {
              let newC = {
                ...c,
                i: uid(),
                x: 0,
                y: indexValue,
                w: 12,
                minW: 1,
              };
              incrementIndex();
              setItems([...items, newC]);
            }}
          >
            {c.name}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Sidebar;
