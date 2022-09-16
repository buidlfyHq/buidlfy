import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWorkspaceElementsArray } from "redux/workspace/workspace.reducers";
import {
  setSelectorToDefault,
  updateSelector,
} from "redux/selector/selector.reducers";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import Spinner from "components/dashboard/spinner";
<<<<<<< HEAD
import { IWorkspaceElements } from "redux/workspace/workspace.interfaces";
=======
import IWorkspace from "interfaces/workspace";
>>>>>>> feat/redux-refactor-dashboard
import "styles/components.css";

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
<<<<<<< HEAD
  selectedItem: IWorkspaceElements;
=======
  selectedItem: IWorkspace;
>>>>>>> feat/redux-refactor-dashboard
}

const AbiComponents: FC<IAbiComponents> = ({ showComponent, selectedItem }) => {
  const dispatch = useDispatch();
<<<<<<< HEAD
  const workspaceElements: IWorkspaceElements[] = useSelector(
    (state: any) => state.workspace
  ).workspaceElements;
=======
  const workspaceElements: IWorkspace[] = useSelector((state: any) => state.workspace).workspaceElements;
>>>>>>> feat/redux-refactor-dashboard
  const selector = useSelector((state: any) => state.selector);
  const selected = useSelector((state: any) => state.selected);

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
    const filteredObject = selected[currentElement.name]?.filter(
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
    const elementsIndex = workspaceElements.findIndex(
      (item) => item.i === selectedItem.i
    );

    if (elementsIndex === -1) {
      // search id in children
      const updatedItems = workspaceElements.map((item) => {
        const childIndex = item.children?.findIndex(
<<<<<<< HEAD
          (child: IWorkspaceElements) => child.i === selectedItem.i
=======
          (child: IWorkspace) => child.i === selectedItem.i
>>>>>>> feat/redux-refactor-dashboard
        );
        let newArray = [...item?.children];
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
  };

  const handleInputSelector = (selectedId: string) => {
    if (selector === null) {
      dispatch(
        updateSelector({
          methodName: showComponent.value.name,
          type: "input",
          name: selectedId,
          buttonId: selectedItem.i,
        })
      );
      setCurrentElement({ name: selectedId, type: "input" });
    } else {
      dispatch(setSelectorToDefault());
    }
  };

  const inputObjects = (i: number) => {
    const selectedId = "input" + i + showComponent.id;
    const objects = Object.keys(selected);
    const filterObjects = objects.filter((key) => key === selectedId);
    return {
      selectedId,
      objects,
      filterObjects,
    };
  };

<<<<<<< HEAD
  const handleStateSelector = (selectedItem: IWorkspaceElements) => {
=======
  const handleStateSelector = (selectedItem: IWorkspace) => {
>>>>>>> feat/redux-refactor-dashboard
    if (selector === null) {
      dispatch(
        updateSelector({
          methodName: showComponent.value.name,
          type: "input",
          name: showComponent.value.name,
          buttonId: selectedItem.i,
        })
      );
      setCurrentElement({
        name: showComponent.value.name,
        type: "send",
      });
    } else {
      dispatch(setSelectorToDefault());
    }
  };

  const stateObject = (key: string) => {
    let filteredObject = selected[key]?.filter(
      (key: { buttonId: string }) => key.buttonId === selectedItem.i
    );
    return filteredObject;
  };

  const handleOutputSelector = (selectedId: string) => {
    if (selector === null) {
      dispatch(
        updateSelector({
          methodName: showComponent.value.name,
          type: "output",
          name: selectedId,
          buttonId: selectedItem.i,
        })
      );
      setCurrentElement({ name: selectedId, type: "output" });
    } else {
      dispatch(setSelectorToDefault());
    }
  };

  const outputObjects = (i: number) => {
    const selectedId = "output" + i + showComponent.id;
    const objects = Object.keys(selected);
    const filterObjects = objects.filter((key) => key === selectedId);
    return {
      selectedId,
      objects,
      filterObjects,
    };
  };

  const renderDefault = (valueName: string) => (
    <>
      {selector && selector?.name === valueName ? (
        <span className="flex">
          <span className="flex-1">
            <Spinner />
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
                    <h6 className="setting-text ml-[0.5rem] mt-[1.25rem]">
                      Input
                      {/* {input.name} */}
                    </h6>
                    <div
                      className="grid contract-input mb-2 mx-2 px-2 py-1.5 mt-4 h-[2.5rem]"
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
                                  let filteredObject = selected[key]?.filter(
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
                                                <Spinner />
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
                {!Object.keys(selected).filter(
                  (key: string) => key === showComponent.value.name
                ).length ? (
                  renderDefault(showComponent.value.name)
                ) : (
                  <>
                    {Object.keys(selected)
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
                                        <Spinner />
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
                    <h6 className="setting-text ml-[0.5rem] mt-[1.25rem]">
                      Output
                      {/* {output.name} */}
                    </h6>
                    <div
                      key={i}
                      className="grid contract-input mb-2 mx-2 px-2 py-1.5 mt-4 h-[2.5rem]"
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
                                  let filteredObject = selected[key]?.filter(
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
                                                <Spinner />
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
            <button className="fixed right-3 bottom-5 flex contract-button py-3 px-[6rem]">
              <Spinner />
              Saving
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="fixed right-3 bottom-5 flex contract-button py-3 px-[6rem]"
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
