import React, { FC } from "react";
import ShortUniqueId from "short-unique-id";

const AbiComponent: FC<{
  abi: string;
  showComponent: any;
  setShowComponent: any;
  setSelector;
  selector;
  elementConfig;
  setElementConfig;
}> = ({
  abi,
  showComponent,
  setShowComponent,
  selector,
  setSelector,
  elementConfig,
  setElementConfig,
}) => {
  return (
    <>
      <div>
        {showComponent ? (
          <>
            {showComponent.inputs[0] &&
              showComponent.inputs.map((input, i) => {
                // const uid = new ShortUniqueId();
                // const option = uid();
                const selectedId = "input" + i;
                const objects = Object.keys(elementConfig);
                const filterObjects = objects.filter(
                  (key) => key === selectedId
                );
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
                                    <span>
                                      {elementConfig[key].name} -{" "}
                                      {elementConfig[key].id}
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
        ) : null}

        {showComponent &&
          showComponent.outputs[0] &&
          showComponent.outputs.map((output, i) => {
            const selectedId = "output" + i;
            const objects = Object.keys(elementConfig);
            const filterObjects = objects.filter((key) => key === selectedId);
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
                                <span>
                                  {elementConfig[key].name} -{" "}
                                  {elementConfig[key].id}
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
      </div>
    </>
  );
};

export default AbiComponent;
