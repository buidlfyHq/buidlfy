import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Temp1 from '../assets/temp1.png'

const Template = () => {
  const navigate = useNavigate()
  const temps = [
    {
        name: 'Navbar', 
        image: Temp1, 
        value: [{"name":"Button","h":1,"value":"Add Button","link":"","style":{"color":{"r":"0","g":"0","b":"0","a":"100"},"backgroundColor":{"r":"0","g":"0","b":"0"},"fontWeight":"normal","fontStyle":"normal","textDecoration":"none","justifyContent":"center","fontSize":15,"deleteComponent":0,"borderRadius":0,"shadow":"none"},"connectWallet":"off","contract":{},"i":"d0NUOe","x":0,"y":0,"w":4,"minW":1,"resizeHandles":["nw","se"]}]
    }
  ]

  const handleClick = (e, value) => {
    localStorage.removeItem("items")
    localStorage.setItem("items", JSON.stringify(value))
    navigate('/dashboard', {replace: true})
  }

  return (
    <div className='min-h-screen px-20 py-10'>
        <div className='grid grid-cols-2 gap-4'>
            {temps.map(temp => {
                const {name, image, value} = temp
                return (
                    <div onClick={(e) => handleClick(e,value)} className='border cursor-pointer shadow-md flex flex-col py-4 px-8 justify-center items-center'>
                        <div className='text-2xl'>{name}</div>
                        <img src={image} alt="template1" className='min-h-[200px]' />
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Template