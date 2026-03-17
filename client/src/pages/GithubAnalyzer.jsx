import React, { useState } from 'react';

const GithubAnalyzer = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchGithubData = async () => {
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setData(null);

      const res = await fetch(`https://api.github.com/users/${username}`);
      
      if (!res.ok) {
        throw new Error("User not found");
      }

      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 px-6 py-10'>
      <div className='max-w-3xl mx-auto'>
        
        <h1 className='text-3xl font-bold mb-6'>GitHub Analyzer</h1>

        {/* Input Section */}
        <div className='flex gap-3 mb-6'>
          <input
            type="text"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='flex-1 p-3 border rounded-md outline-none focus:ring-2 focus:ring-indigo-400'
          />
          <button
            onClick={fetchGithubData}
            className='bg-indigo-500 text-white px-5 py-2 rounded-md hover:bg-indigo-600 transition'
          >
            Analyze
          </button>
        </div>

        {/* Loading */}
        {loading && <p className='text-gray-500'>Loading...</p>}

        {/* Error */}
        {error && <p className='text-red-500'>{error}</p>}

        {/* Result */}
        {data && (
          <div className='bg-white p-6 rounded-xl shadow border'>
            <div className='flex items-center gap-4 mb-4'>
              <img
                src={data.avatar_url}
                alt="avatar"
                className='w-16 h-16 rounded-full'
              />
              <div>
                <h2 className='text-xl font-semibold'>{data.name || "No Name"}</h2>
                <p className='text-gray-500'>@{data.login}</p>
              </div>
            </div>

            <p className='text-gray-700 mb-4'>
              {data.bio || "No bio available"}
            </p>

            <div className='grid grid-cols-2 gap-4'>
              <div className='bg-gray-100 p-3 rounded-md'>
                <p className='text-sm text-gray-500'>Repositories</p>
                <h3 className='text-lg font-semibold'>{data.public_repos}</h3>
              </div>

              <div className='bg-gray-100 p-3 rounded-md'>
                <p className='text-sm text-gray-500'>Followers</p>
                <h3 className='text-lg font-semibold'>{data.followers}</h3>
              </div>

              <div className='bg-gray-100 p-3 rounded-md'>
                <p className='text-sm text-gray-500'>Following</p>
                <h3 className='text-lg font-semibold'>{data.following}</h3>
              </div>

              <div className='bg-gray-100 p-3 rounded-md'>
                <p className='text-sm text-gray-500'>Location</p>
                <h3 className='text-lg font-semibold'>
                  {data.location || "N/A"}
                </h3>
              </div>
            </div>

            <a
              href={data.html_url}
              target="_blank"
              rel="noreferrer"
              className='inline-block mt-4 text-indigo-500 hover:underline'
            >
              View Profile →
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubAnalyzer;