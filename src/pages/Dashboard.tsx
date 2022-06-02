import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
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
import AbiMethods from "../components/dashboard/AbiMethods";
import Modal from "../components/dashboard/Modal";
import Workspace from "../components/dashboard/Workspace";
import Container from "../components/Container";
import Button from "../components/Button";
import HeadingOne from "../components/HeadingOne";
import Text from "../components/Text";
import Link from "../components/Link";
import Image from "../components/Image";
import Input from "../components/Input";
import HeadingThree from "../components/HeadingThree";
import HeadingTwo from "../components/HeadingTwo";
import Divider from "../components/Divider";
import ShortUniqueId from "short-unique-id";
import { components } from "../components/dashboard/component";
import { isDeepStrictEqual } from "util";
// import RGL, { WidthProvider } from "react-grid-layout";
// const ReactGridLayout = WidthProvider(RGL);

import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

const BACKEND_ADDR = "http://localhost:8000/api"; // backend url

const Dashboard: FC = () => {
  
  // type State = {
  //   currentBreakpoint: string,
  //   compactType: CompactType,
  //   mounted: boolean,
  //   layouts: {[string]: Layout}
  // };

  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [className, setClassName] = useState("");
  const [abi, setAbi] = useState<string>(""); // for storing abi
  const [showComponent, setShowComponent] = useState<number[]>([]); // for abi method component
  const [isOpen, setIsOpen] = useState(false); // for connect contract modal
  const [componentArr, setComponentArr] = useState([]);
  const handleComponent = (container: React.FC<{}>) => {
    console.log(container, "container");
    setComponentArr([...componentArr, { component: container }]);
    console.log(componentArr, "component");
  };

  const generateLayout = () => {
    const p = items;

    return _.map(new Array(p), function(item, i) {
      // const y = i + 1;
      return {
        x: (i * 2) % 12,
        // y: Math.floor(i / 6) * y,
        w: 2,
        h: 2,
        i: i.toString(),
        resizeHandles: ["w", "e", "se"]
      };
    });
  }

  const [state, setState] = useState({
    currentBreakpoint: "lg",
    compactType: "vertical",
    mounted: false,
    layouts: { lg: generateLayout() }
  })

  const defaultProps = {
    className: "layout",
    items: items.length,
    rowHeight: 30,
    onLayoutChange: function() {},
    // cols: 12
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  };

  // let state: State = 

 


  // const layout = {
  //   return items.map((item, index) => {

  //   })
  // }

  // const layout = generateLayout();
  // setState(layout)

  // Tests if user is authenticated
  // const getInformation = async () => {
  //   const res = await fetch(`${BACKEND_ADDR}/personal_information`, {
  //     credentials: "include",
  //   });
  //   console.log(res);
  // };
  const uid = new ShortUniqueId();

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

  const onDragEnd = (result) => {
    if (result.reason === "DROP") {
      if (!result.destination) {
        return;
      }
      // dispatch({
      //   type: "MOVE",
      //   from: result.source.droppableId,
      //   to: result.destination.droppableId,
      //   fromIndex: result.source.index,
      //   toIndex: result.destination.index,
      // });
      if (result.destination.droppableId === "builder") {
        const resultItems = items;
        const [removed] = resultItems.splice(result.source.index, 1);
        resultItems.splice(result.destination.index, 0, removed);

        setItems(resultItems);
      }
    }
  };

  const onLayoutChange = (layout, layouts) => {
    console.log(layout, layouts)
    let newItemsArr = layout.map((obj: any) => {
      let selectedItem = items.filter((item) => item.id === obj.i)[0]
      const { h, minW, x, y, w, i} = obj
      return(
        selectedItem = {
          name: selectedItem.name,
          h,
          minW,
          x,
          y,
          w,
          id: i
        }
      )
    })
    newItemsArr.length > 0 ? setItems(newItemsArr) : setItems(items)
    // console.log(layout, layouts)
  }


  const renderItem = (item) => {
    switch (item.name) {
      case "Container":
        return <Container />;
      case "Button":
        return <Button />;
      case "Text":
        return <Text />;
      case "Link":
        return <Link />;
      case "Heading 1":
        return <HeadingOne />;
      case "Heading 2":
        return <HeadingTwo />;
      case "Heading 3":
        return <HeadingThree />;
      case "Input":
        return <Input />;
      case "Image":
        return <Image />;
      case "Divider":
        return <Divider />;

      default:
        break;
    }
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
        {/* <div className="px-6 py-3 mt-10">
          <div>Pages</div>
          <div className="p-2">
            <div>Home</div>
            <div>About</div>
          </div>
        </div> */}
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
                    minW: 1
                  };
                  setItems([...items, newC]);
                }}
                
              >
                {c.name}
              </div>
            );
          })}
        </div>
      </div>

      {/* Nav + Main */}
      <div className="flex-1">
        {/* Navbar */}
        <div
          className={
            className === ""
              ? `fixed left-[250px] w-[calc(100%-250px)] h-[60px] top-0 border-b z-1200 flex flex-row justify-between items-center p-3`
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
                  Pubish
                </div>
              </Popover.Panel>
            </Popover>
          </div>
        </div>
        {/* Main section */}
        <div
          className={
            className === ""
              ? `fixed ml-[250px] mt-[60px] h-full w-[calc(100%-250px)] h-[calc(100%-60px)]`
              : `w-full`
          }
        >
          <>
            <Workspace
              abi={abi}
              showComponent={showComponent}
              setShowComponent={setShowComponent}
            />
            {componentArr.map((index) => {
              <>
                <index.component />
              </>;
            })}
              <ResponsiveGridLayout
                layouts={{lg: items}}
                breakpoints={{lg:1200, md:996, sm:768, xs:480, xxs:0 }}
                // cols={{lg:5, md:4, sm:3, xs:2, xxs:1}}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={50}
                // autoSize={true}
                width={window.innerWidth-250}
                compactType="horizontal"
                resizeHandles={["nw","se"]}
                // isBound={true}
                // className="flex justify-center"
                // layout={layout}
                onLayoutChange={onLayoutChange}
                // {...this.props}
              >
                {items?.map((item, i) => {
                  const {x, y, w, h, minW, id} = item
                  console.log('item',item)
                  // const itemId = item.id;
                  return (
                    <div
                      key={id}
                      data-grid={{ x, y, w, h, minW }}
                      className="justify-center transition-colors duration-150 ease-in-out rounded-lg hover:outline-slate-300 hover:outline-dashed"
                    >
                      {renderItem(item)}
                    </div>
                  );
                })}
              </ResponsiveGridLayout>
          </>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
