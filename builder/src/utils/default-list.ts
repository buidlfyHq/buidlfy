import { IList } from 'redux/workspace/workspace.interfaces';
import ShortUniqueId from 'short-unique-id';

export const defaultList = (i: string, lists: IList[]) => {
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
  return newLists;
};
