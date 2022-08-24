import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IItems from "interfaces/items";
import ITemplate from "interfaces/template";
import "styles/components.css";

interface INew {
  setItems: (items: IItems[]) => void;
}
const Template: FC<INew> = ({ setItems }) => {
  const navigate = useNavigate();
  const [newTemp, setNewTemp] = useState<ITemplate[]>([]);
  useEffect(() => {
    const templates = localStorage.getItem("templates");
    const newTemplates = JSON.parse(templates);
    setNewTemp(newTemplates);
  }, []);
  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: IItems[]
  ) => {
    localStorage.removeItem("items");
    localStorage.setItem("items", JSON.stringify(value));
    setItems(value);
    // navigate("/dashboard", { replace: true });
  };

  return (
    <>
      <form className="flex items-center mb-5">
        <div className="relative mt-[6rem] mx-3 w-full">
          <div className="flex absolute inset-y-0 w-[3rem] right-[5px] items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="search rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-2.5  dark:bg-gray-700 dark:border-gray-600 "
            placeholder="Search"
            required
          />
        </div>
      </form>
      <div className="mx-9">
        <span className="badge mt-12 px-2.5 py-2.5">Default</span>
        <span className="badge ml-2.5 mt-12 px-2.5 py-2.5">Default</span>
        <span className="badge ml-2.5 mt-12 px-2.5 py-2.5">Default</span>
      </div>
      <div className="min-h-screen px-1 py-10 mt-2">
        <div className="grid grid-cols-2 gap-4">
          {newTemp &&
            newTemp?.map((temp: { name: string; value: IItems[]; image }) => {
              const { name, value, image } = temp;
              console.log(image, "image");
              return (
                <div
                  onClick={(e) => handleClick(e, value)}
                  className="cursor-pointer flex flex-col justify-center items-center"
                >
                  <img className="rounded-[0.25rem]" src={image} />
                  <div className="margin-text text-xs">{name}</div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Template;
