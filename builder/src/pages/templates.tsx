import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IItems from "interfaces/items";
import ITemplate from "interfaces/template";

const Template: FC = () => {
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
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen px-20 py-10">
      <div className="grid grid-cols-2 gap-4">
        {newTemp &&
          newTemp?.map((temp: { name: string; value: IItems[] }) => {
            const { name, value } = temp;
            return (
              <div
                onClick={(e) => handleClick(e, value)}
                className="border cursor-pointer shadow-md flex flex-col py-4 px-8 justify-center items-center"
              >
                <div className="text-2xl">{name}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Template;
