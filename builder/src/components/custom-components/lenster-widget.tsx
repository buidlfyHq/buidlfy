import useScript from "hooks/use-script";
import { FC, useEffect } from "react";
import "styles/components.css";

interface ILensterWidget {
  i: string;
  backgroundColor: string;
}

const LensterWidget: FC<ILensterWidget> = ({ i }) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://embed.withlens.app/script.js";
    script.async = true;
    // const node = document.getElementById(i);
    // node.appendChild(script);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const frames = [
    {
      code: 0xf5 - 0x17,
    },
    {
      code: 0xf5 - 0x17,
    },
    {
      code: 0xf5 - 0x17,
    },
    {
      code: 0xf5 - 0x17,
    },
    {
      code: 0xf5 - 0x17,
    },
    {
      code: 0xf5 - 0x17,
    },
    {
      code: 0xf5 - 0x17,
    },
    {
      code: 0xf5 - 0x17,
    },
    {
      code: 0xf5 - 0x17,
    },
    {
      code: 0xf5 - 0x17,
    },
    {
      code: 0xf5 - 0x17,
    },
    {
      code: 0xf5 - 0x17,
    },
    {
      code: 0xf5 - 0x17,
    },
    {
      code: 0xf5 - 0x17,
    },
  ];
  return (
    <div className="lenster-div">
      <iframe
        className="w-[100%] h-[100%]"
        src="https://embed.withlens.app/embed/0x1d6e-0x055c"
      />
      <iframe
        className="w-[100%] h-[100%]"
        src="https://embed.withlens.app/embed/0xf5-0x17"
      />{" "}
      <iframe
        className="w-[100%] h-[100%]"
        src="https://embed.withlens.app/embed/0x5866-0x0a74"
      />{" "}
      <iframe
        className="w-[100%] h-[100%]"
        src="https://embed.withlens.app/embed/0x30fb-0x61"
      />{" "}
      <iframe
        className="w-[100%] h-[100%]"
        src="https://embed.withlens.app/embed/0x1d6e-0x055c"
      />
      <iframe
        className="w-[100%] h-[100%]"
        src="https://embed.withlens.app/embed/0xf5-0x17"
      />{" "}
      <iframe
        className="w-[100%] h-[100%]"
        src="https://embed.withlens.app/embed/0x5866-0x0a74"
      />{" "}
      <iframe
        className="w-[100%] h-[100%]"
        src="https://embed.withlens.app/embed/0x30fb-0x61"
      />{" "}
    </div>
  );
};

export default LensterWidget;
