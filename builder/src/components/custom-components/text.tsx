import React, { FC, useEffect, useState } from "react";
import ITexts from "interfaces/texts";
import "styles/components.css";

const Text: FC<ITexts> = ({
  item,
  items,
  containerItems,
  itemsViaContainer,
  setContainerItems,
  setItems,
  setValue,
  bold,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  value,
  backgroundColor,
  link,
}) => {
  const [row, setRow] = useState<number>(2)
  console.log(typeof justifyContent, justifyContent)
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // setValue(e.target.value);
    setString(e.target.value);
  };

  const [string, setString] = useState(value)

  const [child, setChild] = useState<number>()
  
  let TextH1 = document
    ?.getElementById(`${item.i}`)

  // console.log(TextH1?.clientHeight)
  // useEffect(() => {
  //   console.log(TextH1?.clientHeight)
  // }, [])

  // console.log(TextH1?.children , TextH1?.scrollHeight)

  // useEffect(() => {
  //   // console.log(item, item.h, items)
  //   // console.log(TextH1?.clientHeight , TextH1?.scrollHeight)
  //   if(TextH1?.scrollHeight > TextH1?.clientHeight){
  //     if(containerItems?.children) {
  //       let heightChangedElements = containerItems?.children.map(child => {
  //         if(child.i === item.i){
  //           child.h+=1
  //           return child
  //         } else {
  //           return child
  //         }
  //       })
  //       containerItems.children = heightChangedElements
  //       setContainerItems(containerItems)
  //       let filterContainer = itemsViaContainer.filter(item => item.i !== containerItems.i)
  //       setItems([...filterContainer, containerItems])
  //     } else {
  //       // height+=1 
  //       setRow(row+1)
  //       item.h+=1
  //       // item.minH+=2
  //       // console.log(item, item.h)
  //       let newItemsArr = items.filter(ele => ele.i !== item.i)
  //       setItems([...newItemsArr, item])
  //       console.log(items)
  //     }
  //   } else if(TextH1?.scrollHeight < TextH1?.clientHeight){
  //     // check if scroll height reduces
  //     console.log(2)
  //     // height-=1
  //     // let newItemsArr = items.filter(ele => ele.i !== item.i)
  //     // item.h = height
  //     // console.log(item)
  //     // setItems([...newItemsArr, item])
  //   }
  // },[TextH1?.scrollHeight])

  // children[0].height 

  // console.log(item.h)

  // console.log(TextH1?.clientHeight)
  const handleKeyUp = (e) => {
    console.log(items)
    // console.log(TextH1?.clientHeight, TextH1?.children[0].clientHeight)
    // console.log(TextH1?.clientHeight%TextH1?.children[0].clientHeight)
    // console.log(TextH1?.children.length,TextH1?.children.length/2)
    // TextH1?.children.length%2==1
    if(item.h*50 < TextH1?.children[0].clientHeight*TextH1?.children.length){
      item.h+=1
      let newItemsArr = items.filter(ele => ele.i !== item.i)
      setItems([...newItemsArr, item])
    } 
    // else if(item.h*50 > TextH1?.children[0].clientHeight*TextH1?.children.length){
    //   item.h-=0.5
    //   let newItemsArr = items.filter(ele => ele.i !== item.i)
    //   setItems([...newItemsArr, item])
    // }

    // old logic
    // if(TextH1?.children.length%2==1 && e.keyCode === 13){
    //   let h = TextH1?.children[0].clientHeight*TextH1?.children.length
    //   console.log(TextH1?.children.length)
    //   // switch(TextH1?.children[0].clientHeight) {
    //   //   case 23:
    //   //     console.log('text')
    //   // }
    //   setChild(TextH1?.children.length)
    //   item.h+=1
    //   let newItemsArr = items.filter(ele => ele.i !== item.i)
    //   setItems([...newItemsArr, item])
    //   console.log(items)
    // }
    // if(TextH1?.children.length < child){
    //   console.log(TextH1?.children.length)
    //   setChild(TextH1?.children.length)
    //   item.h-=0.5
    //   let newItemsArr = items.filter(ele => ele.i !== item.i)
    //   setItems([...newItemsArr, item])
    //   console.log(items)
    // }
  }

  const handleKeyDown = () => {
    // console.log(121324)
  }

  // console.log(value)

  return (
  
    <section 
      // contentEditable
        // id={item.i}
        // id="text-one"
        style={{
          fontWeight: bold,
          fontStyle: italic,
          textDecoration: underline,
          color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          display: "flex",
          justifyContent,
          alignItems: "center",
          fontSize: `${fontSize}px`,
          backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
        }}
        // onChange={handleTextChange}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        className="w-full h-full outline-none"
      >
        {/* FIX: use react content editable */}
        {/* <textarea className="text-center h-full w-full" onChange={handleTextChange}> */}
        {/* <textarea className="text-center h-full w-full bg-green-300" > */}
          {/* {value}   */}
        {/* </textarea> */}
        {/* <div>
          {link?.length > 0 ? (
            <a rel="noreferrer" target="_blank" href={link} id="text-two">
              {value}
            </a>
          ) : (
            <textarea value={value} readOnly className="outline-none cursor-pointer h-full bg-green-400 resize-none" />
          )}
        </div> */}
        <textarea 
                readOnly
                id={item.i}
                value={value}
                style={{
                  fontWeight: bold,
                  fontStyle: italic,
                  textDecoration: underline,
                  color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                  display: "flex",
                  justifyContent,
                  alignItems: "center",
                  textAlign: `${justifyContent}` as CanvasTextAlign,
                  fontSize: `${fontSize}px`,
                  backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
                }}
                className={`w-full outline-none text-center overflow-hidden cursor-pointer h-full resize-none`} 
              />

          {/* {link?.length > 0 ? (
            // <a style={{ pointerEvents: "none"}} className="h-full w-full bg-orange-200" rel="noreferrer" target="_blank" href={link} id="text-two">
              <textarea 
                readOnly
                id={item.i}
                value={value}
                style={{
                  fontWeight: bold,
                  fontStyle: italic,
                  textDecoration: underline,
                  color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                  display: "flex",
                  justifyContent,
                  alignItems: "center",
                  textAlign: `${justifyContent}` as CanvasTextAlign,
                  fontSize: `${fontSize}px`,
                  backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
                }}
                className={`w-full outline-none text-center cursor-pointer h-full resize-none`} 
              />
            //  </a> 
          ) : (
            <textarea 
              readOnly
              id={item.i} 
              value={value} 
              style={{
                fontWeight: bold,
                fontStyle: italic,
                textDecoration: underline,
                color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                display: "flex",
                justifyContent,
                alignItems: "center",
                textAlign: `${justifyContent}` as CanvasTextAlign,
                fontSize: `${fontSize}px`,
                backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
              }}
              className={`w-full outline-none overflow-hidden cursor-pointer h-full resize-none`} 
            />
          )} */}
          {/* <a className="h-full bg-orange-200" rel="noreferrer" target="_blank" href={link} id="text-two">
              <textarea 
                readOnly
                className="h-full bg-green-300"
                id={item.i}
                value={value}
              />
            </a> */}
    </section>
    
  );
}

export default Text;
