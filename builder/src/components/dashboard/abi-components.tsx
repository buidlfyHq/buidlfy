import React, { FC, useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import IItems from "interfaces/items";

interface IAbiComponents {
  showComponent: {
    id: string;
    value: {
      name: string;
      inputs: object[];
      outputs: object[];
      stateMutability: string;
    };
  };
  selector: {
    methodName: string;
    type: string;
    name: string;
    buttonId: string;
  };
  setSelector: (selector: {
    methodName: string;
    type: string;
    name: string;
    buttonId: string;
  }) => void;
  elementConfig: object;
  selectedItem: IItems;
  items: IItems[];
  setItems: (items: IItems[]) => void;
}

const AbiComponents: FC<IAbiComponents> = ({
  showComponent,
  selector,
  setSelector,
  elementConfig,
  selectedItem,
  items,
  setItems,
}) => {
  const [currentElement, setCurrentElement] = useState<{
    name: string;
    type: string;
  }>({
    name: "",
    type: "",
  });
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setShow(false), 1000);
  }, [show]);

  const handleSave = () => {
    setShow(true);
    // filter last selected element
    const filteredObject = elementConfig[currentElement.name]?.filter(
      (key: { buttonId: string }) => key.buttonId === selectedItem.i
    )[0];

    let updatedContract = {};

    let duplicate = selectedItem.contract.inputs?.find(
      (e: { id: string }) => e.id === filteredObject.id
    );

    if (!duplicate) {
      if (currentElement.type === "input") {
        updatedContract = {
          ...selectedItem.contract,
          inputs: [
            ...selectedItem.contract.inputs,
            { id: filteredObject.id, send: false },
          ],
        };
      } else if (currentElement.type === "send") {
        updatedContract = {
          ...selectedItem.contract,
          inputs: [
            ...selectedItem.contract.inputs,
            { id: filteredObject.id, send: true },
          ],
        };
      } else if (currentElement.type === "output") {
        updatedContract = {
          ...selectedItem.contract,
          outputs: [
            ...selectedItem.contract.outputs,
            { id: filteredObject.id },
          ],
        };
      }
    } else {
      updatedContract = { ...selectedItem.contract };
    }

    let updatedItem = {
      ...selectedItem,
      contract: updatedContract,
    };

    // search id in items
    const elementsIndex = items.findIndex((item) => item.i === selectedItem.i);

    if (elementsIndex === -1) {
      // search id in children
      const updatedItems = items.map((item) => {
        const childIndex = item.children?.findIndex(
          (child: IItems) => child.i === selectedItem.i
        );
        let newArray = [...item?.children];
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

  const handleInputSelector = (selectedId: string) => {
    if (selector === null) {
      setSelector({
        methodName: showComponent.value.name,
        type: "input",
        name: selectedId,
        buttonId: selectedItem.i,
      });
      setCurrentElement({ name: selectedId, type: "input" });
    } else {
      setSelector(null);
    }
  };

  const inputObjects = (i: number) => {
    const selectedId = "input" + i + showComponent.id;
    const objects = Object.keys(elementConfig);
    const filterObjects = objects.filter((key) => key === selectedId);
    return {
      selectedId,
      objects,
      filterObjects,
    };
  };

  const handleStateSelector = (selectedItem: IItems) => {
    if (selector === null) {
      setSelector({
        methodName: showComponent.value.name,
        type: "input",
        name: showComponent.value.name,
        buttonId: selectedItem.i,
      });
      setCurrentElement({
        name: showComponent.value.name,
        type: "send",
      });
    } else {
      setSelector(null);
    }
  };

  const stateObject = (key: string) => {
    let filteredObject = elementConfig[key]?.filter(
      (key: { buttonId: string }) => key.buttonId === selectedItem.i
    );
    return filteredObject;
  };

  const handleOutputSelector = (selectedId: string) => {
    if (selector === null) {
      setSelector({
        methodName: showComponent.value.name,
        type: "output",
        name: selectedId,
        buttonId: selectedItem.i,
      });
      setCurrentElement({ name: selectedId, type: "output" });
    } else {
      setSelector(null);
    }
  };

  const outputObjects = (i: number) => {
    const selectedId = "output" + i + showComponent.id;
    const objects = Object.keys(elementConfig);
    const filterObjects = objects.filter((key) => key === selectedId);
    return {
      selectedId,
      objects,
      filterObjects,
    };
  };

  const spinner = () => (
    <div role="status" className="inline-block">
      <svg
        className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  );

  const renderDefault = (valueName: string) => (
    <>
      {selector && selector?.name === valueName ? (
        <span className="flex">
          <span className="flex-1">
            {spinner()}
            Selecting
          </span>
          <AiOutlineClose className="mt-1.5" />
        </span>
      ) : (
        <>
          <span>Select An Element</span>
        </>
      )}
    </>
  );

  return (
    <main>
      {showComponent ? (
        <>
          {showComponent.value?.inputs &&
            showComponent.value?.inputs.map(
              (input: { name: string }, i: number) => {
                const { selectedId, objects, filterObjects } = inputObjects(i);
                return (
                  <section key={i} className="mt-3">
                    <h6>Input - {input.name}</h6>
                    <div
                      className="grid mb-2 px-2 border rounded mt-1 h-7"
                      onClick={() => handleInputSelector(selectedId)}
                    >
                      <div>
                        {!objects.length ? (
                          <div>{renderDefault(selectedId)}</div>
                        ) : (
                          <>
                            {!filterObjects.length
                              ? renderDefault(selectedId)
                              : filterObjects.map((key) => {
                                  let filteredObject = elementConfig[
                                    key
                                  ]?.filter(
                                    (key: { buttonId: string }) =>
                                      key.buttonId === selectedItem.i
                                  );
                                  return (
                                    <div key={key}>
                                      {filteredObject[0] ? (
                                        <>
                                          {selector !== null &&
                                          selector.name === selectedId ? (
                                            <span className="flex">
                                              <span className="flex-1">
                                                {spinner()}
                                                Selecting
                                              </span>
                                              <AiOutlineClose className="mt-1.5" />
                                            </span>
                                          ) : (
                                            <span className="flex">
                                              <span className="flex-1">
                                                {filteredObject[0].name} -{" "}
                                                {filteredObject[0].id}
                                              </span>
                                              <AiOutlineEdit className="mt-1.5" />
                                            </span>
                                          )}
                                        </>
                                      ) : (
                                        renderDefault(selectedId)
                                      )}
                                    </div>
                                  );
                                })}
                          </>
                        )}
                      </div>
                    </div>
                  </section>
                );
              }
            )}

          {showComponent.value?.stateMutability === "payable" && (
            <section className="mt-3">
              <h6>Input - Amount Payable</h6>
              <div
                className="mb-2 px-2 border rounded mt-1 h-7"
                onClick={() => {
                  handleStateSelector(selectedItem);
                }}
              >
                {!Object.keys(elementConfig).filter(
                  (key: string) => key === showComponent.value.name
                ).length ? (
                  renderDefault(showComponent.value.name)
                ) : (
                  <>
                    {Object.keys(elementConfig)
                      .filter((key: string) => key === showComponent.value.name)
                      .map((key: string) => {
                        if (key === showComponent.value.name) {
                          let filteredObject = stateObject(key);
                          return (
                            <div key={key}>
                              {filteredObject[0] ? (
                                <>
                                  {selector !== null &&
                                  selector.name === showComponent.value.name ? (
                                    <span className="flex">
                                      <span className="flex-1">
                                        {spinner()}
                                        Selecting
                                      </span>
                                      <AiOutlineClose className="mt-1.5" />
                                    </span>
                                  ) : (
                                    <span className="flex">
                                      <span className="flex-1">
                                        {filteredObject[0].name} -{" "}
                                        {filteredObject[0].id}
                                      </span>
                                      <AiOutlineEdit className="mt-1.5" />
                                    </span>
                                  )}
                                </>
                              ) : (
                                renderDefault(showComponent.value.name)
                              )}
                            </div>
                          );
                        } else {
                          return renderDefault(showComponent.value.name);
                        }
                      })}
                  </>
                )}
              </div>
            </section>
          )}

          {showComponent.value?.outputs &&
            showComponent.value?.outputs.map(
              (output: { name: string }, i: number) => {
                const { selectedId, objects, filterObjects } = outputObjects(i);
                return (
                  <section key={i} className="mt-3">
                    <h6>Output - {output.name}</h6>
                    <div
                      key={i}
                      className="grid mb-2 px-2 border rounded mt-1 h-7"
                      onClick={() => handleOutputSelector(selectedId)}
                    >
                      <div>
                        {objects.length === 0 ? (
                          renderDefault(selectedId)
                        ) : (
                          <>
                            {filterObjects.length === 0
                              ? renderDefault(selectedId)
                              : filterObjects.map((key) => {
                                  let filteredObject = elementConfig[
                                    key
                                  ]?.filter(
                                    (key: { buttonId: string }) =>
                                      key.buttonId === selectedItem.i
                                  );
                                  return (
                                    <div key={key}>
                                      {filteredObject[0] ? (
                                        <>
                                          {selector !== null &&
                                          selector.name === selectedId ? (
                                            <span className="flex">
                                              <span className="flex-1">
                                                {spinner()}
                                                Selecting
                                              </span>
                                              <AiOutlineClose className="mt-1.5" />
                                            </span>
                                          ) : (
                                            <span className="flex">
                                              <span className="flex-1">
                                                {filteredObject[0].name} -{" "}
                                                {filteredObject[0].id}
                                              </span>
                                              <AiOutlineEdit className="mt-1.5" />
                                            </span>
                                          )}
                                        </>
                                      ) : (
                                        renderDefault(selectedId)
                                      )}
                                    </div>
                                  );
                                })}
                          </>
                        )}
                      </div>
                    </div>
                  </section>
                );
              }
            )}

          {show ? (
            <button className="fixed right-3 bottom-5 w-56 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {spinner()}
              Saving
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="fixed right-3 bottom-5 w-56 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          )}
        </>
      ) : null}
    </main>
  );
};

export default AbiComponents;
