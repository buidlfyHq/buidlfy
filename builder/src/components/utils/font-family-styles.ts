import { StylesConfig } from "react-select";

export const fontStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    fontSize: "12px",
    width: "100%",
    outline: "1px solid rgb(207, 203, 203)",
    border: "0px solid rgb(207, 203, 203)",

    boxShadow: "0 0 0 1px rgb(207, 203, 203)",
    transition: "none",
    cursor: "pointer",
    ":hover": {
      ...styles[":hover"],
      border: "0.2px solid rgb(233, 226, 226)",
      outline: "1.4px solid rgb(233, 226, 226)",
      transition: "none",
      boxShadow: "0 0 0 1px rgb(207, 203, 203)",
    },
  }),
  option: (styles) => {
    return {
      ...styles,
      backgroundColor: "white",
      fontSize: "12px",
      color: "#403F41",
      cursor: "pointer",
      ":hover": {
        ...styles[":hover"],
        backgroundColor: "#F9FAFB",
      },
    };
  },
  indicatorSeparator: (styles) => {
    return {
      ...styles,
      display: "none",
    };
  },
};
