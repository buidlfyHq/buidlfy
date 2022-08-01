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

  const renderDefault = (valueName: string) => (
    <>
      {selector !== null && selector?.name === valueName ? (
        <span className="flex">
          <span className="flex-1">
            <span
              className="spinner-border animate-spin inline-block w-4 h-4 border-2 mr-2 rounded-full"
              role="status"
            />
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
                                                <span
                                                  className="spinner-border animate-spin inline-block w-4 h-4 border-2 mr-2 rounded-full"
                                                  role="status"
                                                />
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
                                        <span>Select An Element</span>
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
                                        <span
                                          className="spinner-border animate-spin inline-block w-4 h-4 border-2 mr-2 rounded-full"
                                          role="status"
                                        />
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
                                <span>Select An Element</span>
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
                                                <span
                                                  className="spinner-border animate-spin inline-block w-4 h-4 border-2 mr-2 rounded-full"
                                                  role="status"
                                                />
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
                                        <span>Select An Element</span>
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
              <span
                className="spinner-border animate-spin inline-block w-4 h-4 border-2 mr-2 rounded-full"
                role="status"
              />
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
