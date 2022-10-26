import React, { FC } from "react";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { toggleModalType } from "redux/modal/modal.reducers";
import { setSelectedTemplate } from "redux/template/template.reducers";
import { ISelectedTemplate } from "redux/template/template.interfaces";
import DefaultTemplateImg from 'assets/default-image-template.png'
import NoTemplateImg from 'assets/no-temp-default.png'

interface IListTemplates{
  filteredTemplateList: ISelectedTemplate[]
}

const ListTemplates : FC<IListTemplates> = ({
  filteredTemplateList
}) => {
  const dispatch = useDispatch();

  const handleSelectTemplate = (template: ISelectedTemplate) => {
    dispatch(setSelectedTemplate(template));
    dispatch(toggleModalType("single"));
  };

  return (
    <div className={`${filteredTemplateList.length> 0 ? 'grid gap-4 grid-cols-templateCustom' : 'flex justify-center'} px-10 pb-12 pt-7`}>
      {filteredTemplateList.length > 0 ? 
        filteredTemplateList.map((temp: ISelectedTemplate) => {
          const {id, image = DefaultTemplateImg, name = 'Template'} = temp
          return (
            <div
              key={id}
              className="bg-white border border-[#E8EAED] rounded-[16px] p-2 cursor-pointer shadow-template-box"
              onClick={() => handleSelectTemplate(temp)}
            >
              <img
                src={image}
                alt="img_temp"
                className="w-full block rounded-[16px]"
                // width={314}
                // height={200}
              />
              <div className="flex justify-between items-center font-bold text-[#000000] mt-4 px-2">
                <div className="text-[13px] text-[#14142B] opacity-80 ">
                  {name}
                </div>
                { temp?.category && <div className="text-[10px] text-[#14142B] py-2 px-3 bg-gray-100 rounded-[28px]">
                  {temp?.category}
                </div>}
              </div>
              <div className="text-[18px] font-[600] text-[#14142B] mt-2 px-2 pb-1">
                {ethers.utils.formatUnits(temp.listing_buyoutPricePerToken)}{" "}
                USDC
              </div>
            </div>
          );
        }) : (
            <div className="flex flex-col items-center">
              <img
                src={NoTemplateImg}
                alt="img_temp"
                width={60}
                height={60}
                className="my-5"
              />
              <div className="text-[24px] text-center gradient-text-no-template font-[600] mt-2">
                Sorry! No Templates!
              </div>
              <div className="text-[14px] text-center text-[#14142B] opacity-70 mt-2 px-2">
                Sorry, you have no templates in this category! 
              </div>
            </div>
        )}
    </div>
  );
};

export default ListTemplates;
