import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import Spinner from "components/utils/assets/spinner";
import {
  setOracleSelectorToDefault,
  setOracleToDefault,
  updateOracleOutputId,
  updateOracleSelector,
} from "redux/oracle/oracle.reducers";
import { saveOracleConfig } from "redux/workspace/workspace.reducers";
import { IRootState } from "redux/root-state.interface";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";

interface IOracleComponents {
  selectedElement: IWorkspaceElement;
  isOracleOpen: boolean;
  setIsOracleOpen: (isOpen: boolean) => void;
}

const OracleComponents: FC<IOracleComponents> = ({
  selectedElement,
  isOracleOpen,
  setIsOracleOpen,
}) => {
  const dispatch = useDispatch();
  const oracleConfig = useSelector(
    (state: IRootState) => state.oracle.oracleConfig
  );
  const oracleElementSelector = useSelector(
    (state: IRootState) => state.oracle.oracleElementSelector
  );

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setShow(false), 1000);
  }, [show]);

  useEffect(() => {
    if (isOracleOpen) {
      setIsOracleOpen(false);
    }
  }, []); // eslint-disable-line

  const handleOutputSelector = () => {
    if (oracleElementSelector === null) {
      dispatch(updateOracleSelector({ buttonId: selectedElement.i }));
    } else {
      dispatch(setOracleSelectorToDefault());
    }
  };

  const handleSave = () => {
    setShow(true);
    dispatch(saveOracleConfig(oracleConfig));
    dispatch(setOracleToDefault());
  };

  return (
    <section className="mt-3">
      <div className="setting-text mt-[2.5rem] ml-[0.25rem] px-1 my-1 text-xl not-italic font-normal text-left text-gray-500 font-regular">
        Select Output
      </div>
      {/* <h6 className="setting-text ml-[0.5rem] mt-[1rem]">Output</h6> */}
      <div className="grid contract-input w-[13.5rem] mb-2 mx-2 px-2 py-1.5 mt-2 h-[2.5rem]">
        {oracleElementSelector !== null ? (
          <span className="flex" onClick={handleOutputSelector}>
            <span className="flex-1">
              <Spinner />
              Selecting
            </span>
            <AiOutlineClose className="mt-1.5 cursor-pointer" />
          </span>
        ) : (
          <>
            {selectedElement?.oracle?.outputs[0] || oracleConfig.outputs[0] ? (
              <span className="flex">
                <span
                  className="cursor-pointer flex-1"
                  onClick={handleOutputSelector}
                >
                  {selectedElement?.oracle?.outputs[0].id ||
                    oracleConfig.outputs[0].id}{" "}
                  - Connected
                </span>
                <span onClick={() => dispatch(updateOracleOutputId(""))}>
                  <AiOutlineClose className="mt-1.5 cursor-pointer" />
                </span>
              </span>
            ) : (
              <span className="cursor-pointer" onClick={handleOutputSelector}>
                Select An Element
              </span>
            )}
          </>
        )}
      </div>
      {show ? (
        <button className="fixed right-3 bottom-5 flex contract-button py-3 px-[4.8rem]">
          <Spinner />
          Saving
        </button>
      ) : (
        <button
          onClick={handleSave}
          className="fixed right-3 bottom-5 flex contract-button py-3 px-[6rem]"
        >
          Save
        </button>
      )}
    </section>
  );
};

export default OracleComponents;
