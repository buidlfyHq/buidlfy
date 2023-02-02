import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@headlessui/react';
import { CgClose } from 'react-icons/cg';
import { io } from 'socket.io-client';
import config from 'config';
import { processes } from 'components/utils/process';
import LottieComponent from 'components/utils/lottie';
import { fetchPublishDetailsAsync, updatePublishAsync } from 'redux/publish/publish.thunk-actions';
import { toggleModal, toggleModalType } from 'redux/modal/modal.reducers';
import { updateCurrentStep, updatePublishFailed, updatePublishStatus } from 'redux/publish/publish.reducers';
import { IRootState } from 'redux/root-state.interface';
import HourGlassImg from 'assets/lottie/hourglass.json';
import completed from 'assets/icons/completed.svg';
import failed from 'assets/icons/failed.svg';

const PublishProgress: FC = () => {
  const socket = io(config.server.SERVER);
  const dispatch = useDispatch();
  const [failedDeployment, setFailedDeployment] = useState<boolean>();
  const publishConfig = useSelector((state: IRootState) => state.publish.publishConfig);
  const currentStep = useSelector((state: IRootState) => state.publish.currentStep);
  const publishDeploymentId = useSelector((state: IRootState) => state.publish.deploymentId);
  const transactionRes = useSelector((state: IRootState) => state.publish.transactionResponse);
  const publishFailed = useSelector((state: IRootState) => state.publish.publishFailed);
  const publishStatus = useSelector((state: IRootState) => state.publish.publishStatus);
  const publishSubDomain = localStorage.getItem('domain');

  useEffect(() => {
    if (currentStep === 1) {
      socket.on(`deployment.${transactionRes}`, (...args) => {
        if (args[0].status === 'Queued') {
          dispatch(updateCurrentStep(2));
          setFailedDeployment(false);
        }
        if (args[0].status === 'Deploying') {
          dispatch(updateCurrentStep(3));
          setFailedDeployment(false);
        }
        if (args[0].status === 'Failed') {
          setFailedDeployment(true);
          dispatch(updatePublishFailed(true));
          dispatch(toggleModalType('publish-failed'));
          dispatch(updateCurrentStep(4));
        }
        if (args[0].status === 'Deployed' && publishDeploymentId && publishSubDomain) {
          setFailedDeployment(false);
          localStorage.removeItem('domainName');
          dispatch(
            updatePublishAsync({
              domainId: publishSubDomain,
              deploymentId: publishDeploymentId,
            }),
          );
          dispatch(updateCurrentStep(4));
          socket.removeAllListeners(`deployment.${transactionRes}`);
        }
        if (args[0].status === 'Deployed' && publishDeploymentId && !publishSubDomain) {
          setFailedDeployment(false);
          dispatch(fetchPublishDetailsAsync({ deploymentId: publishDeploymentId }));
          dispatch(updateCurrentStep(5));
          socket.removeAllListeners(`deployment.${transactionRes}`);
          localStorage.setItem('publishStatus', publishStatus.toString());
          dispatch(updatePublishStatus(true));
        }
      });
    }
  }, [transactionRes, publishDeploymentId, publishSubDomain, dispatch, publishConfig, socket, currentStep]); // eslint-disable-line

  useEffect(() => {
    if (publishFailed) {
      handleFailed();
    }
  }, [publishFailed]); // eslint-disable-line

  const handleFailed = () => {
    dispatch(toggleModalType('publish-failed'));
  };

  if (currentStep >= 6) {
    setTimeout(() => {
      dispatch(toggleModalType('publish-done'));
      dispatch(updateCurrentStep(0));
    }, 1000);
  }

  return (
    <>
      {!publishFailed ? (
        <Dialog.Panel className="flex flex-col w-full max-w-md items-center mx-28 my-20 rounded-[24px] bg-white">
          <div className="flex items-start justify-end w-full pr-4 pt-4">
            <CgClose onClick={() => dispatch(toggleModal(false))} className="text-[24px] cursor-pointer text-[#14142B]" />
          </div>

          <div className="flex flex-col items-center justify-center py-8">
            <LottieComponent lottie={HourGlassImg} width={75} height={75} />
            <div className="font-[500] text-[20px] text-[#2C2D5E] mt-4">Site Publishing is in process</div>
            <div className="w-[300px] text-center text-[13px] text-[#2C2D5E] font-[300] opacity-60 mt-4">
              Site publishing to the decentralized network could take up some time. Please bear with us.
            </div>
          </div>
          <div className="w-full bg-lower-template border-top-divider-publish py-7 px-12">
            {processes.map(process => {
              const { name, className, idleImage, lineDiv, stepNumber, completedLine, failedText } = process;
              return (
                <div className={`flex gap-5 ${className}`}>
                  <div className="items-center">
                    {failedDeployment ? (
                      <>
                        <img src={failed} alt="icon" width={24} height={24} />
                        {lineDiv}
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>

                  <div className="text-[#14142B] text-[14px] font-[600]">{failedDeployment ? failedText : name}</div>
                </div>
              );
            })}
          </div>
        </Dialog.Panel>
      ) : null}
    </>
  );
};

export default PublishProgress;
