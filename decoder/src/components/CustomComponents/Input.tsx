import { FC } from "react";
import { setValue } from "../Utils/SetValue";
import "styles/Components.css";

interface IInput {
  id: string;
  name: string;
  value: any;
}

const Input: FC<{
  contractFunction: { id: string; name: string; inputName: string };
  inputValue: object[];
  setInputValue: (inputValue: object[]) => void;
}> = ({ contractFunction, inputValue, setInputValue }) => {
  const getValue = (inputArray) => {
    const requiredValue = inputArray.filter(
      (input: IInput) => input.id === contractFunction.id
    )[0];
    return requiredValue ? requiredValue.value : "";
  };

  // mapping: contractFunction: {name: 'createCampaign', inputName: 'input00'}
  // ---> {id: 'xyz', name: 'createCampaign', inputName: 'input00'}

  return (
    <div className="h-full flex justify-center items-center">
      <input
        className="input bg-white appearance-none ml-6 border border-solid rounded py-2 px-3 text-gray-700 leading-tight"
        id="input"
        type="text"
        placeholder="Input"
        value={getValue(inputValue)}
        onChange={(e) =>
          setInputValue(
            setValue(inputValue, contractFunction.id, contractFunction.inputName, e.target.value)
          )
        }
      />
    </div>
  );
};

export default Input;
