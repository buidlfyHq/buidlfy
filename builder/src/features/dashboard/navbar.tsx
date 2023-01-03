import { ChangeEvent, FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import WalletMenu from 'features/dashboard/wallet-menu';
import MintNFT from 'features/dashboard/mint-nft';
import PublishMenu from 'features/dashboard/publish-menu';
import { updateWorkspaceBackgroundColor, updateWorkspaceElementsArray } from 'redux/workspace/workspace.reducers';
import { setSelectorToDefault, updateContractAbi, updateContractAddress, updateContractNetwork } from 'redux/contract/contract.reducers';
import { IRootState } from 'redux/root-state.interface';
import 'styles/components.css';
import { AiOutlineEdit } from 'react-icons/ai';
import { updateSiteName } from 'redux/publish/publish.reducers';

interface INavbar {
  setHideNavbar: (hideNavbar: boolean) => void;
  setIsContainerSelected: (isContainerSelected?: boolean) => void;
  setOpenSetting: (open: boolean) => void;
}

const Navbar: FC<INavbar> = ({ setHideNavbar, setIsContainerSelected, setOpenSetting }) => {
  const dispatch = useDispatch();
  const workspaceElements = useSelector((state: IRootState) => state.workspace.workspaceElements);
  const workspaceBackgroundColor = useSelector((state: IRootState) => state.workspace.workspaceBackgroundColor);
  const publishStatus = useSelector((state: IRootState) => state.publish.publishStatus);
  const head = useSelector((state: IRootState) => state.workspace.head);
  const contractDetails = useSelector((state: IRootState) => state.contract.contractDetails);
  const siteName = useSelector((state: IRootState) => state.publish.siteName);
  const handleCloseSidebar = () => {
    setIsContainerSelected(false);
    setOpenSetting(false);
    setHideNavbar(true);
  };

  const handleSave = () => {
    let templateConfig = {
      value: workspaceElements,
      backgroundColor: workspaceBackgroundColor,
      head: {
        title: head.title,
        logo: head.logo,
      },
      contract: null,
    };
    console.log(workspaceElements, 'workspaceElements');

    if (contractDetails?.abi && contractDetails?.address && contractDetails?.network) {
      templateConfig.contract = {
        abi: JSON.parse(contractDetails?.abi),
        address: contractDetails?.address,
        network: contractDetails?.network,
      };
    }
    if (workspaceElements?.length > 0) {
      localStorage.setItem('items', JSON.stringify(templateConfig));
    }
    if (publishStatus) {
      localStorage.setItem('publishStatus', publishStatus.toString());
    }
  };

  const handleClear = () => {
    // FIX: remove full config from local storage
    localStorage.removeItem('items');
    localStorage.removeItem('publishStatus');
    localStorage.removeItem('deployment');
    localStorage.removeItem('domain');
    localStorage.removeItem('domainName');
    dispatch(updateWorkspaceElementsArray([]));
    dispatch(setSelectorToDefault());
    dispatch(updateWorkspaceBackgroundColor('rgba(255, 255, 255, 1)'));
    dispatch(updateContractAbi(''));
    dispatch(updateContractAddress(''));
    dispatch(updateContractNetwork(''));
  };

  const handleSiteName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSiteName(e.target.value));
  };
  return (
    <main
      onClick={handleCloseSidebar}
      className="fixed left-[80px] right-0 h-[60px] top-0 topnav flex flex-row justify-between items-center p-3 bg-white z-20"
    >
      {/* FIX: find out a way to remove this div */}
      <div className="w-[8rem]" />
      <div className="flex flex-row items-center mt-[0.3rem]">
        <input
          id="textarea"
          placeholder={siteName}
          onChange={e => handleSiteName(e)}
          className="outline-none placeholder-draft overflow-hidden w-[5rem] max-h-[2rem] flex items-center text-[#100F11] text-[16px] font-semibold text-center resize-none"
        />
        {/* Draft Post
        </input> */}
        <AiOutlineEdit className="ml-3 text-[#2E2E2E]" />
      </div>
      <div className="flex flex-row h-[60px]">
        <div className="flex flex-row items-center">
          <div
            onClick={handleClear}
            className="flex navbar-text items-center p-2 mx-3 my-2 cursor-pointer text-[13px] hover:text-slate-700 hover:rounded-md"
          >
            Clear
          </div>
          <div
            onClick={handleSave}
            className="flex navbar-text items-center p-2 mx-3 my-2 cursor-pointer text-[13px] hover:text-slate-700 hover:rounded-md"
          >
            Save
          </div>
        </div>
        {/* It will be used for the later code for undo & redo of website */}
        {/* <div className="flex flex-row items-center mx-2 text-[18px] text-slate-600">
          <span className="p-2 mx-1 cursor-pointer hover:bg-slate-100 hover:rounded-md">
            <MdUndo />
          </span>
          <span className="p-2 mx-1 cursor-pointer hover:bg-slate-100 hover:rounded-md">
            <MdRedo />
          </span>
        </div>*/}
        <Link
          target="_blank"
          rel="noreferrer"
          to="/preview"
          className="py-3 px-5 my-2 ml-3 text-[14px] font[500] button-singleTemp"
          onClick={handleSave}
        >
          <div className="gradient-text">Preview</div>
        </Link>
        <MintNFT />
        <PublishMenu />
        <WalletMenu isMyTemplatePage={false} />
      </div>
    </main>
  );
};

export default Navbar;
