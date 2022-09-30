import { FC } from "react";
import { useSelector } from "react-redux";
import StartModal from "components/modals/start-modal";
import SelectTemplateModal from "components/modals/select-template-modal";
import SingleTemplateDetails from "components/modals/single-template-details";
import FinalModal from "components/modals/final-modal";
import { IRootState } from "redux/root-state.interface";

const RenderModal: FC = () => {
  const modalType = useSelector((state: IRootState) => state.modal.modalType);

  switch (modalType) {
    case "start":
      return <StartModal />;
    case "template":
      return <SelectTemplateModal />;
    case "single":
      return <SingleTemplateDetails />;
    case "final":
      return <FinalModal />;
    default:
      return <></>;
  }
};

export default RenderModal;
