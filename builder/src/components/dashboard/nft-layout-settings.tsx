import { FC, Fragment, useEffect } from 'react';
import { useState } from 'react';
import ShortUniqueId from 'short-unique-id';
import { Listbox } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import BgColorComponent from 'components/settings/bg-color-component';
import { updateWorkspaceElement, updateWorkspaceElementsArray } from 'redux/workspace/workspace.reducers';
import { IRootState } from 'redux/root-state.interface';
import { IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import BackgroundSizeComponent from 'components/settings/background-size-component';
import { FiChevronDown } from 'react-icons/fi';
import { INftCardThemes, nftCardThemes, IApiSource, apiSources, cardsPerRowValues } from 'config/nft-layout-values';
import ColorComponent from 'components/settings/color-component';
// import { IApiSource } from '../../config/nft-layout-values';

// to be used in future for various nft fetching methods
// const criterias = [
//   { id: 1, name: 'Connect Wallet', unavailable: true },
//   { id: 2, name: 'Wallet Address', unavailable: false },
//   { id: 3, name: 'Collection Slug', unavailable: false }
// ]

const NftLayoutSettings: FC = () => {
  const dispatch = useDispatch();
  const uid = new ShortUniqueId();
  const selectedElement: IWorkspaceElement = useSelector((state: IRootState) => state.workspace.selectedElement);
  const workspaceElements = useSelector((state: IRootState) => state.workspace.workspaceElements);
  const [selectedSource, setSelectedSource] = useState<IApiSource>(selectedElement.source ? selectedElement.source : apiSources[0]);
  const [selectedCardVal, setSelectedCardVal] = useState<number>(selectedElement.cardsPerRow ? selectedElement.cardsPerRow : cardsPerRowValues[0]);
  const [cardTheme, setCardTheme] = useState<INftCardThemes>(selectedElement.theme ? selectedElement.theme : nftCardThemes[0]);

  const addPropsToLayoutOnClick = (propertyName: string, propertyValue: any) => {
    dispatch(
      updateWorkspaceElement({
        settingItemId: selectedElement.i,
        propertyName,
        propertyValue,
      }),
    );
  };

  const handleArrangementOfCards = (cardNumber: number) => {
    let cpr = cardNumber;
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
      <section className="py-2">
        <div className="text-left text-[#100F11] text-[14px] font-[600] px-3 my-1">Fetch NFTs</div>

        <Listbox value={selectedSource} onChange={setSelectedSource}>
          <Listbox.Button className="relative flex justify-between items-center px-3 py-2 mb-3 mx-2 w-[13.5rem] bg-[#EFF0F9] rounded-[8px] border">
            <span className="text-[13px] text-[#100F11] opacity-80 ">{selectedSource?.name}</span>
            <FiChevronDown className="text-[#5F5F83]" />
          </Listbox.Button>
          <Listbox.Options className="absolute mt-0 bg-white border my-2 mx-2 w-[13.5rem] rounded-[8px] shadow-lg">
            {apiSources.map(apiSource => (
              <Listbox.Option key={apiSource.id} value={apiSource} as={Fragment}>
                {({ active }) => (
                  <li
                    onClick={() => addPropsToLayoutOnClick('source', apiSource)}
                    className={`${active ? 'bg-blue-500 text-white' : 'bg-white text-black '} py-2 text-[13px] cursor-pointer px-3 rounded-md`}
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

        <div className="flex flex-col items-start mb-2 mx-2 w-[13.5rem] text-black rounded-[8px]">
          <div className="text-[#100F11] text-[14px] font-[600] mb-1">{selectedSource.label}</div>
          <input
            className={`changeText px-3 py-2 rounded-[8px] text-[#667085] text-[13px]`}
            type="text"
            name="collection-slug"
            placeholder={selectedSource.placeholder}
            value={selectedElement?.slug}
            onChange={e => addPropsToLayoutOnClick('slug', e.target.value)}
          />
        </div>

        <div className="flex flex-col mx-2 my-6 text-black rounded-[8px]">
          <div className="text-[#100F11] text-[14px] font-[600] mb-1 pb-2">Layout</div>
          {/* 2 divs of card and limit */}
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between w-[13.5rem]">
              <div className="text-[#666665] text-[13px] font-[500]">Column</div>
              <Listbox value={selectedCardVal} onChange={setSelectedCardVal}>
                <Listbox.Button className="relative flex items-center justify-between bg-[#EFF0F9] px-3 py-2 mb-2 w-[8rem] rounded-[8px] border">
                  <span className="text-[#100F11] opacity-80 text-[12px]">{selectedCardVal}</span>
                  <FiChevronDown />
                </Listbox.Button>
                <Listbox.Options
                  // onChange={handleArrangementOfCards}
                  className="absolute right-0 mt-10 z-[10] bg-white border my-2 mx-4 w-[8rem] rounded-[8px] shadow-lg"
                >
                  {cardsPerRowValues.map((cardNumber, index) => (
                    <Listbox.Option key={index} value={cardNumber} as={Fragment}>
                      {({ active }) => (
                        <li
                          onClick={() => {
                            handleArrangementOfCards(cardNumber);
                            addPropsToLayoutOnClick('cardsPerRow', cardNumber);
                          }}
                          className={`${active ? 'bg-blue-500 text-white' : 'bg-white text-black'} text-[13px] py-1 cursor-pointer px-3 rounded-md`}
                        >
                          {cardNumber}
                        </li>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>

            <div className="flex items-baseline justify-between w-[13.5rem]">
              <div className="text-[#666665] text-[13px] font-[500]">Max Limit</div>
              <input
                className={`px-3 py-2 rounded-[8px] border w-[8rem] outline-none text-[#100F11] opacity-80 text-[12px] bg-[#EFF0F9]`}
                type="number"
                name="limit"
                placeholder="ex: 2"
                value={selectedElement?.limit}
                onChange={e => addPropsToLayoutOnClick('limit', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start mb-2 mx-2 w-[13.5rem] text-black rounded-[8px]">
          <div className="text-[#100F11] text-[14px] font-[600] mb-3">Theme Setting</div>

          <Listbox value={cardTheme} onChange={setCardTheme}>
            <Listbox.Button className="relative flex justify-between items-center nft-theme-input px-3 py-2 mb-3 w-[13.5rem] rounded-[8px]">
              <span className="text-[13px] text-[#100F11] opacity-80">{cardTheme?.name}</span>
              <FiChevronDown />
            </Listbox.Button>
            <Listbox.Options className="absolute right-2 mt-20 bg-white my-2 mx-2 w-[13.5rem] rounded-[8px] shadow-lg border">
              {nftCardThemes.map(theme => (
                <Listbox.Option key={theme.name} value={theme} as={Fragment}>
                  {({ active }) => (
                    <li
                      onClick={() => addPropsToLayoutOnClick('theme', theme)}
                      className={`${
                        active ? 'bg-blue-500 text-white' : 'bg-white text-black '
                      } flex items-center w-[13.5rem] text-[13px] py-2 cursor-pointer px-3 rounded-md`}
                    >
                      <img src={theme.icon} height={18} width={18} alt="swalt" />
                      <span className="ml-2">{theme.name}</span>
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        <BackgroundSizeComponent i={selectedElement.i} backgroundSize={selectedElement.style?.backgroundSize} />

        <BgColorComponent i={selectedElement.i} cardTheme={cardTheme} />
        <ColorComponent i={selectedElement.i} cardTheme={cardTheme} />
      </section>
    </>
  );
};

export default NftLayoutSettings;
