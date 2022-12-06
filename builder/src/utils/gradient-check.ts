export const gradientCheck = (color: string, background: boolean) => {
  const gradientCondition = color?.indexOf('gradient') !== -1;
  if (background) {
    return gradientCondition ? color : 'transparent';
  } else {
    return gradientCondition ? 'transparent' : color;
  }
};
