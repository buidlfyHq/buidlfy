import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/root-state.interface";
import makeBlockie from "ethereum-blockies-base64";
import { Menu } from "@headlessui/react";
import { truncateString } from "utils/truncate-string";
import {BiChevronRight} from 'react-icons/bi'
import MyTemplateIcon from 'assets/icons/template-nav.png'
import HelpIcon from 'assets/icons/help-nav.png'
import { Link } from "react-router-dom";
import { connectWallet } from "redux/web3/web3.actions";

const HelpChildren = [
    {name: 'Learn Buidlfy'},
    {name: 'Start App Tour'},
    {name: 'Join Discord '}
]
  
const menu = [
    {
        name: 'My Templates',
        icon: MyTemplateIcon,
        classParent: 'border border-l-0 border-t-0 border-r-0 border-b-1 border-[#F5F5F5]',
        target: '/my-templates',
        isChildren: false,
        children: []
    },
    {
        name: 'Help',
        icon: HelpIcon,
        classParent: '',
        target: '',
        isChildren: true,
        children: HelpChildren
    },
]

const NavMenu = () => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(
    (state: IRootState) => state.web3.currentAccount
  );
  return (
    <>
        {currentAccount ? (
          <Menu>
            <Menu.Button className="flex justify-center items-center my-2 ml-3">
              <img
                className="bg-black w-8 rounded-full"
                src={makeBlockie(currentAccount)}
                alt="Blockie"
              />
            </Menu.Button>
            <Menu.Items className="absolute top-0 right-0 flex flex-col w-60 mt-16 shadow-menu mr-5 rounded-[14px] origin-top-right bg-white">
              <div className='border border-l-0 border-t-0 border-r-0 border-b-1 border-[#F5F5F5]'>
                <div className="px-5 py-3 font-[16px]">
                  <div className="flex items-center gap-4 py-2">
                    <img
                      className="w-8 rounded-full"
                      src={makeBlockie(currentAccount)}
                      alt="Blockie"
                    />
                    <div className="text-[#A5A5A5] text-[13px]">{truncateString(currentAccount)}</div>
                  </div>
                  <button className="whitespace-nowrap button-navmenu text-[14px] duration-100 hover:text-[16px] my-2 py-2 px-auto w-full">
                    <span className="gradient-text-navmenu font-[500]">Disconnect Wallet</span>
                  </button>
                </div>
              </div>
              {menu.map(menuItem => {
                 const {name, classParent, icon, isChildren , children} = menuItem
                 return (
                    <Menu.Item as='div' className={classParent}>
                        {({ active }) => (
                            <>
                                {!isChildren ? (
                                    <Link
                                        to="/my-templates"
                                        className={`${
                                            active && "bg-slate-100 rounded-[8px] cursor-pointer"
                                        } font-[500] text-[#14142B] opacity-70 px-5 py-3 font-[16px] flex items-center justify-between`}
                                        >
                                        <div className="flex items-center gap-4">
                                            <img src={icon} alt="icon" width={28} height={28} />
                                            <span>{name}</span>
                                        </div>
                                        <BiChevronRight />
                                    </Link>
                                ) : (
                                    <Menu as='div' className='relative'>
                                        <Menu.Button
                                        className={`${
                                            active && "bg-slate-100 rounded-[8px] cursor-pointer"
                                        } font-[500] text-[#14142B] opacity-70 px-5 py-3 w-full font-[16px] flex items-center justify-between`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <img src={icon} alt="icon" width={28} height={28} />
                                                <span>{name}</span>
                                            </div>
                                            <BiChevronRight />
                                        </Menu.Button>
                                        <Menu.Items className='flex flex-col p-5 gap-3 absolute left-[-10rem] top-0 bg-white w-36 shadow-menu rounded-[16px]'>
                                            {children.map(child => {
                                                const {name} = child
                                                return(
                                                <Menu.Item as='div' className='text-[13px] cursor-pointer text-[#6E7191] hover:text-[#14142B]'>
                                                    {name}
                                                </Menu.Item>
                                                )
                                            })}
                                        </Menu.Items>
                                </Menu>
                                )}
                            </>
                        )}
                    </Menu.Item>
                )
              })}
            </Menu.Items>
          </Menu>
        ) : (
          <button
            className="py-2 px-5 my-2 ml-3 text-[14px] text-white rounded-[10px] cursor-pointer connect-wallet-button whitespace-nowrap"
            onClick={() => dispatch(connectWallet())}
          >
            Connect Wallet
          </button>
        )}
    </>
  );
};

export default NavMenu;
