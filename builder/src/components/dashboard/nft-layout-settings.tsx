import { FC, Fragment } from "react";
import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { useDispatch, useSelector } from "react-redux";
import BgColorComponent from "components/settings/bg-color-component";
import { setSelectedElement, updateWorkspaceElement } from "redux/workspace/workspace.reducers";
import { IRootState } from "redux/root-state.interface";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";
import BackgroundSizeComponent from "components/settings/background-size-component";
import MarginComponent from "components/settings/margin-component";

// to be used in future for various nft fetching methods
// const criterias = [
//   { id: 1, name: 'Connect Wallet', unavailable: true },
//   { id: 2, name: 'Wallet Address', unavailable: false },
//   { id: 3, name: 'Collection Slug', unavailable: false }
// ]

const people = [
  { id: 1, name: 'Opensea', label: 'Collection Name : ', placeholder: 'astarprince', unavailable: true },
  { id: 2, name: 'Rarible', label: 'Collection Address :', placeholder: '0x3....da91', unavailable: false },
]

const NftLayoutSettings: FC = () => {
  const dispatch = useDispatch();
  const selectedElement: IWorkspaceElement = useSelector(
    (state: IRootState) => state.workspace.selectedElement
  );
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  const handleClick = (propertyName: string, propertyValue: string) => {
    // console.log('handleCLick')
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

      <BackgroundSizeComponent
        i={selectedElement.i}
        backgroundSize={selectedElement.style?.backgroundSize}
      />

      <MarginComponent
        i={selectedElement.i}
        margin={selectedElement.style.margin}
      />

      <section className="">
        <div className=" text-left px-3 mt-[0.5rem] mb-0">
          Fetch NFTs using:
        </div>
        
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
          <Listbox.Button className='relative px-3 py-1 mb-2 mx-2 w-[13.5rem] rounded-[6px] border'>{selectedPerson.name}</Listbox.Button>
          <Listbox.Options onClick={(e) => handleClick("source", e.target.outerText)} 
            className='absolute mt-3 bg-white border my-2 mx-2 w-[13.5rem] rounded-[6px] shadow-lg'
          >
            {people.map((person) => (
              <Listbox.Option key={person.id} value={person} as={Fragment}>
                {({ active }) => (
                  <li
                    className={`${
                      active ? 'bg-blue-500 text-white py-1 cursor-pointer px-3 rounded-md' : 'bg-white text-black py-1 cursor-pointer px-3 rounded-md'
                    }`}
                  >
                    {person.name}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
   
        {/* code will be used later */}
        {/* <div className="flex py-4">
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
        </div> */}

        <div className="flex flex-col items-start mb-2 mx-2 w-[13.5rem] text-black rounded-[6px]">
          <div>{selectedPerson.label}</div>
          <input
            className={`changeText pl-[1rem] py-[0.4rem] rounded-[6px]`}
            type="text"
            name="collection-slug"
            placeholder={selectedPerson.placeholder}
            value={selectedElement?.slug}
            onChange={(e) => handleClick("slug", e.target.value)}
          />
        </div>

        <div className="flex flex-col items-start my-2 mx-2 w-[13.5rem] text-black rounded-[6px]">
          <div>Limit :</div>
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
          <div>Cards per row :</div>
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
