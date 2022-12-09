import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { updateWorkspaceImageElementStyle } from 'redux/workspace/workspace.reducers';
import { ReplaceStyle } from 'components/utils/render-setting';
import SpaceInput from 'components/utils/input/space-input';
import 'styles/dashboard.css';
import 'styles/components.css';

interface ISizeComponent {
  i: string;
  width: number;
  height: number;
}

const SizeComponent: FC<ISizeComponent> = ({ i, width, height }) => {
  const dispatch = useDispatch();

  const handleChange = (action: ReplaceStyle, updatedWidth?: number, updatedHeight?: number) => {
    if (action === ReplaceStyle.WIDTH) {
      dispatch(
        updateWorkspaceImageElementStyle({
          settingItemId: i,
          propertyName: 'width',
          propertyValue: updatedWidth,
          imageSizeProperty: false,
        }),
      );
    } else if (action === ReplaceStyle.HEIGHT) {
      dispatch(
        updateWorkspaceImageElementStyle({
          settingItemId: i,
          propertyName: 'height',
          propertyValue: updatedHeight,
          imageSizeProperty: false,
        }),
      );
    } else if (action === ReplaceStyle.DECREMENTWIDTH) {
      dispatch(
        updateWorkspaceImageElementStyle({
          settingItemId: i,
          propertyName: 'width',
          propertyValue: width - 1,
          imageSizeProperty: false,
        }),
      );
    } else if (action === ReplaceStyle.DECREMENTHEIGHT) {
      dispatch(
        updateWorkspaceImageElementStyle({
          settingItemId: i,
          propertyName: 'height',
          propertyValue: height - 1,
          imageSizeProperty: false,
        }),
      );
    }
  };

  return (
    <SpaceInput
      heading="Sizing Options"
      text={['W', 'H']}
      value={[width, height]}
      handleChange={[
        (updatedWidth: number) => handleChange(ReplaceStyle.WIDTH, updatedWidth),
        (updatedHeight: number) => handleChange(ReplaceStyle.HEIGHT, undefined, updatedHeight),
      ]}
      handleDecrement={[() => handleChange(ReplaceStyle.DECREMENTWIDTH), () => handleChange(ReplaceStyle.DECREMENTHEIGHT)]}
    />
  );
};
export default SizeComponent;
