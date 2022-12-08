import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog } from '@headlessui/react';
import { CgClose } from 'react-icons/cg';
import LottieComponent from 'components/utils/lottie';
import { toggleModal } from 'redux/modal/modal.reducers';
import HourGlassImg from 'assets/lottie/hourglass.json';
import InfoCircleImg from 'assets/icons/info-circle.png';

const ListingReview: FC = () => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(toggleModal(false));

  return (
    <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[527px] my-20 sm:mx-28 mx-14 rounded-[24px] bg-white py-5 px-6">
      <div className="flex items-start justify-end w-full ">
        <CgClose onClick={handleClose} className="text-[18px] cursor-pointer" />
      </div>
      <div className="flex flex-col justify-center items-center pt-3">
        <div>
          <LottieComponent lottie={HourGlassImg} width={54} height={54} />
        </div>
        <div className="font-[600] text-[24px] text-[#14142B] mt-7">Template listing is currently in review...</div>
        <div className="flex gap-4 bg-gray-100 mt-8 rounded-[4px] py-3.5 px-4">
          <div>
            <img src={InfoCircleImg} alt="icon" width={40} height={40} />
          </div>
          <div className="text-[14px] text-[#1C1C1E] opacity-60">
            Our team will review the template before making it available on the market place, we’ll notify you once it is ready to go on the market
            place.
          </div>
        </div>
        <div onClick={handleClose} className="cursor-pointer text-[13px] text-white font-[500] bg-[#8268E5] rounded-[4px] py-3 px-10 my-7">
          Okay
        </div>
      </div>
    </Dialog.Panel>
  );
};

export default ListingReview;
