import React, { FC, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { toggleModal, toggleModalType } from "redux/modal/modal.reducers";
import HourGlassImg from "assets/icons/hourglass.png";
import TickImg from "assets/colored.png";
import { CgClose } from "react-icons/cg";

const processes = [
  {
    name:'Preparing Queue',
    className: ''
  },
  {
    name:'Preparing Environment',
    className: 'mt-12'
  },
  {
    name:'Preparing Queue',
    className: 'mt-12'
  },
  {
    name:'Site is published',
    className: 'mt-12 mb-4'
  }
]

const PublishSiteModal: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => {
      dispatch(toggleModalType("publish-done"))
    }, 3000)
  }, [])
  return (
    <Dialog.Panel className="flex flex-col w-full max-w-md items-center mx-28 my-20 rounded-[24px] bg-white">
          <div className="flex items-start justify-end w-full pr-4 pt-4">
            <CgClose onClick={() => dispatch(toggleModal(false))} className="text-[24px] cursor-pointer text-[#14142B]" />
          </div>
          <div className="flex flex-col items-center justify-center py-8">
            <img src={HourGlassImg} alt="icon" width={54} height={54} />
            <div className="font-[500] text-[20px] text-[#2C2D5E] mt-4">
              Site Publishing is in process
            </div>
            <div className="w-[300px] text-center text-[13px] text-[#2C2D5E] font-[300] opacity-60 mt-4">
              Site publishing could take up some minutes. Please bear with us
              once it is done.
            </div>
          </div>
          <div className="w-full bg-lower-template border-top-divider-publish py-7 px-12">
            {processes.map(process => {
              const {name, className} = process
              return (
                <div className={`flex items-center gap-5 ${className}`}>
                  <div><img src={TickImg} alt="icon" width={24} height={24} /></div>
                  <div className="text-[#14142B] text-[14px] font-[600]">{name}</div>
                </div>
              )
            })}
            {/* <div className="flex items-center gap-5">
              <div><img src={TickImg} alt="icon" width={24} height={24} /></div>
              <div className="text-[#14142B] text-[14px] font-[600]">Preparing Queue</div>
            </div>
            <div className="flex items-center gap-5 mt-12">
              <div><img src={TickImg} alt="icon" width={24} height={24} /></div>
              <div className="text-[#14142B] text-[14px] font-[600]">Preparing Environment</div>
            </div>
            <div className="flex items-center gap-5 mt-12">
              <div><img src={TickImg} alt="icon" width={24} height={24} /></div>
              <div className="text-[#14142B] text-[14px] font-[600]">Preparing Queue</div>
            </div>
            <div className="flex items-center gap-5 mt-12 mb-4">
              <div><img src={TickImg} alt="icon" width={24} height={24} /></div>
              <div className="text-[#14142B] text-[14px] font-[600]">Site is published</div>
            </div> */}
          </div>
      </Dialog.Panel>
  );
};

export default PublishSiteModal;