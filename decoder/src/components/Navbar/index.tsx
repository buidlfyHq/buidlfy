import React, { FC, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import BuilderConfig from "./config";
import Logo from "../Logo";
import Button from "../Button";
import ConnectWallet from "../ConnectWallet";
import MenuItems from "../MenuItems";

const NavComponent: FC<{ account; setAccount }> = ({ account, setAccount }) => {
  const config = BuilderConfig;
  console.log(config);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(10, 1fr)",
        gridTemplateRows: `repeat(6, 1fr)`,
      }}
    >
      {config.builder.map((c) => (
        // 1 - check height and position according to that
        // 2 - check width and position according to that
        <div
          key={c.i}
          style={{
            fontWeight: c.styles.fontWeight,
            fontStyle: c.styles.fontStyle,
            textDecoration: c.styles.textDecoration,
            color: `rgba(${c.styles.color.r}, ${c.styles.color.g}, ${c.styles.color.b}, ${c.styles.color.a})`,
            display: "flex",
            justifyContent: c.styles.justifyContent,
            fontSize: `${c.styles.fontSize}px`,
            gridColumn: `span ${c.w} / span ${c.w}`,
            height: `${c.h*48}px`
          }}
        >
          {c.value}
        </div>
      ))}
    </div>
  );
};

export default NavComponent;
