import React, { FC, useState } from "react";
import "styles/components.css";
import "styles/dashboard.css";

interface IConnectSwitchComponent {
  setOn: (connectWallet: string | boolean) => void;
  connectWallet: string;
}

const ConnectSwitchComponent: FC<IConnectSwitchComponent> = ({
  setOn,
  connectWallet,
}) => {
  const [connectToggle, setConnectToggle] = useState(
    connectWallet === "on" ? true : false
  );
  const handleOnChange = () => {
    setConnectToggle(!connectToggle);
    if (connectWallet === "on") {
      setOn(false);
    } else {
      setOn(true);
    }
  };
  useEffect(() => {
    setConnectToggle(connectWallet === "on" ? true : false);
  }, [connectWallet]);
  return (
    <span className="flex items-center">
      <span className="text-left px-3 mt-2 mb-0 text-l text-gray-500 font-regular font-normal not-italic">
        Connect Wallet
      </span>
      <div className="flex justify-center ml-3 mt-1">
        <div onClick={handleOnChange} className="form-check form-switch w-14">
          <input
            className="form-check-input w-12 -ml-10 bg-blue rounded-full float-left h-5 align-top cursor-pointer shadow-sm"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            checked={connectToggle ? true : false}
          />
        </div>
      </div>
    </span>
  );
};
export default ConnectSwitchComponent;
