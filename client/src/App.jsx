import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import GithubAnalyzer from './pages/GithubAnalyzer'
import Progress from './pages/Progress'
import Roadmap from './pages/Roadmap'
import SkillAnalysis from './pages/SkillAnalysis'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/analysis' element={<SkillAnalysis/>}/>
        <Route path='/progress' element={<Progress/>}/>
        <Route path='/roadmap' element={<Roadmap/>}/>
        <Route path='/github' element={<GithubAnalyzer/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
