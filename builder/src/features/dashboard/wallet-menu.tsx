import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import makeBlockie from 'ethereum-blockies-base64';
import { truncateString } from 'utils/truncate-string';
import { signoutAsync } from 'redux/user/user.thunk-actions';
import { fetchWalletDetailsAsync } from 'redux/web3/web3.thunk-actions';
import { IRootState } from 'redux/root-state.interface';
import { BiChevronRight } from 'react-icons/bi';
import { FaSignOutAlt } from 'react-icons/fa';
import HelpIcon from 'assets/icons/help-nav.png';
import MyTemplateIcon from 'assets/icons/template-nav.png';

// const HelpMenuItems = [
//   { name: "Learn Buidlfy" },
//   { name: "Start App Tour" },
//   { name: "Join Discord" },
// ];

const walletMenuItemsDashboard = [
  {
    name: 'My Templates',
    icon: MyTemplateIcon,
    classParent: 'border border-l-0 border-t-0 border-r-0 border-b-1 border-[#F5F5F5]',
    target: '/my-templates',
    isChildren: false,
    children: [],
    link: null,
  },
  {
    name: 'Join Discord',
    icon: HelpIcon,
    classParent: '',
    target: null,
    isChildren: false,
    children: [],
    link: 'https://bit.ly/buidlfy-discord',
  },
];

const walletMenuItemsMyTemplates = [
  {
    name: 'Dashboard',
    icon: MyTemplateIcon,
    classParent: 'border border-l-0 border-t-0 border-r-0 border-b-1 border-[#F5F5F5]',
    target: '/',
    isChildren: false,
    children: [],
    link: null,
  },
  {
    name: 'Join Discord',
    icon: HelpIcon,
    classParent: '',
    target: null,
    isChildren: false,
    children: [],
    link: 'https://bit.ly/buidlfy-discord',
  },
];

interface IWalletMenu {
  isMyTemplatePage: boolean;
}

const WalletMenu: FC<IWalletMenu> = ({ isMyTemplatePage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentAccount = useSelector((state: IRootState) => state.web3.currentAccount);

  return (
    <>
      {currentAccount ? (
        <Menu as="div" className="relative z-10">
          <Menu.Button className={`flex items-center justify-center my-3 ml-3 active:opacity-70`}>
            <img className="w-8 bg-black rounded-full hover:shadow-lg" src={makeBlockie(currentAccount)} alt="Blockie" />
          </Menu.Button>
          <Menu.Items className="absolute top-0 right-0 flex flex-col w-60 mt-16 shadow-menu mr-5 rounded-[14px] origin-top-right bg-white">
            <div className="border border-l-0 border-t-0 border-r-0 border-b-1 border-[#F5F5F5]">
              <div className="px-5 py-3 font-[16px]">
                <div className="flex items-center gap-4 py-2">
                  <img className="w-8 rounded-full" src={makeBlockie(currentAccount)} alt="Blockie" />
                  <div className="text-[#A5A5A5] text-[13px]">{truncateString(currentAccount)}</div>
                </div>
              </div>
            </div>
            {(isMyTemplatePage ? walletMenuItemsMyTemplates : walletMenuItemsDashboard).map((menuItem, i) => {
              const { name, target, classParent, icon, isChildren, children, link } = menuItem;
              const MenuItem = (
                <>
                  <div className="flex items-center gap-4">
                    <img src={icon} alt="icon" width={28} height={28} />
                    <span>{name}</span>
                  </div>
                  <BiChevronRight />
                </>
              );
              return (
                <Menu.Item key={i} as="div" className={classParent}>
                  {({ active }) => (
                    <>
                      {!isChildren ? (
                        link ? (
                          <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:bg-slate-100 hover:rounded-[8px] hover:cursor-pointer font-[500] text-[#14142B] opacity-70 px-5 py-3 font-[16px] flex items-center justify-between w-full"
                          >
                            {MenuItem}
                          </a>
                        ) : (
                          <Link
                            to={target}
                            className={`${
                              active && 'bg-slate-100 rounded-[8px] cursor-pointer'
                            } font-[500] text-[#14142B] opacity-70 px-5 py-3 font-[16px] flex items-center justify-between`}
                          >
                            {MenuItem}
                          </Link>
                        )
                      ) : (
                        <Menu as="div" className="relative">
                          <Menu.Button
                            className={`${
                              active && 'bg-slate-100 rounded-[8px] cursor-pointer'
                            } font-[500] text-[#14142B] opacity-70 px-5 py-3 w-full font-[16px] flex items-center justify-between`}
                          >
                            <div className="flex items-center gap-4">
                              <img src={icon} alt="icon" width={28} height={28} />
                              <span>{name}</span>
                            </div>
                            <BiChevronRight />
                          </Menu.Button>
                          <Menu.Items className="flex flex-col p-5 gap-3 absolute left-[-10rem] top-0 bg-white w-36 shadow-menu rounded-[16px]">
                            {children.map((child, i) => {
                              const { name } = child;
                              return (
                                <Menu.Item key={i} as="div" className="text-[13px] cursor-pointer text-[#6E7191] hover:text-[#14142B]">
                                  {name}
                                </Menu.Item>
                              );
                            })}
                          </Menu.Items>
                        </Menu>
                      )}
                    </>
                  )}
                </Menu.Item>
              );
            })}
            <Menu.Button
              className="font-[500] text-[#14142B] opacity-70 px-5 py-3 w-full font-[16px] flex items-center justify-between border border-t-1 border-[#F5F5F5] hover:bg-slate-100 hover:rounded-[8px] hover:cursor-pointer"
              onClick={() => dispatch(signoutAsync())}
            >
              <div className="flex items-center gap-4">
                <span className="bg-blue-100/30 rounded-full p-2">
                  <FaSignOutAlt className="text-violet-500/60 w-[12px] h-[12px]" />
                </span>
                <span>Signout</span>
              </div>
              <BiChevronRight />
            </Menu.Button>
          </Menu.Items>
        </Menu>
      ) : (
        <button
          className="py-2 px-5 my-2 ml-3 text-[14px] text-white rounded-[10px] cursor-pointer connect-wallet-button whitespace-nowrap add-btn"
          onClick={() => dispatch(fetchWalletDetailsAsync(''))}
        >
          Connect Wallet
        </button>
      )}
    </>
  );
};

export default WalletMenu;
