import React, { useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import { updateWorkspaceElementStyle, updateWorkspaceNFTLayoutElements } from 'redux/workspace/workspace.reducers';
import ColorPickerDropdown from 'components/utils/color-picker';
import 'styles/components.css';
import 'styles/dashboard.css';
import { IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import { useSelector } from 'react-redux';
import { IRootState } from 'redux/root-state.interface';

interface IColorComponent {
  i: string;
  color: string;
  name?: string;
}

const ColorComponent: FC<IColorComponent> = ({ i, color, name }) => {
  const dispatch = useDispatch();
  const selectedElement: IWorkspaceElement = useSelector((state: IRootState) => state.workspace.selectedElement);
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

  const handleChange = (e: string) => {
    selectedElement.name === 'NFT Card' || selectedElement.name === 'NFT Layout'
      ? dispatch(
          updateWorkspaceNFTLayoutElements({
            settingItemId: i,
            propertyName: 'color',
            propertyValue: e,
          }),
        )
      : dispatch(
          updateWorkspaceElementStyle({
            settingItemId: i,
            propertyName: 'color',
            propertyValue: e,
          }),
        );
  };

  const isElement = !!i;
  const hideGradient = name === 'Input';
  return (
    <ColorPickerDropdown
      name="Color"
      value={color}
      handleChange={handleChange}
      displayColorPicker={displayColorPicker}
      setDisplayColorPicker={setDisplayColorPicker}
      isElement={isElement}
      hideGradient={hideGradient}
    />
  );
};

export default ColorComponent;
