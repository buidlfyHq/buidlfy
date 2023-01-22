import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { saveContractConfig } from 'redux/workspace/workspace.reducers';
import { setSelectorToDefault, updateSelector } from 'redux/contract/contract.reducers';
import Spinner from 'components/utils/assets/spinner';
import { IRootState } from 'redux/root-state.interface';
import { IShowComponent, IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import { IContractElementSelected, IContractElementSelector } from 'redux/contract/contract.interfaces';
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io';
import { Listbox } from '@headlessui/react';
import 'styles/components.css';

interface IAbiComponents {
  showComponent: IShowComponent;
  elementId: string;
}

enum Method {
  SELECT_INPUT = 'selectInput',
  PRE_INPUT = 'preInput',
  USER_ADDRESS = 'userAddress',
}

const methodOptions = [
  { id: 1, name: 'Select an Input', methodParameter: Method.SELECT_INPUT },
  { id: 2, name: 'Add Pre Input', methodParameter: Method.PRE_INPUT },
  { id: 3, name: 'Get User Address', methodParameter: Method.USER_ADDRESS },
];

const AbiComponents: FC<IAbiComponents> = ({ showComponent, elementId }) => {
  const dispatch = useDispatch();
  const contractElementSelector: IContractElementSelector = useSelector((state: IRootState) => state.contract.contractElementSelector);
  const contractElementSelected: IContractElementSelected = useSelector((state: IRootState) => state.contract.contractElementSelected);
  const workspaceElements = useSelector((state: IRootState) => state.workspace.workspaceElements);
  const [currentElements, setCurrentElements] = useState<
    Array<{
      name: string;
      type: string;
      inputName?: string;
      inputValue?: string;
      getUserAddress?: boolean;
    }>
  >([]);
  const [show, setShow] = useState<boolean>(true);
  // Infer better type instead of any
  const [preInputValue, setPreInputValue] = useState<Array<any>>([]);
  const [isChecked, setIsChecked] = useState<Array<boolean>>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [showInputContent, setShowInputContent] = useState<Array<any>>([]);
  const [showOutputContent, setShowOutputContent] = useState<Array<any>>([]);
  const [showInputMethod, setShowInputMethod] = useState<Array<any>>([]);
  const [selectedMethod, setSelectedMethod] = useState(methodOptions[0]);

  useEffect(() => {
    setTimeout(() => setShow(false), 1000);
  }, [show]);

  const setCurrentElement = element => {
    const newCurrentElements = [...currentElements];
    // if (elementIndex === -1) {
    newCurrentElements.push(element);
    setCurrentElements(newCurrentElements);
    // }
  };
  const updateCurrentElement = element => {
    const elementIndex = currentElements.findIndex(currentElement => currentElement?.inputName === element.inputName);

    const newCurrentElements = [...currentElements];
    if (elementIndex > -1) {
      newCurrentElements.splice(elementIndex, 1);
    }
    newCurrentElements.push(element);
    setCurrentElements(newCurrentElements);
    // }
  };

  const handleSave = () => {
    setShow(true);
    // filter last selected element
    dispatch(saveContractConfig({ contractElementSelected, currentElements }));
  };

  const handleInputSelector = (selectedId: string, i) => {
    if (contractElementSelector === null) {
      dispatch(
        updateSelector({
          methodName: showComponent.value.name,
          type: 'input',
          name: selectedId,
          buttonId: elementId,
        }),
      );
      setCurrentElement({ name: selectedId, type: 'input', inputName: showComponent?.value?.inputs[i]['name'] });
    } else {
      dispatch(setSelectorToDefault());
    }
  };

  const inputObjects = (i: number) => {
    const selectedId = 'input' + i + showComponent.id;
    const objects = Object.keys(contractElementSelected);
    const filterObjects = objects.filter(key => key === selectedId);
    return {
      selectedId,
      objects,
      filterObjects,
    };
  };

  const handleStateSelector = (id: string) => {
    if (contractElementSelector === null) {
      dispatch(
        updateSelector({
          methodName: showComponent.value.name,
          type: 'input',
          name: showComponent.value.name,
          buttonId: id,
        }),
      );
      setCurrentElement({
        name: showComponent.value.name,
        type: 'send',
      });
    } else {
      dispatch(setSelectorToDefault());
    }
  };

  const stateObject = (key: string) => {
    let filteredObject = contractElementSelected[key]?.filter((key: { buttonId: string }) => key.buttonId === elementId);
    return filteredObject;
  };

  const handleOutputSelector = (selectedId: string) => {
    if (contractElementSelector === null) {
      dispatch(
        updateSelector({
          methodName: showComponent.value.name,
          type: 'output',
          name: selectedId,
          buttonId: elementId,
        }),
      );
      setCurrentElement({ name: selectedId, type: 'output' });
    } else {
      dispatch(setSelectorToDefault());
    }
  };

  const outputObjects = (i: number) => {
    const selectedId = 'output' + i + showComponent.id;
    const objects = Object.keys(contractElementSelected);
    const filterObjects = objects.filter(key => key === selectedId);
    return {
      selectedId,
      objects,
      filterObjects,
    };
  };

  const renderDefault = (valueName: string) => (
    <>
      {contractElementSelector && contractElementSelector?.name === valueName ? (
        <span className="flex">
          <span className="flex-1">
            <Spinner />
            Selecting
          </span>
          <AiOutlineClose className="mt-1.5 cursor-pointer" />
        </span>
      ) : (
        <>
          <span className="cursor-pointer">Select An Element</span>
        </>
      )}
    </>
  );
  const findElement = (id: string) => {
    return workspaceElements.find((element: IWorkspaceElement) => element.i === id);
  };
  const savedContractInput = workspaceElements
    ?.map((key: IWorkspaceElement) => {
      if (key.name === 'Button') {
        if (key?.contract && key?.contract?.inputs?.length > 0) {
          return key?.contract?.inputs?.map(input => (
            <span className="flex">
              <span className="flex-1">
                {findElement(input?.id)?.name} - {input?.id}
              </span>
              <AiOutlineEdit className="mt-1.5 cursor-pointer" />
            </span>
          ));
        }
      }
    })
    .filter(item => item !== undefined);

  const savedContractOutput = workspaceElements
    ?.map((key: IWorkspaceElement) => {
      if (key.name === 'Button') {
        if (key?.contract && key?.contract?.outputs?.length > 0) {
          return key?.contract?.outputs?.map(output => (
            <span className="flex">
              <span className="flex-1">
                {findElement(output.id).name} - {output.id}
              </span>
              <AiOutlineEdit className="mt-1.5 cursor-pointer" />
            </span>
          ));
        }
      }
    })
    .filter(item => item !== undefined);

  const handlePreInputChange = (e: React.ChangeEvent<HTMLInputElement>, i: number, selectedId: string) => {
    const newPreInputValue = [...preInputValue];
    if (newPreInputValue[i]) {
      newPreInputValue[i] = e.target.value;
      setPreInputValue(newPreInputValue);
      updateCurrentElement({
        name: showComponent.value.name,
        type: 'preInput',
        inputName: showComponent?.value?.inputs[i]['name'],
        inputValue: newPreInputValue[i],
      });
    } else {
      newPreInputValue[i] = e.target.value;
      setPreInputValue(newPreInputValue);
      setCurrentElement({
        name: showComponent.value.name,
        type: 'preInput',
        inputName: showComponent?.value?.inputs[i]['name'],
        inputValue: newPreInputValue[i],
      });
    }
  };
  const handleOnChange = (selectedId, i) => {
    const checked = [...isChecked];
    checked[i] = checked[i] ? !checked[i] : true;
    setIsChecked(checked);
    setCurrentElement({
      name: showComponent.value.name,
      type: 'userAddress',
      inputName: showComponent?.value?.inputs[i]['name'],
      getUserAddress: isChecked[i] ? false : true,
    });
  };

  const handleShowInput = () => {
    setShowInput(!showInput);
  };

  const handleShowOutput = () => {
    setShowOutput(!showOutput);
  };

  const handleInputContent = (i: number) => {
    const inputContent = [...showInputContent];
    inputContent[i] = !inputContent[i];
    setShowInputContent(inputContent);
  };

  const handleOutputContent = (i: number) => {
    const outputContent = [...showOutputContent];
    outputContent[i] = !outputContent[i];
    setShowOutputContent(outputContent);
  };

  const handleShowInputMethod = (i: number, methodParameter: Method) => {
    const inputMethod = [...showInputMethod];
    inputMethod[i] = methodParameter;
    setShowInputMethod(inputMethod);
  };

  // Create Common Input for all three inputs
  return (
    <main>
      <div className="mb-[2rem]">
        {showComponent ? (
          <>
            {showComponent.value?.inputs?.length > 0 ? (
              <div className="grey-border mx-2 mt-5 flex items-center">
                <h2 className="ml-1 text-[#100F11] font-medium text-sm cursor-pointer my-2 flex grow" onClick={handleShowInput}>
                  Add Input
                </h2>
                {showInput ? (
                  <IoMdArrowDropdown className=" items-center text-[18px]" />
                ) : (
                  <IoMdArrowDropright className="flex items-center text-[18px]" />
                )}
              </div>
            ) : null}
            {showInput ? (
              <>
                {showComponent.value?.inputs &&
                  showComponent.value?.inputs.map((input: { name: string }, i: number) => {
                    const { selectedId, objects, filterObjects } = inputObjects(i);
                    return (
                      <>
                        <div onClick={() => handleInputContent(i)} className="flex items-center justify-center mt-[1.25rem]">
                          <h6 className="text-[#344054] font-medium text-xs cursor-pointer ml-4 flex grow">
                            <> Input - {input?.name}</>
                          </h6>
                          {showInputContent[i] ? (
                            <IoMdArrowDropdown className="items-center text-[18px] mr-2 text-[#344054]" />
                          ) : (
                            <IoMdArrowDropright className="flex items-center text-[18px] mr-2 text-[#344054]" />
                          )}
                        </div>
                        <div className={`mr-2 ml-1 mt-5 ${showInputContent[i] ? 'grey-border pb-4' : ''}`}>
                          {showInputContent[i] ? (
                            <section key={i} className="mt-3">
                              <div>
                                <Listbox onChange={setSelectedMethod} value={selectedMethod}>
                                  <Listbox.Button
                                    className="changeText text-left pl-[0.6rem] py-[0.4rem] w-[12.8rem] mx-2 px-2 h-[2.5rem] input-text"
                                    value=""
                                  >
                                    {selectedMethod?.name ? selectedMethod.name : <>Select An Option</>}
                                  </Listbox.Button>
                                  <Listbox.Options className="listbox-options ml-2 h-[7.6rem] absolute mt-[0.7rem] z-100 bg-white w-[12.8rem] rounded-[8px] border border-solid border-[#F2F4F7]">
                                    {methodOptions.map(methodOption => (
                                      <>
                                        <Listbox.Option
                                          value={methodOption}
                                          key={methodOption.id}
                                          className="py-[0.5rem] pr-2 pl-[1rem] cursor-pointer hover:bg-[#FAFAFF]"
                                          onClick={() => handleShowInputMethod(i, methodOption.methodParameter)}
                                        >
                                          {methodOption.name}
                                        </Listbox.Option>
                                      </>
                                    ))}
                                  </Listbox.Options>
                                </Listbox>
                                {showInputMethod[i] === Method.SELECT_INPUT ? (
                                  <>
                                    <div
                                      className="grid contract-input w-[12.8rem] mb-2 mx-2 px-2 py-1.5 mt-4 h-[2.5rem]"
                                      onClick={() => handleInputSelector(selectedId, i)}
                                    >
                                      <div>
                                        {!objects.length ? (
                                          <>
                                            {savedContractInput?.length > 0 ? (
                                              savedContractInput
                                            ) : (
                                              <div className="cursor-pointer">{renderDefault(selectedId)}</div>
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            {!filterObjects.length
                                              ? renderDefault(selectedId)
                                              : filterObjects.map(key => {
                                                  let filteredObject = contractElementSelected[key]?.filter(
                                                    (key: { buttonId: string }) => key.buttonId === elementId,
                                                  );
                                                  return (
                                                    <div key={key}>
                                                      {filteredObject[0] ? (
                                                        <>
                                                          {contractElementSelector !== null && contractElementSelector.name === selectedId ? (
                                                            <span className="flex">
                                                              <span className="flex-1">
                                                                <Spinner />
                                                                Selecting
                                                              </span>
                                                              <AiOutlineClose className="mt-1.5 cursor-pointer" />
                                                            </span>
                                                          ) : (
                                                            <span className="flex">
                                                              <span className="flex-1">
                                                                {filteredObject[0].name} - {filteredObject[0].id}
                                                              </span>
                                                              <AiOutlineEdit className="mt-1.5 cursor-pointer" />
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
                                  </>
                                ) : null}
                                {showInputMethod[i] === Method.PRE_INPUT ? (
                                  <input
                                    placeholder="Add Pre Input"
                                    className="grid contract-input w-[12.8rem] mb-2 mx-2 px-2 py-1.5 mt-4 h-[2.5rem]"
                                    // onClick={() => handleInputSelector(selectedId)}
                                    // value={getValue(inputValue)}
                                    value={preInputValue[i]}
                                    onChange={e => handlePreInputChange(e, i, selectedId)}
                                  />
                                ) : null}
                                {showInputMethod[i] === Method.USER_ADDRESS ? (
                                  <div className="flex py-4">
                                    <span className="margin-text grow text-left px-3 mt-[0.5rem] mb-0">Get User Address</span>
                                    <div className="flex ml-1 justify-center mt-1">
                                      <div onClick={() => handleOnChange(selectedId, i)} className="form-check form-switch">
                                        <input
                                          className="form-check-input w-12 -ml-10 bg-blue rounded-full h-5 align-top cursor-pointer shadow-sm"
                                          type="checkbox"
                                          role="switch"
                                          id="flexSwitchCheckDefault"
                                          checked={isChecked[i] ? true : false}
                                          readOnly
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            </section>
                          ) : null}
                        </div>
                      </>
                    );
                  })}
              </>
            ) : null}

            {/* Add: Add SavedContract condition for stateMutability */}
            {showComponent.value?.stateMutability === 'payable' && (
              <section className="mt-3">
                <h6 className="setting-text ml-[0.5rem] mt-[1.25rem]">Input - Amount Payable</h6>
                <div
                  className="grid contract-input w-[12.8rem] mb-2 mx-2 px-2 py-1.5 mt-4 h-[2.5rem]"
                  onClick={() => {
                    handleStateSelector(elementId);
                  }}
                >
                  {!Object.keys(contractElementSelected).filter((key: string) => key === showComponent.value.name).length ? (
                    <span className="cursor-pointer">{renderDefault(showComponent.value.name)}</span>
                  ) : (
                    <>
                      {Object.keys(contractElementSelected)
                        .filter((key: string) => key === showComponent.value.name)
                        .map((key: string) => {
                          if (key === showComponent.value.name) {
                            let filteredObject = stateObject(key);
                            return (
                              <div key={key}>
                                {filteredObject[0] ? (
                                  <>
                                    {contractElementSelector !== null && contractElementSelector.name === showComponent.value.name ? (
                                      <span className="flex">
                                        <span className="flex-1">
                                          <Spinner />
                                          Selecting
                                        </span>
                                        <AiOutlineClose className="mt-1.5 cursor-pointer" />
                                      </span>
                                    ) : (
                                      <span className="flex">
                                        <span className="flex-1">
                                          {filteredObject[0].name} - {filteredObject[0].id}
                                        </span>
                                        <AiOutlineEdit className="mt-1.5 cursor-pointer" />
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
            {showComponent.value?.outputs?.length > 0 ? (
              <div className="grey-border mx-2 mt-5">
                <h2 className="ml-1 text-[#100F11] font-medium text-sm cursor-pointer my-2" onClick={handleShowOutput}>
                  Add Output
                </h2>
              </div>
            ) : null}
            {showOutput ? (
              <>
                {showComponent.value?.outputs &&
                  showComponent.value?.outputs.map((output: { name: string }, i: number) => {
                    const { selectedId, objects, filterObjects } = outputObjects(i);
                    return (
                      <section key={i} className="mt-3">
                        <h6 onClick={() => handleOutputContent(i)} className="text-[#344054] font-medium text-xs cursor-pointer ml-4 mt-[1.25rem]">
                          Output - {output?.name}
                        </h6>
                        <div className="grey-border mx-2 mt-5">
                          {showOutputContent[i] ? (
                            <div
                              key={i}
                              className="grid contract-input w-[12.8rem] mb-2 mx-2 px-2 py-1.5 mt-4 h-[2.5rem]"
                              onClick={() => handleOutputSelector(selectedId)}
                            >
                              <div>
                                {objects.length === 0 ? (
                                  <>
                                    {savedContractOutput?.length > 0 ? (
                                      savedContractOutput
                                    ) : (
                                      <span className="cursor-pointer">{renderDefault(selectedId)}</span>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {filterObjects.length === 0
                                      ? renderDefault(selectedId)
                                      : filterObjects.map(key => {
                                          let filteredObject = contractElementSelected[key]?.filter(
                                            (key: { buttonId: string }) => key.buttonId === elementId,
                                          );
                                          return (
                                            <div key={key}>
                                              {filteredObject[0] ? (
                                                <>
                                                  {contractElementSelector !== null && contractElementSelector.name === selectedId ? (
                                                    <span className="flex">
                                                      <span className="flex-1">
                                                        <Spinner />
                                                        Selecting
                                                      </span>
                                                      <AiOutlineClose className="mt-1.5 cursor-pointer" />
                                                    </span>
                                                  ) : (
                                                    <span className="flex">
                                                      <span className="flex-1">
                                                        {filteredObject[0].name} - {filteredObject[0].id}
                                                      </span>
                                                      <AiOutlineEdit className="mt-1.5 cursor-pointer" />
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
                          ) : null}
                        </div>
                      </section>
                    );
                  })}
              </>
            ) : null}

            {show ? (
              <button className="fixed right-3 bottom-5 mt-5 flex contract-button py-3 px-[4.8rem]">
                <Spinner />
                Saving
              </button>
            ) : (
              <button onClick={handleSave} className="fixed right-3 mt-5 bottom-5 flex contract-button py-3 px-[6rem]">
                Save
              </button>
            )}
          </>
        ) : null}
      </div>
    </main>
  );
};

export default AbiComponents;
