import React, { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const GithubAnalyzer = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {fetchGithubData, githubData} = useContext(AppContext);

  const handleAnalyze = async () => {
    if(!username.trim()){
      setError("Please enter a github username.")
      return;
    }
    setLoading(true);
    setError("")
    try {
      await fetchGithubData(username);
    } catch (error) {
      setError("Failed to fetch User.")
    }finally{
    setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 px-6 py-10'>
      <div className='max-w-3xl mx-auto'>
        
        <h1 className='text-3xl font-bold mb-6'>GitHub Profile Analyzer</h1>

        <div className='flex gap-3 mb-6'>
          <input
            type="text"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='flex-1 p-3 border rounded-md outline-none focus:ring-2 focus:ring-indigo-400'
          />
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className='bg-indigo-500 text-white px-5 py-2 rounded-md hover:bg-indigo-600 transition'
          >
            {loading ? 'Analyzing..' : 'Analyze'}
          </button>
        </div>

        {error && <p className='text-red-500'>{error}</p>}

        {githubData ? (
          <div className='bg-white p-6 rounded-xl shadow border'>
            <div className='flex items-center gap-4 mb-4'>
              <img
                src={githubData.avatar}
                alt="avatar"
                className='w-16 h-16 rounded-full'
              />
              <div>
                <h2 className='text-xl font-semibold'>{githubData.name || "User"}</h2>
                <p className='text-gray-500'>Status: Developer</p>
              </div>
            </div>

            <p className='text-gray-700 mb-4'>
              Score: {githubData.score}%
            </p>

            <div className='grid grid-cols-2 gap-4'>
              <div className='bg-gray-100 p-3 rounded-md'>
                <p className='text-sm text-gray-500'>Repositories</p>
                <h3 className='text-lg font-semibold'>{githubData.repoCount}</h3>
              </div>

              <div className='bg-gray-100 p-3 rounded-md'>
                <p className='text-sm text-gray-500'>Followers</p>
                <h3 className='text-lg font-semibold'>{githubData.followers}</h3>
              </div>

              <div className='bg-gray-100 p-3 rounded-md'>
                <p className='text-sm text-gray-500'>Skill Rating</p>
                <h3 className='text-lg font-semibold'>
                  {githubData.score > 80 ? "Expert" : githubData.score > 50 ? "Intermediate" : "Beginner"}
                </h3>
              </div>

              <div className='bg-gray-100 p-3 rounded-md'>
                <p className='text-sm text-gray-500'>Location</p>
                <h3 className='text-lg font-semibold'>
                  {githubData.location || "Not Specified"}
                </h3>
              </div>
            </div>

            <a
              href={githubData.profile_url}
              target="_blank"
              rel="noreferrer"
              className='inline-block mt-4 text-indigo-500 hover:underline'
            >
              View Profile →
            </a>
          </div>
        ):(
          <div className='text-gray-800'> No GitHub Data Found.</div>
        )}
      </div>
    </div>
  );
};

export default GithubAnalyzer;