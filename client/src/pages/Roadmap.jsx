import React, { useContext,useState } from 'react'
import { AppContext } from '../context/AppContext'

const Roadmap = () => {

  const {roadmap,progress,streak,completedSkills,selectedCareer, completeSkill} = useContext(AppContext);
  const [filter,setFilter] = useState("all")

  const filteredSkills = roadmap.filter((skill) => {
    const isDone = completedSkills.some(s => s.name === skill.name);
    if(filter==="completed"){
      return isDone;
    }
    if(filter==="pending"){
      return !isDone;
    }
    return true;
  })

  return (
    <div className='min-h-screen px-6 py-8 bg-gray-50'>
      <div className='max-w-5xl mx-auto'>
        
        <div className='bg-indigo-500 text-white p-6 rounded-xl shadow mb-8'>
          <h1 className='text-2xl font-semibold capitalize'>
            {selectedCareer ? `${selectedCareer} Roadmap`: 'Learning Roadmap'}
          </h1>
          <p className='text-sm opacity-90 mt-1'> Follow this roadmap to become a Skilled {selectedCareer ? `${selectedCareer}`: 'Developer'}</p>
          <p className='mt-3 text-sm'>🔥Learning Streak: <span className='font-semibold'>{streak}</span> days</p>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8'>
           <div className='flex justify-between mb-2'>
            <p className='font-semibold text-gray-700'>Learning Progress</p>
            <p className='text-indigo-500 font-semibold'>{progress}%</p>
           </div>

           <div className='w-full bg-gray-200 h-4 rounded-full overflow-hidden'>
            <div className='bg-linear-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500'
            style={{width:`${progress}%`}}></div>
           </div>

           <p className='text-sm text-gray-500 mt-2'>{completedSkills.length}/{roadmap.length} skills completed</p>
        </div>

        <div className='flex gap-3 mb-8'>
          {
            ['all','completed','pending'].map((type) => (
              <button key={type} onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition 
              ${filter === type ? 'bg-indigo-500 text-white' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}>
                {type}
              </button>
            ))
          }
        </div>

        <div className='space-y-4'>
          {
            filteredSkills.length === 0 ? 
            (<p className='text-gray-500'>No skills found.</p>):
            (
              filteredSkills.map((skill,index) => {
                const isCompleted = completedSkills.some(s => s.name===skill.name);

                return(
                  <div
                   key={index}
                   className={`flex justify-between items-center p-5 rounded-xl border transition ${
                    isCompleted ? 'bg-green-50 border-green-300' : 'bg-white border-gray-200 hover:shadow-md'
                   }`}>
                    <div className='flex items-start gap-4'>
                      <div className={`w-4 h-4 mt-2 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div>
                        <h3 className='text-lg font-semibold text-gray-800'>{skill.name}</h3>
                        <div className='flex gap-2 mt-2'>
                          <span>{skill.difficulty}</span>
                          <span>{skill.priority}</span>
                        </div>
                      </div>
                    </div>
                    {
                      isCompleted ? (
                        <span className='text-green-600 font-semibold text-sm'>Completed</span>
                      ) : (
                        <button
                         onClick={() => completeSkill(skill.name)}
                         className='bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition text-sm font-medium'>
                          Mark Complete
                        </button>
                      )
                    }
                  </div>
                )
              })
            )
          }
        </div>


      </div>     
    </div>
  )
}

export default Roadmap