import TemplateModal from 'features/dashboard/template-modal'
import React from 'react'
import { useDispatch } from 'react-redux';
import { toggleModal, toggleModalType } from 'redux/modal/modal.reducers';
import Temp1 from "assets/icons/temp-1.png";
const templates = [Temp1,Temp1,Temp1,Temp1]

export default function MyTemplateTemplates() {
const dispatch = useDispatch()  
    const handleListOnBuidlfy = () => {
        dispatch(toggleModal(true))
        dispatch(toggleModalType("list-single"))
    }
    return (
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 px-28 pb-12 pt-7">
            {templates.map((temp, index) => {
                return (
                <div key={index} className="bg-white border border-[#E8EAED] rounded-[16px] p-2 cursor-pointer shadow-template-box relative">
                    <div className='relative rounded-[16px] h-auto'>
                        <div className='absolute right-0 flex justify-end my-2 mx-4 py-1 px-3 text-[#14142B] text-[10px] bg-[#FFE6B0] rounded-[5px]'>
                            In Review
                        </div>
                        <div className='absolute flex flex-col items-center justify-center w-full h-full font-[13px] font-[600]'>
                            <button className='py-2 px-10 rounded-[8px] bg-white text-[#7743E7]'>View Details</button>
                            <button 
                            className='py-2 px-8 mt-4 rounded-[8px] connect-wallet-button text-white'
                            onClick={handleListOnBuidlfy}
                            >
                                List on Buidlfy
                            </button>
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