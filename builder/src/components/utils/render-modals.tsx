import { FC } from "react";
import StartModal from "components/custom-components/modals/start-modal";
import SelectTemplateModal from "components/custom-components/modals/select-template-modal";
import SingleTemplateDetails from "components/custom-components/modals/single-template-details";
import FinalModal from "components/custom-components/modals/final-modal";

interface IRenderModal {
  modalType: string;
  setModalType: (modalType: string) => void;
  setOpenModal: (openModal: boolean) => void;
}

const RenderModal: FC<IRenderModal> = ({
  modalType,
  setModalType,
  setOpenModal,
}) => {
  switch (modalType) {
    case "start":
      return (
        <StartModal setModalType={setModalType} setOpenModal={setOpenModal} />
      );
    case "template":
      return <SelectTemplateModal setModalType={setModalType} />;
    case "single":
      return <SingleTemplateDetails setModalType={setModalType} />;
    case "final":
      return <FinalModal setOpenModal={setOpenModal} />;
    default:
      return <></>;
  }
};

export default RenderModal;
