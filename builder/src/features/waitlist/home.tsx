import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SiweMessage } from 'siwe';
import config from 'config';
import JoinDiscord from './join-discord';
import { connectWallet } from 'redux/web3/web3.actions';
import { getSigner } from 'redux/web3/web3.utils';
import { IRootState } from 'redux/root-state.interface';
import Logo from 'assets/icons/buidlfy.png';
import Avatar from 'assets/waitlist-icons/avatar.svg';
import Click from 'assets/waitlist-icons/click.svg';
import Paint from 'assets/waitlist-icons/paint.svg';
import Media from 'assets/waitlist-icons/media.svg';
import Text from 'assets/waitlist-icons/text.svg';
import Plus from 'assets/waitlist-icons/plus.svg';
import Computer from 'assets/waitlist-icons/computer.svg';
import Divider from 'assets/waitlist-icons/divider.svg';
import MoonDivider from 'assets/waitlist-icons/moon-divider.svg';
import 'styles/waitlist.css';

const Home = ({ setStep }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentAccount = useSelector((state: IRootState) => state.web3.currentAccount);

  const createSiweMessage = async (address: string, statement: string) => {
    const res = await fetch(`${config.server.SERVER}/nonce`, {
      credentials: 'include',
    });
    const domain = window.location.host;
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId: 1,
      nonce: await res.text(),
    });
    return message.prepareMessage();
  };

  const signInWithEthereum = async () => {
    const signer = getSigner();
    const address = await signer.getAddress();
    const message = await createSiweMessage(address, 'Sign in with Ethereum to the app.');
    const signature = await signer.signMessage(message);
    const walletName = 'Metamask';

    const res = await fetch(`${config.server.SERVER}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, signature, address, walletName }),
      credentials: 'include',
    });

    const response = JSON.parse(await res.text());
    const sessionRes = { ...response.session, data: response.data };
    const stringifySession = JSON.stringify(sessionRes);
    localStorage.setItem('session', stringifySession);

    if (response.data.whitelisted) {
      navigate('/dashboard');
    } else if (response.data.verified) {
      setStep(3);
    } else {
      setStep(2);
    }
  };

  return (
    <main className="bg-black text-white">
      <section className="hero">
        <div className="flex items-center">
          <img src={Logo} className="w-[2.4rem] ml-8 mr-4 my-6 rounded-full hover:shadow-lg" alt="logo" />
          <span className="text-lg font-bold">Buidlfy</span>
        </div>
        <section className="flex justify-center items-center mt-20 mb-24">
          <div className="text-center w-full">
            <h1 className="text-5xl font-bold">
              Join our <span className="gradient">journey</span> and
            </h1>
            <h1 className="text-5xl font-bold mb-8">
              <span className="gradient-transparent">get early access</span>
            </h1>
            <p className="text-lg opacity-70">Join our extensive waitlist today to get access to our early version. </p>
            <p className="text-lg opacity-70">Please connect with your wallet to continue.</p>
            <div className="mt-16">
              <img src={Avatar} alt="avatar" className="mx-auto" />
            </div>
            <img src={Divider} alt="avatar" className="my-8 mx-auto" />
            {currentAccount ? (
              <button className="connect-wallet text-lg px-8 py-2 rounded-lg" onClick={signInWithEthereum}>
                Sign In With Ethereum
              </button>
            ) : (
              <button className="connect-wallet text-lg px-8 py-2 rounded-lg" onClick={() => dispatch(connectWallet())}>
                Connect Wallet
              </button>
            )}
          </div>
        </section>
        <section className="flex justify-center items-center">
          <div className="text-center w-full">
            <aside style={{ backgroundImage: `url(${MoonDivider})` }} className="pt-28">
              <h2 className="text-4xl font-bold mb-8">
                Create <span className="gradient">Anything</span> with Buidlfy
              </h2>
              <p className="text-lg opacity-70">Buidlfy is a no-code decentralised website builder that allows users to create</p>
              <p className="text-lg opacity-70 mb-12">and interact with their Web3 presence.</p>
            </aside>
            <aside>
              <div className="mb-10">
                <span className="feature-badge px-10 py-3 opacity-70 rounded-lg">NFT</span>
                <span className="feature-badge-2 px-10 py-3 opacity-70 rounded-lg mx-4">Portfolio</span>
                <span className="feature-badge px-10 py-3 opacity-70 rounded-lg">Landing Page</span>
              </div>
              <div className="mb-10">
                <span className="feature-badge px-10 py-3 opacity-70 rounded-lg">NFT Mint Page</span>
                <span className="feature-badge px-10 py-3 opacity-70 rounded-lg mx-4">NFT gallery</span>
                <span className="feature-badge px-10 py-3 opacity-70 rounded-lg mr-4">Wall of love</span>
                <span className="feature-badge-2 px-10 py-3 opacity-70 rounded-lg">Decentralised App</span>
              </div>
              <div className="mb-24">
                <span className="feature-badge px-10 py-3 opacity-70 rounded-lg">Lenster</span>
                <span className="feature-badge-2 px-10 py-3 opacity-70 rounded-lg mx-4">Smart Contract Integration</span>
                <span className="feature-badge px-10 py-3 opacity-70 rounded-lg mr-4">dApps</span>
                <span className="feature-badge px-10 py-3 opacity-70 rounded-lg">iExec</span>
              </div>
            </aside>
          </div>
        </section>
      </section>
      <section className="flex justify-center items-center pt-20 mb-32 section-gradient">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            The most <span className="gradient">user friendly tools</span> to
          </h2>
          <h2 className="text-4xl font-bold mb-8">build your dApp</h2>
          <p className="text-lg opacity-70">Buidlfy is a no-code decentralised website builder that allows users to create</p>
          <p className="text-lg opacity-70 mb-12">and interact with their Web3 presence.</p>
          <div>
            <aside className="flex mb-6 w-full">
              <div className="text-left bg-white/[0.04] rounded-2xl p-10 w-1/3">
                <div className="mb-2">
                  <img src={Click} alt="click" />
                </div>
                <h4 className="text-lg font-medium mb-4">Power is in your hands</h4>
                <p className="text-sm font-light opacity-70">
                  Giving users the power to design quickly
                  <br />
                  and effectively. You can add any design
                  <br />
                  element just by clicking on it.
                </p>
              </div>
              <div className="text-left bg-white/[0.04] rounded-2xl p-10 mx-6 w-1/3">
                <div className="mb-2">
                  <img src={Paint} alt="paint" />
                </div>
                <h4 className="text-lg font-medium mb-4">Color Styles</h4>
                <p className="text-sm font-light opacity-70">
                  Fill in the colours of your imagination in
                  <br />
                  your designs with our simple tools.
                </p>
              </div>
              <div className="text-left bg-white/[0.04] rounded-2xl p-10 w-1/3">
                <div className="mb-2">
                  <img src={Media} alt="media" />
                </div>
                <h4 className="text-lg font-medium mb-4">Add Media & Files</h4>
                <p className="text-sm font-light opacity-70">
                  Add your files and media to make beautiful
                  <br />
                  web pages.
                </p>
              </div>
            </aside>
            <aside className="flex">
              <div className="text-left bg-white/[0.04] rounded-2xl p-10 w-1/3">
                <div className="mb-2">
                  <img src={Text} alt="text" />
                </div>
                <h4 className="text-lg font-medium mb-4">Beautiful Text Styles</h4>
                <p className="text-sm font-light opacity-70">
                  Choose an attractive typeface that will
                  <br />
                  leave a lasting impression on the hearts
                  <br />
                  of readers.
                </p>
              </div>
              <div className="text-left bg-white/[0.04] rounded-2xl p-10 mx-6 w-1/3">
                <div className="mb-2">
                  <img src={Plus} alt="plus" />
                </div>
                <h4 className="text-lg font-medium mb-4">Design Elements</h4>
                <p className="text-sm font-light opacity-70">
                  Create web pages quickly with your pre-
                  <br />
                  made UI design elements such as buttons,
                  <br />
                  inputs, forms, and so on...
                </p>
              </div>
              <div className="text-left bg-white/[0.04] rounded-2xl p-10 w-1/3">
                <div className="mb-2">
                  <img src={Computer} alt="computer" />
                </div>
                <h4 className="text-lg font-medium mb-4">Ready to use templates</h4>
                <p className="text-sm font-light opacity-70">
                  You can always choose the best template
                  <br />
                  for your needs from the dozens of
                  <br />
                  available styles.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <JoinDiscord />
    </main>
  );
};

export default Home;
