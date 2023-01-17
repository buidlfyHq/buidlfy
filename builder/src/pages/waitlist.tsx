import { FC } from 'react';
import { useSelector } from 'react-redux';
import Home from 'features/waitlist/home';
import VerifyTwitter from 'features/waitlist/verify-twitter';
import Whitelist from 'features/waitlist/whitelist';
import { IRootState } from 'redux/root-state.interface';
import 'styles/waitlist.css';

const Waitlist: FC = () => {
  const step = useSelector((state: IRootState) => state.user.step);

  const renderPage = () => {
    switch (step) {
      case 1:
        return <Home />;
      case 2:
        return <VerifyTwitter />;
      case 3:
        return <Whitelist />;
      default:
        return <Home />;
    }
  };

  return <main>{renderPage()}</main>;
};

export default Waitlist;
