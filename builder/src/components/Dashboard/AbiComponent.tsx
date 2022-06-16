import React, { FC, useState, useRef } from "react";
import ShortUniqueId from "short-unique-id";

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
  // Helper component for inputs of methods in ABI
  const [show, setShow] = useState(false);
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
  const [items, setItems] = useState([
    { id: 1, name: "ahmad", content: "hi this is ahmad", show: false },
    { id: 2, name: "zahid", content: "hi this is zahid", show: false },
  ]);
  // console.log(items.findIndex, "item");
  // const handleShow = (id) => {
  //   const elementsIndex = items.findIndex((element) => element.id === id);
  //   let newArray = [...items];
  //   newArray[elementsIndex] = {
  //     ...newArray[elementsIndex],
  //     show: !newArray[elementsIndex].show,
  //   };
  //   setItems(newArray);
  // };
  // const handleButtonClick = (i) => {
  //   setElementConfig((prevState) => {
  //     const nextState = prevState.map((elementConfig) => ({
  //       ...elementConfig,
  //       name: "Select an Element",
  //     }));
  //     nextState[i].name = elementConfig.name;
  //     return nextState;
  //   });
  // };
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
  const renderElementContent = elementConfig.map((item) => {
    // console.log(item.id, "item.id");
    return (
      <>
        <h1>{item.name}</h1>
        {item.show ? (
          <>
            <span>{item.name}</span> - <span> {item.id}</span>
          </>
        ) : null}
        <button
          onClick={() => {
            setSelector(true);
            handleElementShow(item.id);
          }}
        >
          Click
        </button>
      </>
    );
  });
  // const renderContent = items.map((item) => {
  //   return (
  //     <>
  //       <h1>{item.name}</h1>
  //       {item.show ? <p>{item.content}</p> : null}
  //       <button onClick={() => handleShow(item.id)}>Click</button>
  //     </>
  //   );
  // });
  const [elementId, setElementId] = useState("");
  const uid = new ShortUniqueId();
  return (
    <>
      {showComponent ? (
        <div>
          {/* {renderContent}
          {renderElementContent} */}
          {/* <div onClick={() => setSelector(true)}>
            {elementConfig.name}
            {elementConfig.id}
          </div> */}
          {/* Show components on button click */}
          {/* {showComponent && showComponent.includes(i) && ( */}

          {/* Method components based on inputs and outputs */}

          {showComponent ? (
            <>
              {showComponent.inputs[0] &&
                showComponent.inputs.map((input, i) => {
                  // const selectedItem = input.find((input) => input.i === i);
                  return (
                    <div className="mt-3">
                      <h6>Input - {input.name}</h6>
                      {elementConfig.map((item) => (
                        <div
                          key={i}
                          className="mb-2 px-2 border rounded mt-1"
                          onClick={() => {
                            setSelector(true);
                            handleElementShow(item.id);
                          }}
                        >
                          {!item.show ? (
                            <>
                              <span>
                                {item.name} - {item.id}
                              </span>
                            </>
                          ) : (
                            <span>Select an Element</span>
                          )}
                          {/* {elementId ? ( */}
                          {/* <>
                            <span>
                              {elementConfig.name} - {elementConfig.id}{" "}
                            </span>
                          </> */}
                          {/* ) : (
                          <span>Select an Element</span>
                        )} */}
                          {/* {elementConfig.map((item) => (
                          <>
                            {!item.show ? (
                              <>
                                <span>
                                  {item.name} - {item.id}{" "}
                                </span>
                              </>
                            ) : (
                              <span>Select an Element</span>
                            )}
                          </>
                        ))} */}
                        </div>
                      ))}
                    </div>
                  );
                })}
            </>
          ) : null}

          {/* {elementConfig.map((item) => (
                    <>
                      <div
                        key={i}
                        className="mb-2 px-2 border rounded mt-1"
                        onClick={() => {
                          setSelector(true);
                          handleElementShow(item.id);
                        }}
                      >
                        {!item.show ? (
                          <>
                            <span>
                              {item.name} - {item.id}{" "}
                            </span>
                          </>
                        ) : (
                          <span>Select an Element</span>
                        )}
                      </div>
                    </>
                  ))} */}
          {/* <div
                    key={i}
                    // show={show}
                    onClick={() => {
                      setSelectedElement(i);
                      setSelector(true);
                    }}
                    className="mb-2 px-2 border rounded mt-1"
                  >
                    {elementConfig.name} - {elementConfig.id}
                  </div> */}

          {/* <div key={i}>{abiInputComponent(input.type)}</div> */}

          {/* //   (
            //   <button
            //     className="my-2 px-4 bg-black rounded text-white"
            //     type="submit"
            //     onClick={() => {}}
            //   >
            //     {method.name}
            //   </button>
            // ) */}

          {showComponent &&
            showComponent.outputs[0] &&
            showComponent.outputs.map((output, i) => (
              <div key={i} className="mt-3">
                <h6>Output - {output.name}</h6>
                {elementConfig.map((item) => (
                  <>
                    {/* <h1>{item.name}</h1> */}
                    <div
                      key={i}
                      className="mb-2 px-2 border rounded mt-1"
                      onClick={() => {
                        setSelector(true);
                        handleElementOutputShow(item.id);
                      }}
                    >
                      {!item.show ? (
                        <>
                          <span>
                            {item.name} - {item.id}{" "}
                          </span>
                        </>
                      ) : (
                        <span>Select an Element</span>
                      )}
                    </div>

                    {/* <button
                       
                      >
                        Click
                      </button> */}
                  </>
                ))}

                {/* {selectedElement == i ? (
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
                )} */}
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
