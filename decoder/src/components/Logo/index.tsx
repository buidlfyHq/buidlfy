import { FC } from "react";

interface LogoProps {
  heading: string;
}
const Logo: FC<LogoProps> = ({ heading }: LogoProps) => {
  return (
    <>
      <a href="#0">
        <h2>{heading}</h2>
        {/* <img className="h-8 w-auto sm:h-10" src={config.navbar.logo} alt="" /> */}
      </a>
    </>
  );
};

export default Logo;
