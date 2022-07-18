import React, { FC, useEffect, useState } from "react";
import IItems from "interfaces/items";

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
  const [abiJson, setAbiJson] = useState<any>([]); // work in progress

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
        setItems(updatedItems);
      } else {
        let newArray = [...items];
        newArray[elementsIndex] = updatedItem;
        setItems(newArray);
      }
    } else {
      setShowComponent(null);
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
                id="select"
                className="form-select appearance-none mt-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  onSelect(e)
                }
              >
                <option value="" selected>
                  Select a Method
                </option>
                {contractConfig.abi &&
                  abiJson.map((method: { name: string }, i: number) => (
                    <option value={i} key={i}>
                      {method.name}
                    </option>
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
