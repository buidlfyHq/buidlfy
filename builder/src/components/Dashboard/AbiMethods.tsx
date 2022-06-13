import React, { FC } from "react";

const AbiMethods: FC<{
  abi: string;
  showComponent: number[];
  setShowComponent: any;
}> = ({ abi, showComponent, setShowComponent }) => {
  console.log(showComponent, "show");
  return (
    <>
      <span className="px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
        Select Method
      </span>
      {/* <div className="flex justify-center">
        <div className="mb-3 xl:w-54">
          <select
             onChange={() => setShowComponent([...showComponent, i])}
            className="form-select appearance-none
           mt-2 
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
          > */}
      {abi &&
        JSON.parse(abi).map((method, i) => (
          <>
            {/* <option key={i} selected>
                    {method.name}
                  </option> */}

            <section key={i}>
              <div>
                <button
                  className="mt-1 px-2 text-cyan-900"
                  type="submit"
                  onClick={() => setShowComponent([...showComponent, i])}
                >
                  {">"} {method.name}
                </button>
              </div>
            </section>
          </>
        ))}
      {/* </select>
        </div>
      </div> */}
    </>
  );
};

export default AbiMethods;
