import React, { FC, useState } from "react";
import { Dialog } from '@headlessui/react'
import {CgClose} from 'react-icons/cg'
import ImgTemp from 'assets/modalIcons/imagetemp.png'
import {ReactComponent as ScratchIcon} from 'assets/modalIcons/scratchIcon.svg'
import {ReactComponent as TemplateIcon} from 'assets/modalIcons/templateIcon.svg'

const TemplateModal = ({
    isOpenTemplate,
    setIsOpenTemplate,
    setIsOpenSingleTemplate
}) => {
    const templateCategories = ["ALL", "SAAS", "WEB3", "CMS", "PORTFOLIO", "SHOP", "OTHER"]
    const templates = [1,2,3,4,5,6,7,8]
    const handleOpenSingleTemplate = () => {
        setIsOpenTemplate(false)
        setIsOpenSingleTemplate(true)
    }
    return (
        <Dialog className="relative z-50" open={isOpenTemplate} onClose={() => setIsOpenTemplate(false)}>
            <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[10px]">
            <Dialog.Panel className="flex flex-col items-center w-full max-w-[1200px] my-20 mx-28 rounded-[24px] py-12 px-10 bg-white">
                <div className="flex items-start justify-end w-full">
                    <CgClose className="text-[24px] cursor-pointer" /> 
                </div>
                <div className="text-center w-[350px]">
                        <div className="text-[#14142B] font-bold text-[28px]">Select a template</div>
                    <div className="mt-3 text-[#4E4B66] text-[14px]">
                        Select over 100 stunning templates to create a stunning wesite to fit your needs.
                    </div>
                </div>
                <div className="flex gap-4 mt-9">
                    <div className="text-[14px] font-bold relative px-5 py-2 whitespace-nowrap">
                        MY TEMPLATES
                        <span className="absolute w-[1px] h-[20px] bg-[#85858B] opacity-60 right-[-5%] top-[25%]">{""}</span>
                    </div>
                    {templateCategories.map((category, index) => {
                        return(
                            <div key={index} className="text-[14px] font-bold px-5 py-2 hover:bg-[#ECEFFF] hover:rounded-[4px] cursor-pointer">
                                {category}
                            </div>
                        )
                    })}
                </div>
                <div className="grid grid-cols-4 gap-4 mt-7">
                    {templates.map((temp, index) => {
                        return(
                            <div key={index} className="border border-[#E8EAED] rounded-[4px] p-3">
                                <img src={ImgTemp} alt="img_temp" width={222} height={132} />
                                <div className="flex justify-between items-center font-bold text-[#000000] mt-5">
                                    <div className="text-[13.5px]">Template Name</div>
                                    <div className="text-[13px]">$400.00</div>
                                </div>
                                <div className="flex items-center mt-3">
                                    <div className="bg-[#9CB0D7] w-[24px] h-[24px] rounded-[50%]">{" "}</div>
                                    <div className="ml-2 text-[12px] text-[#14142B] opacity-70">Stevan Mark - 0xBBB6...e96e</div>
                                </div>
                                <div 
                                    onClick={handleOpenSingleTemplate} 
                                    className="mt-2 w-[68px] text-center text-[11px] text-[#14142B] bg-[#E6EAF4] rounded-[3px] font-[500] px-3 py-2 cursor-pointer"
                                >
                                    Portfolio
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default TemplateModal;