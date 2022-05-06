import React, { FC } from "react";

const AbiComponent: FC<{
  id?: string;
  abi: string;
  showComponent: string[];
  setShowComponent: any;
}> = ({ id, abi, showComponent, setShowComponent }) => {
  // Helper component for inputs of methods in ABI
  const abiInputComponent = (name) => (
    <>
      <input className="my-2 px-2 border rounded" placeholder={name} />
      <button
        className="px-4 bg-black rounded text-white"
        type="submit"
        onClick={() => {}}
      >
        Submit
      </button>
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
                {method.inputs[0] ? (
                  method.inputs.map((input, i) => (
                    <div key={i}>{abiInputComponent(input.name)}</div>
                  ))
                ) : (
                  <button
                    className="my-2 px-4 bg-black rounded text-white"
                    type="submit"
                    onClick={() => {}}
                  >
                    {method.name}
                  </button>
                )}
                {method.outputs[0] &&
                  method.outputs.map((output, i) => (
                    <div key={i}>
                      <input
                        className="mb-2 px-2 border rounded"
                        placeholder={output.type}
                      />
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
