import React, { useEffect, useRef, useState } from 'react'
import '../../styles/Dashboard.css'
import {RiText} from 'react-icons/ri'
import {AiOutlineLink, AiOutlineDelete} from 'react-icons/ai'
import {VscSymbolColor} from 'react-icons/vsc'

export default function SettingComponent({classname, text}) {
  const [open, setOpen] = useState<Boolean>(false)
  const ref = useRef(null)

  useEffect(() => {
    let handler = (event: Event) => {
      if(ref.current && !ref.current.contains(event.target)){
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })

  return (
    <>
      <div className={`${classname} rounded-[8px] hover:bg-[#f5efef] py-2 px-4 cursor-pointer relative`} onClick={() => setOpen(true)}>
        {text}
      </div>
      {open ? (
        <div className='border menu' ref={ref}>
          <div className='px-3 my-1 text-gray-500'>Settings</div>
          <div className='flex items-center px-3 mt-1'>
            <RiText className='text-[18px] mr-3' />
            <input className="changeText" type='text' placeholder='change text' />
          </div>
          <div className='flex items-center px-3 mt-2'>
            <AiOutlineLink className='text-[18px] mr-3' />
            <input className="changeText" type='text' placeholder='change text' />
          </div>
          <div className='h-[1px] w-full bg-gray-200 mt-3 mb-1'></div>
          <div className='flex items-center w-full px-3 py-2 text-gray-600 rounded cursor-pointer hover:bg-slate-100'  onClick={() => setOpen(false)}>
            <AiOutlineDelete className='text-[18px] mr-3' />
            <span>Delete</span>
          </div>
          <div className='flex items-center w-full px-3 py-2 text-gray-600 cursor-pointer hover:bg-slate-100'>
            <VscSymbolColor className='text-[18px] mr-3' />
            <span>Text Color</span>
          </div>
        </div>
      ) : null}
    </>
  )
}