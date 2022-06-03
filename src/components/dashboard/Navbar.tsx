import React, { FC } from "react";
import { Popover } from "@headlessui/react";
import { AiOutlineDoubleRight, AiOutlineEye } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { MdUndo, MdRedo } from "react-icons/md";

const Navbar: FC<{ className: string; setClassName: any }> = ({
  className,
  setClassName,
}) => {
  const showSidebar = () => {
    setClassName("");
  };

  return (
    <main
      className={
        className === ""
          ? `fixed left-[250px] w-[calc(100%-250px)] h-[60px] top-0 border-b z-1200 flex flex-row justify-between items-center p-3`
          : `h-[60px] w-full top-0 border-b z-1200 flex flex-row justify-between items-center p-3`
      }
    >
      <div
        onClick={showSidebar}
        className="p-2 text-slate-600 text-[18px] hover:bg-slate-100 hover:rounded-md cursor-pointer"
      >
        {className !== "" && <AiOutlineDoubleRight />}
      </div>
      <div className="flex flex-row">
        <div className="flex flex-row items-center mx-2 text-[18px] text-slate-600">
          <span className="mx-1 p-2 hover:bg-slate-100 hover:rounded-md cursor-pointer">
            <MdUndo />
          </span>
          <span className="mx-1 p-2 hover:bg-slate-100 hover:rounded-md cursor-pointer">
            <MdRedo />
          </span>
        </div>
        <div className="flex items-center p-2 mx-3 my-3 cursor-pointer text-slate-500 hover:bg-slate-100 hover:text-slate-700 hover:rounded-md">
          <span className="mr-1">
            <AiOutlineEye />
          </span>
          Preview
        </div>

        <Popover className="relative p-3">
          <Popover.Button>
            <div className="flex items-center px-4 py-2 bg-white rounded-md shadow-lg cursor-pointer">
              Publish
              <span className="ml-1">
                <BiChevronDown />
              </span>
            </div>
          </Popover.Button>

          <Popover.Panel className="absolute right-0 z-10 p-2 mt-1 bg-white border rounded-md shadow-md">
            <div className="truncate">Publishing Current Page Only</div>
            <hr className="my-2" />
            <div className="p-2 text-center text-white bg-indigo-800 rounded-md">
              Publish
            </div>
          </Popover.Panel>
        </Popover>
      </div>
    </main>
  );
};

export default Navbar;
