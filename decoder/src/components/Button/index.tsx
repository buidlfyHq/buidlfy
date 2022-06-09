import { FC } from "react";

interface ButtonProps {
  text: string;
  link: string;
}

const Button: FC<ButtonProps> = ({ text, link }: ButtonProps) => {
  return (
    <div>
      <a
        href={link}
        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {text}
      </a>
    </div>
  );
};

export default Button;
