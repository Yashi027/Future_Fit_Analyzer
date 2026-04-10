import React from 'react'
import searchIcon from '../assets/search_icon.svg'
import profileIcon from '../assets/profile_icon.png'
import arrow from '../assets/arrow.svg'
import {useNavigate} from 'react-router-dom'

const Navbar = ({open,setOpen}) => {
  const navigate = useNavigate();

  return (
    <div className='bg-blue-300 m-3 px-4 py-5 flex items-center justify-between rounded'>



      <div className="flex items-center gap-2">
        {
          !open ? <button onClick={() => setOpen(true)} className='cursor-pointer'>
            <img src={arrow} alt="" />
          </button> : <></>
        }
        <div className="text-4xl font-bold text-white cursor-pointer" onClick={() => navigate('/')}>
          Skill<span className="text-indigo-600">Gap</span>
        </div>
      </div>

      
      <div className="flex items-center gap-9 mt-2">
      <button 
        onClick={() => navigate('/')}
        className="px-5 py-2 rounded-full bg-white text-blue-600 font-semibold shadow-md hover:bg-blue-100 hover:scale-105 transition-all duration-200"
      >
        Dashboard
      </button>

      <img src={profileIcon} alt="Profile" className='h-12 w-12' />
      </div>
      {/* <img src={profileIcon} alt="Profile" className='h-12 w-12 ' /> */}

    </div>
  )
}

export default Navbar