import { useState } from "react";
import { Dialog } from "@headlessui/react";
import RenderModal from "components/utils/render-modals";

interface ITemplateModal {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
}

const TemplateModal = ({ openModal, setOpenModal }) => {
  const [modalType, setModalType] = useState<string>("start");

  return (
    <Dialog
      className="relative z-50"
      open={openModal}
      onClose={() => setOpenModal(false)}
    >
      <RenderModal
        modalType={modalType}
        setModalType={setModalType}
        setOpenModal={setOpenModal}
      />
    </Dialog>
  );
};

export default TemplateModal;
