import { INotification } from "./notification.interfaces";

export const setNewArray = (prevArray: INotification[], data: INotification) => {
  const newArray = [...prevArray];
  newArray.push(data);
  return newArray;
};
