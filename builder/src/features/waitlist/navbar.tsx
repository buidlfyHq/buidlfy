import { FC } from 'react';
import { useSelector } from 'react-redux';
import makeBlockie from 'ethereum-blockies-base64';
import { truncateString } from 'utils/truncate-string';
import { IRootState } from 'redux/root-state.interface';
import Logo from 'assets/icons/buidlfy.png';

const Navbar: FC = () => {
  const currentAccount = useSelector((state: IRootState) => state.web3.currentAccount);

  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center">
        <img src={Logo} className="w-10 ml-8 mr-4 my-6 rounded-full hover:shadow-lg" alt="logo" />
        <span className="text-xl font-bold">Buidlfy</span>
      </div>
      {currentAccount && (
        <div className="flex items-center bg-black/20 mr-8 px-4 py-3 rounded-lg">
          <img className="w-6 bg-black rounded-full hover:shadow-lg mr-2" src={makeBlockie(currentAccount)} alt="Blockie" />
          <span>{truncateString(currentAccount)}</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
