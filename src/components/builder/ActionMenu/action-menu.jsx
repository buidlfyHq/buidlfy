import React from "react";
// import styles from "../../styles/ActionMenu.module.scss";
import TrashIcon from "../../../images/trash.svg";

const MENU_WIDTH = 150;
const MENU_HEIGHT = 40;

const ActionMenu = ({ position, actions }) => {
  const x = position.x - MENU_WIDTH / 2;
  const y = position.y - MENU_HEIGHT - 10;

  return (
    <div
      className="absolute w-auto h-40 z-10"
      style={{
        top: y,
        left: x,
      }}
    >
      <div className="w-auto h-full bg-white rounded shadow flex items-center">
        <span
          id="turn-into"
          className="w-auto min-w-70 h-full hover:bg-white/80 flex justify-center items-center py-12 px-4 text-lg font-bold border border-white cursor-pointer"
          role="button"
          tabIndex="0"
          onClick={() => actions.turnInto()}
        >
          Turn into
        </span>
        <span
          id="delete"
          className="w-auto min-w-70 h-full hover:bg-white/80 flex justify-center items-center py-12 px-4 text-lg font-bold border border-white cursor-pointer"
          role="button"
          tabIndex="0"
          onClick={() => actions.deleteBlock()}
        >
          <img
            src={TrashIcon}
            alt="Trash Icon"
            className="w-full h-full max-w-16 max-h-18"
          />
        </span>
      </div>
    </div>
  );
};

export default ActionMenu;
