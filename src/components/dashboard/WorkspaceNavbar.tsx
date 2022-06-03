import React from "react";
import "../../styles/Dashboard.css";
import { GrFormAdd } from "react-icons/gr";
import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import SettingComponent from "../utils/SettingComponent";

export default function WorkspaceNavbar() {
  const [navbar, setNavbar] = useState<Number>(0);
  const [brandName, setBrandName] = useState<String>("Spheron");
  // const NavShowHide = () => {
  //     if(openNav === 0) setOpenNav(1)
  //     else setOpenNav(0)
  // }

  const [menuArr, setMenuArr] = useState([{ name: "Home", link: "" }]);

  const handleAddMenu = () => {
    setMenuArr([...menuArr, { name: "Menu", link: "" }]);
  };

  useEffect(() => {
    const navData = {
      navbar: {
        logo: `${brandName}`,
        menus: menuArr,
        connectWallet: {},
      },
    };
    const jsonData = JSON.stringify(navData, null, 3);
  });

  return (
    <>
      {navbar === 0 ? (
        <div className="relative">
          <div
            className={`flex justify-evenly items-center h-[60px] border-b p-4 relative`}
            id="originalnav"
          >
            <div className="flex items-center justify-start ">
              <SettingComponent
                classname={"mx-2 font-bold"}
                text={brandName}
                link={""}
                setBrandName={setBrandName}
              />
              {/* <div className="mx-2 font-bold">{brandName}</div> */}
            </div>
            <div className="flex items-center justify-center w-full">
              <div className="flex items-center justify-end ">
                {menuArr.map((obj, index) => {
                  return (
                    <div key={index} id={`${index}`}>
                      <SettingComponent
                        classname={"mx-1"}
                        text={obj.name}
                        link={obj.link}
                        setMenuArr={setMenuArr}
                        menuArr={menuArr}
                        id={`${index}`}
                      />
                    </div>
                  );
                })}
              </div>
              <GrFormAdd
                className="ml-2 rounded-[8px] hover:bg-[#f5efef] text-[40px] p-2 cursor-pointer"
                onClick={handleAddMenu}
              />
            </div>
            <div className="flex items-center justify-end w-auto">
              <div className="px-6 py-2 text-white bg-purple-400 cursor-pointer whitespace-nowrap rounded-xl">
                Connect Wallet
              </div>
            </div>
            {/* sudo */}
            <div
              className={`flex justify-start items-center h-[60px] p-4 w-full absolute`}
              id="nav"
            >
              <div
                className="flex items-center px-3 py-2 bg-white border shadow-md cursor-pointer hover:text-purple-700"
                onClick={() => setNavbar(1)}
              >
                <div>Delete</div>
                <AiOutlineDelete className="text-[18px] ml-2" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // flex items-center px-3 py-2 bg-white border shadow-md cursor-pointer hover:text-purple-700'
        <div
          className="flex justify-evenly items-center h-[50px] border bg-white hover:text-purple-700 shadow-md m-2 py-2 px-3 w-[150px] cursor-pointer"
          onClick={() => setNavbar(0)}
        >
          <div>Add Navbar</div>
          <IoMdAddCircleOutline className="text-[18px]" />
        </div>
      )}
    </>
  );
}
