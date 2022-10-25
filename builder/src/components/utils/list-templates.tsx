import React from "react";
import { useDispatch } from "react-redux";
import { toggleModalType } from "redux/modal/modal.reducers";
import { setSelectedTemplate } from "redux/template/template.reducers";
import { ISelectedTemplate } from "redux/template/template.interfaces";
import DefaultTemplateImg from 'assets/default-image-template.png'

const ListTemplates = ({filteredArr}) => {
  console.log('list')
  const dispatch = useDispatch();

  const handleSelectTemplate = (template: ISelectedTemplate) => {
    dispatch(setSelectedTemplate(template));
    dispatch(toggleModalType("single"));
  };

  return (
    <div className={`${filteredArr.length> 0 ? 'grid gap-4 grid-cols-templateCustom' : 'flex justify-center'} px-10 pb-12 pt-7`}>
      {filteredArr.length > 0 ? 
        filteredArr.map((temp: ISelectedTemplate) => {
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
                <div className="text-[10px] text-[#14142B] py-2 px-3 bg-gray-100 rounded-[28px]">
                  Crypto
                </div>
              </div>
              <div className="text-[18px] font-[600] text-[#14142B] mt-2 px-2 pb-1">
                $399.00
              </div>
            </div>
          );
        }) : (
            <div className="bg-white border border-[#E8EAED] rounded-[16px] p-2 cursor-pointer shadow-template-box">
              <img
                src={DefaultTemplateImg}
                alt="img_temp"
                className="w-full block rounded-[16px]"
              />
              <div className="text-[13px] text-center text-[#14142B] font-bold opacity-80 mt-4 px-2">
                No Template in this category
              </div>
            </div>
        )}
    </div>
  );
};

export default ListTemplates;
