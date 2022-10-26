import React, { FC, useEffect, useState  } from "react";
import { useDispatch , useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import ListTemplates from "components/utils/list-templates";
import { toggleModal } from "redux/modal/modal.reducers";
import Spinner from "components/utils/assets/spinner";
import { IRootState } from "redux/root-state.interface";
import { ReactComponent as SearchIcon } from "assets/svgAsIcons/search-icon.svg";
import { CgClose } from "react-icons/cg";
import { ISelectedTemplate } from "redux/template/template.interfaces";

// removed categories as of now
// const templateCategories = ["ALL"];

const SelectTemplateModal: FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false)
  const [filteredTemplateList, setFilteredTemplateList] = useState<ISelectedTemplate[]>([])
  const templateList = useSelector(
    (state: IRootState) => state.template.templateList
  );

  // removed as of now, commented for further use
  // const ownedListedTemplateList = useSelector(
  //   (state: IRootState) => state.minted.ownedListedTemplateList
  // );

  // no active categories hence commented
  // const categoryList = useSelector(
  //   (state: IRootState) => state.template.templateList.map((temp: ISelectedTemplate) => temp?.category)
  // );

  useEffect(() => {
    setLoading(true)
    setFilteredTemplateList([...templateList])
    setLoading(false)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    const filterArr = value === '' ? templateList : 
      templateList.filter((item: ISelectedTemplate) => 
        item.name?.toLowerCase().replace(/\s+/g, '').includes(value.toLowerCase().replace(/\s+/g, '')))
        setFilteredTemplateList([...filterArr])
  }

  // no active categories hence commented, logic for handling templates by category
  // const handleFilterTemplateByCategory = (category: string) => {
  //   setFilteredArr([...list])
  //   const filterByCategory = list.filter((item: ISelectedTemplate) => item?.category === category)
  //   setFilteredArr([...filterByCategory])
  // }

  // removed as of now, commented for further use
  // const handleSelectOwnedListedTemplate = () => {
  //   setFilteredArr([...ownedListedTemplateList])
  // }

  return (
    <Dialog.Panel className="flex flex-col items-center w-full max-w-[1400px] mx-28 my-20 rounded-[24px] bg-white">
      <div className="flex flex-col items-center w-full px-12 pt-12">
        <div className="flex items-start justify-end w-full">
          <CgClose
            onClick={() => dispatch(toggleModal(false))}
            className="text-[24px] cursor-pointer"
          />
        </div>
        <div className="text-center w-[412px]">
          <div className="text-[#14142B] font-[600] text-[28px] leading-[44px]">
            Select a template
          </div>
          {/* <div className="mt-3 text-[#4E4B66] text-[14px]">
            Select over 100 stunning templates to create a stunning wesite to
            fit your needs.
          </div> */}
        </div>
        <form className="flex items-center mt-5 mb-3">
          <div className="relative w-full mx-3">
            <input
              type="text"
              id="simple-search"
              className="search outline-none rounded-[37px] block w-full py-4 px-8 h-[50px]"
              placeholder="Search by template name"
              onChange={handleChange}
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 my-3 pointer-events-none">
              <SearchIcon />
            </div>
          </div>
        </form>
        {/* <div className="flex gap-2 mt-9">
          <div
          onClick={handleSelectOwnedListedTemplate}
          className="text-[14px] font-bold relative px-4 py-2 hover:bg-[#ECEFFF] hover:rounded-[4px] whitespace-nowrap cursor-pointer"
          >
            MY CREATIONS
            <span className="absolute w-[1px] h-[20px] bg-[#85858B] opacity-60 right-[-6%] top-[25%]">
              {""}
            </span>
          </div>
          Purchased logic to be implemented in future hence commented
          <div className="text-[14px] font-bold relative px-5 py-2 whitespace-nowrap cursor-pointer">
            PURCHASED
            <span className="absolute w-[6px] h-[6px] bg-[#85858B] opacity-60 rounded-[50%] right-[-5%] top-[45%]">
              {""}
            </span>
          </div>
          <div className="flex ml-2">
            {templateCategories.map((category, index) => {
              return (
                <div
                  key={index}
                  // no active categories hence commented
                  onClick={() => handleFilterTemplateByCategory(category)}
                  className="text-[14px] font-bold px-5 py-2 hover:bg-[#ECEFFF] hover:rounded-[4px] cursor-pointer"
                >
                  {category}
                </div>
              );
            })}
          </div>
        </div> */}
      </div>
      <hr className="bg-hr h-[2px] w-full mt-6" />
      <div className="w-full bg-lower-template">
        {loading ? (
          <div className="flex justify-center ">
            <Spinner />
          </div>
        ) : (filteredTemplateList && <ListTemplates filteredTemplateList={filteredTemplateList} />)}
      </div>
    </Dialog.Panel>
  );
};

export default SelectTemplateModal;
