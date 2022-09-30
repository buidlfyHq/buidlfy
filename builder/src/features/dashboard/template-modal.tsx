import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import RenderModal from "components/utils/render-modals";
import { IRootState } from "redux/root-state.interface";
import { toggleModal } from "redux/modal/modal.reducers";

const TemplateModal: FC = () => {
  const dispatch = useDispatch();
  const modalShow = useSelector((state: IRootState) => state.modal.modalShow);

  const handleClose = () => {
    dispatch(toggleModal(false));
  };

  return (
    <Dialog className="relative z-50" open={modalShow} onClose={handleClose}>
      <RenderModal />
    </Dialog>
  );
};

export default TemplateModal;
