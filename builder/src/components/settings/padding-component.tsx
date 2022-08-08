import React, { FC } from "react";
import "styles/components.css";
import "styles/dashboard.css";

interface IPaddingComponent {
  padding?: {
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
  };
  setPaddingTop?: (paddingTop: number) => void;
  setPaddingRight?: (paddingRight: number) => void;
  setPaddingBottom?: (paddingBottom: number) => void;
  setPaddingLeft?: (paddingLeft: number) => void;
}

const PaddingComponent: FC<IPaddingComponent> = ({
  padding,
  setPaddingTop,
  setPaddingRight,
  setPaddingBottom,
  setPaddingLeft,
}) => {
  const handlePaddingTop = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaddingTop(+e.target.value);
  };

  const handlePaddingRight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaddingRight(+e.target.value);
  };

  const handlePaddingBottom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaddingBottom(+e.target.value);
  };

  const handlePaddingLeft = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaddingLeft(+e.target.value);
  };

  return (
    <main className="flex items-center w-full px-3 py-2 text-gray-600">
      <section className="px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
        <span>Padding</span>
        <aside className="flex">
          <div>
            <label htmlFor="padding-top" className="text-sm">
              Top
            </label>
            <input
              type="number"
              id="padding-top"
              name="paddingTop"
              value={padding?.paddingTop}
              placeholder="top"
              className="form-select appearance-none block w-[70px] pl-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handlePaddingTop}
            />
          </div>
          <div className="ml-10">
            <label htmlFor="padding-right" className="text-sm">
              Right
            </label>
            <input
              type="number"
              id="padding-right"
              name="paddingRight"
              value={padding?.paddingRight}
              placeholder="right"
              className="form-select appearance-none block w-[70px] pl-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handlePaddingRight}
            />
          </div>
        </aside>
        <aside className="flex mt-1">
          <div>
            <label htmlFor="padding-bottom" className="text-sm">
              Bottom
            </label>
            <input
              type="number"
              id="padding-bottom"
              name="paddingBottom"
              value={padding?.paddingBottom}
              placeholder="bottom"
              className="form-select appearance-none block w-[70px] pl-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handlePaddingBottom}
            />
          </div>
          <div className="ml-10">
            <label htmlFor="padding-left" className="text-sm">
              Left
            </label>
            <input
              type="number"
              id="padding-left"
              name="paddingLeft"
              value={padding?.paddingLeft}
              placeholder="left"
              className="form-select appearance-none block w-[70px] pl-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handlePaddingLeft}
            />
          </div>
        </aside>
      </section>
    </main>
  );
};
export default PaddingComponent;
