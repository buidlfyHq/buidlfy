import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLeft } from 'react-icons/ai';
import WarningText from 'components/utils/setting-warning';
import { updateWorkspaceElementsArray } from 'redux/workspace/workspace.reducers';
import { updateContractAbi, updateContractAddress, updateContractNetwork } from 'redux/contract/contract.reducers';
import { IRootState } from 'redux/root-state.interface';
import { IShowComponent, IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import { IAbi } from 'redux/contract/contract.interfaces';
import { Listbox } from '@headlessui/react';

interface IAbiMethods {
  setShowComponent: (showComponent: IShowComponent) => void;
  showComponent?: IShowComponent;
  selectedElement: IWorkspaceElement;
  setIsOpen: (isOpen: boolean) => void;
  setGoBack: (goBack: boolean) => void;
}

const AbiMethods: FC<IAbiMethods> = ({ setShowComponent, selectedElement, setIsOpen, setGoBack, showComponent }) => {
  const dispatch = useDispatch();
  const workspaceElements: IWorkspaceElement[] = useSelector((state: IRootState) => state.workspace.workspaceElements);
  const contractDetails = useSelector((state: IRootState) => state.contract.contractDetails);
  const [abiJson, setAbiJson] = useState<IAbi[]>([]);

  useEffect(() => {
    if (contractDetails.abi) {
      const parsedAbi = JSON.parse(contractDetails.abi);
      try {
        setAbiJson(parsedAbi);
        let selectedElementIndex = parsedAbi.findIndex((method: { name: string }) => method.name === selectedElement.contract.methodName);

        if (selectedElementIndex !== -1) {
          setShowComponent({
            id: selectedElementIndex,
            value: parsedAbi[selectedElementIndex],
          });
        } else {
          setShowComponent(null);
        }
      } catch (error) {
        console.error('error');
      }
    }
  }, [contractDetails.abi, selectedElement]); // eslint-disable-line

  const onSelect = updatedValue => {
    if (updatedValue) {
      setShowComponent({
        id: updatedValue,
        value: abiJson[updatedValue],
      });

      // initialize contract
      let updatedItem = {
        ...selectedElement,
        contract: {
          methodName: abiJson[updatedValue].name,
          stateMutability: abiJson[updatedValue].stateMutability,
          inputs: [],
          outputs: [],
        },
      };

      // search id in items
      const elementsIndex = workspaceElements.findIndex(item => item.i === selectedElement.i);

      if (elementsIndex === -1) {
        // search id in children
        const updatedItems = workspaceElements.map(item => {
          const childIndex = item.children?.findIndex(child => child.i === selectedElement.i);
          let newArray = [...item.children];
          newArray[childIndex] = updatedItem;
          return {
            ...item,
            children: newArray,
          };
        });
        dispatch(updateWorkspaceElementsArray(updatedItems));
      } else {
        let newArray = [...workspaceElements];
        newArray[elementsIndex] = updatedItem;
        dispatch(updateWorkspaceElementsArray(newArray));
      }
    } else {
      setShowComponent(null);
    }
  };

  const handleBack = () => {
    setIsOpen(false);
    setGoBack(true);
  };

  return (
    <>
      {contractDetails.abi ? (
        <div>
          <span
            className="text-[#504F82] text-xs font-light flex items-center mt-[2.5rem] cursor-pointer hover:text-[#100F11]"
            onClick={() => handleBack()}
          >
            <AiOutlineLeft className="text-[10px] mr-2" />
            <span className="">Back</span>
          </span>
          <div className="mt-[1rem]">
            <div className="setting-text ml-[0.25rem] px-1 my-1 text-xl not-italic font-normal text-left text-gray-500 font-regular">
              Select Method
            </div>
            <div className="mt-2 mb-4">
              <WarningText text="Methods with inputs & outputs of types other than string, bool, address, int & uint are not supported." />
            </div>
            <div className="px-2">
              <div className="mb-3">
                <Listbox
                  // id="select"
                  // className="form-select cursor-pointer contract-input mt-2 block w-[13.5rem] px-3 py-1.5 focus:outline-none focuse:border-none"
                  // aria-label="Default select example"
                  onChange={onSelect}
                  value={showComponent?.id}
                >
                  <Listbox.Button
                    value=""
                    className="changeText text-left pl-[0.6rem] py-[0.4rem] input-text"
                    // selected={!selectedElement.contract.methodName}
                    // hidden
                  >
                    {showComponent?.value.name ? showComponent?.value.name : <>Select A Method</>}
                  </Listbox.Button>
                  <Listbox.Options className="listbox-options h-[10rem] absolute mt-[1rem] z-100 bg-white w-[13.5rem] rounded-[8px] border border-solid border-[#F2F4F7] overflow-scroll">
                    {contractDetails.abi &&
                      abiJson.map((method: { name: string }, i: number) => (
                        <>
                          <Listbox.Option
                            value={i}
                            key={i}
                            className="py-[0.5rem] pr-2 pl-[1rem] cursor-pointer hover:bg-[#FAFAFF]"
                            // selected={selectedElement.contract.methodName === method.name}
                          >
                            {method.name}
                          </Listbox.Option>
                        </>
                      ))}
                  </Listbox.Options>
                </Listbox>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AbiMethods;
