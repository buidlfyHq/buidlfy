import { createSlice } from "@reduxjs/toolkit";
import IColor from "interfaces/color";
import IItems from "interfaces/items";

interface IAction {
  payload: {
    level: number;
    settingItemId: string;
    propertyName: string;
    propertyValue: string | number | IColor;
    childPropertyName?: string;
  };
}

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    updateItems(state, action: IAction) {
      const {
        level,
        settingItemId,
        propertyName,
        propertyValue,
        childPropertyName,
      } = action.payload;

      if (!settingItemId) {
        return;
      }

      const updatedItems = state.map((item) => {
        let selectedChild = item.children?.find(
          (child: IItems) => child.i === settingItemId
        );
        if (item.i === settingItemId) {
          switch (level) {
            case 0:
              return { ...item, [propertyName]: propertyValue };
            case 1:
              return {
                ...item,
                style: {
                  ...item["style"],
                  [propertyName]: propertyValue,
                },
              };
            case 2:
              return {
                ...item,
                style: {
                  ...item["style"],
                  [propertyName]: {
                    ...item.style[propertyName],
                    [childPropertyName]: propertyValue,
                  },
                },
              };
            default:
              return item;
          }
        } else if (selectedChild?.i === settingItemId) {
          let child: IItems;
          switch (level) {
            case 0:
              child = {
                ...selectedChild,
                [propertyName]: propertyValue,
              };
              break;
            case 1:
              child = {
                ...selectedChild,
                style: {
                  ...selectedChild["style"],
                  [propertyName]: propertyValue,
                },
              };
              break;
            case 2:
              child = {
                ...selectedChild,
                style: {
                  ...selectedChild["style"],
                  [propertyName]: {
                    ...item.style[propertyName],
                    [childPropertyName]: propertyValue,
                  },
                },
              };
              break;
            default:
              break;
          }

          const childIndex = item.children?.findIndex(
            (c: IItems) => c.i === settingItemId
          );
          let newChildren = [...item.children];
          newChildren[childIndex] = child;

          return {
            ...item,
            children: newChildren,
          };
        }
        return item;
      });
      return updatedItems;
    },
    updateItemsArray(state, action: { payload: IItems[] }) {
      return action.payload;
    },
  },
});

export const { updateItems, updateItemsArray } = itemsSlice.actions;
export default itemsSlice.reducer;
