import { FC } from "react";

interface Menu {
  link: string;
  name: string;
}
interface MenuProps {
  menus: Menu[];
}

const MenuItems: FC<MenuProps> = ({ menus }: MenuProps) => {
  return (
    <>
      {menus?.map((menu: any, i) => (
        <a
          key={i}
          href={menu.link}
          className="text-base font-medium text-gray-500 hover:text-gray-900"
        >
          {menu.name}
        </a>
      ))}
    </>
  );
};

export default MenuItems;
