import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from 'config';
import Navbar from './navbar';
import JoinDiscord from './join-discord';
import Confetti from 'assets/waitlist-icons/confetti.svg';

const Whitelist = ({ setStep }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // check if user is authorised
    fetch(`${config.server.SERVER}/user_status`, {
      credentials: 'include',
    })
      .then(res => res.text())
      .then(res => {
        if (JSON.parse(res).whitelisted) {
          const session: any = JSON.parse(localStorage.getItem('session'));
          const updatedSessionData = { ...session.data, whitelisted: true };
          const updatedSession = { ...session, data: updatedSessionData };
          const stringifyUpdatedSession = JSON.stringify(updatedSession);
          localStorage.setItem('session', stringifyUpdatedSession);
          navigate('/dashboard');
        } else if (JSON.parse(res).verified) {
          const session: any = JSON.parse(localStorage.getItem('session'));
          const updatedSessionData = { ...session.data, whitelisted: false, verified: true };
          const updatedSession = { ...session, data: updatedSessionData };
          const stringifyUpdatedSession = JSON.stringify(updatedSession);
          localStorage.setItem('session', stringifyUpdatedSession);
          setStep(3);
        } else {
          setStep(1);
        }
      })
      .catch(() => setStep(1));
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
                <h4 className="text-2xl font-semibold mb-4">Join our newsletter</h4>
                <p className="text-lg opacity-70">
                  Stay up to date on the latest updates, get special member discounts
                  <br />
                  and lots of inspiration. Do subscribe.
                </p>
              </div>
              <div className="ml-10">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/20 mb-16 px-4 py-2 rounded-lg border border-[#655B7C] outline-none mr-4"
                />
                <button className="connect-wallet mb-16 px-6 py-2 rounded-lg">Subscribe</button>
              </div>
            </aside>
          </div>
        </section>
      </section>
      <JoinDiscord />
    </main>
  );
};

export default Whitelist;
