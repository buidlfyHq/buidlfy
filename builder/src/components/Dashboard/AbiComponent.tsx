import React, { FC, useState, useEffect } from "react";
import ShortUniqueId from "short-unique-id";
import { AiOutlineEdit } from "react-icons/ai";

const AbiComponent: FC<{
  abi: string;
  showComponent: any;
  setShowComponent: any;
  setSelector;
  selector;
  elementConfig;
  setElementConfig;
  selectedElements;
  setSelectedElements;
}> = ({
  abi,
  showComponent,
  setShowComponent,
  selector,
  setSelector,
  elementConfig,
  setElementConfig,
  selectedElements,
  setSelectedElements,
}) => {
  // const handleSave = () => {};
  return (
    <>
      <div>
        {showComponent ? (
          <>
            <>
              {showComponent.value.inputs[0] &&
                showComponent.value.inputs.map((input, i) => {
                  // const selectedId = option;
                  const selectedId = "input" + i + showComponent.id;
                  const objects = Object.keys(elementConfig);
                  const filterObjects = objects.filter(
                    (key) => key === selectedId
                  );
                  // console.log(selectedId, "selected");
                  return (
                    <div className="mt-3">
                      <h6>Input - {input.name}</h6>
                      <div
                        key={i}
                        className="mb-2 px-2 border rounded mt-1 h-7"
                        onClick={() => setSelector(selectedId)}
                      >
                        <>
                          {objects.length == 0 ? (
                            <span>Select An Element</span>
                          ) : (
                            <>
                              {filterObjects.length == 0 ? (
                                <span>Select An Element</span>
                              ) : (
                                filterObjects.map((key) => (
                                  <>
                                    {key === selectedId && (
                                      <span className="flex">
                                        <span className="flex-1">
                                          {elementConfig[key].name} -{" "}
                                          {elementConfig[key].id}
                                        </span>
                                        <AiOutlineEdit className="mt-1.5" />
                                      </span>
                                    )}
                                  </>
                                ))
                              )}
                            </>
                          )}
                        </>
                      </div>
                    </div>
                  );
                })}
            </>

            {showComponent.value.outputs[0] &&
              showComponent.value.outputs.map((output, i) => {
                const selectedId = "output" + i + showComponent.id;
                const objects = Object.keys(elementConfig);
                const filterObjects = objects.filter(
                  (key) => key === selectedId
                );
                return (
                  <div key={i} className="mt-3">
                    <h6>Output - {output.name}</h6>
                    <>
                      <div
                        key={i}
                        className="mb-2 px-2 border rounded mt-1 h-7"
                        onClick={() => setSelector(selectedId)}
                      >
                        {objects.length == 0 ? (
                          <span>Select An Element</span>
                        ) : (
                          <>
                            {filterObjects.length == 0 ? (
                              <span>Select An Element</span>
                            ) : (
                              filterObjects.map((key) => (
                                <>
                                  {key === selectedId && (
                                    <span className="flex">
                                      <span className="flex-1">
                                        {elementConfig[key].name} -{" "}
                                        {elementConfig[key].id}
                                      </span>
                                      <AiOutlineEdit className="mt-1.5" />
                                    </span>
                                  )}
                                </>
                              ))
                            )}
                          </>
                        )}
                      </div>
                    </>
                  </div>
                );
              })}
            <button className="fixed bottom-5 w-56 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save
            </button>
          </>
        ) : null}
      </div>
    </>
  );
};

export default AbiComponent;
