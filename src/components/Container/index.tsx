import React, { FC } from "react";
import "../../styles/Components.css";
import { Popover } from "@headlessui/react";

// interface ContainerProps {
//   heading: string;
// }

const Container: FC = () => {
  return (
    <>
      <Popover className="relative bg-white">
        <div className="max-w-9xl mx-auto px-1 sm:px-1">
          <div className="flex justify-between px-4 items-center border-2 border-gray-100 py-6 md:justify-start md:space-x-10"></div>
        </div>
      </Popover>
    </>
  );
};

<<<<<<< HEAD
export default Container;
=======
export default Container;
>>>>>>> 6066ae04bd451b39c59312d6e597ae4ea6b4e893
