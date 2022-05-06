import { useState } from "react";
import CloseIcon from "../../../images/close.svg";

const Notice = ({ children, status, mini, dismissible, style }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div
      style={{ ...style }}
      className={[
        "relative w-fit m-4 py-8 px-8 rounded bg-white text-orange shadow",
        isVisible !== true ? "hidden" : null,
        status === "SUCCESS" ? "bg-white/90 text-grey" : null,
        status === "ERROR" ? "bg-white/70 text-red" : null,
        mini ? "p-16" : null,
      ].join(" ")}
    >
      {dismissible && (
        <span
          role="button"
          tabIndex="0"
          className="absolute top-2 right-2 w-4 h-4 flex justify-center items-center"
          onClick={() => setIsVisible(false)}
        >
          <img src={CloseIcon} alt="close icon" className="w-full max-w-16 h-full max-h-16" />
        </span>
      )}
      {children}
    </div>
  );
};

export default Notice;
