import React, { FC } from "react";

const AbiMethods: FC<{
  abi: string;
  showComponent: string[];
  setShowComponent: any;
}> = ({ abi, showComponent, setShowComponent }) => {
  return (
    <>
      {abi &&
        JSON.parse(abi).map((method, i) => (
          <section key={i}>
            {/* Method Name */}
            <div>
              <button
                className="mt-1 ml-6 px-2 text-cyan-900"
                type="submit"
                onClick={() => setShowComponent([...showComponent, i])}
              >
                {">"} {method.name}
              </button>
            </div>
          </section>
        ))}
    </>
  );
};

export default AbiMethods;
