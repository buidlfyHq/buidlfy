import React, { FC } from "react";
import { Dialog } from '@headlessui/react'
import CongratulationsImg from 'assets/congratulations.png'

interface FinalModal {
    isOpenFinalTemplate: boolean;
    setIsOpenFinalTemplate: (isOpenFinalTemplate: boolean) => void
}

const FinalModal: FC<FinalModal> = ({
    isOpenFinalTemplate,
    setIsOpenFinalTemplate,
}) => {
    return (
        <Dialog className="relative z-50" open={isOpenFinalTemplate} onClose={() => setIsOpenFinalTemplate(false)}>
            <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[10px]">
            <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[670px] my-20 mx-28 rounded-[24px] py-12 px-10 bg-white max-h-[80vh]">
                <div>
                    <img src={CongratulationsImg} alt="img_temp" width={50} height={60} />
                </div>
                <div className="font-[600] text-[34px] text-[#1C1C1E] mt-10">
                    Congratulations!
                </div>
                <div className="text-[20px] text-[#1C1C1E] opacity-60 mt-4">
                    Templated has been purchased!
                </div>
                <div onClick={() => setIsOpenFinalTemplate(false)} className="text-white px-12 py-4 text-[16px] bg-[#5856D6] rounded-[7px] mt-10 cursor-pointer">
                    Start Creating Now
                </div>
            </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default FinalModal;