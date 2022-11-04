import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import { CgClose } from "react-icons/cg";
import ListingAccordion from "components/utils/listing-accordion";
import { toggleModal } from "redux/modal/modal.reducers";
import { IRootState } from "redux/root-state.interface";

const CompleteListing: FC = () => {
  const dispatch = useDispatch();
  const selectedTemplate = useSelector(
    (state: IRootState) => state.template.selectedTemplate
  );

  return (
    <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[527px] min-w-[330px] my-20 sm:mx-28 mx-12 rounded-[15px] bg-white">
      <button
        className="flex items-start justify-end w-full px-6 py-5"
        onClick={() => dispatch(toggleModal(false))}
      >
        <CgClose className="text-[18px] cursor-pointer" />
      </button>

      <section className="flex flex-col items-center w-full px-10">
        <div className="text-[#14142B] font-[600] text-[20px] mb-6">
          Complete your listing
        </div>

        <section className="flex w-full justify-between items-center text-[#14142B]  text-[14px] my-5">
          <div className="flex items-center gap-6">
            <div className="h-[54px] w-[54px] flex items-center">
              <img
                src={selectedTemplate.image}
                className="w-full h-full rounded-[4px]"
                alt="icon"
              />
            </div>
            <div className="flex flex-col items-start">
              <div className="text-[#14142B] opacity-50 font-[500] tex-[12px] ">
                {selectedTemplate.category}
              </div>
              <div className="text-[#14142B] font-[600] text-[14px] whitespace-nowrap">
                {selectedTemplate.name}
              </div>
              <div className="text-[#14142B] opacity-50 font-[500] tex-[12px] ">
                Quantity: 1
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-[#14142B] opacity-50 font-[500] text-[12px] ">
              Price
            </div>
            <div className="text-[#14142B] font-[700] text-[14px]">
              {selectedTemplate.listAmount} USDT
            </div>
          </div>
        </section>

        <section className="w-full border-top-divider-publish">
          <ListingAccordion
            isApprove={true}
            title="Approve Collection"
            description="You’ll be asked to approve this collection from your wallet. You only need to approve each collection once."
          />
          <ListingAccordion
            isApprove={false}
            title="Confirm Listing"
            description="You need to confirm that you want to list this template on buidlfy."
          />
        </section>
      </section>
    </Dialog.Panel>
  );
};

export default CompleteListing;
