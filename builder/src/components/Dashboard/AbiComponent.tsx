import React, { FC, useState } from "react";

const AbiComponent: FC<{
  abi: string;
  showComponent: any;
  setShowComponent: any;
  setSelector;
  elementConfig;
}> = ({ abi, showComponent, setShowComponent, setSelector, elementConfig }) => {
  // Helper component for inputs of methods in ABI
  console.log(setSelector, "selector");
  const abiInputComponent = (name) => (
    <>
      <input className="my-2 px-2 border rounded" placeholder={name} />
      {/* <button
        className="px-4 bg-black rounded text-white"
        type="submit"
        onClick={() => {}}
      >
        Submit
      </button> */}
    </>
  );
  const [selectedElement, setSelectedElement] = useState();
  return (
    <>
      {showComponent ? (
        <div>
          {/* <div onClick={() => setSelector(true)}>
            {elementConfig.name}
            {elementConfig.id}
          </div> */}
          {/* Show components on button click */}
          {/* {showComponent && showComponent.includes(i) && ( */}

          {/* Method components based on inputs and outputs */}
          {
            showComponent &&
              showComponent.inputs[0] &&
              showComponent.inputs.map((input, i) => (
                <div className="mt-3">
                  <h6>Input - {input.name}</h6>
                  {selectedElement == i ? (
                    <div
                      onClick={() => {
                        setSelectedElement(i);
                        setSelector(true);
                      }}
                      className="mb-2 px-2 border rounded mt-1"
                      key={i}
                    >
                      {elementConfig.name} - {elementConfig.id}
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setSelectedElement(i);
                        setSelector(true);
                      }}
                      className="mb-2 px-2 border rounded mt-1"
                      key={i}
                    >
                      Select an Element
                    </div>
                  )}

                  {/* <div key={i}>{abiInputComponent(input.type)}</div> */}
                </div>
              ))

            //   (
            //   <button
            //     className="my-2 px-4 bg-black rounded text-white"
            //     type="submit"
            //     onClick={() => {}}
            //   >
            //     {method.name}
            //   </button>
            // )
          }
          {showComponent &&
            showComponent.outputs[0] &&
            showComponent.outputs.map((output, i) => (
              <div key={i} className="mt-3">
                <h6>Output - {output.name}</h6>
                {selectedElement == i ? (
                  <div
                    onClick={() => {
                      setSelectedElement(i);
                      setSelector(true);
                    }}
                    className="mb-2 px-2 border rounded mt-1"
                    key={i}
                  >
                    {elementConfig.name} - {elementConfig.id}
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setSelectedElement(i);
                      setSelector(true);
                    }}
                    className="mb-2 px-2 border rounded mt-1"
                    key={i}
                  >
                    Select an Element
                  </div>
                )}
                {/* <input
                        className="mb-2 px-2 border rounded"
                        placeholder={output.type}
                      /> */}
              </div>
            ))}
        </div>
      ) : null}
      {/* {showComponent.map((method, i) => ( */}

      {/* )} */}
      {/* ))} */}
    </>
  );
};

export default AbiComponent;
