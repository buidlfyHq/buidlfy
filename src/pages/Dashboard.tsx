import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Popover } from "@headlessui/react";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineEye,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiGridSmall, BiChevronDown } from "react-icons/bi";
import { FaFileContract } from "react-icons/fa";
import { MdUndo, MdRedo } from "react-icons/md";
import AbiComponent from "../components/dashboard/AbiComponent";
import AbiMethods from "../components/dashboard/AbiMethods";
import Modal from "../components/dashboard/Modal";

const BACKEND_ADDR = "http://localhost:8000/api"; // backend url

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const [className, setClassName] = useState("");
  const [abi, setAbi] = useState<string>(""); // for storing abi
  const [showComponent, setShowComponent] = useState<number[]>([]); // for abi method component
  const [isOpen, setIsOpen] = useState(false); // for connect contract modal

  // Tests if user is authenticated
  const getInformation = async () => {
    const res = await fetch(`${BACKEND_ADDR}/personal_information`, {
      credentials: "include",
    });

    console.log(res);
  };

  useEffect(() => {
    // Checks if user is authenticated
    const getInformation = async () => {
      const res = await fetch(`${BACKEND_ADDR}/is_authenticated`, {
        credentials: "include",
      });
      const response = await res.text();
      // If not authenticated redirect to sign-in page
      if (JSON.parse(response).error) {
        navigate("/");
      }
    };
    getInformation();
  }, []); // eslint-disable-line

  const hideSidebar = () => {
    setClassName("hidden");
  };

  const showSidebar = () => {
    setClassName("");
  };

  return (
    <div className="flex flex-row w-full min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-0 w-[250px] border-r h-full ${className}`}
      >
        <div className="flex flex-row justify-between items-center h-[60px]">
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
          <div onClick={hideSidebar} className="p-2">
            <AiOutlineDoubleLeft className="text-slate-600 p-2 text-[35px] hover:bg-slate-100 hover:rounded-md cursor-pointer" />
          </div>
        </div>

        {/* Site settings */}
        <div className="p-3 mt-16">
          <div className="flex flex-row items-center cursor-pointer">
            <BiGridSmall className="ml-1 mr-2 text-2xl" /> All Sites
          </div>
          <div className="flex flex-row items-center mt-1 cursor-pointer">
            <AiOutlineSetting className="mx-2" /> Site Settings
          </div>
          <button
            className="flex flex-row items-center mt-1 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <FaFileContract className="mx-2" /> Connect Contract
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

        {/* Pages */}
        <div className="px-6 py-3 mt-10">
          <div>Pages</div>
          <div className="p-2">
            <div>Home</div>
            <div>About</div>
          </div>
        </div>
      </div>

      {/* Nav + Main */}
      <div className="flex-1">
        {/* Navbar */}
        <div
          className={
            className === ""
              ? `fixed left-[250px] h-[60px] top-0 border-b z-1200 flex flex-row justify-between items-center p-3`
              : `h-[60px] w-full top-0 border-b z-1200 flex flex-row justify-between items-center p-3`
          }
        >
          <div>
            {className === "" ? (
              <AiOutlineDoubleRight className="text-slate-600 p-2 text-[35px] hover:bg-slate-100 hover:rounded-md cursor-pointer hidden" />
            ) : (
              <AiOutlineDoubleRight
                onClick={showSidebar}
                className="text-slate-600 p-2 text-[35px] hover:bg-slate-100 hover:rounded-md cursor-pointer"
              />
            )}
          </div>
          <div className="flex flex-row">
            <div className="flex flex-row items-center mx-2">
              <MdUndo className="text-slate-600 p-2 text-[35px] hover:bg-slate-100 hover:rounded-md cursor-pointer mx-1" />
              <MdRedo className="text-slate-600 p-2 text-[35px] hover:bg-slate-100 hover:rounded-md cursor-pointer mx-1" />
            </div>
            <div className="flex items-center p-2 mx-3 my-3 cursor-pointer text-slate-500 hover:bg-slate-100 hover:text-slate-700 hover:rounded-md">
              <span>
                <AiOutlineEye className="mr-1" />
              </span>
              Preview
            </div>

            <Popover className="relative p-3">
              <Popover.Button>
                <div className="flex items-center px-4 py-2 bg-white rounded-md shadow-lg cursor-pointer">
                  Publish
                  <BiChevronDown className="ml-1" />
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
        </div>
        {/* Main section */}
        <div
          className={
            className === ""
              ? `fixed ml-[250px] mt-[60px] h-full w-full p-4`
              : `w-full p-4`
          }
        >
          Welcome to Spheron Typedream
          <AbiComponent
            abi={abi}
            showComponent={showComponent}
            setShowComponent={setShowComponent}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
