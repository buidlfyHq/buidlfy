import { Dialog } from '@headlessui/react';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import { IoMdAdd, IoMdLink } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'redux/root-state.interface';
import { IList, IListValue } from 'redux/workspace/workspace.interfaces';
import { updateListValue } from 'redux/workspace/workspace.reducers';
import ShortUniqueId from 'short-unique-id';
// import { useDispatch, useSelector } from 'react-redux';
// import { IRootState } from 'redux/root-state.interface';
// import { IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
// import { getPublication } from 'redux/lenster/lenster.actions';
// import { removePublication, updateInputValue } from 'redux/lenster/lenster.reducers';
// import ShortUniqueId from 'short-unique-id';
// import { AiOutlineCloseCircle } from 'react-icons/ai';
// import WarningText from 'components/utils/setting-warning';
// import { IoMdAdd, IoMdLink } from 'react-icons/io';
// import 'styles/components.css';

interface IListOptionsComponent {
  handleSettingChange?: any;
  i: string;
}
const ListOptionsComponent: FC<IListOptionsComponent> = ({}) => {
  const [isLinkVisible, setIsLinkVisible] = useState<Array<any>>([]);
  const [listText, setListText] = useState<string>('');
  const [listLink, setListLink] = useState<string>('');
  const [listDivs, setListDivs] = useState<Array<any>>([]);
  const dispatch = useDispatch();
  const lists: IList[] = useSelector((state: IRootState) => state.workspace.listValue);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    console.log(e, 'e');
    const newLists = [...lists];
    console.log(newLists, 'newLists');
    const findListIndex = newLists.findIndex(newList => key === newList.id);
    console.log(newLists[findListIndex], 'findListIndex');
    console.log(e.target.value, 'e.target');

    newLists[findListIndex] = { ...newLists[findListIndex], value: e.target.value };
    console.log(newLists, 'newLists-after');

    dispatch(updateListValue(newLists));
    // setListText(e.target.value);
    console.log(listText, 'listText');
  };
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    console.log(e, 'e');
    const newLists = [...lists];
    console.log(newLists, 'newLists');
    const findListIndex = newLists.findIndex(newList => key === newList.id);
    console.log(newLists[findListIndex], 'findListIndex');
    console.log(e.target.value, 'e.target');

    newLists[findListIndex] = { ...newLists[findListIndex], link: e.target.value };
    console.log(newLists, 'newLists-after');

    dispatch(updateListValue(newLists));
    // setListText(e.target.value);
    console.log(listText, 'listText');
  };

  const handleLink = (i: number) => {
    const linkVisible = [...isLinkVisible];
    linkVisible[i] = true;
    setIsLinkVisible(linkVisible);
  };

  const handleListDiv = () => {
    const uid = new ShortUniqueId();
    const listId = uid();
    const newLists = [
      ...lists,
      {
        id: listId,
        value: listText,
        link: listLink,
      },
    ];
    // setListDivs(newLists);
    dispatch(updateListValue(newLists));
    console.log(listDivs, 'listDiv');
  };

  useEffect(() => {
    // dispatch(updateListValue(listDivs));
  }, [listDivs]);
  return (
    <>
      <div className="px-1 py-4">
        <div className="ml-3 margin-text flex w-[135px] mt-[5px] items-center">Manage Options</div>
        {lists.map((list, i) => {
          return (
            <div key={i}>
              <div className="flex items-center mt-4 mx-2 w-[13.5rem] text-black">
                <input
                  id={list.id}
                  value={list.value}
                  onChange={e => handleTextChange(e, list.id)}
                  className="changeText pl-[10px] py-[0.4rem] input-text"
                  type="text"
                  placeholder="Add Text"
                />
                <div onClick={() => handleLink(i)} className="list-link-div px-[0.35rem] py-[0.38rem] ml-2 cursor-pointer">
                  <BsLink45Deg className="text-[20px] text-[#6A58E7]" />
                </div>
              </div>
              {isLinkVisible[i] ? (
                <div key={i} className="flex items-center mt-4 mx-2 w-[13.5rem] text-black">
                  <input
                    id={list.id}
                    value={list.link}
                    onChange={e => handleLinkChange(e, list.id)}
                    className="changeText pl-[10px] py-[0.4rem] input-text"
                    type="text"
                    placeholder="Add Link"
                  />
                </div>
              ) : null}
            </div>
          );
        })}

        <button onClick={handleListDiv} className="add-list flex justify-center items-center pl-[10px] py-[0.6rem] mt-4 mx-2 w-[13.5rem]">
          Add More <IoMdAdd />
        </button>
      </div>
    </>
  );
  //   const dispatch = useDispatch();
  //   const postIds = useSelector((state: IRootState) => state.lenster.publications);
  //   const [addInputs, setAddInputs] = useState<Array<any>>([]); // Derive better type for array
  //   useEffect(() => {
  //     const newAddInputs = [];
  //     postIds.map((postId, key) => {
  //       newAddInputs.push({ id: postId.id, value: postId.name });
  //     });
  //     setAddInputs(newAddInputs);
  //   }, []);
  //   const handleNewValue = (e: ChangeEvent<HTMLInputElement>,type: string, key: number) => {
  //     if (e.target.value.length > 0) {
  //       dispatch(
  //         getPublication({
  //           id: addInputs[key].id,
  //           value: e.target.value,
  //           link:  e.target.value
  //         }),
  //       );
  //       const newAddInputs = [...addInputs];
  //       newAddInputs[key].value = e.target.value;
  //       setAddInputs(newAddInputs);
  //       dispatch(updateInputValue(true));
  //     } else {
  //       dispatch(updateInputValue(false));
  //     }
  //   };
  //   const uid = new ShortUniqueId();
  //   const selectedElement: IWorkspaceElement = useSelector((state: IRootState) => state.workspace.selectedElement);
  //   const handleAddInput = () => {
  //     const inputId = uid();
  //     setAddInputs([
  //       ...addInputs,
  //       {
  //         id: inputId,
  //         value: '',
  //         link: '',
  //       },
  //     ]);
  //   };
  //   const handleRemoveInput = (value: string, index: number) => {
  //     const newInputs = [...addInputs];
  //     newInputs.splice(index, 1);
  //     setAddInputs(newInputs);
  //     dispatch(removePublication({ publicationId: value }));
  //   };
  //   return (
  //     <>
  //       <h3 className="ml-[0.5rem] mt-[1.5rem]">{selectedElement ? <span className="setting-text">{selectedElement.name}</span> : null}</h3>
  //       <div className="items-center mx-2 mt-1 w-[13.5rem] text-black">
  //         {addInputs.map((addInput, i) => {
  //             return (
  //                 <>
  //                 <div className="flex items-center mx-2 mt-1 w-[13.5rem] text-black">
  //                 <input
  //                    key={i}
  //                    id={addInput.id}
  //                    value={addInput.value}
  //                    onChange={e => handleNewValue(e, 'value',i)}
  //                    className="changeText input-text mt-[0.7rem] h-[2.2rem] pl-[0.5rem]"
  //                    placeholder="Add Value"
  //                 />
  //               </div>
  //               <div className="flex items-center mt-4 mx-2  w-[13.5rem] text-black">
  //                 <div className="link-div px-1 py-1">
  //                   <IoMdLink className="text-[18px]" />
  //                 </div>
  //                 <input
  //                   key={i}
  //                   id={addInput.id}
  //                   value={addInput.link}
  //                   onChange={e => handleNewValue(e, 'link',i)}
  //                   className="changeText pl-[2.5rem] py-[0.4rem] input-text"
  //                   type="text"
  //                   placeholder="Add Link"
  //                 />
  //               </div>
  //             {/* <div className="flex">
  //               <input
  //                 key={i}
  //                 id={addInput.id}
  //                 value={addInput.value}
  //                 onChange={e => handleNewValue(e, i)}
  //                 className="changeText input-text mt-[0.7rem] h-[2.2rem] pl-[0.5rem]"
  //                 placeholder="Add Post Id"
  //               /> */}
  //               {/* <span
  //                 onClick={() => handleRemoveInput(addInput.value, i)}
  //                 className="mt-[1rem] mr-[0.7rem] cursor-pointer flex items-center justify-end text-[9px] text-right underline"
  //               >
  //                 <AiOutlineCloseCircle className="text-[1rem] text-[#504F82] ml-[20px] cursor-pointer hover:text-[#100F11]" />
  //               </span> */}
  //             {/* </div> */}
  //             </>
  //           );
  //         })}
  //       </div>
  //       <div className="flex justify-end">
  //         <span
  //           onClick={handleAddInput}
  //           className="text-[#458CDE] mt-[1rem] mr-[0.7rem] cursor-pointer flex items-center justify-end text-[9px] text-right underline"
  //         >
  //           <IoMdAdd className="text-[7px] ml-[2px]" />
  //           Add Input
  //         </span>
  //       </div>
  //     </>
  //   );
  // };
};
export default ListOptionsComponent;
