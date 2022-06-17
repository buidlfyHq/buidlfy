import { FC, useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import config from "../../config";

const AbiComponent: FC<{ account }> = ({ account }) => {
  const [inputValue, setInputValue] = useState([]);
  const [outputValue, setOutputValue] = useState({});
  let provider: any, signer: any, contract: Contract;

  const onLoad = () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(
      config.contract.address,
      config.contract.abi,
      signer
    );
  };


  // we have to give each input of a function a unique identifier

  // contractInput({
  //   functionName: {
  //     input1: '',
  //     input2: '',
  //   }
  // });

  // numberOfInputs = Object.keys(functionName).length
  // await contract.functions[method](functionName.input1, functionName.input2); ---> FIX

  // write to a function in contract
  const onPost = async (method: string, inputValue) => {
    onLoad();
    const val = Object.entries(inputValue).map((m) =>
      m[0] === method ? m[1] : null
    );
    // query contract functions --- magic code
    await contract.functions[method](val[0]);
    setInputValue({ ...inputValue, [method]: null });
  };

  // call a function in contract
  const onGet = async (method) => {
    onLoad();
    // const res = await contract.getDeployedCampaigns();
    // query contract functions --- magic code
    const res = await contract.functions[method]();
    setOutputValue({ ...outputValue, [method]: res[0] });
  };

  useEffect(() => {
    onLoad();
  }, []); // eslint-disable-line

  // Helper component for inputs of methods in ABI
  const abiInputComponent = (method, name) => (
    <>
      <input
        className="my-2 mr-1 px-2 border rounded-md"
        placeholder={name}
        name={method}
        value={Object.entries(inputValue).filter((m) => m[0] === method)[1]}
        onChange={(e) => {
          setInputValue({ ...inputValue, [e.target.name]: e.target.value });
        }}
      />
      <button
        className="my-2 px-4 bg-black rounded-md text-base font-medium text-white shadow-sm bg-indigo-600 hover:bg-indigo-700"
        type="submit"
        onClick={() => onPost(method, inputValue)}
      >
        Submit
      </button>
    </>
  );

  return (
    <>
      {account ? (
        <div className="h-full w-full p-2 min-w-1/4 max-w-1/2">
          {config &&
            config.contract.abi.map((method, i) => (
              <div key={i}>
                {/* Show components on button click */}
                {config.contract.functionName &&
                  config.contract.functionName.includes(method.name) && (
                    <div className="p-2 mx-4 my-2 transition-colors duration-150 ease-in-out bg-white rounded-lg shadow hover:bg-gray-100">
                      <h1 className="mb-2 text-lg font-bold">{method.name}</h1>
                      {/* Method components based on inputs and outputs */}
                      {method.inputs[0] ? (
                        method.inputs.map((input, i) => (
                          <div key={i}>
                            {abiInputComponent(method.name, input.name)}
                          </div>
                        ))
                      ) : (
                        <button
                          className="my-2 px-4 rounded-md text-base font-medium text-white shadow-sm bg-indigo-600 hover:bg-indigo-700"
                          type="submit"
                          onClick={() => onGet(method.name)}
                        >
                          {method.name}
                        </button>
                      )}
                      {method.outputs[0] &&
                        method.outputs.map((output, i) => (
                          <div key={i}>
                            {Object.entries(outputValue).map(
                              (m) =>
                                m[0] === method.name && (
                                  <div key={i}>
                                    {(m[1] as any[]).map((r, i) => (
                                      <div key={i}>
                                        <span>Campaign {i + 1}: </span>
                                        <span>{r}</span>
                                        <br />
                                      </div>
                                    ))}
                                  </div>
                                )
                            )}
                          </div>
                        ))}
                    </div>
                  )}
              </div>
            ))}
        </div>
      ) : (
        <div className="h-80 flex justify-center items-center text-xl font-bold">
          Connect your wallet to get started
        </div>
      )}
    </>
  );
};

export default AbiComponent;
