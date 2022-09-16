import { IPayload } from "redux/workspace/workspace.interfaces";
import IItems from "interfaces/items";

// to find selected element
const findSelected = (item: IItems, settingItemId: string) => {
  return item.children?.find((child: IItems) => child.i === settingItemId);
};

// to find index of an element
const findIndex = (item: IItems, settingItemId: string) => {
  return item.children?.findIndex((c: IItems) => c.i === settingItemId);
};

export const mapElementsToWorkspace = (item: IItems, payload: IPayload) => {
  const { settingItemId, propertyName, propertyValue } = payload;
  let selectedChild = findSelected(item, settingItemId);

  if (item.i === settingItemId) {
    return { ...item, [propertyName]: propertyValue };
  } else if (selectedChild?.i === settingItemId) {
    let child = {
      ...selectedChild,
      [propertyName]: propertyValue,
    };

    const childIndex = findIndex(item, settingItemId);
    let newChildren = [...item.children];
    newChildren[childIndex] = child;
    return { ...item, children: newChildren };
  }
  return item;
};

export const mapElementStylesToWorkspace = (
  item: IItems,
  payload: IPayload
) => {
  const { settingItemId, propertyName, propertyValue } = payload;
  let selectedChild = findSelected(item, settingItemId);

  if (item.i === settingItemId) {
    return {
      ...item,
      style: {
        ...item["style"],
        [propertyName]: propertyValue,
      },
    };
  } else if (selectedChild?.i === settingItemId) {
    let child = {
      ...selectedChild,
      style: {
        ...selectedChild["style"],
        [propertyName]: propertyValue,
      },
    };

    const childIndex = findIndex(item, settingItemId);
    let newChildren = [...item.children];
    newChildren[childIndex] = child;
    return { ...item, children: newChildren };
  }
  return item;
};

export const mapElementSubStyleToWorkspace = (
  item: IItems,
  payload: IPayload
) => {
  const { settingItemId, propertyName, propertyValue, childPropertyName } =
    payload;
  let selectedChild = findSelected(item, settingItemId);

  if (item.i === settingItemId) {
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
  } else if (selectedChild?.i === settingItemId) {
    let child = {
      ...selectedChild,
      style: {
        ...selectedChild["style"],
        [propertyName]: {
          ...item.style[propertyName],
          [childPropertyName]: propertyValue,
        },
      },
    };

    const childIndex = findIndex(item, settingItemId);
    let newChildren = [...item.children];
    newChildren[childIndex] = child;
    return { ...item, children: newChildren };
  }
  return item;
};
