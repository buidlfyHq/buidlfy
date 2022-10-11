import React from 'react'
import { useDispatch } from 'react-redux';
import { toggleModalType } from 'redux/modal/modal.reducers';
import Temp1 from "assets/icons/temp-1.png";
import Temp2 from "assets/icons/temp-2.png";
import Temp3 from "assets/icons/temp-3.png";
const TEMPLATES = [Temp1, Temp2, Temp3, Temp3, Temp1, Temp2];

export default function SelectTemplateTemplates() {
  const dispatch = useDispatch()
  return (
    <div className="grid grid-cols-3 gap-4 px-10 pb-12 pt-7">
        {TEMPLATES.map((temp, index) => {
        return (
            <div
            onClick={() => dispatch(toggleModalType("single"))}
            key={index}
            className="bg-white border border-[#E8EAED] rounded-[16px] p-2 cursor-pointer shadow-template-box"
            >
            <img
                src={temp}
                alt="img_temp"
                className="w-full rounded-[16px]"
                width={314}
                height={200}
            />
            <div className="flex justify-between items-center font-bold text-[#000000] mt-4 px-2">
                <div className="text-[13px] text-[#14142B] opacity-80 ">
                Cryptin Next Gen Template
                </div>
                <div className="text-[10px] text-[#14142B] py-2 px-3 bg-gray-100 rounded-[28px]">
                Crypto
                </div>
            </div>
            <div className="text-[18px] font-[600] text-[#14142B] mt-2 px-2 pb-1">
                $399.00
            </div>
            </div>
        );
        })}
    </div>
  )
}
