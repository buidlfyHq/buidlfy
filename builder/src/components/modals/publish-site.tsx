import React, { FC, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal, toggleModalType } from "redux/modal/modal.reducers";
import HourGlassImg from "assets/icons/hourglass.png";
import failed from "assets/icons/failed.svg";
// import HourGlassImg from "assets/lottie/hourglass.json";
import completed from "assets/icons/completed.svg";
import { CgClose } from "react-icons/cg";
import { IRootState } from "redux/root-state.interface";
import {
  getPublishDetails,
  initiatePublish,
} from "redux/publish/publish.action";
import { io } from "socket.io-client";
import config from "config";
import { updateCurrentStep } from "redux/publish/publish.reducers";
import { processes } from "components/utils/process";

const PublishSiteModal: FC = () => {
  const socket = io(config.backendApi.BACKEND_API);
  const dispatch = useDispatch();

  const publishConfig = useSelector(
    (state: IRootState) => state.publish.publishConfig
  );
  const currentStep = useSelector(
    (state: IRootState) => state.publish.currentStep
  );
  const publishDeploymentId = useSelector(
    (state: IRootState) => state.publish.deploymentId
  );
  const transactionRes = useSelector(
    (state: IRootState) => state.publish.transactionResponse
  );
  useEffect(() => {
    dispatch(initiatePublish({ configDetails: publishConfig }));
  }, [publishConfig]);
  const listener = (...args) => {
    if (args[0].status === "Queus") {
      dispatch(updateCurrentStep(2));
    }
    if (args[0].status === "Deploying") {
      dispatch(updateCurrentStep(3));
    }
    if (args[0].status === "Deployed" && publishDeploymentId) {
      dispatch(getPublishDetails({ deploymentId: publishDeploymentId }));
      dispatch(updateCurrentStep(4));
      socket.removeAllListeners(`deployment.${transactionRes}`);
    }
  };
  useEffect(() => {
    socket.on(`deployment.${transactionRes}`, listener);
  }, [transactionRes, publishDeploymentId]);
  if (currentStep >= 6) {
    setTimeout(() => {
      dispatch(toggleModalType("publish-done"));
    }, 1000);
  }

  return (
    <Dialog.Panel className="flex flex-col w-full max-w-md items-center mx-28 my-20 rounded-[24px] bg-white">
      <div className="flex items-start justify-end w-full pr-4 pt-4">
        <CgClose
          onClick={() => dispatch(toggleModal(false))}
          className="text-[24px] cursor-pointer text-[#14142B]"
        />
      </div>
      <div className="flex flex-col items-center justify-center py-8">
        {/* <LottieComponent lottie={HourGlassImg} width={75} height={75} /> */}
        <img src={HourGlassImg} alt="icon" width={54} height={54} />
        <div className="font-[500] text-[20px] text-[#2C2D5E] mt-4">
          Site Publishing is in process
        </div>
        <div className="w-[300px] text-center text-[13px] text-[#2C2D5E] font-[300] opacity-60 mt-4">
          Site publishing could take up some minutes. Please bear with us once
          it is done.
        </div>
      </div>
      <div className="w-full bg-lower-template border-top-divider-publish py-7 px-12">
        {processes.map((process) => {
          const {
            name,
            className,
            idleImage,
            lineDiv,
            stepNumber,
            completedLine,
          } = process;
          return (
            <div className={`flex gap-5 ${className}`}>
              <div className="items-center">
                {stepNumber <= currentStep ? (
                  <>
                    <img src={completed} alt="icon" width={24} height={24} />
                    {completedLine}
                  </>
                ) : (
                  <>
                    <img src={idleImage} alt="icon" width={24} height={24} />
                    {lineDiv}
                  </>
                )}
              </div>

              <div className="text-[#14142B] text-[14px] font-[600]">
                {name}
              </div>
            </div>
          );
        })}
      </div>
    </Dialog.Panel>
  );
};

export default PublishSiteModal;
