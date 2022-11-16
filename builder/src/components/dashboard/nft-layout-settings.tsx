import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import BgColorComponent from "components/settings/bg-color-component";
import { updateWorkspaceElement } from "redux/workspace/workspace.reducers";
import { IRootState } from "redux/root-state.interface";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";

const NftLayoutSettings: FC = () => {
  const dispatch = useDispatch();
  const selectedElement: IWorkspaceElement = useSelector(
    (state: IRootState) => state.workspace.selectedElement
  );

  const handleClick = (propertyName: string, propertyValue: string) => {
    dispatch(
      updateWorkspaceElement({
        settingItemId: selectedElement.i,
        propertyName,
        propertyValue,
      })
    );
  };

  return (
    <>
      <h3 className="ml-[0.5rem] mt-[1.5rem]">
        {selectedElement ? (
          <span className="setting-text">{selectedElement.name}</span>
        ) : null}
      </h3>

      <BgColorComponent
        i={selectedElement.i}
        elementBackgroundColor={selectedElement.style.backgroundColor}
      />
      <section className="">
        <span className="margin-text grow text-left px-3 mt-[0.5rem] mb-0">
          Fetch NFTs
        </span>
        <div className="flex py-4">
          <span className="margin-text grow text-left px-3 mt-[0.5rem] mb-0">
            Connect Wallet
          </span>
          <div className="flex ml-2 justify-center mt-1">
            <div
              onClick={() =>
                selectedElement?.wallet === "wallet"
                  ? handleClick("wallet", "")
                  : handleClick("wallet", "wallet")
              }
              className="form-check form-switch"
            >
              <input
                className="form-check-input w-12 -ml-10 bg-blue rounded-full h-5 align-top cursor-pointer shadow-sm"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={selectedElement?.wallet === "wallet" ? true : false}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="flex items-center mb-2 mx-2 w-[13.5rem] text-black rounded-[6px]">
          <input
            className={`changeText pl-[1rem] py-[0.4rem] rounded-[6px]`}
            type="text"
            name="wallet-address"
            placeholder="Wallet Address"
            value={
              selectedElement?.wallet !== "wallet"
                ? selectedElement?.wallet
                : ""
            }
            onChange={(e) => handleClick("wallet", e.target.value)}
          />
        </div>

        <div className="flex items-center mb-2 mx-2 w-[13.5rem] text-black rounded-[6px]">
          <input
            className={`changeText pl-[1rem] py-[0.4rem] rounded-[6px]`}
            type="text"
            name="collection-slug"
            placeholder="Collection Slug"
            value={selectedElement?.slug}
            onChange={(e) => handleClick("slug", e.target.value)}
          />
        </div>
      </section>
    </>
  );
};

export default NftLayoutSettings;
