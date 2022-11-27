import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import BgColorComponent from "components/settings/bg-color-component";
import { updateWorkspaceElement } from "redux/workspace/workspace.reducers";
import { IRootState } from "redux/root-state.interface";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";
import SizeComponent from "components/settings/image-size-component";
import BackgroundSizeComponent from "components/settings/background-size-component";

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

  console.log(selectedElement)

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
      <BackgroundSizeComponent
        i={selectedElement.i}
        backgroundSize={selectedElement.style?.backgroundSize}
      />
      <section className="">
        <span className="margin-text grow text-left px-3 mt-[0.5rem] mb-0">
          Fetch NFTs
        </span>
        <div className="flex py-4">
          <span className="margin-text grow text-left px-3 mt-[0.5rem] mb-0">
            Connect Wallet
          </span>
          <div className="flex justify-center mt-1 ml-2">
            <div
              onClick={() =>
                selectedElement?.wallet === "wallet"
                  ? handleClick("wallet", "")
                  : handleClick("wallet", "wallet")
              }
              className="form-check form-switch"
            >
              <input
                className="w-12 h-5 -ml-10 align-top rounded-full shadow-sm cursor-pointer form-check-input bg-blue"
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

        {/* <button
          onClick={handleFetch}
         className="px-4 py-2 w-full my-2 text-white bg-black/70 rounded-[4px]"
        >
          Fetch
        </button> */}

        <div className="flex flex-col items-start my-2 mx-2 w-[13.5rem] text-black rounded-[6px]">
          <div>Limit</div>
          <input
            className={`changeText pl-[1rem] py-[0.4rem] rounded-[6px]`}
            type="number"
            name="limit"
            placeholder="ex: 2"
            value={selectedElement?.limit}
            onChange={(e) => handleClick("limit", e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start my-2 mx-2 w-[13.5rem] text-black rounded-[6px]">
          <div>Cards per row</div>
          <input
            className={`changeText pl-[1rem] py-[0.4rem] rounded-[6px]`}
            type="nummber"
            name="cards-per-row"
            placeholder="ex: 3"
            value={selectedElement?.cardsPerRow}
            onChange={(e) => handleClick("cardsPerRow", e.target.value)}
          />
        </div>
      </section>
    </>
  );
};

export default NftLayoutSettings;
