import { FC } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "redux/root-state.interface";
import "styles/components.css";

interface IPublishButton {
  text: string;
  handleClick?: () => void;
}

const PublishButton: FC<IPublishButton> = ({ text, handleClick }) => {
  const workspaceElements = useSelector(
    (state: IRootState) => state.workspace.workspaceElements
  );
  return (
    <button
      disabled={!(workspaceElements?.length > 0)}
      className={`py-2 px-7 my-2 ml-3 font-[500] text-[14px] text-white rounded-[10px] connect-wallet-button whitespace-nowrap text-white px-[20px] py-[10px] rounded-[10px] ${
        workspaceElements?.length > 0 ? "" : "opacity-30 pointer-events-none"
      }`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default PublishButton;
