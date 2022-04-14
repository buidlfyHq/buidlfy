import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import {AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineEye} from 'react-icons/ai'
import {MdUndo, MdRedo} from 'react-icons/md'
import { useState } from 'react'

const Home: NextPage = () => {
  const [className, setClassName] = useState('')

  const hideSidebar = () => {
    setClassName('hidden')
  }

  const showSidebar = () => {
    setClassName('')
  }

  return (
    <div className='flex flex-row min-h-screen w-full'>
      {/* sidebar */}
      <div className={`fixed left-0 top-0 z-0 w-[250px] border-r h-full ${className}`}>
        <div className='flex flex-row justify-between items-center p-3 h-[60px]'>
          <div className='cursor-pointer'>
            <span className='bg-blue-300 mr-2 rounded-[50%] p-1'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            User Name
          </div> 
          <div onClick={hideSidebar}>
            <AiOutlineDoubleLeft className='text-slate-600 p-2 text-[35px] hover:bg-slate-100 hover:rounded-md cursor-pointer' />
          </div>
        </div>
      </div>

      {/* nav + main */}
      <div className=''>
        {/* navbar */}
        <div className={`fixed left-[250px] h-[60px] ${styles.nav} top-0 border-b z-1200 flex flex-row justify-between items-center p-3`}>
          <div>
          {className === '' ? 
          <AiOutlineDoubleRight className='text-slate-600 p-2 text-[35px] hover:bg-slate-100 hover:rounded-md cursor-pointer hidden' /> : 
          <AiOutlineDoubleRight onClick={showSidebar} className='text-slate-600 p-2 text-[35px] hover:bg-slate-100 hover:rounded-md cursor-pointer' />}
          </div>
          <div className='flex flex-row'>
            <div className='flex flex-row items-center mx-2'>
              <MdUndo className='text-slate-600 p-2 text-[35px] hover:bg-slate-100 hover:rounded-md cursor-pointer mx-1' />
              <MdRedo className='text-slate-600 p-2 text-[35px] hover:bg-slate-100 hover:rounded-md cursor-pointer mx-1' />
            </div>
            <div className='flex items-center text-slate-500 p-2 hover:bg-slate-100 hover:text-slate-700 hover:rounded-md cursor-pointer mx-3'>
              <span>
                <AiOutlineEye className='mr-1' />
              </span>
              Preview
            </div>
            <div className='flex items-center bg-white shadow-lg rounded-md px-4 py-2 cursor-pointer'>Publish</div>
          </div>
        </div>
        {/* main section */}
        <div className='fixed ml-[250px] mt-[60px] h-full w-full '>main</div>
      </div>
    </div>
  )
}

export default Home
