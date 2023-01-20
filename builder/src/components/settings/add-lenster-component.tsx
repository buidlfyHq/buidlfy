import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShortUniqueId from 'short-unique-id';
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import WarningText from 'components/utils/setting-warning';
import { fetchPublicationAsync } from 'redux/lenster/lenster.thunk-actions';
import { updateWorkspaceElement } from 'redux/workspace/workspace.reducers';
import { updateInputValue } from 'redux/lenster/lenster.reducers';
import { IRootState } from 'redux/root-state.interface';
import 'styles/components.css';

interface IAddLensterComponent {
  i: string;
}
const AddLensterComponent: FC<IAddLensterComponent> = ({ i }) => {
  const dispatch = useDispatch();
  const savedPosts = useSelector((state: IRootState) => state.workspace.workspaceElements.find(workspaceElement => workspaceElement.i === i)?.posts);
  const [addInputs, setAddInputs] = useState<Array<any>>([]); // Derive better type for array
  const [isDuplicate, setIsDuplicate] = useState<Boolean>(false);

  const uid = new ShortUniqueId();
  const filterSavedPost = savedPosts.filter(savedPost => savedPost.i === i);

  useEffect(() => {
    const newAddInputs = [];
    filterSavedPost.map(post => {
      const duplicatePost = addInputs.filter(addInput => addInput.value === addInput.value);
      newAddInputs.push({ i: i, id: post.id, value: post.name });
      return post;
    });
    setAddInputs(newAddInputs);
  }, [savedPosts, i]);

  const handleNewValue = (e: ChangeEvent<HTMLInputElement>, key: number) => {
    if (e.target.value.length > 0) {
      const duplicateInput = savedPosts.filter(post => post.name === e.target.value);
      if (duplicateInput?.length > 0) {
        setIsDuplicate(true);
      } else {
        dispatch(
          fetchPublicationAsync({
            i,
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

  const handleAddInput = () => {
    const inputId = uid();
    setAddInputs([
      ...addInputs,
      {
        i: i,
        id: inputId,
        value: '',
      },
    ]);
  };

  const handleRemoveInput = (value: string, index: number) => {
    const newInputs = [...addInputs];
    newInputs.splice(index, 1);
    setAddInputs(newInputs);
    const publicationIndex = savedPosts.findIndex(pub => pub.name === value);
    const newPublications = [...savedPosts];
    newPublications.splice(publicationIndex, 1);
    dispatch(
      updateWorkspaceElement({
        settingItemId: i,
        propertyName: 'posts',
        propertyValue: newPublications,
      }),
    );
  };

  return (
    <>
      <div className="items-center mx-2 mt-1 w-[13.5rem] text-black">
        {addInputs
          .filter(addInput => addInput.i === i)
          .filter((item, i) => addInputs.findIndex(post => post.id === item.id) === i)
          .map((addInput, i) => {
            return (
              <div className="flex">
                <input
                  key={i}
                  id={addInput.id}
                  value={addInput.value}
                  onChange={e => handleNewValue(e, i)}
                  className="changeText input-text mt-[0.7rem] h-[2.2rem] pl-[0.5rem]"
                  placeholder="Add Post Id"
                />
                <span
                  onClick={() => handleRemoveInput(addInput.value, i)}
                  className="mt-[1rem] mr-[0.7rem] cursor-pointer flex items-center justify-end text-[9px] text-right underline"
                >
                  <AiOutlineCloseCircle className="text-[1rem] text-[#504F82] ml-[20px] cursor-pointer hover:text-[#100F11]" />
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
};

export default AddLensterComponent;
