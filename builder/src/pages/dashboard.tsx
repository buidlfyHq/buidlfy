import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import config from 'config';
import { useWindowSize } from 'hooks/use-window-size';
import Navbar from 'features/dashboard/navbar';
import Sidebar from 'features/dashboard/sidebar';
import SideNavbar from 'features/dashboard/side-navbar';
import Workspace from 'features/dashboard/workspace';
import Settings from 'features/dashboard/settings';
import DefaultSettings from 'features/dashboard/default-settings';
import { signout } from 'utils/signout';
import { setSiteHead, updateWorkspaceBackgroundColor, updateWorkspaceElementsArray } from 'redux/workspace/workspace.reducers';
import { updateContractAbi, updateContractAddress, updateContractNetwork } from 'redux/contract/contract.reducers';
import { toggleModal, toggleModalType } from 'redux/modal/modal.reducers';
import { fetchWalletDetailsAsync } from 'redux/web3/web3.thunk-actions';
import 'styles/components.css';

// const CAMPAIGN_CONTRACT_ADDRESS = "0x73ba4B6A58C67C70281C17aC23893b7BD4c8897E";

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const size = useWindowSize();
  const [openSetting, setOpenSetting] = useState<boolean>(false); // for handling settings toggle
  const [openTab, setOpenTab] = useState<number>(1);
  const [drag, setDrag] = useState<boolean>(true);
  const [isContainerSelected, setIsContainerSelected] = useState<boolean>(false);
  const [sideElement, setSideElement] = useState<string>('');
  const [hideNavbar, setHideNavbar] = useState<boolean>(true);

  useEffect(() => {
    const session: any = JSON.parse(localStorage.getItem('session'));
    if (session) {
      const currentData = new Date();
      const expiryDate = new Date(session.cookie?.expires);
      // signout if sesssion is expired
      if (currentData >= expiryDate) {
        signout();
        navigate('/');
      }
      // check if user is authorised
      fetch(`${config.server.SERVER}/is_authenticated`, {
        credentials: 'include',
      })
        .then(res => res.text())
        .then(res => {
          if (!JSON.parse(res).whitelisted) {
            navigate('/');
          } else {
            // load stored configs if available
            const session: any = JSON.parse(localStorage.getItem('session'));
            if (session) {
              dispatch(fetchWalletDetailsAsync(session.data?.address));
            }
            const saveItems = localStorage.getItem('items');
            if (saveItems) {
              dispatch(updateWorkspaceElementsArray(JSON.parse(saveItems).value));
              dispatch(updateWorkspaceBackgroundColor(JSON.parse(saveItems).backgroundColor));
              dispatch(setSiteHead(JSON.parse(saveItems).head));
              if (JSON.parse(saveItems).contract) {
                dispatch(updateContractAbi(JSON.stringify(JSON.parse(saveItems).contract?.abi)));
                dispatch(updateContractAddress(JSON.parse(saveItems).contract?.address));
                dispatch(updateContractNetwork(JSON.parse(saveItems).contract?.network));
              }
            }
            dispatch(toggleModal(true));
            dispatch(toggleModalType('start'));
          }
        })
        .catch(() => navigate('/'));
    } else {
      navigate('/');
    }
  }, []); // eslint-disable-line

  return (
    <main>
      {size.width > 1024 ? (
        <section className="flex flex-row w-full min-h-screen columns-3">
          {/* Sidebar */}
          <SideNavbar setSideElement={setSideElement} setHideNavbar={setHideNavbar} />
          <Sidebar isContainerSelected={isContainerSelected} sideElement={sideElement} hideNavbar={hideNavbar} setHideNavbar={setHideNavbar} />

          <section className="flex-1">
            {/* Navbar */}
            <Navbar setHideNavbar={setHideNavbar} setIsContainerSelected={setIsContainerSelected} setOpenSetting={setOpenSetting} />

            {/* Main section */}
            <aside className="flex h-full">
              {/* Workspace */}
              <Workspace
                setOpenSetting={setOpenSetting}
                setOpenTab={setOpenTab}
                drag={drag}
                setDrag={setDrag}
                setIsContainerSelected={setIsContainerSelected}
                setHideNavbar={setHideNavbar}
                openSetting={openSetting}
                setSideElement={setSideElement}
                hideSettingSidebar={undefined}
              />
            </aside>
          </section>
          <div className="setting-sidebar rounded-[8px] py-2 overflow-y-scroll fixed top-0 right-0 bottom-0">
            {openSetting ? (
              <Settings setOpenSetting={setOpenSetting} openTab={openTab} setOpenTab={setOpenTab} />
            ) : (
              <DefaultSettings setHideNavbar={setHideNavbar} setIsContainerSelected={setIsContainerSelected} setOpenSetting={setOpenSetting} />
            )}
          </div>
        </section>
      ) : (
        <h1 className="items-center text-center justify-center flex h-[100vh]">
          Use this on desktop for better experience <br /> Responsive view coming soon!
        </h1>
      )}
    </main>
  );
};

export default Dashboard;
