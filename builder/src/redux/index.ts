import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "redux/itemsReducer";
import contractReducer from "redux/contractReducer";
import selectorReducer from "redux/selectorReducer";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    contract: contractReducer,
    selector: selectorReducer,
  },
});
