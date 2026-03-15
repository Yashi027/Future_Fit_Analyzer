import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'


const Dashboard = () => {
  const [open,setOpen] = useState(false)
  return (
    <div className='flex h-screen'>
      {open && <Sidebar setOpen={setOpen}/>}
      <div className='flex-1'>
        <Navbar 
        open={open}
        setOpen={setOpen}/>  
      </div>  
    </div>
  )
}

export default Dashboard