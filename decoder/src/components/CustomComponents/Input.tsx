import { FC } from "react";
import { setValue } from "../Utils/SetValue";
import "styles/Components.css";

interface IInput {
  id: string;
  value: any;
}

const Input: FC<{
  id: string;
  inputValue: object[];
  borderRadius: number;
  shadow: any;
  setInputValue: (inputValue: object[]) => void;
}> = ({ id, inputValue, setInputValue, borderRadius, shadow }) => {
  const getValue = (inputArray) => {
    const requiredValue = inputArray.filter(
      (input: IInput) => input.id === id
    )[0];
    return requiredValue ? requiredValue.value : "";
  };

  // mapping: contractFunction: {methodName: 'createCampaign'}
  // ---> {id: 'xyz', methodName: 'createCampaign'}

  return (
    <div className="h-full flex justify-center items-center">
      <input
        className="w-full px-3 py-2 ml-6 mr-6 leading-tight text-gray-700 bg-white border border-solid appearance-none input"
        id="input"
        style={{ borderRadius: `${borderRadius}px`, boxShadow: shadow }}
        type="text"
        placeholder="Input"
        value={getValue(inputValue)}
        onChange={(e) =>
          setInputValue(setValue(inputValue, id, e.target.value))
        }
      />
    </div>
  );
};

export default Input;
