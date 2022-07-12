import { createContext } from "react";

interface ComponentContext {
  newComp: string;
  setNewComp: (newComp: string) => void;
}

export const ComponentContext = createContext<ComponentContext>({
  newComp: "",
  setNewComp: () => [],
});
