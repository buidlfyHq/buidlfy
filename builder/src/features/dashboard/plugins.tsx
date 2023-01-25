import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShortUniqueId from 'short-unique-id';
import ReactTooltip from 'react-tooltip';
import { MdOutlineClose } from 'react-icons/md';
import { components } from 'config/component';
import { containerCheck } from 'utils/container-check';
import { updateWorkspaceElementsArray } from 'redux/workspace/workspace.reducers';
import { IRootState } from 'redux/root-state.interface';
import { IWorkspaceElement, ResizeHandles } from 'redux/workspace/workspace.interfaces';
import NftLayoutPlugin from 'assets/sidebarIconSvgs/nft-layout-plugin.png';
import LensterWidgetPlugin from 'assets/sidebarIconSvgs/lenster-widget-plugin.png';
import 'styles/components.css';

interface IPlugins {
  hideNavbar: boolean;
  setHideNavbar: (hideNavbar: boolean) => void;
}

const pluginElementsArr = [
  { name: 'NFT Layout', tooltip: 'Click here to add the NFT Layout', clickFn: 'NFT Layout', image: NftLayoutPlugin },
  {
    name: 'Wall of love - Lens Protocol',
    tooltip: 'Click here to add the Lenster Card',
    clickFn: 'Lenster Card',
    image: LensterWidgetPlugin,
  },
];

const Plugins: FC<IPlugins> = ({ hideNavbar, setHideNavbar }) => {
  const uid = new ShortUniqueId();
  const dispatch = useDispatch();
  const workspaceElements = useSelector((state: IRootState) => state.workspace.workspaceElements);
  const selectedElement = useSelector((state: IRootState) => state.workspace.selectedElement);

  const onClickFunction = (name: string) => {
    let c = components?.find(component => component.name === name);
    const availableHandles: ResizeHandles = ['se'];
    const containerHandles: ResizeHandles = ['e'];
    let y = checkY(workspaceElements);
    let newC = {
      ...c,
      i: uid(),
      x: 0,
      y: y,
      w: 6,
      minW: 1,
      minH: 1,
      resizeHandles: containerCheck(c) ? containerHandles : availableHandles,
    };
    if (c.name === 'Vertical Container' || c.name === 'NFT Card') {
      newC.w = 2;
    }
    if (c.name === 'Horizontal Container' || c.name === 'Vertical Container') {
      let newChildren = c.children.map(child => ({
        ...child,
        i: uid(),
      }));
      newC.children = newChildren;
    }
    if (c.name === 'NFT Layout') {
      let newChildren = c.children.map(child => ({
        ...child,
        i: uid(),
        resizeHandles: [],
      }));
      newC.children = newChildren;
    }
    dispatch(updateWorkspaceElementsArray([...workspaceElements, newC]));
  };

  const checkY = (items: IWorkspaceElement[]) => {
    if (items.length === 0) return 0;
    else {
      let arr = items.map(item => {
        return containerCheck(item) ? Math.max(...item.children.map((obj: IWorkspaceElement) => obj.y), item.y) : item.y;
      });
      return Math.max(...arr) + 1;
    }
  };

  const pluginList = (
    <>
      <ReactTooltip
        id="elements"
        className="tool"
        place="right"
        type="dark"
        effect="solid"
        backgroundColor="#262338"
        arrowColor="#262338"
        scrollHide={true}
        delayShow={200}
      />
      {/* Fix: Add all style to common tailwind  */}
      {pluginElementsArr.map(plugin => {
        const { name, tooltip, clickFn, image } = plugin;
        return (
          <section key={name}>
            <div className="px-4 element-div-text">{name}</div>
            <div className="plugin-div">
              <div className="px-2 py-2.5">
                <div data-tip={tooltip} data-for="elements">
                  <div className="flex justify-center it4ems-center">
                    <div className="cursor-pointer plugin-container" onClick={() => onClickFunction(clickFn)}>
                      <img src={image} alt="plugin_image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );

  return (
    <>
      {/* Plugin Components */}
      <div
        className={`fixed pr-3 pl-[1.2rem] py-[1.5rem] mb-[2rem] left-[5rem] flex w-[320px] h-[60px] ${
          hideNavbar ? 'element-hide-div animate__animated animate__slideOutLeft' : 'element-heading-div animate__animated animate__slideInLeft'
        }`}
      >
        <h3 className="element-heading mt-[2.5px]">Add Plugins</h3>
        <button className="close-btn" onClick={() => setHideNavbar(true)}>
          <MdOutlineClose className="text-[16px]" />
        </button>
      </div>

      <div className="mt-[4.5rem]">{pluginList}</div>
    </>
  );
};

export default Plugins;
