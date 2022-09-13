import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWorkspaceElementsArray } from "redux/workspace/workspace.reducers";
import IWorkspace from "interfaces/workspace";

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
  selectedItem: IWorkspace;
}

const AbiMethods: FC<IAbiMethods> = ({ setShowComponent, selectedItem }) => {
  const dispatch = useDispatch();
  const workspaceElements: IWorkspace[] = useSelector((state: any) => state.workspace.workspaceElements);
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
      const elementsIndex = workspaceElements.findIndex(
        (item) => item.i === selectedItem.i
      );

      if (elementsIndex === -1) {
        // search id in children
        const updatedItems = workspaceElements.map((item) => {
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

  return (
    <>
      {contract.abi ? (
        <>
          <span className="setting-text  ml-[0.25rem] px-1 my-1 text-xl not-italic font-normal text-left text-gray-500 font-regular">
            Select Method
          </span>
          <div className="px-2">
            <div className="mb-3">
              <select
                id="select"
                className="form-select contract-input appearance-none mt-2 block w-full px-3 py-1.5 focus:outline-none focuse:border-none"
                aria-label="Default select example"
                onChange={(e) => onSelect(e)}
              >
                <option
                  value=""
                  selected={!selectedItem.contract.methodName}
                  hidden
                >
                  Select a Method
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
        </>
      ) : null}
    </>
  );
};

export default AbiMethods;
