import React, { FC, useState } from "react";
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
  const [textToggle, textToggleState] = useState<boolean>(true);

  const handleOnChange = () => {
    textToggleState(!textToggle);
    if (connectWallet === "on") {
      setOn(false);
    } else {
      setOn(true);
    }
  };

  return (
    <span className="flex items-center text-left px-3 mt-2 mb-0 text-xl text-gray-500 font-regular font-normal not-italic">
      Connect Wallet
      <div>
        <span
          onClick={handleOnChange}
          className="flex ml-3 items-center justify-center shadow text-[18px] w-8 h-10 my-2 font-regular"
        >
          {textToggle ? "On" : "Off"}
        </span>
      </div>
    </span>
  );
};
export default ConnectSwitchComponent;
