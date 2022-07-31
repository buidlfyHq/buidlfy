import React, { FC, useEffect } from "react";
import ITexts from "interfaces/texts";
import "styles/components.css";

const Text: FC<ITexts> = ({
  item,
  items,
  setItems,
  bold,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  value,
  backgroundColor,
  link,
  setValue,
  setLink
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  // const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setLink(e.target.value);
  // };
  
  let TextH1 = document
    ?.getElementById(`${item.i}`)

  useEffect(() => {
    console.log(item)
    let height = item.h 
    if(TextH1?.scrollHeight > TextH1?.clientHeight){
      // console.log(1)
      height+=1
      let newItemsArr = items.filter(ele => ele.i !== item.i)
      item.h = height
      // console.log(item)
      setItems([...newItemsArr, item])
    } else if(TextH1?.scrollHeight < TextH1?.clientHeight){
      // console.log(2)
      // check if scroll height reduces
      height-=1
      let newItemsArr = items.filter(ele => ele.i !== item.i)
      item.h = height
      console.log(item)
      setItems([...newItemsArr, item])
    }
  },[TextH1?.scrollHeight] )

  // console.log(link, link.length, 12121)

  return (
    <textarea
      id={item.i}
      // id="text-one"
      style={{
        fontWeight: bold,
        fontStyle: italic,
        textDecoration: underline,
        outline: 'none',
        textAlign: "center",
        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        display: "flex",
        justifyContent,
        alignItems: "center",
        fontSize: `${fontSize}px`,
        resize: 'none',
        backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
      }}
      onChange={handleTextChange}
      className="flex items-center example justify-center w-full h-full overflow-none"
    >
      {/* FIX: use react content editable */}
      {/* <textarea className="text-center h-full w-full" onChange={handleTextChange}> */}
      {/* <textarea className="text-center h-full w-full bg-green-300" > */}
        {/* {value}   */}
      {/* </textarea> */}

      {link?.length > 0 ? (
        <a rel="noreferrer" target="_blank" href={link} id="text-two">
          {value}
        </a>
      ) : value}
    </textarea>
  );
};

export default Text;