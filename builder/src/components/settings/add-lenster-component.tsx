import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShortUniqueId from 'short-unique-id';
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import WarningText from 'components/utils/setting-warning';
import { getPublication } from 'redux/lenster/lenster.actions';
import { updateWorkspaceElement } from 'redux/workspace/workspace.reducers';
import { removePublication, updateInputValue } from 'redux/lenster/lenster.reducers';
import { IRootState } from 'redux/root-state.interface';
import 'styles/components.css';

interface IAddLensterComponent {
  i: string;
}
const AddLensterComponent: FC<IAddLensterComponent> = ({ i }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state: IRootState) => state.lenster.publications);
  const savedPosts = useSelector((state: IRootState) => state.workspace.workspaceElements.find(workspaceElement => workspaceElement.i === i)?.posts);
  const [addInputs, setAddInputs] = useState<Array<any>>([]); // Derive better type for array
  const [isDuplicate, setIsDuplicate] = useState<Boolean>(false);
  console.log(posts, 'posts-add');
  console.log(savedPosts, 'savedPosts');
  console.log(addInputs, 'addInputs');

  const uid = new ShortUniqueId();
  useEffect(() => {
    const newAddInputs = [];
    const filterPost = savedPosts.filter(post => post.i === i);
    filterPost.map((post, key) => {
      newAddInputs.push({ i: i, id: post.id, value: post.name });
    });
    // dispatch(
    //   updateWorkspaceElement({
    //     settingItemId: i,
    //     propertyName: 'posts',
    //     propertyValue: filterPost,
    //   }),
    // );
    // const filterSavedPost = savedPosts.filter(savedPost => savedPost.i === i);
    // const allPosts = filterPost.concat(filterSavedPost);
    // const result = allPosts.filter((item, i) => allPosts.indexOf(item) === i);

    // console.log(result, 'result');

    // filterSavedPost.map((post, key) => {
    //   if (newAddInputs) {
    //     newAddInputs.push({ i: i, id: post.id, value: post.name });
    //   }
    // });
    setAddInputs(newAddInputs);
    // if (filterPost?.length > 0) {
    //   dispatch(
    //     updateWorkspaceElement({
    //       settingItemId: i,
    //       propertyName: 'posts',
    //       propertyValue: filterPost,
    //     }),
    //   );
    // }
    // if (addInputs?.length === 0) {
    //   dispatch(
    //     updateWorkspaceElement({
    //       settingItemId: i,
    //       propertyName: 'posts',
    //       propertyValue: [],
    //     }),
    //   );
    // }
  }, [savedPosts, i]);
  useEffect(() => {
    const newAddInputs = [];
    const filterPost = posts.filter(post => post.i === i);
    // filterPost.map((post, key) => {
    //   newAddInputs.push({ i: i, id: post.id, value: post.name });
    // });
    // dispatch(
    //   updateWorkspaceElement({
    //     settingItemId: i,
    //     propertyName: 'posts',
    //     propertyValue: filterPost,
    //   }),
    // );
    // const filterSavedPost = savedPosts.filter(savedPost => savedPost.i === i);
    // const allPosts = filterPost.concat(filterSavedPost);
    // const result = allPosts.filter((item, i) => allPosts.indexOf(item) === i);

    // console.log(result, 'result');

    // filterSavedPost.map((post, key) => {
    //   if (newAddInputs) {
    //     newAddInputs.push({ i: i, id: post.id, value: post.name });
    //   }
    // });
    // setAddInputs(newAddInputs);
    // if (filterPost?.length > 0) {
    dispatch(
      updateWorkspaceElement({
        settingItemId: i,
        propertyName: 'posts',
        propertyValue: filterPost,
      }),
    );
    // }
    // if (addInputs?.length === 0) {
    // dispatch(
    //   updateWorkspaceElement({
    //     settingItemId: i,
    //     propertyName: 'posts',
    //     propertyValue: [],
    //   }),
    // );
    // }
  }, [dispatch, i, posts]);
  useEffect(() => {
    const filterSavedPost = savedPosts.filter(savedPost => savedPost.i === i);
    // .filter((item, i) => savedPosts.findIndex(post => post.id === item.id) === i);

    filterSavedPost.map((post, key) => {
      const index = addInputs.findIndex(addInput => post.name === addInput.value);

      dispatch(
        getPublication({
          i: i,
          id: post.id,
          name: post.name,
        }),
      );
    });
  }, []);
  // useEffect(() => {
  //   const newAddInputs = [];
  //   // const filterPost = posts.filter(post => post.i === i);
  //   // filterPost.map((post, key) => {
  //   //   newAddInputs.push({ i: i, id: post.id, value: post.name });
  //   // });
  //   const filterSavedPost = savedPosts.filter(savedPost => savedPost.i === i);
  //   // const allPosts = filterPost.concat(filterSavedPost);
  //   // const result = allPosts.filter((item, i) => allPosts.indexOf(item) === i);

  //   // console.log(result, 'result');

  //   filterSavedPost.map((post, key) => {
  //     // const duplicateInput = addInputs.filter(addInput => addInput.value === post.name);
  //     // const duplicateInput = posts.filter(post => post.name === );
  //     // console.log(duplicateInput, 'duplicateInput');
  //     const duplicateInput = newAddInputs.some(newAddInput => newAddInput.name !== post.name);
  //     const duplicatePosts = newAddInputs.map(newAddInput => newAddInput.length === savedPosts.length);
  //     const duplicateInputs = newAddInputs.map(newAddInput => newAddInput.id === post.id);
  //     // const duplicateSavedPosts = posts.filter(post => post.id === );
  //     console.log(duplicateInputs, 'duplicateInputs');

  //     if (newAddInputs) {
  //       console.log(newAddInputs, 'newAddInputs');
  //       console.log(
  //         newAddInputs.some(newAddInput => newAddInput.name !== post.name),
  //         'newAddFilter',
  //       );
  //       console.log(
  //         newAddInputs.map(newAddInput => newAddInput.length === posts.length),
  //         'postfiltger',
  //       );

  //       newAddInputs.push({ i: i, id: post.id, value: post.name });
  //       // if (duplicateInputs.length < 0) {
  //       dispatch(
  //         getPublication({
  //           i: i,
  //           id: post.id,
  //           name: post.name,
  //         }),
  //       );
  //       // }
  //     }
  //   });
  //   setAddInputs(newAddInputs);
  //   // if (filterPost?.length > 0) {
  //   // dispatch(
  //   //   updateWorkspaceElement({
  //   //     settingItemId: i,
  //   //     propertyName: 'posts',
  //   //     propertyValue: allPosts,
  //   //   }),
  //   // );
  //   // }
  // }, []);
  const handleNewValue = (e: ChangeEvent<HTMLInputElement>, key: number) => {
    if (e.target.value.length > 0) {
      const duplicateInput = posts.filter(post => post.name === e.target.value);
      if (duplicateInput?.length > 0) {
        setIsDuplicate(true);
      } else {
        dispatch(
          getPublication({
            i: i,
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
    dispatch(removePublication({ publicationId: value }));
    const newInputs = [...addInputs];
    newInputs.splice(index, 1);
    console.log(newInputs.splice(index, 1), 'newInputs.splice(index, 1)');
    console.log(newInputs, 'newInputs');
    setAddInputs(newInputs);
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
