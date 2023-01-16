import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import config from 'config';
import WalletMenu from 'features/dashboard/wallet-menu';
import RenderTemplateList from 'components/utils/render-template-list';
import { signout } from 'utils/signout';
import logo from 'assets/icons/buidlfy.png';
import { ReactComponent as ColorFeather } from 'assets/svg-as-icons/feather-color.svg';
import { ReactComponent as AddIcon } from 'assets/svg-as-icons/addTemp.svg';

export enum TabType {
  ALL = 'all',
  REVIEW = 'review',
  LISTED = 'listed',
}

const MyTemplates: FC = () => {
  const navigate = useNavigate();
  const currentAccount = useSelector((state: any) => state.web3.currentAccount);
  const [tab, setTab] = useState<string>('all');

  useEffect(() => {
    const session: any = JSON.parse(localStorage.getItem('session'));
    if (session) {
      // signout if sesssion is expired
      if (new Date(session.cookie?.expires) < new Date()) {
        signout();
        navigate('/');
      }
      // check if user is authorised
      fetch(`${config.server.SERVER}/user_status`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.nonce}`,
        },
        credentials: 'include',
      })
        .then(res => res.text())
        .then(res => {
          if (!JSON.parse(res).whitelisted) {
            signout();
            navigate('/');
          } else {
            if (!currentAccount) {
              return navigate('/dashboard');
            }
          }
        })
        .catch(() => {
          signout();
          navigate('/');
        });
    } else {
      signout();
      navigate('/');
    }
  }, []); // eslint-disable-line

  const tooltip = (
    <ReactTooltip
      id="add"
      className="tool"
      place="right"
      type="dark"
      effect="solid"
      backgroundColor="#262338"
      arrowColor="#262338"
      scrollHide={true}
      delayShow={200}
    />
  );

  return (
    <main className="min-h-screen overflow-y-auto">
      {/* nav */}
      <section className="flex justify-between px-36 items-center h-[66px] border-bottom-divider sticky-top">
        <div>
          <Link to="/dashboard">
            <img src={logo} className="w-[2.4rem] rounded-full" alt="logo" />
          </Link>
        </div>
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center px-6 py-2 bordered-button">
            <ColorFeather className="mr-3" />
            <div className="gradient-text">Builder</div>
          </Link>
          <div className="flex items-center justify-center my-2 ml-3">
            <WalletMenu isMyTemplatePage={true} />
          </div>
        </div>
      </section>

      {/* mid sec */}
      <section className="py-10 px-36">
        <div className="flex items-center justify-start font-[600] text-[20px] text-[#14142B]">
          My Templates
          <Link to="/dashboard">
            <AddIcon data-tip="Create new template" data-for="add" className="text-[24px] ml-2 mt-[4px]" />
            {tooltip}
          </Link>
        </div>
      </section>

      <section>
        <section className="py-0 px-36">
          <div className="flex justify-start text-black font-[600] text-[15px] gap-8">
            <button
              className={`py-3 cursor-pointer px-7 outline-none ${tab === TabType.ALL ? 'border-b-4 border-purple-500 gradient-text' : null}`}
              onClick={() => setTab(TabType.ALL)}
            >
              All Templates
            </button>
            <button
              className={`py-3 cursor-pointer px-7 outline-none ${tab === TabType.REVIEW ? 'border-b-4 border-purple-500 gradient-text' : null}`}
              onClick={() => setTab(TabType.REVIEW)}
            >
              In Review
            </button>
            <button
              className={`py-3 cursor-pointer px-7 outline-none ${tab === TabType.LISTED ? 'border-b-4 border-purple-500 gradient-text' : null}`}
              onClick={() => setTab(TabType.LISTED)}
            >
              Listed Templates
            </button>
          </div>
        </section>
        <section className="w-full bg-lower-template border-bottom-divider">
          {/* <div className="flex items-center justify-center gap-5 pt-12 pb-4 px-36">
            <div>
              <SearchForm />
            </div>
            <div className="flex items-center whitespace-nowrap py-4 px-5 text-[#14142A] text-[15px] bg-white rounded-[10px]">
              Sort by: Time
              <BiChevronDown className="ml-2 text-[18px]" />
            </div>
            <div className="flex items-center whitespace-nowrap py-4 px-5 text-[#14142A] text-[15px] bg-white rounded-[10px]">
              All categories
              <BiChevronDown className="ml-2 text-[18px]" />
            </div>
          </div> */}
          <div className="grid gap-10 grid-cols-myTemplateCustom px-40 pb-12 pt-7 h-full">
            <RenderTemplateList tab={tab} />
          </div>
        </section>
      </section>
    </main>
  );
};

export default MyTemplates;
