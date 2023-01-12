import { IContractElementSelected } from 'redux/contract/contract.interfaces';
import { IOracleConfig } from 'redux/oracle/oracle.interfaces';
import { IElementDetail, IUploadedImageData, IWorkspaceElement } from 'redux/workspace/workspace.interfaces';

// to find selected element
const findSelected = (element: IWorkspaceElement, settingItemId: string) => {
  return element.children?.find((child: IWorkspaceElement) => child.i === settingItemId);
};

// to find index of an element
const findIndex = (element: IWorkspaceElement, settingItemId: string) => {
  return element.children?.findIndex((c: IWorkspaceElement) => c.i === settingItemId);
};

export const mapElementsToWorkspace = (element: IWorkspaceElement, payload: IElementDetail) => {
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

export const mapElementStylesToWorkspace = (element: IWorkspaceElement, payload: IElementDetail) => {
  const { settingItemId, propertyName, propertyValue } = payload;
  let selectedChild = findSelected(element, settingItemId);

  if (element.i === settingItemId) {
    return {
      ...element,
      style: {
        ...element['style'],
        [propertyName]: propertyValue,
      },
    };
  } else if (selectedChild?.i === settingItemId) {
    let child = {
      ...selectedChild,
      style: {
        ...selectedChild['style'],
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

export const mapElementSubStyleToWorkspace = (element: IWorkspaceElement, payload: IElementDetail) => {
  const { settingItemId, propertyName, propertyValue, childPropertyName } = payload;
  let selectedChild = findSelected(element, settingItemId);

  if (element.i === settingItemId) {
    return {
      ...element,
      style: {
        ...element['style'],
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
        ...selectedChild['style'],
        [propertyName]: {
          ...selectedChild.style[propertyName],
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

export const mapImageElementStylesToWorkspace = (element: IWorkspaceElement, payload: IElementDetail) => {
  const { settingItemId, propertyName, propertyValue, imageSizeProperty } = payload;
  let selectedChild = findSelected(element, settingItemId);

  if (element.i === settingItemId) {
    return {
      ...element,
      style: {
        ...element['style'],
        isAuto: imageSizeProperty,
        [propertyName]: propertyValue,
      },
    };
  } else if (selectedChild?.i === settingItemId) {
    let child = {
      ...selectedChild,
      style: {
        ...selectedChild['style'],
        isAuto: imageSizeProperty,
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

export const fetchSelectedElement = (workspaceElements: IWorkspaceElement[], payload: string) => {
  const searchSelectedElement = workspaceElements?.find(element => element.i === payload);

  const searchSelectedChild = workspaceElements?.map(element => element.children?.find((child: IWorkspaceElement) => child.i === payload));
  const getSelectedChild = searchSelectedChild.filter(child => child)[0];

  return searchSelectedElement || getSelectedChild;
};

export const updateContractInElement = (
  workspaceElements: IWorkspaceElement[],
  selectedElement: IWorkspaceElement,
  payload: {
    contractElementSelected: IContractElementSelected;
    currentElement: {
      name: string;
      type: string;
      inputName?: string;
      inputValue?: string;
      getUserAddress?: boolean;
    };
  },
) => {
  const { contractElementSelected, currentElement } = payload;

  // filter last selected element
  // const filteredObject = contractElementSelected[currentElement?.name]?.filter((key: { buttonId: string }) => key.buttonId === selectedElement.i)[0];
  const filteredObject = contractElementSelected[currentElement?.name]?.filter((key: { buttonId: string }) => key.buttonId === selectedElement.i)[0];
  console.log(contractElementSelected[currentElement?.type], 'contractElementSelected[currentElement?.name]');

  let updatedContract = {};
  if (filteredObject?.id) {
    let duplicate = selectedElement.contract.inputs?.find((e: { id: string }) => e.id === filteredObject.id);
    if (!duplicate) {
      if (currentElement?.type === 'input') {
        updatedContract = {
          ...selectedElement.contract,
          inputs: [...selectedElement.contract.inputs, { id: filteredObject.id, name: currentElement.inputName, send: false }],
        };
      } else if (currentElement?.type === 'send') {
        updatedContract = {
          ...selectedElement.contract,
          inputs: [...selectedElement.contract.inputs, { id: filteredObject.id, send: true }],
        };
      } else if (currentElement?.type === 'output') {
        updatedContract = {
          ...selectedElement.contract,
          outputs: [...selectedElement.contract.outputs, { id: filteredObject.id }],
        };
      }
    } else {
      updatedContract = { ...selectedElement.contract };
    }
  } else {
    if (currentElement?.type === 'preInput') {
      updatedContract = {
        ...selectedElement.contract,
        inputs: [...selectedElement.contract.inputs, { name: currentElement.inputName, value: currentElement.inputValue, send: false }],
      };
    } else if (currentElement?.type === 'userAddress') {
      updatedContract = {
        ...selectedElement.contract,
        inputs: [...selectedElement.contract.inputs, { name: currentElement.inputName, userAddress: currentElement.getUserAddress, send: false }],
      };
    }
  }

  let updatedItem = {
    ...selectedElement,
    contract: updatedContract,
  };

  // search id in items
  const elementsIndex = workspaceElements.findIndex(item => item.i === selectedElement.i);

  if (elementsIndex === -1) {
    // search id in children
    const updatedItems = workspaceElements.map(item => {
      const childIndex = item.children?.findIndex((child: IWorkspaceElement) => child.i === selectedElement.i);
      let newArray = [...item?.children];
      newArray[childIndex] = updatedItem;
      return {
        ...item,
        children: newArray,
      };
    });

    return updatedItems;
  } else {
    let newArray = [...workspaceElements];
    newArray[elementsIndex] = updatedItem;
    return newArray;
  }
};

export const updateOracleInElement = (workspaceElements: IWorkspaceElement[], selectedElement: IWorkspaceElement, payload: IOracleConfig) => {
  // initialize contract
  let updatedElement = {
    ...selectedElement,
    oracle: payload,
  };

  // search id in elements
  const elementsIndex = workspaceElements.findIndex(element => element.i === selectedElement.i);

  if (elementsIndex === -1) {
    // search id in children
    const updatedElements = workspaceElements.map(element => {
      const childIndex = element?.children?.findIndex(child => child.i === selectedElement.i);
      if (childIndex) {
        let newArray = [...element.children];
        newArray[childIndex] = updatedElement;
        return {
          ...element,
          children: newArray,
        };
      }
      return element;
    });
    return updatedElements;
  } else {
    let newArray = [...workspaceElements];
    newArray[elementsIndex] = updatedElement;
    return newArray;
  }
};

export const fetchUploadedImageData = (settingItemId: string, uploadedImageData: string, uploadedImagesData: IUploadedImageData[]) => {
  const uploadedImageIndex = uploadedImagesData.findIndex(uploadImageData => uploadImageData.settingItemId === settingItemId);
  let newUploadedImagesData = [...uploadedImagesData];
  if (uploadedImageIndex >= 0) {
    newUploadedImagesData[uploadedImageIndex] = {
      ...newUploadedImagesData[uploadedImageIndex],
      uploadedImageData,
    };
    return newUploadedImagesData;
  }
  newUploadedImagesData.push({ settingItemId, uploadedImageData });
  return newUploadedImagesData;
};
