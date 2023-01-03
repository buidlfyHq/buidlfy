import React, { useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkspaceBackgroundColor, updateWorkspaceElementStyle, updateWorkspaceNFTLayoutElements } from 'redux/workspace/workspace.reducers';
import ColorPickerDropdown from 'components/utils/color-picker';
import 'styles/components.css';
import 'styles/dashboard.css';
import { IUploadedImageData, IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import { IRootState } from 'redux/root-state.interface';
import WarningText from 'components/utils/setting-warning';

interface IBgColorComponent {
  i?: string;
  name?: string;
  elementBackgroundColor?: string;
  workspaceBackgroundColor?: string;
}

const BgColorComponent: FC<IBgColorComponent> = ({ i, name, elementBackgroundColor, workspaceBackgroundColor }) => {
  const dispatch = useDispatch();
  const selectedElement: IWorkspaceElement = useSelector((state: IRootState) => state.workspace.selectedElement);
  const imageData: IUploadedImageData = useSelector((state: IRootState) =>
    state.workspace.uploadedImagesData.find((image: IUploadedImageData) => image.settingItemId === i),
  );
  const color = workspaceBackgroundColor ? workspaceBackgroundColor : elementBackgroundColor;

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const handleChange = (e: string) => {
    if (workspaceBackgroundColor) {
      dispatch(updateWorkspaceBackgroundColor(e));
    } else {
      selectedElement.name === 'NFT Card' || selectedElement.name === 'NFT Layout'
        ? dispatch(
            updateWorkspaceNFTLayoutElements({
              settingItemId: i,
              propertyName: 'backgroundColor',
              propertyValue: e,
            }),
          )
        : dispatch(
            updateWorkspaceElementStyle({
              settingItemId: i,
              propertyName: 'backgroundColor',
              propertyValue: e,
            }),
          );
    }
  };

  const isElement = !!i;

  const colorDropdown = (
    <ColorPickerDropdown
      name="Background Color"
      value={color}
      handleChange={handleChange}
      displayColorPicker={displayColorPicker}
      setDisplayColorPicker={setDisplayColorPicker}
      isElement={isElement}
    />
  );
  return (
    <>
      {name === 'Container' ? (
        <>{!imageData?.uploadedImageData ? colorDropdown : <WarningText text="Background Image and background Color cannot be use together!" />}</>
      ) : (
        colorDropdown
      )}
    </>
  );
};

export default BgColorComponent;
