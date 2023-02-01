import { FC, Fragment } from 'react';
import { useState } from 'react';
import ShortUniqueId from 'short-unique-id';
import { Listbox } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import BgColorComponent from 'components/settings/bg-color-component';
import { setSelectedElement, updateWorkspaceElement, updateWorkspaceElementsArray } from 'redux/workspace/workspace.reducers';
import { IRootState } from 'redux/root-state.interface';
import { IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import BackgroundSizeComponent from 'components/settings/background-size-component';

// to be used in future for various nft fetching methods
// const criterias = [
//   { id: 1, name: 'Connect Wallet', unavailable: true },
//   { id: 2, name: 'Wallet Address', unavailable: false },
//   { id: 3, name: 'Collection Slug', unavailable: false }
// ]

const apiSources = [
  // { id: 1, name: 'Opensea', label: 'Collection Name : ', placeholder: 'astarprince', unavailable: true },
  { id: 2, name: 'Rarible', label: 'Collection Address :', placeholder: '0x3....da91', unavailable: false },
];

const cardsPerRowValues = Array.from(Array(4).keys(), n => n + 1);

const NftLayoutSettings: FC = () => {
  const dispatch = useDispatch();
  const uid = new ShortUniqueId();
  const selectedElement: IWorkspaceElement = useSelector((state: IRootState) => state.workspace.selectedElement);
  const workspaceElements = useSelector((state: IRootState) => state.workspace.workspaceElements);
  const [selectedSource, setSelectedSource] = useState(apiSources[0]);
  const [selectedCardVal, setSelectedCardVal] = useState(cardsPerRowValues[0]);

  const addPropsToLayoutOnClick = (propertyName: string, propertyValue: string) => {
    dispatch(
      updateWorkspaceElement({
        settingItemId: selectedElement.i,
        propertyName,
        propertyValue,
      }),
    );
  };

  // add a prop of cardsPerRow in NFT Layout
  const handleNumberOfCardsInLayout = e => {
    addPropsToLayoutOnClick('cardsPerRow', e.target.outerText);
  };

  const handleArrangementOfCards = () => {
    let cpr = selectedElement?.cardsPerRow;
    let singleCard = selectedElement.children[0];
    let newNFTLayoutChildreArr = [];
    const layoutW = selectedElement.w;
    const layoutX = selectedElement.x;

    // checking width of column for each card
    const colW = +(layoutW / +cpr).toFixed(1);
    let X = layoutX;

    for (let i = 0; i < cpr; i++) {
      let modifiedX = X;
      X = X + colW <= layoutW && X + colW < 6 ? X + colW : layoutX;
      newNFTLayoutChildreArr.push({
        ...singleCard,
        i: uid(),
        x: modifiedX,
        y: 0,
        w: colW,
      });
    }

    let newLayout = {
      ...selectedElement,
      children: newNFTLayoutChildreArr,
    };

    let filterItems = workspaceElements.filter(element => element.i !== selectedElement.i);

    // update position of other components, maybe required later
    // let newItemsArr = filterItems.map((item: IWorkspaceElement) => {
    //   const { y } = item;
    //   if (y >= newNFTLayoutChildreArr[0].y) {
    //     const diff = y - nftPosition;
    //     return {
    //       ...item,
    //       y: y + (newNFTLayoutChildreArr.length / +cpr) * newNFTLayoutChildreArr[0].h - newNFTLayoutChildreArr[0].h,
    //     };
    //   } else {
    //     return {
    //       ...item,
    //       y: y,
    //     };
    //   }
    // });

    dispatch(updateWorkspaceElementsArray([...filterItems, newLayout]));
  };

  return (
    <>
      <h3 className="ml-[0.5rem] mt-[1.5rem]">{selectedElement ? <span className="setting-text">{selectedElement.name}</span> : null}</h3>

      <BgColorComponent i={selectedElement.i} elementBackgroundColor={selectedElement.style.backgroundColor} />

      <BackgroundSizeComponent i={selectedElement.i} backgroundSize={selectedElement.style?.backgroundSize} />

      <section className="">
        <div className="text-left px-3 mt-[0.5rem] mb-0">Fetch NFTs using:</div>

        <Listbox value={selectedSource} onChange={setSelectedSource}>
          <Listbox.Button className="relative px-3 py-1 mb-2 mx-2 w-[13.5rem] rounded-[6px] border">{selectedSource.name}</Listbox.Button>
          <Listbox.Options
            onClick={e => addPropsToLayoutOnClick('source', e.target.outerText)}
            className="absolute mt-3 bg-white border my-2 mx-2 w-[13.5rem] rounded-[6px] shadow-lg"
          >
            {apiSources.map(apiSource => (
              <Listbox.Option key={apiSource.id} value={apiSource} as={Fragment}>
                {({ active }) => (
                  <li
                    className={`${
                      active
                        ? 'bg-blue-500 text-white py-1 cursor-pointer px-3 rounded-md'
                        : 'bg-white text-black py-1 cursor-pointer px-3 rounded-md'
                    }`}
                  >
                    {apiSource.name}
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
              onClick={() => (selectedElement?.wallet === 'wallet' ? handleClick('wallet', '') : handleClick('wallet', 'wallet'))}
              className="form-check form-switch"
            >
              <input
                className="w-12 h-5 -ml-10 align-top rounded-full shadow-sm cursor-pointer form-check-input bg-blue"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={selectedElement?.wallet === 'wallet' ? true : false}
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
            value={selectedElement?.wallet !== 'wallet' ? selectedElement?.wallet : ''}
            onChange={e => handleClick('wallet', e.target.value)}
          />
        </div> */}

        <div className="flex flex-col items-start mb-2 mx-2 w-[13.5rem] text-black rounded-[6px]">
          <div>{selectedSource.label}</div>
          <input
            className={`changeText pl-[1rem] py-[0.4rem] rounded-[6px]`}
            type="text"
            name="collection-slug"
            placeholder={selectedSource.placeholder}
            value={selectedElement?.slug}
            onChange={e => addPropsToLayoutOnClick('slug', e.target.value)}
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
            onChange={e => addPropsToLayoutOnClick('limit', e.target.value)}
          />
        </div>

        <div className="text-left px-3 mt-[0.5rem] mb-0">Select cards per row :</div>
        <Listbox value={selectedCardVal} onChange={setSelectedCardVal}>
          <Listbox.Button className="relative px-3 py-1 mb-2 mx-2 w-[13.5rem] rounded-[6px] border">{selectedCardVal}</Listbox.Button>
          <Listbox.Options
            onClick={handleNumberOfCardsInLayout}
            className="absolute mt-3 bg-white border my-2 mx-2 w-[13.5rem] rounded-[6px] shadow-lg"
          >
            {cardsPerRowValues.map((cardNumber, index) => (
              <Listbox.Option key={index} value={cardNumber} as={Fragment}>
                {({ active }) => (
                  <li
                    className={`${
                      active
                        ? 'bg-blue-500 text-white py-1 cursor-pointer px-3 rounded-md'
                        : 'bg-white text-black py-1 cursor-pointer px-3 rounded-md'
                    }`}
                  >
                    {cardNumber}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>

        <div onClick={handleArrangementOfCards} className="text-center cursor-pointer px-6 py-2 text-white bg-purple-500 rounded-lg mx-2 w-[13.5rem]">
          See Arrangement
        </div>
      </section>
    </>
  );
};

export default NftLayoutSettings;
