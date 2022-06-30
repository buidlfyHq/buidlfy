import React, { FC } from "react";
import { AiOutlineEdit } from "react-icons/ai";

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
  setSelector: (selector: {
    methodName: string;
    type: string;
    name: string;
  }) => void;
  elementConfig: object;
}

const AbiComponent: FC<IAbiComponent> = ({
  showComponent,
  setSelector,
  elementConfig,
}) => {
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
                    className="mb-2 px-2 border rounded mt-1 h-7"
                    onClick={() =>
                      setSelector({
                        methodName: showComponent.value.name,
                        type: "input",
                        name: selectedId,
                      })
                    }
                  >
                    <>
                      {!objects.length ? (
                        <span>Select An Element</span>
                      ) : (
                        <>
                          {!filterObjects.length ? (
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
                </section>
              );
            })}

          {showComponent.value.stateMutability === "payable" && (
            <>
              <section className="mt-3">
                <h6>Input - Amount Payable</h6>
                <div
                  className="mb-2 px-2 border rounded mt-1 h-7"
                  onClick={() =>
                    setSelector({
                      methodName: showComponent.value.name,
                      type: "input",
                      name: showComponent.value.name,
                    })
                  }
                >
                  {!Object.keys(elementConfig).filter(
                    (key) => key === showComponent.value.name
                  ).length ? (
                    <span>Select An Element</span>
                  ) : (
                    <>
                      {Object.keys(elementConfig)
                        .filter((key) => key === showComponent.value.name)
                        .map((key) => (
                          <>
                            {key === showComponent.value.name && (
                              <span className="flex">
                                <span className="flex-1">
                                  {elementConfig[key].name} -{" "}
                                  {elementConfig[key].id}
                                </span>
                                <AiOutlineEdit className="mt-1.5" />
                              </span>
                            )}
                          </>
                        ))}
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
                    className="mb-2 px-2 border rounded mt-1 h-7"
                    onClick={() =>
                      setSelector({
                        methodName: showComponent.value.name,
                        type: "output",
                        name: selectedId,
                      })
                    }
                  >
                    {objects.length === 0 ? (
                      <span>Select An Element</span>
                    ) : (
                      <>
                        {filterObjects.length === 0 ? (
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
                </section>
              );
            })}
          <button
            onClick={() => console.log("saved")}
            className="fixed bottom-5 w-56 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </>
      ) : null}
    </main>
  );
};

export default AbiComponent;
