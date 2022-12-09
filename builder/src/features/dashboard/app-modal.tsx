import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@headlessui/react';
import RenderModal from 'components/utils/render-modals';
import { IRootState } from 'redux/root-state.interface';
import { toggleModal } from 'redux/modal/modal.reducers';
import { ConfettiShower } from 'components/utils/confetti-shower';

const AppModal: FC = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: IRootState) => state.modal);
  const { modalShow, modalType } = modalState;

  const handleClose = () => {
    dispatch(toggleModal(false));
  };

  const confettiCondition = modalType === 'final' || modalType === 'publish-done';
  return (
    <Dialog className="relative z-50" open={modalShow} onClose={handleClose}>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px]" aria-hidden="true" />
      <div className={`fixed inset-0 ${confettiCondition ? '' : 'overflow-y-auto'}`}>
        {confettiCondition ? <ConfettiShower /> : null}
        <div className="flex items-center justify-center min-h-full">
          <RenderModal />
        </div>
      </div>
    </Dialog>
  );
};

export default AppModal;
