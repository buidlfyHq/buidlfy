import React, { FC, useEffect, useState } from "react";
import "styles/Dashboard.css";
import "styles/Components.css";

interface IConnectSwitchComponent {
  setOn: (connectWallet: string | boolean) => void;
  connectWallet: string;
}

const ConnectSwitchComponent: FC<IConnectSwitchComponent> = ({
  setOn,
  connectWallet,
}) => {
  const [textToggle, textToggleState] = useState(
    connectWallet === "on" ? true : false
  );
  console.log(connectWallet, "connect");
  const handleOnChange = () => {
    textToggleState(!textToggle);
    if (connectWallet === "on") {
      setOn(false);
    } else {
      setOn(true);
    }
  };
  useEffect(() => {
    textToggleState(connectWallet === "on" ? true : false);
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
            checked={textToggle ? true : false}
          />
        </div>
      </div>
    </span>
  );
};
export default ConnectSwitchComponent;
