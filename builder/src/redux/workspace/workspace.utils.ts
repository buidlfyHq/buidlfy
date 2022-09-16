import {
  IElementDetail,
  IWorkspaceElement,
} from "redux/workspace/workspace.interfaces";

// to find selected element
const findSelected = (element: IWorkspaceElement, settingItemId: string) => {
  return element.children?.find(
    (child: IWorkspaceElement) => child.i === settingItemId
  );
};

// to find index of an element
const findIndex = (element: IWorkspaceElement, settingItemId: string) => {
  return element.children?.findIndex(
    (c: IWorkspaceElement) => c.i === settingItemId
  );
};

export const mapElementsToWorkspace = (
  element: IWorkspaceElement,
  payload: IElementDetail
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
  element: IWorkspaceElement,
  payload: IElementDetail
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
  element: IWorkspaceElement,
  payload: IElementDetail
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

export const fetchSelectedElement = (
  workspaceElements: IWorkspaceElement[],
  payload: string
) => {
  return (
    workspaceElements?.find((element) => element.i === payload) ||
    workspaceElements?.map((element) =>
      element.children?.find((child: IWorkspaceElement) => child.i === payload)
    )[0]
  );
};
