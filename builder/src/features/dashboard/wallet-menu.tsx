import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import makeBlockie from "ethereum-blockies-base64";
import { truncateString } from "utils/truncate-string";
import { connectWallet } from "redux/web3/web3.actions";
import { IRootState } from "redux/root-state.interface";
import { BiChevronRight } from "react-icons/bi";
import HelpIcon from "assets/icons/help-nav.png";
import MyTemplateIcon from "assets/icons/template-nav.png";

const HelpMenuItems = [
  { name: "Learn Buidlfy" },
  { name: "Start App Tour" },
  { name: "Join Discord " },
];

const walletMenuItems = [
  {
    name: "My Templates",
    icon: MyTemplateIcon,
    classParent:
      "border border-l-0 border-t-0 border-r-0 border-b-1 border-[#F5F5F5]",
    target: "/my-templates",
    isChildren: false,
    children: [],
  },
  {
    name: "Help",
    icon: HelpIcon,
    classParent: "",
    target: "",
    isChildren: true,
    children: HelpMenuItems,
  },
];

const WalletMenu = () => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(
    (state: IRootState) => state.web3.currentAccount
  );
  return (
    <>
      {currentAccount ? (
        <Menu>
          <Menu.Button className="flex items-center justify-center my-2 ml-3 active:opacity-70">
            <img
              className="w-8 bg-black rounded-full hover:shadow-lg"
              src={makeBlockie(currentAccount)}
              alt="Blockie"
            />
          </Menu.Button>
          <Menu.Items className="absolute top-0 right-0 flex flex-col w-60 mt-16 shadow-menu mr-5 rounded-[14px] origin-top-right bg-white">
            <div className="border border-l-0 border-t-0 border-r-0 border-b-1 border-[#F5F5F5]">
              <div className="px-5 py-3 font-[16px]">
                <div className="flex items-center gap-4 py-2">
                  <img
                    className="w-8 rounded-full"
                    src={makeBlockie(currentAccount)}
                    alt="Blockie"
                  />
                  <div className="text-[#A5A5A5] text-[13px]">
                    {truncateString(currentAccount)}
                  </div>
                </div>
              </div>
            </div>
            {walletMenuItems.map((menuItem, i) => {
              const { name, classParent, icon, isChildren, children } =
                menuItem;
              return (
                <Menu.Item key={i} as="div" className={classParent}>
                  {({ active }) => (
                    <>
                      {!isChildren ? (
                        <Link
                          to="/my-templates"
                          className={`${
                            active &&
                            "bg-slate-100 rounded-[8px] cursor-pointer"
                          } font-[500] text-[#14142B] opacity-70 px-5 py-3 font-[16px] flex items-center justify-between`}
                        >
                          <div className="flex items-center gap-4">
                            <img src={icon} alt="icon" width={28} height={28} />
                            <span>{name}</span>
                          </div>
                          <BiChevronRight />
                        </Link>
                      ) : (
                        <Menu as="div" className="relative">
                          <Menu.Button
                            className={`${
                              active &&
                              "bg-slate-100 rounded-[8px] cursor-pointer"
                            } font-[500] text-[#14142B] opacity-70 px-5 py-3 w-full font-[16px] flex items-center justify-between`}
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={icon}
                                alt="icon"
                                width={28}
                                height={28}
                              />
                              <span>{name}</span>
                            </div>
                            <BiChevronRight />
                          </Menu.Button>
                          <Menu.Items className="flex flex-col p-5 gap-3 absolute left-[-10rem] top-0 bg-white w-36 shadow-menu rounded-[16px]">
                            {children.map((child, i) => {
                              const { name } = child;
                              return (
                                <Menu.Item
                                  key={i}
                                  as="div"
                                  className="text-[13px] cursor-pointer text-[#6E7191] hover:text-[#14142B]"
                                >
                                  {name}
                                </Menu.Item>
                              );
                            })}
                          </Menu.Items>
                        </Menu>
                      )}
                    </>
                  )}
                </Menu.Item>
              );
            })}
          </Menu.Items>
        </Menu>
      ) : (
        <button
          className="py-2 px-5 my-2 ml-3 text-[14px] text-white rounded-[10px] cursor-pointer connect-wallet-button whitespace-nowrap add-btn"
          onClick={() => dispatch(connectWallet())}
        >
          Connect Wallet
        </button>
      )}
    </>
  );
};

export default WalletMenu;
