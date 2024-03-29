import { FC } from 'react';
import ArrowInput from './arrow-input';

interface ISpaceInput {
  heading: string;
  text: string[];
  value: number[];
  handleChange: ((updatedSpace: number) => void)[];
  handleIncrement?: (() => void)[];
  handleDecrement: (() => void)[];
}

const SpaceInput: FC<ISpaceInput> = ({ heading, text, value, handleChange, handleIncrement, handleDecrement }) => {
  return (
    <div className="flex items-center w-full px-3 py-4 text-gray-600">
      <span className="px-1 text-left">
        <span className="margin-text">{heading}</span>
        <div className="grid mt-3 margin-grid">
          {Array.from(Array(text.length).keys())?.map((i: string | number) => {
            return (
              <div key={i} className="flex">
                <h6 className="mr-2 margin-subtext">{text[i]}</h6>
                <ArrowInput
                  value={value[i]}
                  handleChange={handleChange[i]}
                  handleIncrement={handleIncrement && handleIncrement[i]}
                  handleDecrement={handleDecrement[i]}
                />
              </div>
            );
          })}
        </div>
      </span>
    </div>
  );
};

export default SpaceInput;
