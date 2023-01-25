import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './navbar';
import { isWhitelistedAsync, subscribeNewsletterAsync } from 'redux/user/user.thunk-actions';
import Confetti from 'assets/waitlist-icons/confetti.svg';
import Discord from 'assets/waitlist-icons/discord.svg';
import DiscordVector from 'assets/waitlist-icons/discord-vector.svg';
import SocialDiscord from 'assets/waitlist-icons/social-discord.svg';
import SocialTwitter from 'assets/waitlist-icons/social-twitter.svg';

const Whitelist: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    dispatch(isWhitelistedAsync());
  }, []); // eslint-disable-line

  return (
    <main className="bg-black text-white">
      <section className="hero">
        <Navbar />
        <section className="flex justify-center items-center pt-20 pb-24">
          <div className="text-center">
            <div className="mb-8">
              <img src={Confetti} alt="confetti" className="mx-auto" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Thank you for showing interest!</h1>
            <h4 className="text-2xl text-[#C09AFF] font-semibold mb-8">We’ll contact you once you’re whitelisted for the access.</h4>
            <p className="text-lg opacity-70">Thanks for joining us in our journey. Please join our Discord Community & subscribe to</p>
            <p className="text-lg opacity-70 mb-20">our news letter to get latest update about us.</p>
            <aside className="bg-white/10 p-10 flex rounded-xl">
              <div className="text-left">
                <h4 className="text-2xl font-semibold mb-4 flex items-center">
                  <img src={Discord} alt="discord" className="w-12 mr-3" />
                  Join Our Discord Channel
                </h4>
                <p className="text-lg opacity-70">
                  Join our growing Discord community and send us questions or
                  <br />
                  feedback! We love to hear from our users.
                </p>
              </div>
              <div className="ml-28">
                <a
                  href="https://bit.ly/buidlfy-discord"
                  target="_blank"
                  rel="noreferrer"
                  className="connect-wallet px-6 py-2 rounded-lg flex items-center"
                >
                  Join Discord <img src={DiscordVector} alt="discord" className="w-6 ml-3" />
                </a>
              </div>
            </aside>
          </div>
        </section>
      </section>
      <section className="flex justify-center items-center pt-20 mb-32 section-gradient">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8">Subscribe to our newsletter</h2>
          <p className="text-lg opacity-70">Stay up to date on the latest updates, get special member discounts</p>
          <p className="text-lg opacity-70 mb-10">and lots of inspiration. Do subscribe.</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-white/20 px-4 py-2 w-64 rounded-lg border border-[#655B7C] outline-none mr-4"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button className="connect-wallet text-lg px-6 py-2 rounded-lg" onClick={() => dispatch(subscribeNewsletterAsync(email))}>
            Subscribe
          </button>
        </div>
      </section>
      <footer className="flex justify-between mx-20 pt-8 pb-12 border-t border-white/20">
        <h6 className="text-[#98A2B3]">&copy; 2023 Buidlfy. All rights reserved.</h6>
        <div className="flex">
          <a href="https://twitter.com/BuidlfyHq" target="_blank" rel="noreferrer">
            <img src={SocialTwitter} alt="twitter" className="mr-6" />
          </a>
          <a href="https://bit.ly/buidlfy-discord" target="_blank" rel="noreferrer">
            <img src={SocialDiscord} alt="discord" />
          </a>
        </div>
      </footer>
    </main>
  );
};

export default Whitelist;
