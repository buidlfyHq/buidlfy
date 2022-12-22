import React, { FC, useEffect } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'redux/root-state.interface';
import { IList, IText } from 'redux/workspace/workspace.interfaces';
import { updateListValue } from 'redux/workspace/workspace.reducers';
import ShortUniqueId from 'short-unique-id';
import { gradientCheck } from 'utils/gradient-check';
import 'styles/components.css';

const Dropdown: FC<IText> = ({
  i,
  fontWeight,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  value,
  backgroundColor,
  margin,
  padding,
  link,
  fontFamily,
  borderWidth,
  borderColor,
  borderRadius,
  shadow,
  preview,
  listOptions,
}) => {
  const gradientCondition = color?.indexOf('gradient') !== -1;
  const dispatch = useDispatch();
  const lists: IList[] = useSelector((state: IRootState) => state.workspace.listValue);
  const selectedList = lists.filter(list => list.i === i);
  const listFilter = listOptions.filter(list => list.i === i);
  const previewFilter = preview ? listFilter : selectedList;
  useEffect(() => {
    if (selectedList.length <= 3) {
      {
        Array.from(Array(3 - selectedList?.length).keys()).map(list => {
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
        });
      }
    }
  }, [lists]);
  return (
    <section
      id={i}
      style={{
        height: '-webkit-fill-available',
        textDecoration: underline,
        justifyContent: `${justifyContent}` as CanvasTextAlign,
        margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
      }}
      className="flex overflow-hidden"
    >
      <span
        id={i}
        style={{
          WebkitTextFillColor: gradientCheck(color, false),
          fontWeight: fontWeight,
          fontStyle: italic,
          textDecoration: underline,
          textDecorationColor: `${gradientCondition ? 'black' : color}`,
          fontSize: `${fontSize}px`,
          fontFamily: fontFamily,
          color: 'black',
          padding: `${padding?.paddingTop}px ${padding?.paddingRight}px ${padding?.paddingBottom}px ${padding?.paddingLeft}px`,
        }}
        className="relative inline-block dropdown"
      >
        <button
          style={{
            fontWeight: fontWeight,
            fontStyle: italic,
            fontFamily: fontFamily,
            border: `${borderWidth}px solid ${borderColor}`,
            borderImage: borderColor,
            display: 'flex',
            justifyContent: 'left',
            borderRadius: `${borderRadius}px`,
            fontSize: `${fontSize}px`,
            background: backgroundColor,
            boxShadow: shadow,
            alignItems: 'left',
            padding: `${padding?.paddingTop}px ${padding?.paddingRight}px ${padding?.paddingBottom}px ${padding?.paddingLeft}px`,
          }}
          id={i}
          className="btn-border flex items-center dropdown-btn cursor-pointer btn whitespace-nowrap"
        >
          <span
            style={{
              background: gradientCheck(color, true),
              WebkitTextFillColor: gradientCheck(color, false),
              textDecoration: underline,
              textDecorationColor: color,
            }}
            id={i}
            className="text-class"
          >
            {link.length > 0 ? (
              <a
                href={link}
                style={{
                  background: gradientCheck(color, true),
                  WebkitTextFillColor: gradientCheck(color, false),
                  textDecoration: underline,
                  textDecorationColor: color,
                }}
                rel="noreferrer"
                target="_blank"
              >
                {value}
              </a>
            ) : (
              value
            )}
          </span>
          <IoMdArrowDropright style={{ color: borderColor }} className="flex items-center text-[18px] ml-[5rem] icon-left" />
          <IoMdArrowDropdown style={{ color: borderColor }} className=" items-center text-[18px] ml-[5rem] icon-down" />
        </button>
        <span
          style={{
            background: gradientCheck(color, true),
            WebkitTextFillColor: gradientCheck(color, false),
            textDecoration: underline,
            textDecorationColor: color,
          }}
          id={i}
          className="text-class absolute dropdown-content mt-2 text-left pl-[20px] pt-[10px] pb-[10px] w-[13rem]"
        >
          {previewFilter?.map(list => {
            return (
              <>
                {list.link ? (
                  <a target="_blank" href={list.link}>
                    <h6 key={list.id} className="mt-4">
                      {list.value}
                    </h6>
                  </a>
                ) : (
                  <h6 key={list.id} className="mt-4">
                    {list.value}
                  </h6>
                )}
              </>
            );
          })}
        </span>
      </span>
    </section>
  );
};

export default Dropdown;
