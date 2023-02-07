import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'redux/root-state.interface';
import { IList, IText } from 'redux/workspace/workspace.interfaces';
import { updateListValue } from 'redux/workspace/workspace.reducers';
import { gradientCheck } from 'utils/gradient-check';
import { defaultList } from 'utils/default-list';
import 'styles/components.css';

const List: FC<IText> = ({
  i,
  fontWeight,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  backgroundColor,
  margin,
  padding,
  fontFamily,
  listType,
  listOptions,
  preview,
}) => {
  const dispatch = useDispatch();
  const lists: IList[] = useSelector((state: IRootState) => state.workspace.listValue);
  const gradientCondition = color?.indexOf('gradient') !== -1;

  const selectedList = lists.filter(list => list.i === i);
  const listFilter = listOptions.filter(list => list.i === i);
  const previewFilter = preview ? listFilter : selectedList;

  useEffect(() => {
    if (!preview) {
      if (selectedList.length <= 3) {
        Array.from(Array(3 - selectedList?.length).keys()).map(list => {
          const newLists = defaultList(i, lists);
          dispatch(updateListValue(newLists));
          return list;
        });
      }
    }
  }, [lists]); // eslint-disable-line

  return (
    <section
      id={i}
      style={{
        height: '100%',
      }}
    >
      <span
        style={{
          height: '100%',
          textDecoration: underline,
          textDecorationColor: color,
          background: backgroundColor,
          justifyContent: `${justifyContent}` as CanvasTextAlign,
          margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
        }}
        className="flex overflow-hidden items-center"
        id={i}
      >
        <ul
          id={i}
          style={{
            WebkitTextFillColor: gradientCheck(color, false),
            fontWeight: fontWeight,
            fontStyle: italic,
            background: gradientCheck(color, true),
            textDecoration: underline,
            textDecorationColor: `${gradientCondition ? 'black' : color}`,
            fontSize: `${fontSize}px`,
            fontFamily: fontFamily,
            listStyleType: listType,
            padding: `${padding?.paddingTop}px ${padding?.paddingRight}px ${padding?.paddingBottom}px ${padding?.paddingLeft}px`,
          }}
          className="text-class"
        >
          {previewFilter?.map(list => {
            return (
              <>
                {list.link ? (
                  <a target="_blank" rel="noreferrer" href={list.link}>
                    <li key={list.id}>{list.value}</li>
                  </a>
                ) : (
                  <li key={list.id}>{list.value}</li>
                )}
              </>
            );
          })}
        </ul>
      </span>
    </section>
  );
};

export default List;
