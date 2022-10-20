import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import makeBlockie from "ethereum-blockies-base64";
import { encode as base64_encode } from "base-64";
import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import { connectWallet } from "redux/web3/web3.actions";
import { updateWorkspaceElementsArray } from "redux/workspace/workspace.reducers";
import { toggleModal, toggleModalType } from "redux/modal/modal.reducers";
import { setSelectorToDefault } from "redux/contract/contract.reducers";
import { IRootState } from "redux/root-state.interface";
import "styles/components.css";

interface INavbar {
  workspaceBackgroundColor: string;
  setWorkspaceBackgroundColor?: (workspaceBackgroundColor: string) => void;
  head: {
    title: string;
    logo: string | ArrayBuffer;
  };
  setHideNavbar: (hideNavbar: boolean) => void;
  setIsContainerSelected: (isContainerSelected?: boolean) => void;
  setOpenSetting: (open: boolean) => void;
}

const Navbar: FC<INavbar> = ({
  workspaceBackgroundColor,
  head,
  setWorkspaceBackgroundColor,
  setHideNavbar,
  setIsContainerSelected,
  setOpenSetting,
}) => {
  const dispatch = useDispatch();
  const workspaceElements = useSelector(
    (state: IRootState) => state.workspace.workspaceElements
  );
  const contractDetails = useSelector(
    (state: IRootState) => state.contract.contractDetails
  );
  const currentAccount = useSelector(
    (state: IRootState) => state.web3.currentAccount
  );

  const [abiJSON, setAbiJSON] = useState<
    {
      inputs: { internalType: string; name: string; type: string }[];
      name: string;
      outputs: { internalType: string; name: string; type: string }[];
      stateMutability: string;
      type: string;
    }[]
  >([]); // work in progress
  const [generatedConfig, setGeneratedConfig] = useState<string>("");

  useEffect(() => {
    if (contractDetails.abi) {
      try {
        setAbiJSON(JSON.parse(contractDetails.abi));
      } catch (error) {
        console.log(error);
      }
    }
  }, [contractDetails.abi]);

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
    setWorkspaceBackgroundColor("rgba(255, 255, 255, 1)");
  };

  const handlePublish = () => {
    let config = {
      head: {
        title: head.title,
        logo: head.logo,
      },
      background: workspaceBackgroundColor,
      builder: workspaceElements,
      contract: {
        abi: abiJSON,
        address: contractDetails.address,
      },
    };
    let stringifiedConfig = JSON.stringify(config);

    setGeneratedConfig(base64_encode(stringifiedConfig));
    dispatch(toggleModal(true));
    dispatch(toggleModalType("publish-process"));
  };

  const handleMintTemplateForm = () => {
    dispatch(toggleModal(true));
    dispatch(toggleModalType("mint-nft-form"));
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

        {/* Show only after the site is published */}
        {currentAccount && (
          <div
            className="bordered-button text-[14px] text-[#855FD8] font[500] py-3 px-5 my-2 ml-3 text-[14px] text-white rounded-[10px] cursor-pointer connect-wallet-button whitespace-nowrap"
            onClick={handleMintTemplateForm}
          >
            Mint as NFT
          </div>
        )}
        <button
          className="py-2 px-7 ml-3 font-[500] text-[14px] text-white rounded-[10px] cursor-pointer connect-wallet-button whitespace-nowrap my-2 ml-3"
          onClick={handlePublish}
        >
          Publish
        </button>

        {currentAccount ? (
          <Menu>
            <Menu.Button className="flex justify-center items-center my-2 ml-3">
              <img
                className="bg-black w-8 h-8 rounded-full"
                src={makeBlockie(currentAccount)}
                alt="Blockie"
              />
            </Menu.Button>
            <Menu.Items className="absolute h-full top-0 right-0 flex flex-col w-56 px-4 py-2 mt-16 shadow-lg mr-5 rounded-[8px] origin-top-right bg-white">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/my-templates"
                    className={`${
                      active && "bg-slate-100 rounded-[8px] cursor-pointer"
                    } font-[500] px-4 py-2 font-[16px]`}
                  >
                    My Templates
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          <button
            className="py-2 px-5 my-2 ml-3 text-[14px] text-white rounded-[10px] cursor-pointer connect-wallet-button whitespace-nowrap"
            onClick={() => dispatch(connectWallet())}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </main>
  );
};

export default Navbar;
