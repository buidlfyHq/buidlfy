import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkspaceElement } from 'redux/workspace/workspace.reducers';
import ButtonSettings from 'components/dashboard/button-settings';
import ImageSettings from 'components/dashboard/image-settings';
import ContainerSettings from 'components/dashboard/container-settings';
import InputSettings from 'components/dashboard/input-settings';
import GeneralSettings from 'components/dashboard/general-settings';
import { IRootState } from 'redux/root-state.interface';
import { ISettings } from 'redux/workspace/workspace.interfaces';
import { getPublication } from 'redux/widget/widget.actions';
import { removePublication, updateInputValue } from 'redux/widget/widget.reducers';
import { IoMdAdd } from 'react-icons/io';
import ShortUniqueId from 'short-unique-id';
import 'styles/components.css';
import 'styles/dashboard.css';
import { AiOutlineClose, AiOutlineMinus } from 'react-icons/ai';
import WarningText from './setting-warning';

export enum ReplaceValue {
  INCREMENT = 'increment',
  DECREMENT = 'decrement',
  CHANGE = 'change',
}
export enum ReplaceSpacingValue {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
  INCREMENTLEFT = 'incrementLeft',
  INCREMENTRIGHT = 'incrementRight',
  INCREMENTTOP = 'incrementTop',
  INCREMENTBOTTOM = 'incrementBottom',
  DECREMENTLEFT = 'decrementLeft',
  DECREMENTRIGHT = 'decrementRight',
  DECREMENTTOP = 'decrementTop',
  DECREMENTBOTTOM = 'decrementBottom',
}
export enum ReplaceStyle {
  BOLD = 'bold',
  ITALIC = 'italic',
  UNDERLINE = 'underline',
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
  SMALL = '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  MEDIUM = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  LARGE = '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  TRUE = 'true',
  FALSE = 'false',
  COVER = 'cover',
  CONTAIN = 'contain',
  AUTO = 'auto',
  WIDTH = 'width',
  HEIGHT = 'height',
  INCREMENTWIDTH = 'incrementWidth',
  INCREMENTHEIGHT = 'incrementHeight',
  DECREMENTWIDTH = 'decrementWidth',
  DECREMENTHEIGHT = 'decrementHeight',
}

const SettingComponent: FC<ISettings> = ({ openTab, setOpenTab }) => {
  const dispatch = useDispatch();
  const postIds = useSelector((state: IRootState) => state.widget.publications);
  const selectedElement = useSelector((state: IRootState) => state.workspace.selectedElement);
  const [addInputs, setAddInputs] = useState<Array<any>>([]);
  const [isDuplicate, setIsDuplicate] = useState<Boolean>(false);
  useEffect(() => {
    const newAddInputs = [];
    postIds.map((postId, key) => {
      newAddInputs.push({ id: postId.id, value: postId.name });
    });
    setAddInputs(newAddInputs);
  }, []);
  const handleNewValue = (e: ChangeEvent<HTMLInputElement>, key: number) => {
    if (e.target.value.length > 0) {
      const duplicateInput = postIds.filter(postId => postId.name === e.target.value);
      if (duplicateInput?.length > 0) {
        setIsDuplicate(true);
      } else {
        dispatch(
          getPublication({
            id: addInputs[key].id,
            name: e.target.value,
          }),
        );
        setIsDuplicate(false);
        const newAddInputs = [...addInputs];
        newAddInputs[key].value = e.target.value;
        setAddInputs(newAddInputs);
        dispatch(updateInputValue(true));
      }
    } else {
      dispatch(updateInputValue(false));
    }
  };
  const uid = new ShortUniqueId();

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, propertyName: string) => {
    dispatch(
      updateWorkspaceElement({
        settingItemId: selectedElement.i,
        propertyName,
        propertyValue: e.target.value,
      }),
    );
  };

  const handleAddInput = () => {
    const inputId = uid();
    setAddInputs([
      ...addInputs,
      {
        id: inputId,
        value: '',
      },
    ]);
  };
  const handleRemoveInput = (value: string, index: number) => {
    // const newInput = addInputs.splice(index, 1);
    const newInputs = [...addInputs];
    newInputs.splice(index, 1);
    setAddInputs(newInputs);
    dispatch(removePublication({ publicationId: value }));
  };

  switch (selectedElement.name) {
    case 'Button':
      return <ButtonSettings handleSettingChange={handleSettingChange} openTab={openTab} setOpenTab={setOpenTab} />;
    case 'Image':
      return <ImageSettings handleSettingChange={handleSettingChange} />;

    case 'Container':
    case 'Horizontal Container':
    case 'Vertical Container':
      return <ContainerSettings />;
    case 'Lenster Card':
      return (
        <>
          <h3 className="ml-[0.5rem] mt-[1.5rem]">{selectedElement ? <span className="setting-text">{selectedElement.name}</span> : null}</h3>
          <div className="items-center mx-2 mt-1 w-[13.5rem] text-black">
            {addInputs.map((addInput, i) => {
              return (
                <div className="flex">
                  <input
                    key={i}
                    id={addInput.id}
                    value={addInput.value}
                    onChange={e => handleNewValue(e, i)}
                    className="changeText input-text mt-[0.7rem] h-[2.2rem] pl-[0.5rem]"
                    placeholder="Please write your text here..."
                  />
                  <span
                    onClick={() => handleRemoveInput(addInput.value, i)}
                    className="mt-[1rem] mr-[0.7rem] cursor-pointer flex items-center justify-end text-[9px] text-right underline"
                  >
                    <AiOutlineClose className="text-[1rem] ml-[2px]" />
                  </span>
                </div>
              );
            })}
            {isDuplicate ? (
              <div className="ml-0 mt-[1rem]">
                <WarningText text="Post Already Exists" />
              </div>
            ) : null}
          </div>
          <div className="flex justify-end">
            <span
              onClick={handleAddInput}
              className="text-[#458CDE] mt-[1rem] mr-[0.7rem] cursor-pointer flex items-center justify-end text-[9px] text-right underline"
            >
              <IoMdAdd className="text-[7px] ml-[2px]" />
              Add Input
            </span>
          </div>
        </>
      );
    case 'Lenster Layout':
      return <h3 className="ml-[0.5rem] mt-[1.5rem]">{selectedElement ? <span className="setting-text">{selectedElement.name}</span> : null}</h3>;
    case 'Input':
      return <InputSettings handleSettingChange={handleSettingChange} />;

    default:
      return <GeneralSettings handleSettingChange={handleSettingChange} />;
  }
};

export default SettingComponent;
