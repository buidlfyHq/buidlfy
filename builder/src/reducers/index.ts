import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "reducers/itemsReducer";
import contractReducer from "reducers/contractReducer";
import selectorReducer from "reducers/selectorReducer";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    contract: contractReducer,
    selector: selectorReducer,
  },
});
