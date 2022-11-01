import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal, toggleModalType } from "redux/modal/modal.reducers";
import { IRootState } from "redux/root-state.interface";
import { Menu } from "@headlessui/react";

const MintNFT: FC = () => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(
    (state: IRootState) => state.web3.currentAccount
  );
  const workspaceElements = useSelector(
    (state: IRootState) => state.workspace.workspaceElements
  );
  const isNoElementinWorkspace = workspaceElements.every(
    (element) => element.style.deleteComponent === true
  );

  const handleConfirmPublish = () => {
    dispatch(toggleModal(true));
    dispatch(toggleModalType("publish-confirm"));
  };

  const handleMintTemplateForm = () => {
    dispatch(toggleModal(true));
    dispatch(toggleModalType("mint-nft-form"));
  };
  const newPublishStatus = localStorage.getItem("publishStatus");
  return (
    <>
      {currentAccount && (
        <Menu as="div" className="relative">
          <Menu.Button
            as="div"
            onClick={newPublishStatus && handleMintTemplateForm}
            className={`${
              newPublishStatus ? "cursor-pointer" : "cursor-not-allowed"
            } py-3 px-5 my-2 ml-3 text-[14px] font[500] button-singleTemp`}
          >
            <div className="gradient-text">Mint as NFT</div>
          </Menu.Button>
          {!newPublishStatus ? (
            <Menu.Items className="py-6 px-4 absolute right-0 top-[4rem] bg-white w-[214px] shadow-menu rounded-[16px]">
              <Menu.Item
                as="div"
                className="text-[13px] cursor-pointer text-[#6E7191] hover:text-[#14142B]"
              >
                <div className="mb-2 text-[#14142B] opacity-50 mx-1 ">
                  Please publish the site before minting this template.
                </div>
                <button
                  className={`${
                    !isNoElementinWorkspace
                      ? ""
                      : "opacity-30 pointer-events-none"
                  } w-full py-2 px-auto mt-4 font-[500] text-[14px] text-white rounded-[4px] cursor-pointer connect-wallet-button whitespace-nowrap`}
                  onClick={handleConfirmPublish}
                >
                  Publish
                </button>
              </Menu.Item>
            </Menu.Items>
          ) : null}
        </Menu>
      )}
    </>
  );
};

export default MintNFT;
