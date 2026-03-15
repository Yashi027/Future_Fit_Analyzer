import React from 'react'
import {Link} from 'react-router-dom'

const Sidebar = ({setOpen}) => {
  return (
    <div className='h-screen w-58 text-white flex flex-col bg-blue-300 p-5'>
        <h2 className="text-2xl font-bold mb-10">
          Skill<span className="text-indigo-600">Gap</span>
        </h2>
        <button onClick={() => setOpen(false)} className='absolute top-2 left-50 p-1 cursor-pointer font-bold text-black text-2xl'>x</button>
      <Link to={'/analysis'} className='px-4 py-2 rounded hover:bg-blue-400 text-xl font-4xl'> Start Skill Analysis</Link>
      <br />
      <Link to={'/github'} className='px-4 py-2 rounded hover:bg-blue-400 text-xl font-4xl'> Git Hub Analyzer</Link>
      <br />
      <Link to={'/progress'} className='px-4 py-2 rounded hover:bg-blue-400 text-xl font-4xl'> View Progress</Link>
      <br />
      <Link to={'/roadmap'} className='px-4 py-2 rounded hover:bg-blue-400 text-xl font-4xl'> View Roadmap</Link>
    </div>
  )
}

export default Sidebar