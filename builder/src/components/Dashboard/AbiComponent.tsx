import React, { FC } from "react";

const AbiComponent: FC<{
  abi: string;
  showComponent: number[];
  setShowComponent: any;
}> = ({ abi, showComponent, setShowComponent }) => {
  // Helper component for inputs of methods in ABI
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

  return (
    <>
      {abi &&
        JSON.parse(abi).map((method, i) => (
          <div key={i}>
            {/* Show components on button click */}
            {showComponent && showComponent.includes(i) && (
              <div className="border-b">
                {/* Method components based on inputs and outputs */}
                {
                  method.inputs[0]
                    ? method.inputs.map((input, i) => (
                        <div className="mt-3">
                          <h6>Input - {input.name}</h6>
                          <div
                            className="mb-2 px-2 border rounded mt-1"
                            key={i}
                          >
                            Select an Element{" "}
                          </div>

                          {/* <div key={i}>{abiInputComponent(input.type)}</div> */}
                        </div>
                      ))
                    : null
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
                {method.outputs[0] &&
                  method.outputs.map((output, i) => (
                    <div key={i} className="mt-3">
                      <h6>Output - {output.name}</h6>
                      <div className="mb-2 px-2 border rounded mt-1" key={i}>
                        Select an Element{" "}
                      </div>
                      {/* <input
                        className="mb-2 px-2 border rounded"
                        placeholder={output.type}
                      /> */}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
    </>
  );
};

export default AbiComponent;
