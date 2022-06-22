import React, { FC } from "react";
import { BiTargetLock } from "react-icons/bi";
import ShortUniqueId from "short-unique-id";

const AbiMethods: FC<{
  contractConfig;
  showComponent: any;
  setShowComponent: any;
  selectedItem;
  selectedElements;
  setSelectedElements;
  items;
  setItems;
}> = ({
  contractConfig,
  showComponent,
  setShowComponent,
  selectedItem,
  selectedElements,
  setSelectedElements,
  items,
  setItems,
}) => {
  // console.log(selectedItem, "items");
  // const uid = new ShortUniqueId();
  // const option = uid();
  // console.log(abi, "abi");

  const abiJson = contractConfig.abi ? JSON.parse(contractConfig.abi) : null;

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
                onChange={(e: any) => {
                  // console.log(abiJson[e.target.value].inputs, "e");
                  // NOTE - try replacing with uuid
                  setShowComponent({
                    id: e.target.value,
                    value: abiJson[e.target.value],
                  });
                  const generateArray = (valueArray, valueName) => {
                    let requiredArray = [];
                    valueArray.map((value, index) => {
                      let id = valueName + index + e.target.value;
                      requiredArray.push(id);
                    });
                    return requiredArray;
                  };
                  let updatedItem = {
                    ...selectedItem,
                    contract: {
                      name: abiJson[e.target.value].name,
                      stateMutability: abiJson[e.target.value].stateMutability,
                      inputs: generateArray(
                        abiJson[e.target.value].inputs,
                        "input"
                      ),
                      outputs: generateArray(
                        abiJson[e.target.value].outputs,
                        "output"
                      ),
                    },
                  };
                  const elementsIndex = items.findIndex(
                    (item) => item.i === selectedItem.i
                  );
                  let newArray = [...items];
                  newArray[elementsIndex] = updatedItem;
                  setItems(newArray);
                  // FIX - show selected method linked to the button
                  // FIX - Disable method from select when it has already been linked to other button
                }}
                className="form-select appearance-none mt-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
              >
                {contractConfig.abi &&
                  abiJson.map((method, i) => (
                    <>
                      <option value={i} key={i} selected>
                        {method.name}
                      </option>
                      {/* 
                  <section key={i}>
              <div>
                <button
                  className="mt-1 px-2 text-cyan-900"
                  type="submit"
                  onClick={() => setShowComponent([showComponent, i])}
                >
                  {">"} {method.name}
                </button>
              </div>
            </section> */}
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
