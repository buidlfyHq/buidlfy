import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { toggleModal, toggleModalType } from 'redux/modal/modal.reducers';
import { SidebarEnum } from 'redux/workspace/workspace.interfaces';
import logo from 'assets/icons/buidlfy.png';
import ElementSvg from 'components/utils/assets/elements-svg';
import TemplateSvg from 'components/utils/assets/template-svg';
import 'styles/components.css';

interface ISideNavbar {
  setSideElement: (sideElement: string) => void;
  setHideNavbar: (hideNavbar: boolean) => void;
}

const SideNavbar: FC<ISideNavbar> = ({ setSideElement, setHideNavbar }) => {
  const dispatch = useDispatch();

  const handleSidebar = (selectedSidebarElements: string) => {
    setSideElement(selectedSidebarElements);
  };

  return (
    <main className="w-[80px] sidenav z-[1] fixed top-0 bottom-0 left-0">
      {/* Components */}
      <img src={logo} className="w-[2.4rem] mx-[1.3rem] my-[0.65rem] rounded-full hover:shadow-lg" alt="logo" />
      <div className="side-border px-4 pt-[1rem]">
        <div
          onClick={() => {
            dispatch(toggleModal(true));
            dispatch(toggleModalType('template'));
          }}
          className="cursor-pointer icon-div"
        >
          <TemplateSvg />
          <h3 className="side-text mt-1">Templates</h3>
        </div>
        <div
          onClick={() => {
            handleSidebar(SidebarEnum.ELEMENTS);
            setHideNavbar(false);
          }}
          className="mt-8 icon-div cursor-pointer"
        >
          <ElementSvg />
          <h3 className="side-text mt-1">Elements</h3>
        </div>
        {/* These are commented sidebar elements to be used in future */}
        {/* <div className="mt-8 cursor-pointer">
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={pages} />
          </div>
          <h3 className="side-text mt-1">Pages</h3>
        </div> */}
        {/* <div className="mt-8 cursor-pointer">
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={pages} />
          </div>
          <h3 className="side-text mt-1">Pages</h3>
        </div> */}
        {/* <div className="mt-8 cursor-pointer">
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={media} />
          </div>
          <h3 className="side-text mt-1">Media</h3>
        </div> 
        <div
          onClick={() => {
            showSidebar(true);
            handleSidebar(SidebarEnum.STYLES);
            hideSettingSidebar();
          }}
          className="mt-8 cursor-pointer"
        >
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={styles} alt="Styles" />
          </div>
          <h3 className="side-text mt-1">Styles</h3>
        </div> 
        <div className="mt-8 cursor-pointer">
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={help} />
          </div>
          <h3 className="side-text mt-1">Help</h3>
        </div>
        <div className="mt-8 cursor-pointer">
          <div className="side-icon px-3.5 py-4 rounded-full mt-5">
            <img src={setting} />
          </div>
          <h3 className="side-text mt-1">Settings</h3>
        </div> */}
      </div>
    </main>
  );
};

export default SideNavbar;
