import React, { FC, useEffect, useState } from "react";
import IItems from "interfaces/items";
import Dashboard from "pages/dashboard";
import Home from "pages/home";

interface IAbiMethods {
  contractConfig: { abi: string; address: string };
  setShowComponent: (showComponent: { id: string; value: IItems }) => void;
  selectedItem: IItems;
  items: IItems[];
  setItems: (items: IItems[]) => void;
}

const AbiMethods: FC<IAbiMethods> = ({
  contractConfig,
  setShowComponent,
  selectedItem,
  items,
  setItems,
}) => {
  // const abiJson = contractConfig.abi ? JSON.parse(contractConfig.abi) : null;
  const [abiJson, setAbiJson] = useState<any>([]);
  useEffect(() => {
    if (contractConfig.abi) {
      try {
        setAbiJson(JSON.parse(contractConfig.abi));
      } catch (error) {
        console.log("error");
      }
    }
  }, [contractConfig.abi]);
  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // NOTE - try replacing with uuid
    // if (!abiJson) {
    //   return;
    // }
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
    const elementsIndex = items.findIndex((item) => item.i === selectedItem.i);

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
      setItems(updatedItems);
    } else {
      let newArray = [...items];
      newArray[elementsIndex] = updatedItem;
      setItems(newArray);
    }
  };

  return (
    <>
      {contractConfig.abi ? (
        <>
          <span className="px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
            Select Method
          </span>
          <div className="flex justify-center">
            <div className="mb-3 xl:w-54">
              <select
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  onSelect(e)
                }
                className="form-select appearance-none mt-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
              >
                {contractConfig.abi &&
                  abiJson.map((method: { name: string }, i: number) => (
                    <>
                      <option value={i} key={i} selected>
                        {method.name}
                      </option>
                    </>
                  ))}
              </select>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default AbiMethods;
