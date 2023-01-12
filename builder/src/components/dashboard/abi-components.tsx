import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { saveContractConfig } from 'redux/workspace/workspace.reducers';
import { setSelectorToDefault, updateSelector } from 'redux/contract/contract.reducers';
import Spinner from 'components/utils/assets/spinner';
import { IRootState } from 'redux/root-state.interface';
import { IInput, IShowComponent, IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import { IContractElementSelected, IContractElementSelector } from 'redux/contract/contract.interfaces';
import 'styles/components.css';
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io';

interface IAbiComponents {
  showComponent: IShowComponent;
  elementId: string;
}

const AbiComponents: FC<IAbiComponents> = ({ showComponent, elementId }) => {
  const dispatch = useDispatch();
  const contractElementSelector: IContractElementSelector = useSelector((state: IRootState) => state.contract.contractElementSelector);
  const contractElementSelected: IContractElementSelected = useSelector((state: IRootState) => state.contract.contractElementSelected);
  const workspaceElements = useSelector((state: IRootState) => state.workspace.workspaceElements);
  const [currentElement, setCurrentElement] = useState<{
    name: string;
    type: string;
    inputName?: string;
    inputValue?: string;
    getUserAddress?: boolean;
  }>({
    name: '',
    type: '',
  });
  const [show, setShow] = useState<boolean>(true);
  // Infer better type instead of any
  const [inputSelect, setInputSelect] = useState<Array<any>>([]);
  const [preInputValue, setPreInputValue] = useState<Array<any>>([]);
  const [getUsersAddress, setGetUserAddress] = useState<Array<any>>([]);
  const [isChecked, setIsChecked] = useState<Array<boolean>>([]);
  const [selectContentVisible, setSelectContentVisible] = useState<Array<any>>([]);

  useEffect(() => {
    setTimeout(() => setShow(false), 1000);
  }, [show]);

  const handleSave = () => {
    setShow(true);
    // filter last selected element
    dispatch(saveContractConfig({ contractElementSelected }));
  };
  console.log(contractElementSelected, 'contractElementSelected');
  console.log(contractElementSelector, 'contractElementSelector');
  console.log(currentElement, 'currentElement');

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

  const handleInputSelect = (i, status) => {
    const newInputSelect = [...inputSelect];
    newInputSelect[i] = status;
    setInputSelect(newInputSelect);
  };

  const handlePreInput = (i, status) => {
    const userAddress = [...getUsersAddress];
    userAddress[i] = status;
    setGetUserAddress(userAddress);
  };
  const handlePreInputChange = (e: React.ChangeEvent<HTMLInputElement>, i: number, selectedId: string) => {
    const newPreInputValue = [...preInputValue];
    newPreInputValue[i] = e.target.value;
    setPreInputValue(newPreInputValue);
    // dispatch(
    //   updateSelector({
    //     methodName: showComponent.value.name,
    //     type: 'input',
    //     name: selectedId,
    //     buttonId: elementId,
    //     inputName: showComponent?.value?.inputs[i]['name'],
    //     inputValue: newPreInputValue[i],
    //   }),
    // );
    setCurrentElement({
      name: showComponent.value.name,
      type: 'preInput',
      inputName: showComponent?.value?.inputs[i]['name'],
      inputValue: newPreInputValue[i],
    });
  };
  const handleOnChange = (selectedId, i) => {
    const checked = [...isChecked];
    checked[i] = checked[i] ? !checked[i] : true;
    setIsChecked(checked);
    // dispatch(
    //   updateSelector({
    //     methodName: showComponent.value.name,
    //     type: 'input',
    //     name: selectedId,
    //     buttonId: elementId,
    //     inputName: showComponent?.value?.inputs[i]['name'],
    //     getUserAddress: isChecked[i] ? false : true,
    //   }),
    // );
    setCurrentElement({
      name: showComponent.value.name,
      type: 'userAddress',
      inputName: showComponent?.value?.inputs[i]['name'],
      getUserAddress: isChecked[i] ? false : true,
    });
  };

  const setContentVisible = i => {
    const isContentVisible = [...selectContentVisible];
    isContentVisible[i] = !isContentVisible[i];
    setSelectContentVisible(isContentVisible);
    console.log(selectContentVisible, 'scv');
  };

  console.log(showComponent, 'showcomponent');

  // Create Common Input for all three inputs
  return (
    <main>
      <div className="mb-[2rem]">
        {showComponent ? (
          <>
            {showComponent.value?.inputs &&
              showComponent.value?.inputs.map((input: { name: string }, i: number) => {
                const { selectedId, objects, filterObjects } = inputObjects(i);
                return (
                  <section key={i} className="mt-3">
                    <h6 className="setting-text ml-[0.5rem] mt-[1.25rem]">
                      <> Input - {input?.name}</>
                      {/* {input.name} */}
                    </h6>

                    {/* <div className="mt-2">
                      <div
                        onClick={() => setContentVisible(i)}
                        className="grid contract-input w-[13.5rem] mx-2 px-2 py-1.5 mt-4 h-[2.5rem] select-input"
                      >
                        <div className="flex">
                          <span className="cursor-pointer flex grow">Select An Option</span>
                          <IoMdArrowDropright className="flex items-center text-[18px] mt-1 icon-left" />
                          <IoMdArrowDropdown className=" items-center text-[18px] mt-1 icon-down" />
                        </div>
                      </div>
                      {selectContentVisible[i] ? (
                        <div className="ml-[0.5rem] mt-4">
                          <span className="absolute select-content pl-[20px] pt-[10px] pb-[10px] w-[13.5rem]">
                            <div key={i}>
                              <div onClick={() => handleInputSelect(i, false)} className="margin-text text-[12px] cursor-pointer mt-2">
                                Select Input
                              </div>
                              <div onClick={() => handleInputSelect(i, true)} className="margin-text text-[12px] cursor-pointer mt-3 mb-2">
                                Pre-filled Input
                              </div>
                              <div onClick={() => handleInputSelect(i, true)} className="margin-text text-[12px] cursor-pointer mt-3 mb-2">
                                Get User Address
                              </div>
                            </div>
                          </span>
                        </div>
                      ) : null}
                    </div> */}
                    <div key={i} className="flex">
                      <div onClick={() => handleInputSelect(i, false)} className="margin-text text-[12px] cursor-pointer mt-2">
                        Select Input
                      </div>
                      <div onClick={() => handleInputSelect(i, true)} className="margin-text text-[12px] cursor-pointer mt-3 mb-2">
                        Pre-filled Input
                      </div>
                    </div>
                    {inputSelect[i] ? (
                      <>
                        <div>
                          <div className="ml-2 mt-4">
                            <div key={i} className="flex">
                              <div onClick={() => handlePreInput(i, false)} className="margin-text cursor-pointer">
                                Get User Address
                              </div>
                              <div onClick={() => handlePreInput(i, true)} className="margin-text cursor-pointer ml-5">
                                Pre Input
                              </div>
                            </div>
                          </div>
                        </div>
                        {getUsersAddress[i] ? (
                          <input
                            placeholder="Add Pre Input"
                            className="grid contract-input w-[13.5rem] mb-2 mx-2 px-2 py-1.5 mt-4 h-[2.5rem]"
                            // onClick={() => handleInputSelector(selectedId)}
                            // value={getValue(inputValue)}
                            value={preInputValue[i]}
                            onChange={e => handlePreInputChange(e, i, selectedId)}
                          />
                        ) : (
                          <div className="flex py-4">
                            <span className="margin-text grow text-left px-3 mt-[0.5rem] mb-0">Get User Address</span>
                            <div className="flex ml-2 justify-center mt-1">
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
                        )}
                      </>
                    ) : (
                      <>
                        <div
                          className="grid contract-input w-[13.5rem] mb-2 mx-2 px-2 py-1.5 mt-4 h-[2.5rem]"
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
                    )}
                  </section>
                );
              })}

            {/* Add: Add SavedContract condition for stateMutability */}
            {showComponent.value?.stateMutability === 'payable' && (
              <section className="mt-3">
                <h6 className="setting-text ml-[0.5rem] mt-[1.25rem]">Input - Amount Payable</h6>
                <div
                  className="grid contract-input w-[13.5rem] mb-2 mx-2 px-2 py-1.5 mt-4 h-[2.5rem]"
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

            {showComponent.value?.outputs &&
              showComponent.value?.outputs.map((output: { name: string }, i: number) => {
                const { selectedId, objects, filterObjects } = outputObjects(i);
                return (
                  <section key={i} className="mt-3">
                    <h6 className="setting-text ml-[0.5rem] mt-[1.25rem]">
                      Output - {output?.name}
                      {/* {output.name} */}
                    </h6>
                    <div
                      key={i}
                      className="grid contract-input w-[13.5rem] mb-2 mx-2 px-2 py-1.5 mt-4 h-[2.5rem]"
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
                  </section>
                );
              })}

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
