import React, { FC } from "react";
import { Dialog } from '@headlessui/react'
import UprightImg from 'assets/upright.png'
import CongratulationsImg from 'assets/congratulations.png'

interface SitePublishedModal {
    isOpenPublishModal: boolean;
    setIsOpenPublishModal: (isOpenPublishModal: boolean) => void;
}

const SitePublishedModal : FC<SitePublishedModal> = ({
    isOpenPublishModal,
    setIsOpenPublishModal,
}) => {
    return (
        <Dialog className="relative z-50" open={isOpenPublishModal} onClose={() => setIsOpenPublishModal(false)}>
            <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[10px]">
            <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[670px] my-20 mx-28 rounded-[24px] py-12 px-10 bg-white max-h-[80vh]">
                <div>
                    <img src={CongratulationsImg} alt="img_temp" width={50} height={50} />
                </div>
                <div className="font-[500] text-[20px] text-[#2C2D5E] mt-3">
                Site is published! 
                </div>
                <div className="text-[13px] text-[#2C2D5E] font-[300] mt-2">
                Please open the link given below to see your site 
                </div>
                <div className="flex items-center py-2 another-bg link-bg px-7">
                    <a 
                     target="_blank" 
                     href="www.app.buildfy.com/sitename"
                     className="outline-none"
                    >
                        www.app.buildfy.com/sitename
                    </a>
                    <img src={UprightImg} alt="upright_arrow" className="ml-2" width={8} height={8} />
                </div>
                <div className="connect-wallet-button text-white px-16 py-3 text-[14px] font-[600] rounded-[8px] mt-6 cursor-pointer">
                Visit Site
                </div>
            </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default SitePublishedModal;