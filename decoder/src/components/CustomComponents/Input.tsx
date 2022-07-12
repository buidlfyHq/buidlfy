import { FC } from "react";
import { setValue } from "../Utils/SetValue";
import "styles/Components.css";

interface IInput {
  id: string;
  value: any;
  color: any;
}

const Input: FC<{
  id: string;
  inputValue: object[];
  borderRadius: number;
  shadow: any;
  color: any;
  setInputValue: (inputValue: object[]) => void;
}> = ({ id, inputValue, setInputValue, borderRadius, shadow, color }) => {
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
        style={{
          borderRadius: `${borderRadius}px`,
          boxShadow: shadow,
          border: "1px solid",
          borderColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        }}
        className="w-full px-3 py-2 ml-6 mr-6 leading-tight text-gray-700 bg-white appearance-none input"
        id="input"
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
