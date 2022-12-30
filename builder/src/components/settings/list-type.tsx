import { FC } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { ReplaceValue } from 'components/utils/render-setting';
import { listOptions } from 'components/utils/list-option';
import { fontStyles } from 'components/utils/font-family-styles';
import { updateWorkspaceElementStyle } from 'redux/workspace/workspace.reducers';
import 'styles/components.css';
import 'styles/dashboard.css';

interface IListTypeComponent {
  i: string;
  listType: string;
}

const ListTypeComponent: FC<IListTypeComponent> = ({ i }) => {
  const dispatch = useDispatch();
  const handleListType = (action: ReplaceValue, value: string) => {
    if (action === ReplaceValue.CHANGE) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: 'listType',
          propertyValue: value,
        }),
      );
    }
  };

  const onChange = (option: { value: string }) => {
    handleListType(ReplaceValue.CHANGE, option.value);
  };

  return (
    <div className="px-1 py-4">
      <div className="ml-3 margin-text flex w-[135px] mt-[5px] items-center">List Type</div>
      <Select
        onChange={onChange}
        defaultValue={listOptions[0]}
        className="ml-[8px] mt-4 w-[13.5rem] text-black"
        name="font-family"
        options={listOptions}
        maxMenuHeight={200}
        styles={fontStyles}
      />
    </div>
  );
};
export default ListTypeComponent;
