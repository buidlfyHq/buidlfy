import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import "styles/components.css";
import "styles/dashboard.css";

interface IConnectSwitchComponent {
  i: string;
  connectWallet: string;
}

const ConnectSwitchComponent: FC<IConnectSwitchComponent> = ({
  i,
  connectWallet,
}) => {
  const dispatch = useDispatch();

  const [connectToggle, setConnectToggle] = useState(
    connectWallet === "on" ? true : false
  );

  const handleOnChange = () => {
    setConnectToggle(!connectToggle);
    dispatch(
      updateWorkspaceElementStyle({
        settingItemId: i,
        propertyName: "connectWallet",
        propertyValue: connectWallet === "on" ? "off" : "on",
      })
    );
  };

  useEffect(() => {
    setConnectToggle(connectWallet === "on" ? true : false);
  }, [connectWallet]);

  return (
    <span className="flex mt-5">
      <span className="margin-text grow text-left px-3 mt-2 mb-0 text-l text-gray-500 font-regular font-normal not-italic">
        Connect Wallet
      </span>
      <div className="flex ml-2 justify-center mt-1">
        <div onClick={handleOnChange} className="form-check form-switch">
          <input
            className="form-check-input w-12 -ml-10 bg-blue rounded-full h-5 align-top cursor-pointer shadow-sm"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            checked={connectToggle ? true : false}
            readOnly
          />
        </div>
      </div>
    </span>
  );
};
export default ConnectSwitchComponent;
