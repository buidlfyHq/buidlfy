import React from 'react'
import { useDispatch } from 'react-redux';
import { Menu } from '@headlessui/react';
import TemplateModal from 'features/dashboard/template-modal'
import { toggleModal, toggleModalType } from 'redux/modal/modal.reducers';
import { ReactComponent as SettingsIcon } from "assets/svgAsIcons/dots.svg";
import Temp1 from "assets/icons/temp-1.png";
const templates = [Temp1,Temp1,Temp1,Temp1]
const menu = [{name: 'Edit site'},{name: 'View site'}]

export default function MyTemplateTemplates() {
const dispatch = useDispatch()  
    const handleListOnBuidlfy = () => {
        dispatch(toggleModal(true))
        dispatch(toggleModalType("list-single"))
    }
    return (
        <div className="grid grid-cols-1 gap-4 px-40 pb-12 xl:grid-cols-3 sm:grid-cols-2 pt-7">
            {templates.map((temp, index) => {
                return (
                    <div key={index} className="bg-white border border-[#E8EAED] rounded-[16px] p-2 cursor-pointer shadow-template-box">
                        <div className='relative rounded-[16px] h-auto'>
                            <div className='absolute right-0 flex items-center my-2 mx-2 z-[10]'>
                                <div className='flex justify-end mr-2 py-1 px-3 text-[#14142B] text-[10px] bg-[#FFE6B0] rounded-[5px]'>
                                    In Review
                                </div>
                                <Menu>
                                    <Menu.Button className="p-1 bg-white rounded-[50%]">
                                        <SettingsIcon />
                                    </Menu.Button>
                                    <Menu.Items className="absolute right-0 bg-white shadow-template-box flex flex-col rounded-[4px] bg-white px-3 py-2 top-8 z-[10]">
                                        {menu.map(menu => (
                                            <Menu.Item>
                                                {({ active }) => (
                                                <a
                                                    className={`whitespace-nowrap text-[13px] px-2 py-1 text-[#14142B] ${active && ' bg-gray-200 rounded-[4px]'}`}
                                                >
                                                    {menu.name}
                                                </a>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </Menu.Items>
                                </Menu>
                            </div>
                            <div className='absolute flex flex-col items-center justify-center w-full h-full font-[13px] font-[600]'>
                                <div className='py-2 px-10 rounded-[8px] bg-white text-[#7743E7]'>View Details</div>
                                <div 
                                className='py-2 px-8 mt-4 rounded-[8px] connect-wallet-button text-white'
                                onClick={handleListOnBuidlfy}
                                >
                                    List on Buidlfy
                                </div>
                            </div>
                            <img src={temp} alt="img_temp" className="rounded-[16px] w-full" width={314} height={200} />
                        </div>
                        <div className="flex justify-between items-center font-bold text-[#000000] mt-4 px-2">
                            <div className="text-[14px] text-[#14142B] opacity-80 font-[600]">Cryptin Next Gen Template</div>
                            <div className="text-[12px] text-[#14142B] py-2 px-4 bg-gray-100 font-[500] rounded-[4px]">Crypto</div>
                        </div>
                        <TemplateModal />
                    </div>
                )
            })}
        </div>
    )
}
