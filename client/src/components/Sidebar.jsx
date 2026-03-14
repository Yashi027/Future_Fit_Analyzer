import React from 'react'
import {Link} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
        
      <Link to={'/analysis'}> Start Skill Analysis</Link>
      <br />
      <Link to={'/github'}> Git Hub Analyzer</Link>
      <br />
      <Link to={'/progress'}> View Progress</Link>
      <br />
      <Link to={'/roadmap'}> View Roadmap</Link>
    </div>
  )
}

export default Sidebar