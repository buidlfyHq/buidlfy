import React, { useState } from "react";
import "../../styles/Dashboard.css";
import "../../styles/Components.css";
import { FaFileContract } from "react-icons/fa";
import Modal from "components/Dashboard/Modal";
import AbiMethods from "components/Dashboard/AbiMethods";
import AbiComponent from "components/Dashboard/AbiComponent";

export default function AdvanceComponent({
  contractConfig,
  setContractConfig,
  showComponent,
  setShowComponent,
  selector,
  setSelector,
  elementConfig,
  selectedItem,
  items,
  setItems,
}) {
  const [isOpen, setIsOpen] = useState(false); // for connect contract modal

  return (
    <>
      <div className="flex justify-center">
        {/* <div className="mb-3 w-56">
          <select
            className="form-select appearance-none block w-54 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
          >
            <option selected>Contract</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div> */}
      </div>
      <div className="flex items-center px-3 mt-1 text-black">
        <div
          onClick={() => setIsOpen(true)}
          className="w-54 border h-11 py-2 px-2 flex w-15"
        >
          <span className="mr-3 ml-4 mt-1">
            <FaFileContract />
          </span>{" "}
          Import Contract
          <Modal
            contractConfig={contractConfig}
            setContractConfig={setContractConfig}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
      <br />
      <AbiMethods
        contractConfig={contractConfig}
        setShowComponent={setShowComponent}
        selectedItem={selectedItem}
        items={items}
        setItems={setItems}
      />
      <AbiComponent
        showComponent={showComponent}
        setSelector={setSelector}
        elementConfig={elementConfig}
      />
    </>
  );
}
