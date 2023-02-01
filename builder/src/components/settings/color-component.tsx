import React, { useState, FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateWorkspaceElementStyle, updateWorkspaceNFTLayoutElements } from 'redux/workspace/workspace.reducers';
import ColorPickerDropdown from 'components/utils/color-picker';
import { IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import { useSelector } from 'react-redux';
import { IRootState } from 'redux/root-state.interface';
import { INftCardThemes } from 'config/nft-layout-values';
import 'styles/components.css';
import 'styles/dashboard.css';

interface IColorComponent {
  i: string;
  color?: string;
  name?: string;
  cardTheme?: INftCardThemes;
}

const ColorComponent: FC<IColorComponent> = ({ i, color, name, cardTheme }) => {
  const dispatch = useDispatch();
  const selectedElement: IWorkspaceElement = useSelector((state: IRootState) => state.workspace.selectedElement);
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  useEffect(() => {
    cardTheme &&
      dispatch(
        updateWorkspaceNFTLayoutElements({
          settingItemId: i,
          propertyName: 'color',
          propertyValue: cardTheme?.colors?.secondary,
        }),
      );
  }, [cardTheme]);
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
    <>
      {!cardTheme && (
        <ColorPickerDropdown
          name="Color"
          value={color}
          handleChange={handleChange}
          displayColorPicker={displayColorPicker}
          setDisplayColorPicker={setDisplayColorPicker}
          isElement={isElement}
          hideGradient={hideGradient}
        />
      )}
    </>
  );
};

export default ColorComponent;
