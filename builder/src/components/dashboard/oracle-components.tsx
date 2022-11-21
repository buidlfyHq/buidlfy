import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import Spinner from "components/utils/assets/spinner";
import {
  setOracleSelectorToDefault,
  updateOracleOutputId,
  updateOracleSelector,
} from "redux/oracle/oracle.reducers";
import { saveOracleConfig } from "redux/workspace/workspace.reducers";
import { IRootState } from "redux/root-state.interface";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";

interface IOracleComponents {
  selectedElement: IWorkspaceElement;
}

const OracleComponents: FC<IOracleComponents> = ({ selectedElement }) => {
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
  };

  return (
    <section className="mt-3">
      <h6 className="setting-text ml-[0.5rem] mt-[2.5rem]">Output</h6>
      <div className="grid contract-input w-[13.5rem] mb-2 mx-2 px-2 py-1.5 mt-4 h-[2.5rem]">
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
            {oracleConfig.outputs[0] ? (
              <span className="flex">
                <span
                  className="cursor-pointer flex-1"
                  onClick={handleOutputSelector}
                >
                  {oracleConfig.outputs[0].id} - Connected
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
