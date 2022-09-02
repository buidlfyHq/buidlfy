import React, { FC } from "react";
import "styles/components.css";
import "styles/dashboard.css";

interface IMarginComponent {
  margin?: {
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
  };
  setMarginTop?: (marginTop: number) => void;
  setMarginRight?: (marginRight: number) => void;
  setMarginBottom?: (marginBottom: number) => void;
  setMarginLeft?: (marginLeft: number) => void;
}

const MarginComponent: FC<IMarginComponent> = ({
  margin,
  setMarginTop,
  setMarginRight,
  setMarginBottom,
  setMarginLeft,
}) => {
  const handleMarginTop = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarginTop(+e.target.value);
  };

  const handleMarginRight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarginRight(+e.target.value);
  };

  const handleMarginBottom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarginBottom(+e.target.value);
  };

  const handleMarginLeft = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarginLeft(+e.target.value);
  };

  return (
    <main className="flex items-center w-full px-3 py-2 text-gray-600">
      <section className="px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
        <span>Margin</span>
        <aside className="flex">
          <div>
            <label htmlFor="margin-top" className="text-sm">
              Top
            </label>
            <input
              type="number"
              id="margin-top"
              name="marginTop"
              value={margin?.marginTop}
              placeholder="top"
              className="form-select appearance-none block w-[70px] pl-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handleMarginTop}
            />
          </div>
          <div className="ml-10">
            <label htmlFor="margin-right" className="text-sm">
              Right
            </label>
            <input
              type="number"
              id="margin-right"
              name="marginRight"
              value={margin?.marginRight}
              placeholder="right"
              className="form-select appearance-none block w-[70px] pl-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handleMarginRight}
            />
          </div>
        </aside>
        <aside className="flex mt-1">
          <div>
            <label htmlFor="margin-bottom" className="text-sm">
              Bottom
            </label>
            <input
              type="number"
              id="margin-bottom"
              name="marginBottom"
              value={margin?.marginBottom}
              placeholder="bottom"
              className="form-select appearance-none block w-[70px] pl-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handleMarginBottom}
            />
          </div>
          <div className="ml-10">
            <label htmlFor="margin-left" className="text-sm">
              Left
            </label>
            <input
              type="number"
              id="margin-left"
              name="marginLeft"
              value={margin?.marginLeft}
              placeholder="left"
              className="form-select appearance-none block w-[70px] pl-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handleMarginLeft}
            />
          </div>
        </aside>
      </section>
    </main>
  );
};
export default MarginComponent;
