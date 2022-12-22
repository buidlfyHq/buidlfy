import { FC, useState } from 'react';
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
  manualSizing: boolean;
}

const SizeComponent: FC<ISizeComponent> = ({ i, width, height, manualSizing }) => {
  const dispatch = useDispatch();
  const [manualToggle, setManualToggle] = useState<boolean>(manualSizing === false ? false : true);

  const handleSizing = () => {
    setManualToggle(!manualToggle);
    dispatch(
      updateWorkspaceImageElementStyle({
        settingItemId: i,
        propertyName: 'manualSizing',
        propertyValue: !manualToggle,
        imageSizeProperty: false,
      }),
    );
  };

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
    } else if (action === ReplaceStyle.INCREMENTWIDTH) {
      dispatch(
        updateWorkspaceImageElementStyle({
          settingItemId: i,
          propertyName: 'width',
          propertyValue: width - 1,
          imageSizeProperty: false,
        }),
      );
    } else if (action === ReplaceStyle.INCREMENTHEIGHT) {
      dispatch(
        updateWorkspaceImageElementStyle({
          settingItemId: i,
          propertyName: 'height',
          propertyValue: height - 1,
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
    <>
      <div className="flex py-1">
        <span className="margin-text grow text-left px-3 mt-[0.5rem] mb-0">Use Manual Sizing</span>
        <div className="flex ml-2 justify-center mt-1">
          <div onClick={handleSizing} className="form-check form-switch">
            <input
              className="form-check-input w-12 -ml-10 bg-blue rounded-full h-5 align-top cursor-pointer shadow-sm"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={manualToggle ? true : false}
              readOnly
            />
          </div>
        </div>
      </div>
      {manualToggle && (
        <SpaceInput
          heading="Sizing Options"
          text={['W', 'H']}
          value={[width, height]}
          handleChange={[
            (updatedWidth: number) => handleChange(ReplaceStyle.WIDTH, updatedWidth),
            (updatedHeight: number) => handleChange(ReplaceStyle.HEIGHT, undefined, updatedHeight),
          ]}
          handleIncrement={[() => handleChange(ReplaceStyle.INCREMENTWIDTH), () => handleChange(ReplaceStyle.INCREMENTHEIGHT)]}
          handleDecrement={[() => handleChange(ReplaceStyle.DECREMENTWIDTH), () => handleChange(ReplaceStyle.DECREMENTHEIGHT)]}
        />
      )}
    </>
  );
};
export default SizeComponent;
