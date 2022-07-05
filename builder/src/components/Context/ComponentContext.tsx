import { createContext } from "react";

interface ComponentContext {
  newComp: string;
  setNewComp: any;
}

export const ComponentContext = createContext<ComponentContext>({
  newComp: "",
  setNewComp: () => [],
});
