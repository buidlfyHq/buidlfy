import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from 'features/waitlist/home';
import VerifyTwitter from 'features/waitlist/verify-twitter';
import Whitelist from 'features/waitlist/whitelist';
import { signout } from 'utils/signout';
import 'styles/waitlist.css';

const Waitlist = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    const session: any = JSON.parse(localStorage.getItem('session'));
    if (session) {
      const currentData = new Date();
      const expiryDate = new Date(session.cookie?.expires);
      // signout if sesssion is expired
      if (currentData >= expiryDate) {
        signout();
        setStep(1);
      }

      // navigate based on user status
      if (session.data?.whitelisted) {
        navigate('/dashboard');
      } else if (session.data?.verified) {
        setStep(3);
      } else {
        setStep(2);
      }
    } else {
      setStep(1);
    }
  }, []);

  const renderPage = () => {
    switch (step) {
      case 1:
        return <Home setStep={setStep} />;
      case 2:
        return <VerifyTwitter setStep={setStep} />;
      case 3:
        return <Whitelist setStep={setStep} />;
      default:
        return <Home setStep={setStep} />;
    }
  };

  return <main>{renderPage()}</main>;
};

export default Waitlist;

{
  /* <main className="w-screen h-screen m-10">
  <button className="block bg-blue-200 p-2 border border-black rounded mb-4" onClick={connectWallet}>
    Connect Wallet
  </button>
  <button className="block bg-green-200 p-2 border border-black rounded mb-4" onClick={signInWithEthereum}>
    SIWE
  </button>
  <button className="block bg-red-200 p-2 border border-black rounded mb-4" onClick={signout}>
    Signout
  </button>
  <div>
    <input
      className="border mb-2 px-2 py-1"
      type="text"
      placeholder="twitter handle"
      value={twitterHandle}
      onChange={e => setTwitterHandle(e.target.value)}
    />
    <button className="block bg-cyan-200 p-2 border border-black rounded" onClick={verify}>
      Verify User
    </button>
  </div>
</main>; */
}
