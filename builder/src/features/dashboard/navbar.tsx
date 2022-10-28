import { FC } from "react";
import ReactDOMServer from "react-dom/server";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import WalletMenu from "features/dashboard/wallet-menu";
import {
  updateWorkspaceBackgroundColor,
  updateWorkspaceElementsArray,
} from "redux/workspace/workspace.reducers";
import { toggleModal, toggleModalType } from "redux/modal/modal.reducers";
import {
  setSelectorToDefault,
  updateContractAbi,
  updateContractAddress,
} from "redux/contract/contract.reducers";
import { IRootState } from "redux/root-state.interface";
import "styles/components.css";

interface INavbar {
  setHideNavbar: (hideNavbar: boolean) => void;
  setIsContainerSelected: (isContainerSelected?: boolean) => void;
  setOpenSetting: (open: boolean) => void;
}

const Navbar: FC<INavbar> = ({
  setHideNavbar,
  setIsContainerSelected,
  setOpenSetting,
}) => {
  const dispatch = useDispatch();
  const workspaceElements = useSelector(
    (state: IRootState) => state.workspace.workspaceElements
  );
  const currentAccount = useSelector(
    (state: IRootState) => state.web3.currentAccount
  );
  const publishStatus = useSelector(
    (state: IRootState) => state.publish.publishStatus
  );

  const handleCloseSidebar = () => {
    setIsContainerSelected(false);
    setOpenSetting(false);
    setHideNavbar(true);
  };

  const handleSave = () => {
    // FIX: save full config to local storage
    if (workspaceElements?.length > 0) {
      localStorage.setItem("items", JSON.stringify(workspaceElements));
    }
  };

  const handleClear = () => {
    // FIX: remove full config from local storage
    localStorage.removeItem("items");
    dispatch(updateWorkspaceElementsArray([]));
    dispatch(setSelectorToDefault());
    dispatch(updateWorkspaceBackgroundColor("rgba(255, 255, 255, 1)"));
    dispatch(updateContractAbi(""));
    dispatch(updateContractAddress(""));
  };

  const handleConfirmPublish = () => {
    dispatch(toggleModal(true));
    dispatch(toggleModalType("publish-confirm"));
  };
  const handleNewPublish = () => {
    localStorage.removeItem("domain");
    dispatch(toggleModal(true));
    dispatch(toggleModalType("publish-confirm"));
  };
  const handleMintTemplateForm = () => {
    dispatch(toggleModal(true));
    dispatch(toggleModalType("mint-nft-form"));
  };

  const tooltip = (
    <ReactTooltip
      id="mint"
      className="tool"
      place="bottom"
      type="light"
      effect="solid"
      backgroundColor="#ffffff"
      arrowColor="#ffffff"
      scrollHide={true}
      delayShow={200}
    />
  );

  const tooltipContent = (
    <div>
      <div className="mb-2">
        Please publish the site before <br /> minting this template.
      </div>
      <button
        className="w-full py-2 px-7 my-2 font-[500] text-[14px] text-white rounded-[10px] cursor-pointer connect-wallet-button whitespace-nowrap"
        onClick={handleConfirmPublish}
      >
        Publish
      </button>
    </div>
  );

  const publishButton = (text: string, handleClick: () => void) => {
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
  return (
    <main
      onClick={handleCloseSidebar}
      className="fixed left-[80px] right-0 h-[60px] top-0 topnav flex flex-row justify-between items-center p-3 bg-white z-20"
    >
      {/* FIX: find out a way to remove this div */}
      <div />
      <div className="flex flex-row h-[60px]">
        <div className="flex flex-row items-center">
          <div
            onClick={handleClear}
            className="flex items-center p-2 mx-3 my-2 cursor-pointer text-slate-500 hover:bg-slate-100 hover:text-slate-700 hover:rounded-md"
          >
            Clear
          </div>
          <div
            onClick={handleSave}
            className="flex items-center p-2 mx-3 my-2 cursor-pointer text-slate-500 hover:bg-slate-100 hover:text-slate-700 hover:rounded-md"
          >
            Save
          </div>
        </div>
        {/* It will be used for the later code for undo, redo and preview of website */}
        {/* <div className="flex flex-row items-center mx-2 text-[18px] text-slate-600">
          <span className="p-2 mx-1 cursor-pointer hover:bg-slate-100 hover:rounded-md">
            <MdUndo />
          </span>
          <span className="p-2 mx-1 cursor-pointer hover:bg-slate-100 hover:rounded-md">
            <MdRedo />
          </span>
        </div>
        <div className="flex items-center p-2 mx-3 my-2 cursor-pointer text-slate-500 hover:bg-slate-100 hover:text-slate-700 hover:rounded-md">
          <span className="mr-1">
            <AiOutlineEye />
          </span>
          Preview
        </div> */}

        {/* ADD: handle case when the site is published */}
        {currentAccount && (
          <button
            className="bordered-button py-3 px-5 my-2 ml-3 text-[14px] text-[#855FD8] font[500] rounded-[10px] whitespace-nowrap"
            onClick={handleMintTemplateForm}
            data-for="mint"
            data-html={true}
            data-tip={ReactDOMServer.renderToString(<>{tooltipContent}</>)}
          >
            {tooltip}
            Mint as NFT
          </button>
        )}

        {publishStatus ? (
          <>
            {publishButton("Re-Publish", handleConfirmPublish)}
            {publishButton("New Publish", handleNewPublish)}
          </>
        ) : (
          publishButton("Publish", handleConfirmPublish)
        )}

        <WalletMenu />
      </div>
    </main>
  );
};

export default Navbar;
