import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { updateWorkspaceElementStyle } from 'redux/workspace/workspace.reducers';
import { ReplaceValue } from 'components/utils/render-setting';
import NumberInput from 'components/utils/input/number-input';
import WarningText from 'components/utils/setting-warning';
import 'styles/components.css';
import 'styles/dashboard.css';

interface IBorderRadiusComponent {
  i: string;
  borderRadius: number;
  borderColor?: string;
}

const BorderRadiusComponent: FC<IBorderRadiusComponent> = ({ i, borderRadius, borderColor }) => {
  const dispatch = useDispatch();

  const handleRadius = (action: ReplaceValue, updatedBorderRadius?: number) => {
    if (action === ReplaceValue.INCREMENT) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: 'borderRadius',
          propertyValue: borderRadius + 1,
        }),
      );
    } else if (action === ReplaceValue.DECREMENT) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: 'borderRadius',
          propertyValue: borderRadius <= 0 ? 0 : borderRadius - 1,
        }),
      );
    } else if (action === ReplaceValue.CHANGE) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: 'borderRadius',
          propertyValue: updatedBorderRadius,
        }),
      );
    }
  };

  const borderGradientCondition = borderColor ? borderColor?.indexOf('gradient') !== -1 : null;
  return (
    <>
      <NumberInput
        disableInput={borderGradientCondition}
        text="Border Radius"
        value={borderRadius}
        handleChange={(updatedBorderRadius: number) => handleRadius(ReplaceValue.CHANGE, updatedBorderRadius)}
        handleIncrement={() => handleRadius(ReplaceValue.INCREMENT)}
        handleDecrement={() => handleRadius(ReplaceValue.DECREMENT)}
      />
      {borderGradientCondition ? <WarningText text="Sorry, Border gradient and border radius cannot be use together!" /> : null}
    </>
  );
};
export default BorderRadiusComponent;
