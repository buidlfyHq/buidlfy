import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'redux/root-state.interface';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io';
import { saveContractConfig } from 'redux/workspace/workspace.reducers';
import { setSelectorToDefault, updateSelector } from 'redux/contract/contract.reducers';
import Spinner from 'components/utils/assets/spinner';
import { IShowComponent, IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import { IContractElementSelected, IContractElementSelector } from 'redux/contract/contract.interfaces';
import ListBoxDropdown from 'components/utils/list-box';
import { Method, methodOptions } from 'components/utils/method-options';
import 'styles/components.css';

interface IAbiComponents {
  showComponent: IShowComponent;
  elementId: string;
}

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
  const [showInputPayable, setShowInputPayable] = useState<boolean>(false);
  const [showInputPayableContent, setShowInputPayableContent] = useState<boolean>(false);
  const [showInputContent, setShowInputContent] = useState<Array<any>>([]);
  const [showOutputContent, setShowOutputContent] = useState<Array<any>>([]);
  const [showInputMethod, setShowInputMethod] = useState<Array<any>>([]);
  const [selectedMethod, setSelectedMethod] = useState(methodOptions[0]);
  const [preInputStateValue, setPreInputStateValue] = useState<string>('');
  const [inputStateMethod, setInputStateMethod] = useState<string>('');

  useEffect(() => {
    setTimeout(() => setShow(false), 1000);
  }, [show]);

  const setCurrentElement = element => {
    const newCurrentElements = [...currentElements];
    newCurrentElements.push(element);
    setCurrentElements(newCurrentElements);
  };
  const updateCurrentElement = element => {
    const elementIndex = currentElements.findIndex(currentElement => currentElement?.inputName === element.inputName);

    const newCurrentElements = [...currentElements];
    if (elementIndex > -1) {
      newCurrentElements.splice(elementIndex, 1);
    }
    newCurrentElements.push(element);
    setCurrentElements(newCurrentElements);
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
  const handleStateInput = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setPreInputStateValue(e.target.value);
    if (contractElementSelector === null) {
      if (preInputStateValue) {
        updateCurrentElement({
          id: id,
          name: showComponent.value.name,
          type: 'preInputSend',
          value: e.target.value,
        });
      } else {
        setCurrentElement({
          id: id,
          name: showComponent.value.name,
          type: 'preInputSend',
          value: e.target.value,
        });
      }
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
            <span className="text-[11px]">Selecting</span>
          </span>
          <AiOutlineClose className="mt-1.5 cursor-pointer" />
        </span>
      ) : (
        <>
          <span className="cursor-pointer text-[11px]">Select An Element</span>
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

  const handleShowInputPayable = () => {
    setShowInputPayable(!showInputPayable);
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

  const handleInputPayableContent = () => {
    setShowInputPayableContent(!showInputPayableContent);
  };

  const handleShowInputMethod = (methodParameter: Method, i: number) => {
    const inputMethod = [...showInputMethod];
    inputMethod[i] = methodParameter;
    setShowInputMethod(inputMethod);
  };

  const handleInputStateMethod = (methodParameter: Method) => {
    setInputStateMethod(methodParameter);
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
                  Configure Input
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
                  showComponent.value?.inputs.map((input: { name: string; type: string }, i: number) => {
                    const { selectedId, objects, filterObjects } = inputObjects(i);
                    return (
                      <>
                        <div onClick={() => handleInputContent(i)} className="flex items-center justify-center mt-[1.25rem]">
                          <h6 className="text-[#344054] font-medium text-[13px] cursor-pointer ml-4 flex grow">Input - {input?.name}</h6>
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
                                <ListBoxDropdown handleShowInput={handleShowInputMethod} i={i} />
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
                                                                <span className="text-[11px]">Selecting</span>
                                                              </span>
                                                              <AiOutlineClose className="mt-1.5 cursor-pointer" />
                                                            </span>
                                                          ) : (
                                                            <span className="flex">
                                                              <span className="flex-1 text-[11px]">
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
                                    className="grid contract-input w-[12.8rem] mb-2 mx-2 px-2 py-1.5 mt-4 h-[2.5rem] text-[11px]"
                                    type={input.type === 'uint256' ? 'number' : 'text'}
                                    value={preInputValue[i]}
                                    onChange={e => handlePreInputChange(e, i, selectedId)}
                                  />
                                ) : null}
                                {showInputMethod[i] === Method.USER_ADDRESS ? (
                                  <div className="flex py-4">
                                    <span className="margin-text grow text-left px-3 mt-[0.5rem] mb-0 text-[11px]">Get User Address</span>
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

            {showComponent.value?.stateMutability === 'payable' ? (
              <div className="grey-border mx-2 mt-5 flex items-center">
                <h2 className="ml-1 text-[#100F11] font-medium text-sm cursor-pointer my-2 flex grow" onClick={handleShowInputPayable}>
                  Configure Input - Amount Payable
                </h2>
                {showInputPayable ? (
                  <IoMdArrowDropdown className=" items-center text-[18px]" />
                ) : (
                  <IoMdArrowDropright className="flex items-center text-[18px]" />
                )}
              </div>
            ) : null}
            {/* Add: Add SavedContract condition for stateMutability */}
            {showInputPayable ? (
              <>
                {showComponent.value?.stateMutability === 'payable' && (
                  <section className="mt-3">
                    <div onClick={handleInputPayableContent} className="flex items-center justify-center mt-[1.25rem]">
                      <h6 className="text-[#344054] font-medium text-xs cursor-pointer ml-4 flex grow">Input - Amount Payable</h6>
                      {showInputPayableContent ? (
                        <IoMdArrowDropdown className="items-center text-[18px] mr-2 text-[#344054]" />
                      ) : (
                        <IoMdArrowDropright className="flex items-center text-[18px] mr-2 text-[#344054]" />
                      )}
                    </div>
                    <div className={`mr-2 ml-1 mt-5 ${showInputPayableContent ? 'grey-border pb-4' : ''}`}>
                      {showInputPayableContent ? (
                        <>
                          <ListBoxDropdown handleShowInput={handleInputStateMethod} payableInput={true} />
                          {inputStateMethod === Method.SELECT_INPUT ? (
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
                                                      <span className="text-[11px]">Selecting</span>
                                                    </span>
                                                    <AiOutlineClose className="mt-1.5 cursor-pointer" />
                                                  </span>
                                                ) : (
                                                  <span className="flex">
                                                    <span className="flex-1 text-[11px]">
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
                          ) : null}
                          {inputStateMethod === Method.PRE_INPUT ? (
                            <input
                              placeholder="Add Pre Input"
                              className="grid contract-input w-[12.8rem] mb-2 mx-2 px-2 py-1.5 mt-4 h-[2.5rem] text-[11px]"
                              type="number"
                              value={preInputStateValue}
                              onChange={e => handleStateInput(elementId, e)}
                            />
                          ) : null}
                        </>
                      ) : null}
                    </div>
                  </section>
                )}
              </>
            ) : null}

            {showComponent.value?.outputs?.length > 0 ? (
              <div className="grey-border mx-2 mt-5 flex items-center">
                <h2 className="ml-1 text-[#100F11] font-medium text-sm cursor-pointer my-2 flex grow" onClick={handleShowOutput}>
                  Configure Output
                </h2>

                {showOutput ? (
                  <IoMdArrowDropdown className=" items-center text-[18px]" />
                ) : (
                  <IoMdArrowDropright className="flex items-center text-[18px]" />
                )}
              </div>
            ) : null}
            {showOutput ? (
              <>
                {showComponent.value?.outputs &&
                  showComponent.value?.outputs.map((output: { name: string }, i: number) => {
                    const { selectedId, objects, filterObjects } = outputObjects(i);
                    return (
                      <section key={i} className="mt-3">
                        <div onClick={() => handleOutputContent(i)} className="flex items-center justify-center mt-[1.25rem]">
                          <h6 className="text-[#344054] font-medium text-xs cursor-pointer ml-4 flex grow">Output - {output?.name}</h6>
                          {showOutputContent[i] ? (
                            <IoMdArrowDropdown className="items-center text-[18px] mr-2 text-[#344054]" />
                          ) : (
                            <IoMdArrowDropright className="flex items-center text-[18px] mr-2 text-[#344054]" />
                          )}
                        </div>
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
                                                        <span className="text-[11px]">Selecting</span>
                                                      </span>
                                                      <AiOutlineClose className="mt-1.5 cursor-pointer" />
                                                    </span>
                                                  ) : (
                                                    <span className="flex">
                                                      <span className="flex-1 text-[11px]">
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
