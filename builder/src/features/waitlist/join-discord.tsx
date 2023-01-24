import Discord from 'assets/waitlist-icons/discord.svg';
import SocialDiscord from 'assets/waitlist-icons/social-discord.svg';
import SocialTwitter from 'assets/waitlist-icons/social-twitter.svg';

const JoinDiscord = () => (
  <>
    <section className="flex justify-center items-center pt-20 mb-32 section-gradient">
      <div className="text-center">
        <div className="mb-6">
          <img src={Discord} alt="discord" className="mx-auto" />
        </div>
        <h2 className="text-4xl font-bold mb-8">Join our Discord community!</h2>
        <p className="text-lg opacity-70">Join our growing Discord community and send us questions or</p>
        <p className="text-lg opacity-70 mb-10">feedback! We love to hear from our users.</p>
        <a href="https://bit.ly/buidlfy-discord" target="_blank" rel="noreferrer" className="connect-wallet text-lg px-10 py-3 rounded-lg">
          Join Discord Server
        </a>
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
  </>
);

export default JoinDiscord;
