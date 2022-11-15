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
      <h3 className="mb-3 ml-8">
        Component -
        {selectedElement ? (
          <span className="font-bold">{selectedElement.name}</span>
        ) : null}
      </h3>
      <BgColorComponent
        i={selectedElement.i}
        elementBackgroundColor={selectedElement.style.backgroundColor}
      />
      <section className="pl-4 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
        Fetch NFTs Using
        <button
          className={`block my-4 px-6 py-1 shadow text-[18px] text-black border ${
            selectedElement?.wallet === "wallet" ? "border-black" : ""
          }`}
          onClick={() =>
            selectedElement?.wallet === "wallet"
              ? handleClick("wallet", "")
              : handleClick("wallet", "wallet")
          }
        >
          Connect Wallet
        </button>
        OR
        <div className="my-2 text-black">
          <label htmlFor="wallet-address" className="text-sm">
            Wallet Address
          </label>
          <input
            className="changeText"
            type="text"
            name="wallet-address"
            placeholder="address"
            value={
              selectedElement?.wallet !== "wallet"
                ? selectedElement?.wallet
                : ""
            }
            onChange={(e) => handleClick("wallet", e.target.value)}
          />
        </div>
        OR
        <div className="my-2 text-black">
          <label htmlFor="collection-slug" className="text-sm">
            Collection Slug
          </label>
          <input
            className="changeText"
            type="text"
            name="collection-slug"
            placeholder="slug"
            value={selectedElement?.slug}
            onChange={(e) => handleClick("slug", e.target.value)}
          />
        </div>
      </section>
    </>
  );
};

export default NftLayoutSettings;
