import IItems from "interfaces/items";

// work under progress for its type as it is breaking for different files usage of checkContainer
export const containerCheck = (item: any) => {
  return (
    item.name === "Container" ||
    item.name === "Horizontal Container" ||
    item.name === "Vertical Container"
  );
};
