import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalType } from "redux/modal/modal.reducers";
import { setSelectedTemplate } from "redux/template/template.reducers";
import { ISelectedTemplate } from "redux/template/template.interfaces";

const ListTemplates = () => {
  const dispatch = useDispatch();
  const templateList = useSelector((state: any) => state.template.templateList);

  const handleSelectTemplate = (template: ISelectedTemplate) => {
    dispatch(setSelectedTemplate(template));
    dispatch(toggleModalType("single"));
  };

  return (
    <div className="grid grid-cols-3 gap-4 px-10 pb-12 pt-7">
      {templateList &&
        templateList.map((temp: ISelectedTemplate) => {
          return (
            <div
              key={temp.id}
              className="bg-white border border-[#E8EAED] rounded-[16px] p-2 cursor-pointer shadow-template-box"
              onClick={() => handleSelectTemplate(temp)}
            >
              <img
                src={temp.image}
                alt="img_temp"
                className="w-full rounded-[16px]"
                width={314}
                height={200}
              />
              <div className="flex justify-between items-center font-bold text-[#000000] mt-4 px-2">
                <div className="text-[13px] text-[#14142B] opacity-80 ">
                  {temp.name}
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
  );
};

export default ListTemplates;
