export const gradientCheck = (color: string, background: boolean) => {
  if (background) {
    return color.slice(0, 15) === "linear-gradient" ? color : "transparent";
  } else {
    return color.slice(0, 15) === "linear-gradient" ? "transparent" : color;
  }
};
