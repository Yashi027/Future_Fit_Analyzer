import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import {useNavigate} from 'react-router-dom'

const SkillAnalysis = () => {
  const {selectedCareer, setSelectedCareer, skillRatings, setSkillRatings, generateRoadmap} = useContext(AppContext);
  const navigate = useNavigate();

  const careerSkillMap = {
    frontend:["HTML","CSS","JavaScript","React","Redux"],
    backend:["Node.js","Express","MongoDb","SQL","API Design"],
    fullstack:["HTML","CSS","JavaScript","React","Node.js","MongoDb"]
  };

  const handleRatingChange = (skill,rating) => {
    setSkillRatings(prev => ({
      ...prev,
      [skill]: parseInt(rating)
    }));
  };

  const handleGenerate = () => {
    if(!selectedCareer){
      alert('Please select a career goal first');
      return;
    }
    generateRoadmap();
    navigate('/');
  };

  const currentSkills = careerSkillMap[selectedCareer] || [];

  return (
    <div className='min-h-screen bg-gray-50 px-6 py-10'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Skill Analysis</h1>
      </div>
    </div>
  )
}

export default SkillAnalysis