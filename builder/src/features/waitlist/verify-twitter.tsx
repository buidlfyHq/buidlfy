import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import config from 'config';

const VerifyTwitter = ({ setStep }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [twitterHandle, setTwitterHandle] = useState<string>('');

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const verify = async () => {
    const res = await fetch(`${config.server.SERVER}/verify_tweet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ twitterHandle }),
      credentials: 'include',
    });
    const response = JSON.parse(await res.text());
    if (response.data.verified) {
      const session: any = JSON.parse(localStorage.getItem('session'));
      const updatedSessionData = { ...session.data, verified: true };
      const updatedSession = { ...session, data: updatedSessionData };
      const stringifyUpdatedSession = JSON.stringify(updatedSession);
      localStorage.setItem('session', stringifyUpdatedSession);
      setStep(3);
    }
  };

  return (
    <main className="bg-black text-white h-screen">
      <section className="flex justify-center items-center pt-20 pb-32 hero h-full">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8">
            Share <span className="gradient">Buidlfy</span> on Twitter
          </h2>
          <p className="text-lg opacity-70">We have got many subscriptions. We can only whitelist first few serious sign ups,</p>
          <p className="text-lg opacity-70 mb-12">so please share it on twitter and we'll let you in.</p>
          <aside className="bg-black/20 p-10 flex rounded-xl">
            <div className="text-left">
              <h4 className="text-2xl font-semibold mb-4">Share the Beta launch on Twitter</h4>
              <p className="text-lg opacity-70">
                Please follow us and post a tweet to unlock the
                <br />
                upgraded Beta Access Pass!
              </p>
            </div>
            <div className="ml-10">
              <a
                className="connect-wallet mb-16 px-6 py-2 rounded-lg mr-4"
                target="_blank"
                rel="noreferrer"
                href={`https://twitter.com/intent/tweet?hashtags=${process.env.REACT_APP_TWITTER_HASHTAGS}&text=${process.env.REACT_APP_TWITTER_TEXT}&via=${process.env.REACT_APP_TWITTER_VIA}`}
                data-size="large"
              >
                Share & Follow
              </a>
              <button className="bg-white/20 mb-16 px-6 py-2 rounded-lg" onClick={openModal}>
                Verify Tweet
              </button>
            </div>
          </aside>
        </div>
      </section>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#252432] p-8 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
                    Verify Tweet
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-white/70 mb-4">Please enter your twitter handle</p>
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Twitter Handle"
                      className="py-2 pl-4 bg-black/40 w-full rounded-lg border border-[#3A36ED]/70 outline-none text-white"
                      value={twitterHandle}
                      onChange={e => setTwitterHandle(e.target.value)}
                    />
                  </div>
                  <div className="mt-4 text-right">
                    <button
                      className="inline-flex justify-center rounded-md border border-transparent bg-white/10 px-4 py-2 text-sm text-white font-medium mr-4"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button className="connect-wallet inline-flex rounded-lg px-6 py-2 text-sm font-medium text-white" onClick={verify}>
                      Verify
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
};

export default VerifyTwitter;
