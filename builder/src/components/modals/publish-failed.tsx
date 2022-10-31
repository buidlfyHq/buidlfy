import { FC } from "react";
import { useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import { CgClose } from "react-icons/cg";
import { toggleModal } from "redux/modal/modal.reducers";

const PublishFailed: FC = () => {
  const dispatch = useDispatch();

  return (
    <Dialog.Panel className="rounded-[24px] py-5 px-5 bg-white rounded flex flex-row justify-start items-center gap-6">
      <div className="flex flex-col items-center justify-center w-[380px] h-[160px] relative">
        <div className="flex items-start justify-end w-full mt-4">
          <CgClose
            onClick={() => dispatch(toggleModal(false))}
            className="text-[20px] cursor-pointer text-[#14142B]"
          />
        </div>
        <h3 className="font-bold text-[20px] mt-[0.5rem]">
          Site Publishing is failed!
        </h3>
        <h6 className="mt-2 text-[#14142B] text-[14px] font-normal">
          Oh noo! Site Publishing is failed, please try again!
        </h6>
        <div className="flex justify-center w-full mb-[1rem] mt-[1.5rem]">
          <button
            onClick={() => dispatch(toggleModal(false))}
            className="py-2 px-7 my-2 ml-3 font-[500] text-[14px] text-white rounded-[10px] connect-wallet-button whitespace-nowrap add-btn"
          >
            Try Again
          </button>
        </div>
      </div>
    </Dialog.Panel>
  );
};

export default PublishFailed;
