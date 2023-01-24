import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from 'features/waitlist/home';
import VerifyTwitter from 'features/waitlist/verify-twitter';
import Whitelist from 'features/waitlist/whitelist';
import { signout } from 'utils/signout';
import { fetchWalletDetailsAsync } from 'redux/web3/web3.thunk-actions';
import 'styles/waitlist.css';

const Waitlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

      dispatch(fetchWalletDetailsAsync(session.data?.address));

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
