import { Dialog } from '@headlessui/react';
import React, { FC, useEffect, useState } from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import { IoIosCloseCircleOutline, IoMdAdd } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'redux/root-state.interface';
import { IList } from 'redux/workspace/workspace.interfaces';
import { updateListValue, updateWorkspaceElement } from 'redux/workspace/workspace.reducers';
import ShortUniqueId from 'short-unique-id';

interface IListOptionsComponent {
  handleSettingChange?: any;
  i: string;
}
const ListOptionsComponent: FC<IListOptionsComponent> = ({ i }) => {
  const [isLinkVisible, setIsLinkVisible] = useState<Array<any>>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const lists: IList[] = useSelector((state: IRootState) => state.workspace.listValue);
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const newLists = [...lists];
    const findListIndex = newLists.findIndex(newList => key === newList.id);
    newLists[findListIndex] = { ...newLists[findListIndex], value: e.target.value };
    dispatch(updateListValue(newLists));
  };
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const newLists = [...lists];
    const findListIndex = newLists.findIndex(newList => key === newList.id);
    newLists[findListIndex] = { ...newLists[findListIndex], link: e.target.value };
    dispatch(updateListValue(newLists));
  };

  const handleRemoveText = (key: string) => {
    const newLists = [...lists];
    const findListIndex = newLists.findIndex(newList => key === newList.id);
    newLists.splice(findListIndex, 1);
    dispatch(updateListValue(newLists));
  };
  const handleRemoveLink = (i: number, key: string) => {
    const linkVisible = [...isLinkVisible];
    linkVisible[i] = false;
    setIsLinkVisible(linkVisible);
    const newLists = [...lists];
    const findListIndex = newLists.findIndex(newList => key === newList.id);
    newLists[findListIndex] = { ...newLists[findListIndex], link: '' };
    dispatch(updateListValue(newLists));
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
        i: i,
        id: listId,
        value: 'Default Item',
        link: '',
      },
    ];
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

  enum List {
    DIALOG = 'dialog',
    LIST = 'list',
  }

  const settingList = () => {
    <div className="px-1 py-4">
      <div className="ml-3 margin-text flex w-[135px] mt-[5px] items-center">Manage Options</div>
      {lists
        .filter(list => list.i === i)
        .slice(0, 3)
        .map((list, i) => {
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
                <IoIosCloseCircleOutline
                  onClick={() => handleRemoveText(list.id)}
                  className="text-[15px] text-[#98A2B3] absolute right-[3.8rem] cursor-pointer"
                />
                <div onClick={() => handleLink(i)} className="list-link-div px-[0.35rem] py-[0.38rem] ml-2 cursor-pointer hover:bg-[#F9FAFB]">
                  <BsLink45Deg className="text-[20px] text-[#98A2B3]" />
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
                  <IoIosCloseCircleOutline
                    onClick={() => handleRemoveLink(i, list.id)}
                    className="text-[15px] text-[#98A2B3] absolute right-[1.2rem] cursor-pointer"
                  />
                </div>
              ) : null}
            </div>
          );
        })}

      <button
        onClick={handleListDiv}
        className="add-list flex justify-center items-center pl-[10px] py-[0.6rem] mt-4 mx-2 w-[13.5rem] hover:bg-[#F6F5FF]"
      >
        Add More <IoMdAdd />
      </button>
    </div>;
  };

  const modalList = () => {
    <div className="px-1 py-4">
      <div className="ml-3 margin-text flex w-[135px] mt-[5px] items-center">Manage Options</div>
      {lists
        .filter(list => list.i === i)
        .map((list, i) => {
          return (
            <div key={i}>
              <div className="flex items-center mt-4 mx-2 w-[14.5rem] text-black">
                <input
                  id={list.id}
                  value={list.value}
                  onChange={e => handleTextChange(e, list.id)}
                  className="changeText pl-[10px] py-[0.4rem] input-text"
                  type="text"
                  placeholder="Add Text"
                />
                <IoIosCloseCircleOutline
                  onClick={() => handleRemoveText(list.id)}
                  className="text-[15px] text-[#98A2B3] absolute right-[4.7rem] cursor-pointer"
                />
                <div onClick={() => handleLink(i)} className="list-link-div px-[0.35rem] py-[0.38rem] ml-2 cursor-pointer hover:bg-[#F9FAFB]">
                  <BsLink45Deg className="text-[20px] text-[#98A2B3]" />
                </div>
              </div>

              {isLinkVisible[i] ? (
                <div key={i} className="flex items-center mt-4 mx-2 w-[14.5rem] text-black">
                  <input
                    id={list.id}
                    value={list.link}
                    onChange={e => handleLinkChange(e, list.id)}
                    className="changeText pl-[10px] py-[0.4rem] input-text"
                    type="text"
                    placeholder="Add Link"
                  />
                  <IoIosCloseCircleOutline
                    onClick={() => handleRemoveLink(i, list.id)}
                    className="text-[15px] text-[#98A2B3] absolute right-[2rem] cursor-pointer"
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      <button
        onClick={handleListDiv}
        className="add-list flex justify-center items-center pl-[10px] py-[0.6rem] mt-4 mx-2 w-[14.5rem] hover:bg-[#F6F5FF]"
      >
        Add More <IoMdAdd />
      </button>
    </div>;
  };
  return (
    <>
      {settingList()}
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
              {modalList()}
            </>
          </div>
        </Dialog>
      ) : null}
    </>
  );
};
export default ListOptionsComponent;
