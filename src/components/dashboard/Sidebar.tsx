import React, { FC, useState } from "react";
import { Popover } from "@headlessui/react";
import ShortUniqueId from "short-unique-id";
import { AiOutlineDoubleLeft, AiOutlineSetting } from "react-icons/ai";
import { BiGridSmall } from "react-icons/bi";
import { FaFileContract } from "react-icons/fa";
import AbiMethods from "./AbiMethods";
import Modal from "./Modal";
import { components } from "./component";

const Sidebar: FC<{
  className: string;
  setClassName: any;
  items;
  setItems;
  abi: string;
  setAbi: any;
  showComponent: number[];
  setShowComponent: any;
}> = ({
  className,
  setClassName,
  items,
  setItems,
  abi,
  setAbi,
  showComponent,
  setShowComponent,
}) => {
  const uid = new ShortUniqueId();
  const [isOpen, setIsOpen] = useState(false); // for connect contract modal

  const hideSidebar = () => {
    setClassName("hidden");
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
        <button
          className="flex flex-row items-center mt-1 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <span className="mx-2">
            <FaFileContract />
          </span>{" "}
          Connect Contract
          <Modal
            abi={abi}
            setAbi={setAbi}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </button>
        <AbiMethods
          abi={abi}
          showComponent={showComponent}
          setShowComponent={setShowComponent}
        />
      </div>

      {/* Components */}
      <div className="px-6 py-3 mt-10">
        {components?.map((c, index) => {
          return (
            <div
              key={index}
              className="px-4 py-2 transition-colors duration-150 ease-in-out bg-white rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => {
                let newC = {
                  ...c,
                  id: uid(),
                  x: 0,
                  y: index,
                  w: 12,
                  minW: 1,
                };
                setItems([...items, newC]);
              }}
            >
              {c.name}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Sidebar;
