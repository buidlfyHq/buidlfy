import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineAlignCenter } from 'react-icons/ai';
import { updateWorkspaceElementStyle } from 'redux/workspace/workspace.reducers';
import { ReplaceStyle } from 'components/utils/render-setting';
import WarningText from 'components/utils/setting-warning';
import 'styles/components.css';
import 'styles/dashboard.css';

interface ICombinedComponent {
  i: string;
  fontStyle: string;
  textDecoration: string;
  justifyContent: string;
  color: string;
}

const CombinedComponent: FC<ICombinedComponent> = ({ i, fontStyle, textDecoration, justifyContent, color }) => {
  const dispatch = useDispatch();

  const handleChange = (action: ReplaceStyle) => {
    if (action === ReplaceStyle.ITALIC) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: 'fontStyle',
          propertyValue: fontStyle === ReplaceStyle.ITALIC ? 'normal' : ReplaceStyle.ITALIC,
        }),
      );
    } else if (action === ReplaceStyle.UNDERLINE) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: 'textDecoration',
          propertyValue: textDecoration === ReplaceStyle.UNDERLINE ? 'none' : ReplaceStyle.UNDERLINE,
        }),
      );
    }
  };

  const handleAlignChange = (type: string) => {
    dispatch(
      updateWorkspaceElementStyle({
        settingItemId: i,
        propertyName: 'justifyContent',
        propertyValue: justifyContent === type ? 'inherit' : type,
      }),
    );
  };

  const gradientCondition = color?.indexOf('gradient') !== -1;
  const activeClassName = (property: string, propertyName: string) => (property === propertyName ? 'bg-[#CDD4F3]' : '');
  const propertyData = [
    {
      text: 'i',
      className: `italic ml-[10px] combined-style ${activeClassName(fontStyle, ReplaceStyle.ITALIC)}`,
      onclick: () => handleChange(ReplaceStyle.ITALIC),
    },
    {
      text: 'U',
      className: `underline combined-style ${activeClassName(textDecoration, ReplaceStyle.UNDERLINE)} `,
      onclick: () => handleChange(ReplaceStyle.UNDERLINE),
    },
    {
      text: <AiOutlineAlignLeft className="text-[16px]" />,
      className: `combined-style ${activeClassName(justifyContent, ReplaceStyle.LEFT)}`,
      onclick: () => handleAlignChange(ReplaceStyle.LEFT),
    },
    {
      text: <AiOutlineAlignCenter className="text-[16px]" />,
      className: `combined-style ${activeClassName(justifyContent, ReplaceStyle.CENTER)}`,
      onclick: () => handleAlignChange(ReplaceStyle.CENTER),
    },
    {
      text: <AiOutlineAlignRight className="text-[16px]" />,
      className: `combined-style ${activeClassName(justifyContent, ReplaceStyle.RIGHT)}`,
      onclick: () => handleAlignChange(ReplaceStyle.RIGHT),
    },
  ];

  return (
    <>
      <div className="flex grey-div w-auto mx-2 mb-3 items-center mt-2 text-black">
        {propertyData.map((value, i) => (
          <span key={i} onClick={value.onclick} className={value.className}>
            {value.text}
          </span>
        ))}
      </div>
      {gradientCondition ? <WarningText text="Sorry, You can't make underline gradient!" /> : null}
    </>
  );
};
export default CombinedComponent;
