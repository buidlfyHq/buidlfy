export const getCurrentTime = () => {
  const date = new Date();
  return Math.floor(date.valueOf() / 1000);
};