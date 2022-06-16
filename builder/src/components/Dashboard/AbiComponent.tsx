import React, { FC } from "react";

const AbiComponent: FC<{
  abi: string;
  showComponent: any;
  setShowComponent: any;
  setSelector;
  elementConfig;
  setElementConfig;
}> = ({
  abi,
  showComponent,
  setShowComponent,
  setSelector,
  elementConfig,
  setElementConfig,
}) => {
  const handleElementShow = (id) => {
    const elementsConfigIndex = elementConfig.findIndex(
      (element) => element.id === id
    );
    let newArray = [...elementConfig];
    newArray[elementsConfigIndex] = {
      ...newArray[elementsConfigIndex],
      show: !newArray[elementsConfigIndex].show,
    };
    setElementConfig(newArray);
    console.log(elementsConfigIndex, "element");
  };

  const handleElementOutputShow = (id) => {
    const elementsConfigIndex = elementConfig.findIndex(
      (element) => element.id === id
    );
    let newArray = [...elementConfig];
    newArray[elementsConfigIndex] = {
      ...newArray[elementsConfigIndex],
      show: !newArray[elementsConfigIndex].show,
    };
    setElementConfig(newArray);
    console.log(elementsConfigIndex, "element");
  };

  console.log(elementConfig);

  return (
    <>
      <div>
        {showComponent ? (
          <>
            {showComponent.inputs[0] &&
              showComponent.inputs.map((input, i) => {
                const uid = "input" + i;
                return (
                  <div className="mt-3">
                    <h6>Input - {input.name}</h6>
                    <div
                      key={i}
                      className="mb-2 px-2 border rounded mt-1"
                      onClick={() => setSelector(uid)}
                    >
                      <>
                        {Object.keys(elementConfig).map((key) => (
                          <>
                            {key === uid && (
                              <span>
                                {elementConfig[key].name} -{" "}
                                {elementConfig[key].id}
                              </span>
                            )}
                          </>
                        ))}
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
            const uid = "output" + i;
            return (
              <div key={i} className="mt-3">
                <h6>Output - {output.name}</h6>
                <>
                  <div
                    key={i}
                    className="mb-2 px-2 border rounded mt-1"
                    onClick={() => setSelector(uid)}
                  >
                    <>
                      {Object.keys(elementConfig).map((key) => (
                        <>
                          {key === uid && (
                            <span>
                              {elementConfig[key].name} -{" "}
                              {elementConfig[key].id}
                            </span>
                          )}
                        </>
                      ))}
                    </>
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
