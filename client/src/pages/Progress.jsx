import React, { useContext, useMemo } from 'react'
import { AppContext } from '../context/AppContext'

const Progress = () => {
  const { roadmap, progress, streak, githubData, skillRatings, weeklyProgress } = useContext(AppContext);

  const weeklyData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();

    return weeklyProgress.map((count,index) => {
      const date = new Date();
      date.setDate(today.getDate() - (6-index));
      const dayName = date.toLocaleDateString("en-US",{
        weekday: "short"
      });
      return {
        dayName,
        count
      };
    })
  }, [weeklyProgress]);

  const maxCompletions = Math.max(...weeklyData.map(d => d.count), 1)

  return (
    <div className='min-h-screen bg-gray-50 px-6 py-10'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6'>Progress Tracker</h1>

        <div className='grid md:grid-cols-3 gap-6 mb-10'>

          <div className='bg-white p-6 rounded-xl shadow'>
            <p className='text-gray-600'>Overall Roadmap Completion</p>
            <h2 className='text-3xl font-bold text-indigo-500 mt-2'>
              {progress}%
            </h2>
          </div>

          <div className='bg-white p-6 rounded-xl shadow'>
            <p className='text-gray-600'>Learning Streak</p>
            <h2 className='text-3xl font-bold text-indigo-500 mt-2'>
              {streak} days
            </h2>
          </div>

          <div className='bg-white p-6 rounded-xl shadow'>
            <p className='text-gray-600'>Github Activity Score</p>
            <h2 className='text-3xl font-bold text-indigo-500 mt-2'>
              {githubData?.score || 0}%
            </h2>
            <p className='text-sm text-gray-400'>Based on commits and repositories</p>
          </div>

        </div>

        <div className='w-full bg-white p-6 rounded-xl shadow mb-10 max-w-4xl'>
          <h2 className='text-xl font-semibold mb-4'>Weekly Learning Progress</h2>
          <div className='h-40 flex items-end gap-4 p-2'>
            {
              weeklyData.map((data, index) => {
                const heightPercentage = (data.count / maxCompletions) * 100;
                return (
                  <div key={index} className='flex-1 flex flex-col items-center gap-2'>
                    <span className='text-xs font-bold text-indigo-400'>{data.count}</span>
                    <div
                      className='bg-indigo-500 rounded-t-md w-full max-w-[40px] transition-all duration-700 ease-out'
                      style={{ height: `${Math.max(heightPercentage, 5)}%` }}
                    ></div>
                    <span className='text-xs font-semibold text-gray-500 mt-2'>{data.dayName}</span>
                  </div>
                )
              })
            }
          </div>
          <p className='text-sm text-gray-800 mt-3'>Daily public GitHub commits in last 7 days</p>
        </div>

        <div className='bg-white p-6 rounded-xl shadow'>
          <h2 className='text-xl font-semibold mb-4'>GitHub Summary</h2>
          {
            githubData ? (
              <ul>
                <li>Repositories Analyzed: {githubData.repoCount}</li>
                <li>Username: {githubData.name || 'N/A'}</li>
                <li>Followers: {githubData.followers}</li>
              </ul>
            ) : (
              <div className='text-center py-6'>
                <p>No github data found. Visit GitHub Analyzer.</p>
              </div>
            )
          }
        </div>

      </div>
    </div>
  )
}

export default Progress