import { FC } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './navbar';
import BuidlfyShare from 'assets/waitlist-icons/buidlfy-share.svg';
import TwitterVector from 'assets/waitlist-icons/twitter-vector.svg';
import { toggleModal, toggleModalType } from 'redux/modal/modal.reducers';

const VerifyTwitter: FC = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleModal(true));
    dispatch(toggleModalType('verify-modal'));
  };

  return (
    <main className="bg-black text-white h-screen">
      <section className="hero h-full">
        <Navbar />
        <section className="flex justify-center items-center pt-20 pb-32">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8">
              Share <span className="gradient">Buidlfy</span> on Twitter
            </h2>
            <p className="text-lg opacity-70">We have got many subscriptions. We can only whitelist first few serious sign ups,</p>
            <p className="text-lg opacity-70 mb-12">so please share it on twitter and we'll let you in.</p>
            <aside className="bg-black/20 p-10 flex rounded-xl">
              <img src={BuidlfyShare} alt="twitter" className="w-28 mr-6" />
              <div className="text-left">
                <h4 className="text-2xl font-semibold mb-4">Share the Beta launch on Twitter</h4>
                <p className="text-lg opacity-70">
                  Please follow us and post a tweet to unlock the
                  <br />
                  upgraded Beta Access Pass!
                </p>
              </div>
              <div className="ml-10 flex items-center">
                <a
                  className="connect-wallet mb-16 px-6 py-2 rounded-lg mr-4 flex items-center"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://twitter.com/intent/tweet?text=${process.env.REACT_APP_TWITTER_TEXT}`}
                  data-size="large"
                >
                  Share & Follow <img src={TwitterVector} alt="twitter" className="w-6 ml-3" />
                </a>
                <button className="bg-white/20 mb-16 px-6 py-2 rounded-lg" onClick={handleClick}>
                  Verify Tweet
                </button>
              </div>
            </aside>
          </div>
        </section>
      </section>
    </main>
  );
};

export default VerifyTwitter;
