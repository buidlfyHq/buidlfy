import { FC } from "react";
import { Dialog } from "@headlessui/react";
import ColorPicker from "react-best-gradient-color-picker";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import "styles/components.css";
import "styles/dashboard.css";

interface IColorPicker {
  name: string;
  value: string;
  handleChange: (e: string) => void;
  displayColorPicker: boolean;
  setDisplayColorPicker: (displayColorPicker: boolean) => void;
  isElement?: boolean;
  hideGradient?: boolean;
}

const ColorPickerDropdown: FC<IColorPicker> = ({
  name,
  value,
  handleChange,
  displayColorPicker,
  setDisplayColorPicker,
  isElement,
  hideGradient,
}) => {
  return (
    <main
      className="py-4 text-gray-600"
      style={{ width: "-webkit-fill-available" }}
    >
      <section className="px-1 mx-2">
        <div className="flex">
          <div className="flex px-1 margin-text grow">{name}</div>
          <div
            onClick={() => setDisplayColorPicker(true)}
            className="flex items-center cursor-pointer"
          >
            <div
              style={{
                background: value,
              }}
              className="w-10 h-5 mr-2 rounded border border-solid border-[#e9edfd]"
            ></div>
            {displayColorPicker ? (
              <AiOutlineCaretUp className="arrow text-[12px]" />
            ) : (
              <AiOutlineCaretDown className="arrow text-[12px]" />
            )}
          </div>
        </div>
      </section>
      {displayColorPicker ? (
        <Dialog
          as="div"
          className={`fixed py-[15px] z-100 overflow-none bg-white shadow-lg ${
            isElement
              ? "top-[220px] right-[260px] bottom-[1px]"
              : "top-[150px] right-[20px] bottom-[70px]"
          }`}
          open={displayColorPicker}
          onClose={() => setDisplayColorPicker(false)}
        >
          <div className="px-4 text-right ">
            <div onClick={() => setDisplayColorPicker(false)} />
            <ColorPicker
              hideEyeDrop={false}
              hideInputType={false}
              hideColorGuide={false}
              hideAdvancedSliders={false}
              hideControls={hideGradient}
              value={value}
              onChange={handleChange}
            />
          </div>
        </Dialog>
      ) : null}
    </main>
  );
};

export default ColorPickerDropdown;
