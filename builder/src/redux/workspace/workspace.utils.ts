import { IPayload } from "redux/workspace/workspace.interfaces";
import IWorkspace from "interfaces/workspace";

// to find selected element
const findSelected = (element: IWorkspace, settingItemId: string) => {
  return element.children?.find(
    (child: IWorkspace) => child.i === settingItemId
  );
};

// to find index of an element
const findIndex = (element: IWorkspace, settingItemId: string) => {
  return element.children?.findIndex((c: IWorkspace) => c.i === settingItemId);
};

export const mapElementsToWorkspace = (
  element: IWorkspace,
  payload: IPayload
) => {
  const { settingItemId, propertyName, propertyValue } = payload;
  let selectedChild = findSelected(element, settingItemId);

  if (element.i === settingItemId) {
    return { ...element, [propertyName]: propertyValue };
  } else if (selectedChild?.i === settingItemId) {
    let child = {
      ...selectedChild,
      [propertyName]: propertyValue,
    };

    const childIndex = findIndex(element, settingItemId);
    let newChildren = [...element.children];
    newChildren[childIndex] = child;
    return { ...element, children: newChildren };
  }
  return element;
};

export const mapElementStylesToWorkspace = (
  element: IWorkspace,
  payload: IPayload
) => {
  const { settingItemId, propertyName, propertyValue } = payload;
  let selectedChild = findSelected(element, settingItemId);

  if (element.i === settingItemId) {
    return {
      ...element,
      style: {
        ...element["style"],
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

    const childIndex = findIndex(element, settingItemId);
    let newChildren = [...element.children];
    newChildren[childIndex] = child;
    return { ...element, children: newChildren };
  }
  return element;
};

export const mapElementSubStyleToWorkspace = (
  element: IWorkspace,
  payload: IPayload
) => {
  const { settingItemId, propertyName, propertyValue, childPropertyName } =
    payload;
  let selectedChild = findSelected(element, settingItemId);

  if (element.i === settingItemId) {
    return {
      ...element,
      style: {
        ...element["style"],
        [propertyName]: {
          ...element.style[propertyName],
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
          ...element.style[propertyName],
          [childPropertyName]: propertyValue,
        },
      },
    };

    const childIndex = findIndex(element, settingItemId);
    let newChildren = [...element.children];
    newChildren[childIndex] = child;
    return { ...element, children: newChildren };
  }
  return element;
};
