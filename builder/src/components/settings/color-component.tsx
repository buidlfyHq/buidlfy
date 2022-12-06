import React, { useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import { updateWorkspaceElementStyle } from 'redux/workspace/workspace.reducers';
import ColorPickerDropdown from 'components/utils/color-picker';
import 'styles/components.css';
import 'styles/dashboard.css';

interface IColorComponent {
  i: string;
  color: string;
  name?: string;
}

const ColorComponent: FC<IColorComponent> = ({ i, color, name }) => {
  const dispatch = useDispatch();
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

  const handleChange = (e: string) => {
    dispatch(
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
