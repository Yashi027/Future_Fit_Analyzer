import React from 'react'
import searchIcon from '../assets/search_icon.svg'
import profileIcon from '../assets/profile_icon.png'
import arrow from '../assets/arrow.svg'

const Navbar = ({open,setOpen}) => {
  return (
    <div className='bg-blue-300 m-3 px-4 py-5 flex items-center justify-between rounded'>



      <div className="flex items-center gap-2">
        {
          !open ? <button onClick={() => setOpen(true)} className='cursor-pointer'>
            <img src={arrow} alt="" />
          </button> : <></>
        }
        <div className="text-4xl font-bold text-white">
          Skill<span className="text-indigo-600">Gap</span>
        </div>
      </div>

      <div className='hidden md:flex items-center w-1/3'>
        <div className='flex items-center w-full bg-white rounded-lg px-3 py-2 shadow-sm'>
          <img src={searchIcon} alt="Search Icon" className='p-2 ' />
          <input type="text" placeholder='Search here..' className=' outline-none w-full' />
        </div>
      </div>
      <img src={profileIcon} alt="Profile" className='h-12 w-12 ' />

    </div>
  )
}

export default Navbar