import React, { useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import { updateWorkspaceElementStyle } from 'redux/workspace/workspace.reducers';
import ColorPickerDropdown from 'components/utils/color-picker';
import 'styles/components.css';
import 'styles/dashboard.css';

interface IBorderColorComponent {
  i: string;
  borderColor: string;
  name?: string;
}

const BorderColorComponent: FC<IBorderColorComponent> = ({ i, borderColor, name }) => {
  const dispatch = useDispatch();
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const handleChange = (e: string) => {
    dispatch(
      updateWorkspaceElementStyle({
        settingItemId: i,
        propertyName: 'borderColor',
        propertyValue: e,
      }),
    );
  };

  const isElement = !!i;
  const hideGradient = name === 'Divider';

  return (
    <ColorPickerDropdown
      name="Border Color"
      value={borderColor}
      handleChange={handleChange}
      displayColorPicker={displayColorPicker}
      setDisplayColorPicker={setDisplayColorPicker}
      isElement={isElement}
      hideGradient={hideGradient}
    />
  );
};

export default BorderColorComponent;
