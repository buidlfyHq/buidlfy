import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLeft } from "react-icons/ai";
import { updateItemsArray } from "reducers/itemsReducer";
import IItems from "interfaces/items";
import "styles/dashboard.css";

interface IAbiMethods {
  setShowComponent: (showComponent: {
    id: string;
    value: {
      name: string;
      inputs: object[];
      outputs: object[];
      stateMutability: string;
    };
  }) => void;
  selectedItem: IItems;
  methodOpen: boolean;
  setMethodOpen: (methodOpen: boolean) => void;
}

const AbiMethods: FC<IAbiMethods> = ({
  setShowComponent,
  selectedItem,
  methodOpen,
  setMethodOpen,
}) => {
  const dispatch = useDispatch();
  const items: IItems[] = useSelector((state: any) => state.items);
  const contract: { abi: string; address: string } = useSelector(
    (state: any) => state.contract
  );

  const [abiJson, setAbiJson] = useState<
    {
      inputs: { internalType: string; name: string; type: string }[];
      name: string;
      outputs: { internalType: string; name: string; type: string }[];
      stateMutability: string;
      type: string;
    }[]
  >([]);
  useEffect(() => {
    if (contract.abi) {
      const parsedAbi = JSON.parse(contract.abi);
      try {
        setAbiJson(parsedAbi);
        let selectedItemIndex = parsedAbi.findIndex(
          (method: { name: string }) =>
            method.name === selectedItem.contract.methodName
        );

        if (selectedItemIndex !== -1) {
          setShowComponent({
            id: selectedItemIndex,
            value: parsedAbi[selectedItemIndex],
          });
        } else {
          setShowComponent(null);
        }
      } catch (error) {
        console.log("error");
      }
    }
  }, [contract.abi, selectedItem]); // eslint-disable-line

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setShowComponent({
        id: e.target.value,
        value: abiJson[e.target.value],
      });

      // initialize contract
      let updatedItem = {
        ...selectedItem,
        contract: {
          methodName: abiJson[e.target.value].name,
          stateMutability: abiJson[e.target.value].stateMutability,
          inputs: [],
          outputs: [],
        },
      };

      // search id in items
      const elementsIndex = items.findIndex(
        (item) => item.i === selectedItem.i
      );

      if (elementsIndex === -1) {
        // search id in children
        const updatedItems = items.map((item) => {
          const childIndex = item.children?.findIndex(
            (child) => child.i === selectedItem.i
          );
          let newArray = [...item.children];
          newArray[childIndex] = updatedItem;
          return {
            ...item,
            children: newArray,
          };
        });
        dispatch(updateItemsArray(updatedItems));
      } else {
        let newArray = [...items];
        newArray[elementsIndex] = updatedItem;
        dispatch(updateItemsArray(newArray));
      }
    } else {
      setShowComponent(null);
    }
  };

  const handleBack = () => setMethodOpen(true);

  return (
    <>
      {contract.abi ? (
        <div>
          <span className="contract-text flex" onClick={() => handleBack()}>
            <AiOutlineLeft className="text-[10px] mr-2" />{" "}
            <span className="mt-[-5px]">Back</span>
          </span>
          <div className="mt-[2rem]">
            <div className="setting-text ml-[0.25rem] px-1 my-1 text-xl not-italic font-normal text-left text-gray-500 font-regular">
              Select Method
            </div>
            <div className="px-2">
              <div className="mb-3">
                <select
                  id="select"
                  className="form-select contract-input mt-2 block w-full px-3 py-1.5 focus:outline-none focuse:border-none"
                  aria-label="Default select example"
                  onChange={(e) => onSelect(e)}
                >
                  <option
                    value=""
                    selected={!selectedItem.contract.methodName}
                    hidden
                  >
                    Select a Method{" "}
                  </option>
                  {contract.abi &&
                    abiJson.map((method: { name: string }, i: number) => (
                      <>
                        <option
                          value={i}
                          key={i}
                          selected={
                            selectedItem.contract.methodName === method.name
                          }
                        >
                          {method.name}
                        </option>
                      </>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AbiMethods;
