import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShortUniqueId from 'short-unique-id';
import { RiCloseFill } from 'react-icons/ri';
import WarningText from 'components/utils/setting-warning';
import { getPublication } from 'redux/lenster/lenster.actions';
import { updateWorkspaceElement } from 'redux/workspace/workspace.reducers';
import { updateInputValue } from 'redux/lenster/lenster.reducers';
import { IRootState } from 'redux/root-state.interface';
import InputCheckboxIcon from 'assets/icons/input-checkbox.png';
import RightArrowIcon from 'assets/icons/right-arrow-icon.png';
import PlusIcon from 'assets/icons/plus.png';
import 'styles/components.css';

interface IAddLensterComponent {
  i: string;
}

const AddLensterComponent: FC<IAddLensterComponent> = ({ i }) => {
  const dispatch = useDispatch();
  const uid = new ShortUniqueId();
  // get posts from state which is []
  const savedPosts = useSelector((state: IRootState) => state.workspace.workspaceElements.find(workspaceElement => workspaceElement.i === i)?.posts);
  // temp arr for adding posts
  const [addInputs, setAddInputs] = useState<Array<any>>([]); // Derive better type for array
  // check for duplicate post
  const [isDuplicate, setIsDuplicate] = useState<Boolean>(false);
  //  filtering lenster posts for selected lenster widget
  const filterSavedPost = savedPosts.filter(savedPost => savedPost.i === i);

  useEffect(() => {
    const newAddInputs = [];
    filterSavedPost.map(post => {
      const duplicatePost = addInputs.filter(addInput => addInput.value === addInput.value);
      const error = !post.profileId;
      newAddInputs.push({ i: i, id: post.id, value: post.name, verified: true, error });
    });
    setAddInputs(newAddInputs);
  }, [savedPosts, i]);

  // handles change of text value in input fields
  const handleInputValueChange = (e, id: number) => {
    const newAddInputs = [...addInputs];
    newAddInputs[id].value = e.target.value;
    setAddInputs(newAddInputs);
  };

  // checks for the post authenticity and duplicate value
  const handleNewValue = (e, key: number) => {
    if (addInputs[key].value.length > 0) {
      const duplicateInput = savedPosts.filter(post => post.name === addInputs[key].value);
      if (duplicateInput?.length > 0) {
        setIsDuplicate(true);
      } else {
        dispatch(
          getPublication({
            i: i,
            id: addInputs[key].id,
            name: addInputs[key].value,
          }),
        );
        setIsDuplicate(false);
        dispatch(updateInputValue(true));
      }
    } else {
      dispatch(updateInputValue(false));
    }
  };

  // adds single input field
  const handleAddInput = () => {
    const inputId = uid();
    setAddInputs([
      ...addInputs,
      {
        i: i,
        id: inputId,
        value: '',
        verified: false,
        error: false,
      },
    ]);
  };

  // removes and input field
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
        <div className="text-[#100F11] font-[600] text-[14px] mt-6">Add Lenster Post Id</div>
        {addInputs
          .filter(addInput => addInput.i === i)
          .filter((item, i) => addInputs.findIndex(post => post.id === item.id) === i)
          .map((addInput, i) => {
            const { id, value, verified, error } = addInput;
            return (
              <div className="flex flex-col ">
                <div className="flex items-center justify-center gap-2 mt-2">
                  <input
                    key={i}
                    id={id}
                    value={value}
                    onChange={e => handleInputValueChange(e, i)}
                    className={`${error && 'border border-[#F04438]'} lenster-input p-2 text-[#667085] text-[12.5px] outline-none w-full relative`}
                    placeholder="Add Post Id"
                  />
                  {verified && !error && (
                    <span className="absolute right-[4.5rem]">
                      <img src={InputCheckboxIcon} alt="icon" width={14} height={14} />
                    </span>
                  )}
                  {verified ? (
                    <span
                      onClick={() => handleRemoveInput(addInput.value, i)}
                      className="flex items-center justify-center p-3 cursor-pointer lenster-input"
                    >
                      <RiCloseFill className="text-[14px]" />
                    </span>
                  ) : (
                    <span onClick={e => handleNewValue(e, i)} className="flex items-center justify-center p-3 cursor-pointer lenster-input">
                      <img src={RightArrowIcon} alt="icon" width={14} height={14} />
                    </span>
                  )}
                </div>
                {error && <div className="text-[12px] mt-1 text-[#F04438]">Invalid Post ID</div>}
              </div>
            );
          })}
        {isDuplicate ? (
          <div className="mt-[1rem]">
            <WarningText text="Post Already Exists" />
          </div>
        ) : null}
      </div>
      <div
        onClick={handleAddInput}
        className="flex items-center justify-center hover:text-white cursor-pointer gap-2 py-2 px-3.5 border border-[#D0D5DD] rounded-[8px] w-[13.5rem] m-2"
      >
        <span className="gradient-text text-[14px] font-[600]">Add Input</span>
        <img src={PlusIcon} alt="icon" />
      </div>
    </>
  );
};

export default AddLensterComponent;
