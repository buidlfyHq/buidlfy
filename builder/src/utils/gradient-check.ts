export const gradientCheck = (color: string, background: boolean) => {
  const gradientCondition = color.slice(0, 15) === "linear-gradient" || color.slice(0, 15) ===  "radial-gradient"
  if (background) {
    return gradientCondition ? color : "transparent";
  } else {
    return gradientCondition ? "transparent" : color;
  }
};
