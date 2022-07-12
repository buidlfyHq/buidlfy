import React, { FC, useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import IItems from "interfaces/items";
import { TIMEOUT } from "dns";

interface IAbiComponent {
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

const AbiComponent: FC<IAbiComponent> = ({
  showComponent,
  setSelector,
  elementConfig,
  selectedItem,
  selector,
  items,
  setItems,
}) => {
  const [currentElement, setCurrentElement] = useState({
    name: "",
    type: "",
  });
  const [show, setShow] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  // const handleShow = () => {
  //   setShow(true);
  // };
  useEffect(() => {
    setTimeout(() => setShow(false), 1000);
  }, [show]);

  const handleSave = () => {
    setShow(true);
    setIsSaved(true);
    // filter last selected element
    const filteredObject = elementConfig[currentElement.name].filter(
      (key: { buttonId: string }) => key.buttonId === selectedItem.i
    )[0];

    let updatedContract = {};

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
        outputs: [...selectedItem.contract.outputs, { id: filteredObject.id }],
      };
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
    <main>
      {showComponent ? (
        <>
          {showComponent.value.inputs[0] &&
            showComponent.value.inputs.map((input: { name: string }, i) => {
              const selectedId = "input" + i + showComponent.id;
              const objects = Object.keys(elementConfig);
              const filterObjects = objects.filter((key) => key === selectedId);
              return (
                <section className="mt-3">
                  <h6>Input - {input.name}</h6>
                  <div
                    key={i}
                    className="grid mb-2 px-2 border rounded mt-1 h-7"
                    onClick={() => {
                      setSelector({
                        methodName: showComponent.value.name,
                        type: "input",
                        name: selectedId,
                        buttonId: selectedItem.i,
                      });
                      setCurrentElement({ name: selectedId, type: "input" });
                    }}
                  >
                    <>
                      {!objects.length ? (
                        <>
                          <span>Select An Element</span>
                          <button
                            disabled
                            className="fixed bottom-5 right-3 w-56 font-bold py-2 px-4 rounded text-gray-400 bg-gray-100 border border-gray-800 "
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          {!filterObjects.length ? (
                            <>
                              <span>Select An Element</span>
                              <button
                                disabled
                                className="fixed bottom-5 right-3 w-56 font-bold py-2 px-4 rounded text-gray-400 bg-gray-100 border border-gray-800 "
                              >
                                Save
                              </button>
                            </>
                          ) : (
                            filterObjects.map((key) => {
                              let filteredObject = elementConfig[key]?.filter(
                                (key: { buttonId: string }) =>
                                  key.buttonId === selectedItem.i
                              );
                              return (
                                <>
                                  {filteredObject[0] && (
                                    <>
                                      <span className="flex">
                                        <span className="flex-1">
                                          {filteredObject[0].name} -{" "}
                                          {filteredObject[0].id}
                                        </span>
                                        <AiOutlineEdit className="mt-1.5" />
                                      </span>{" "}
                                      {show ? (
                                        <button
                                          // onChange={() => setIsSaved(true)}
                                          className="fixed right-3 bottom-5 w-56 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                          <span
                                            className="spinner-border animate-spin inline-block w-4 h-4 border-2 mr-2 rounded-full"
                                            role="status"
                                          ></span>
                                          Save
                                        </button>
                                      ) : (
                                        <>
                                          {isSaved ? (
                                            <button
                                              disabled
                                              className="fixed bottom-5 right-3 w-56 font-bold py-2 px-4 rounded text-gray-400 bg-gray-100 border border-gray-800 "
                                            >
                                              Saved
                                            </button>
                                          ) : (
                                            <button
                                              onClick={() => handleSave()}
                                              className="fixed right-3 bottom-5 w-56 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                              Save
                                            </button>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              );
                            })
                          )}
                        </>
                      )}
                    </>
                  </div>
                </section>
              );
            })}

          {showComponent.value.stateMutability === "payable" && (
            <>
              <section className="mt-3">
                <h6>Input - Amount Payable</h6>
                <div
                  className="mb-2 px-2 border rounded mt-1 h-7"
                  onClick={() => {
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
                  }}
                >
                  {!Object.keys(elementConfig).filter(
                    (key) => key === showComponent.value.name
                  ).length ? (
                    <span>Select An Element</span>
                  ) : (
                    <>
                      {Object.keys(elementConfig)
                        .filter((key) => key === showComponent.value.name)
                        .map((key) => {
                          if (key === showComponent.value.name) {
                            let filteredObject = elementConfig[key]?.filter(
                              (key: { buttonId: string }) =>
                                key.buttonId === selectedItem.i
                            );
                            return (
                              <>
                                {filteredObject[0] && (
                                  <span className="flex">
                                    <span className="flex-1">
                                      {filteredObject[0].name} -{" "}
                                      {filteredObject[0].id}
                                    </span>
                                    <AiOutlineEdit className="mt-1.5" />
                                  </span>
                                )}
                              </>
                            );
                          } else {
                            return <span>Select An Element</span>;
                          }
                        })}
                    </>
                  )}
                </div>
              </section>
            </>
          )}

          {showComponent.value.outputs[0] &&
            showComponent.value.outputs.map((output: { name: string }, i) => {
              const selectedId = "output" + i + showComponent.id;
              const objects = Object.keys(elementConfig);
              const filterObjects = objects.filter((key) => key === selectedId);
              return (
                <section key={i} className="mt-3">
                  <h6>Output - {output.name}</h6>

                  <div
                    key={i}
                    className="grid mb-2 px-2 border rounded mt-1 h-7"
                    onClick={() => {
                      setSelector({
                        methodName: showComponent.value.name,
                        type: "output",
                        name: selectedId,
                        buttonId: selectedItem.i,
                      });
                      setCurrentElement({ name: selectedId, type: "output" });
                    }}
                  >
                    {objects.length === 0 ? (
                      <>
                        <span>Select An Element</span>
                        <button
                          disabled
                          className="fixed bottom-5 right-3 w-56 font-bold py-2 px-4 rounded text-gray-400 bg-gray-100 border border-gray-800 "
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        {filterObjects.length === 0 ? (
                          <>
                            <span>Select An Element</span>
                            <button
                              disabled
                              className="fixed bottom-5 right-3 w-56 font-bold py-2 px-4 rounded text-gray-400 bg-gray-100 border border-gray-800 "
                            >
                              Save
                            </button>
                          </>
                        ) : (
                          filterObjects.map((key) => {
                            let filteredObject = elementConfig[key]?.filter(
                              (key: { buttonId: string }) =>
                                key.buttonId === selectedItem.i
                            );
                            return (
                              <>
                                {filteredObject[0] && (
                                  <>
                                    <span className="flex">
                                      <span className="flex-1">
                                        {filteredObject[0].name} -{" "}
                                        {filteredObject[0].id}
                                      </span>
                                      <AiOutlineEdit className="mt-1.5" />
                                    </span>
                                    {show ? (
                                      <button
                                        // onChange={() => setIsSaved(true)}
                                        className="fixed right-3 bottom-5 w-56 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                      >
                                        <span
                                          className="spinner-border animate-spin inline-block w-4 h-4 border-2 mr-2 rounded-full"
                                          role="status"
                                        ></span>
                                        Save
                                      </button>
                                    ) : (
                                      <>
                                        {isSaved ? (
                                          <button
                                            disabled
                                            className="fixed bottom-5 right-3 w-56 font-bold py-2 px-4 rounded text-gray-400 bg-gray-100 border border-gray-800 "
                                          >
                                            Saved
                                          </button>
                                        ) : (
                                          <button
                                            onClick={() => handleSave()}
                                            className="fixed right-3 bottom-5 w-56 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                          >
                                            Save
                                          </button>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            );
                          })
                        )}
                      </>
                    )}
                  </div>
                </section>
              );
            })}
        </>
      ) : null}
    </main>
  );
};

export default AbiComponent;
