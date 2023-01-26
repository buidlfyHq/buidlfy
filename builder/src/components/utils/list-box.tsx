import { Listbox } from '@headlessui/react';
import { FC, useState } from 'react';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { Method, methodOptions } from './method-options';
import 'styles/components.css';

interface IListBoxDropdown {
  handleShowInput: (methodParameter: Method, i?: number) => void;
  i?: number;
  payableInput?: boolean;
}

const ListBoxDropdown: FC<IListBoxDropdown> = ({ handleShowInput, i, payableInput }) => {
  const [selectedMethod, setSelectedMethod] = useState(methodOptions[0]);
  const newInputMethods = payableInput ? methodOptions.slice(0, 2) : methodOptions;
  return (
    <Listbox onChange={setSelectedMethod} value={selectedMethod}>
      <Listbox.Button className="changeText flex text-left pl-[0.4rem] py-[0.7rem] w-[12.8rem] mx-2 px-2 h-[2.5rem] input-text" value="">
        <span className="text-[11px] font-medium flex grow">{selectedMethod?.name ? selectedMethod.name : <>Select A Method</>}</span>
        <span className="pr-[0.3rem]">
          <MdOutlineKeyboardArrowUp className="text-[10px] text-[#475385] absolute" />
          <MdOutlineKeyboardArrowDown className="text-[10px] text-[#475385] absolute mt-[0.5rem]" />
        </span>
      </Listbox.Button>
      <Listbox.Options
        className={`listbox-options ml-2 absolute mt-[0.7rem] z-100 bg-white w-[12.8rem] rounded-[8px] border border-solid border-[#F2F4F7] ${
          payableInput ? 'h-[4.2rem]' : 'h-[6.2rem]'
        }`}
      >
        {newInputMethods.map(methodOption => (
          <>
            <Listbox.Option
              value={methodOption}
              key={methodOption.id}
              className="mytooltip py-[0.5rem] text-[11px] font-medium pr-2 pl-[0.5rem] cursor-pointer hover:bg-[#FAFAFF]"
              onClick={() => handleShowInput(methodOption.methodParameter, i)}
            >
              {methodOption.name}
              <div className="mytext shadow-lg text-left">
                <h5 className="text-[#344054] text-sm font-semibold text-left mx-4 my-3">{methodOption.name}</h5>
                <p className="text-[#667085] text-xs font-normal text-left mx-4 my-3">{methodOption.methodDescription}</p>
              </div>
            </Listbox.Option>
          </>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default ListBoxDropdown;
