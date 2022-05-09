import React, { FC, useState, useEffect } from "react";
import { GrFormAdd } from "react-icons/gr";

const Navbar: FC = () => {
  const [openNav, setOpenNav] = useState<Number>(0);
  const [brandName, setBrandName] = useState<String>("Spheron");
  // const NavShowHide = () => {
  //     if(openNav === 0) setOpenNav(1)
  //     else setOpenNav(0)
  // }

  const [menuArr, setMenuArr] = useState(["Home"]);

  const handleAddMenu = () => {
    setMenuArr([...menuArr, "Menu"]);
  };

  useEffect(() => {
    const navData = {
      navbar: {
        logo: { brandName },
        menus: menuArr,
        connectWallet: {},
      },
    };
    const jsonData = JSON.stringify(navData, null, 3);
    console.log(jsonData);
  });

  return (
    <>
      {openNav === 0 ? (
        <div
          className={`flex justify-evenly items-center h-[60px] border-b p-4`}
        >
          <div className="flex items-center justify-start w-full">
            {/* <IoLogoFlickr className="mr-2 text-4xl" /> */}
            <div className="mx-2 font-bold rounded-[8px] hover:bg-[#f5efef] py-2 px-4 cursor-pointer">
              {brandName}
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <div className="flex justify-end items-center">
              {menuArr.map((text, index) => {
                return (
                  <div
                    className="mx-1 rounded-[8px] hover:bg-[#f5efef] py-2 px-4 cursor-pointer"
                    id={`${index}`}
                  >
                    {text}

                    {/* {showMenu ? 
                          ( 
                              <div className={styles.menu} >
                              <input onChange={menuChange} className={styles.changeText} type='text' placeholder='change text' />
                              <button onClick={submitMenu} className={styles.submit}>Submit</button>
                              <button onClick={() => deleteMenu(index)} className={styles.delete}>Delete</button>
                              </div>
                          ) : null} */}
                  </div>
                );
              })}
            </div>
            <GrFormAdd
              className="ml-2 rounded-[8px] hover:bg-[#f5efef] text-[40px] p-2 cursor-pointer"
              onClick={handleAddMenu}
            />
          </div>
          <div className="flex items-center justify-end w-full">
            <div className="px-6 py-2 text-white bg-purple-400 rounded-xl cursor-pointer">
              Connect Wallet
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-evenly items-center h-[60px] border shadow-md m-2 p-4 w-[175px] ">
          <div className="flex items-center justify-start w-full">
            <div>Add Navbar</div>
            <GrFormAdd className="ml-4 text-4xl" />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
