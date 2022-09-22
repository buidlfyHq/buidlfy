export const setNewArray = (prevArray, data) => {
  const newArray = [...prevArray];

  newArray.push(data);

  return newArray;
};
