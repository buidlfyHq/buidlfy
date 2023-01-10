import { Dialog } from '@headlessui/react';
import React, { FC, useEffect, useState } from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import { IoIosCloseCircleOutline, IoMdAdd } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'redux/root-state.interface';
import { IList } from 'redux/workspace/workspace.interfaces';
import { updateListValue, updateWorkspaceElement } from 'redux/workspace/workspace.reducers';
import { defaultList } from 'utils/default-list';

interface IListOptionsComponent {
  i: string;
}

enum List {
  DIALOG = 'dialog',
  LIST = 'list',
}

enum Function {
  TEXTCHANGE = 'text_change',
  REMOVETEXT = 'remove_text',
  ADDLINK = 'add_link',
  LINKCHANGE = 'link_change',
  REMOVELINK = 'removeLink',
}
const ListOptionsComponent: FC<IListOptionsComponent> = ({ i }) => {
  const [isLinkVisible, setIsLinkVisible] = useState<Array<any>>([]); // Derive better type for state
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const lists: IList[] = useSelector((state: IRootState) => state.workspace.listValue);

  const handleFunction = (type: Function, e?: React.ChangeEvent<HTMLInputElement>, key?: string, i?: number) => {
    const newLists = [...lists];
    const findListIndex = newLists.findIndex(newList => key === newList.id);
    if (type === Function.TEXTCHANGE) {
      newLists[findListIndex] = { ...newLists[findListIndex], value: e.target.value };
      dispatch(updateListValue(newLists));
    } else if (type === Function.LINKCHANGE) {
      newLists[findListIndex] = { ...newLists[findListIndex], link: e.target.value };
      dispatch(updateListValue(newLists));
    } else if (type === Function.REMOVETEXT) {
      newLists.splice(findListIndex, 1);
      dispatch(updateListValue(newLists));
    } else if (type === Function.REMOVELINK) {
      const linkVisible = [...isLinkVisible];
      linkVisible[i] = false;
      setIsLinkVisible(linkVisible);
      newLists[findListIndex] = { ...newLists[findListIndex], link: '' };
      dispatch(updateListValue(newLists));
    } else if (type === Function.ADDLINK) {
      const linkVisible = [...isLinkVisible];
      linkVisible[i] = true;
      setIsLinkVisible(linkVisible);
      console.log(isLinkVisible, 'islink');
    }
  };

  const handleListDiv = () => {
    const newLists = defaultList(i, lists);
    dispatch(updateListValue(newLists));
    if (newLists.length > 3) {
      setIsModalVisible(true);
    }
  };

  useEffect(() => {
    dispatch(
      updateWorkspaceElement({
        settingItemId: i,
        propertyName: 'listOptions',
        propertyValue: lists,
      }),
    );
  }, [i, lists]);

  const settingList = (type: List) => {
    const list = type === List.LIST ? lists.filter(list => list.i === i).slice(0, 3) : lists.filter(list => list.i === i);
    return (
      <div className="px-1 py-4">
        <div className="ml-3 margin-text flex w-[135px] mt-[5px] items-center">Manage Options</div>
        {list.map((list, i) => {
          return (
            <div key={i}>
              <div className={`flex items-center mt-4 mx-2 text-black ${type === List.DIALOG ? 'w-[14.5rem]' : 'w-[13.5rem]'}`}>
                <input
                  id={list.id}
                  value={list.value}
                  onChange={e => handleFunction(Function.TEXTCHANGE, e, list.id)}
                  className="changeText pl-[10px] py-[0.4rem] input-text"
                  type="text"
                  placeholder="Add Text"
                />
                <IoIosCloseCircleOutline
                  onClick={() => handleFunction(Function.REMOVETEXT, undefined, list.id)}
                  className={`text-[15px] text-[#98A2B3] absolute cursor-pointer ${type === List.DIALOG ? 'right-[4.7rem]' : 'right-[3.8rem]'}`}
                />
                <div
                  onClick={() => handleFunction(Function.ADDLINK, undefined, undefined, i)}
                  className="list-link-div px-[0.35rem] py-[0.38rem] ml-2 cursor-pointer hover:bg-[#F9FAFB]"
                >
                  <BsLink45Deg className="text-[20px] text-[#98A2B3]" />
                </div>
              </div>
              {isLinkVisible[i] ? (
                <div key={i} className={`flex items-center mt-4 mx-2 text-black ${type === List.DIALOG ? 'w-[14.5rem]' : 'w-[13.5rem]'}`}>
                  <input
                    id={list.id}
                    value={list.link}
                    onChange={e => handleFunction(Function.LINKCHANGE, e, list.id)}
                    className="changeText pl-[10px] py-[0.4rem] input-text"
                    type="text"
                    placeholder="Add Link"
                  />
                  <IoIosCloseCircleOutline
                    onClick={() => handleFunction(Function.REMOVELINK, undefined, list.id, i)}
                    className={`text-[15px] text-[#98A2B3] absolute cursor-pointer ${type === List.DIALOG ? 'right-[2rem]' : 'right-[1.2rem]'}`}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
        <button
          onClick={handleListDiv}
          className={`add-list flex justify-center items-center pl-[10px] py-[0.6rem] mt-4 mx-2 hover:bg-[#F6F5FF] ${
            type === List.DIALOG ? 'w-[14.5rem]' : 'w-[13.5rem]'
          }`}
        >
          Add More <IoMdAdd />
        </button>
      </div>
    );
  };

  return (
    <>
      {settingList(List.LIST)}
      {isModalVisible ? (
        <Dialog
          as="div"
          className="fixed py-[10px] max-h-[30rem] z-100 rounded-[10px] overflow-none bg-white shadow-lg top-[220px] right-[260px] overflow-scroll"
          open={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        >
          <div className="px-4 text-right">
            <>
              <div onClick={() => setIsModalVisible(false)} />
              {settingList(List.DIALOG)}
            </>
          </div>
        </Dialog>
      ) : null}
    </>
  );
};
export default ListOptionsComponent;
