import React, { useState, FC, useRef, useEffect } from "react";
import { VscSymbolColor } from "react-icons/vsc";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { SketchPicker } from "react-color";
import ColorPicker, { useColorPicker } from "react-best-gradient-color-picker";
import IColor from "interfaces/color";
import "styles/components.css";
import "styles/dashboard.css";
import IItems from "interfaces/items";
import { Dialog } from "@headlessui/react";

interface IBgColorComponent {
  color: IColor;
  setBgColor: (color: IColor) => void;
}

const BgColorComponent: FC<IBgColorComponent> = ({ color, setBgColor }) => {
  const [tryColor, setTryColor] = useState(
    "linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)"
  );
  // console.log(tryColor, "tryColor");
  const { valueToHex, setA, rgbaArr } = useColorPicker(tryColor, setTryColor);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [hexColor, setHexColor] = useState();
  // const ref = useRef<HTMLDivElement>();

  // useEffect(() => {
  //   // FIX: find a suitable type for this event
  //   const handleOutsideClick = (event) => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       setDisplayColorPicker(false);
  //     }
  //   };
  //   document.addEventListener("click", handleOutsideClick);
  //   return () => document.removeEventListener("click", handleOutsideClick);
  // }, [ref]);
  // console.log(tryColor, "tryColor");
  // const [color, setColor] = useState('linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)');
  // const {
  //   gradientType,
  //   setLinear,
  //   setRadial,
  //   addPoint,
  //   deletePoint,
  //   degrees,
  //   setDegrees,
  //   setPointLeft,
  //   currentLeft,
  //   selectedPoint,
  // } = useColorPicker(tryColor, setTryColor);

  // useEffect(() => {}, []);
  // const valueToHex = () => {
  //   setTryColor("");
  // };
  const hexString = valueToHex();
  // useEffect(() => {}, [hexString]);
  const handleClick = () => {
    setDisplayColorPicker(true);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: { rgb: IColor; hex }) => {
    if (!color) {
      return;
    }
    setBgColor(color.rgb);
    // setHexColor(color.hex);
  };
  const handleHexChange = () => {
    // if (!tryColor) {
    //   return;
    // }
    // setBgColor(tryColor.rgb);
    // setHexColor(tryColor.valueToHex);
  };
  const opacity = Number(`${color.a}`);
  let newOpacity = opacity * 100;
  if (newOpacity == 10000) {
    newOpacity = 100;
  }
  const newColor = { ...color };
  const handleOpacity = (e) => {
    newColor.a = Number(e.target.value) / 100;
    setBgColor(newColor);
  };
  const handleNewOpacity = (e) => {
    let newTry = Number(e.target.value) * 100;
    // setA(newTry);
  };
  const incrementCounter = () => {
    let newIncrement = newOpacity + 1;
    newColor.a = Number(newIncrement) / 100;
    setBgColor(newColor);
  };

  const decrementCounter = () => {
    let newDecrement = newOpacity - 1;
    newColor.a = Number(newDecrement) / 100;
    setBgColor(newColor);
  };
  // let hexTryColor = setHexColor({tryColor.valueToHex})
  // console.log(hexString, "hexColor");
  // console.log(setA, "setA");
  return (
    <div
      // ref={ref}
      onClick={handleClick}
      className={`flex flex-col justify-center items-start py-2 text-gray-600`}
    >
      <div className="items-center mx-2 py-2">
        {/* <VscSymbolColor className="text-[18px] mr-3" /> */}
        <div className="flex">
          <span className="margin-text grow px-1 my-1 text-xl not-italic font-normal text-gray-500 font-regular">
            Background Color
          </span>
          <div
            // ref={ref}
            onClick={handleClick}
            className="flex items-center cursor-pointer"
          >
            <div
              style={{
                background: tryColor,
                // backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
              }}
              className="flex w-10 h-5 mr-2 rounded border border-solid border-[#e9edfd]"
            ></div>
            <AiOutlineCaretDown className="text-[14px] mr-3" />
          </div>
        </div>
        <div className="flex mt-5">
          <input
            type="text"
            value={hexString}
            // value={hexColor}
            placeholder="#000000"
            className="margin-form pl-2 py-0.5 form-select appearance-none block w-[110px] mr-5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
            // onChange={valueToHex}
          />
          <input
            inputMode="numeric"
            // value={`${newOpacity}%`}
            placeholder="100%"
            className="margin-form pl-2 py-0.5 form-select appearance-none block w-[80px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
            // onChange={(e) => handleOpacity(e)}
            value={`${rgbaArr[3] * 100}%`}
            onChange={(e) => handleNewOpacity(e)}
          />
          <AiOutlineCaretUp
            onClick={incrementCounter}
            className="text-[10px] z-[100] absolute left-[13.2rem] text-black mt-[0.4rem]"
          />
          <AiOutlineCaretDown
            onClick={decrementCounter}
            className="text-[10px] z-[100] absolute left-[13.2rem] mt-[1rem] text-black"
          />
        </div>
      </div>

      {displayColorPicker ? (
        <Dialog
          as="div"
          className="absolute top-[220px] right-[260px] bottom-[1px] py-[15px] z-100 overflow-none bg-white shadow-lg"
          open={displayColorPicker}
          onClose={() => setDisplayColorPicker(false)}
        >
          <div className=" px-4 text-right">
            {/* This element is to trick the browser into centering the modal contents. */}
            {/* <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span> */}

            {/* Use the overlay to style a dim backdrop for your dialog */}
            {/* <Dialog.Overlay className="fixed inset-0 bg-black opacity-10" /> */}

            {/* Dialog Content */}

            <div>
              <div onClick={handleClose} />
              {/* <button onClick={setSolid}>Solid</button>
              <button onClick={setGradient}>Gradient</button> */}

              <ColorPicker
                // hideEyeDrop="false"
                // hideInputType="false"
                // hideColorGuide="false"
                // hideAdvancedSliders="false"
                value={tryColor}
                onChange={setTryColor}
                // setSolid="true"
              />
            </div>
          </div>
        </Dialog>
      ) : // <div>
      //   <div onClick={handleClose} />
      //   <button onClick={setSolid}>Solid</button>
      //   <button onClick={setGradient}>Gradient</button>
      //   <ColorPicker value={color} onChange={setBgColor} />
      // </div>
      // <>
      //   <div onClick={handleClose} />
      //   <SketchPicker color={color} onChange={handleChange} />
      // </>
      null}
    </div>
  );
};

export default BgColorComponent;
