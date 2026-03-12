import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [roadmap, setRoadmap] = useState(
        JSON.parse(localStorage.getItem('roadmap')) || []
    )

    const [selectedCareer,setSelectedCareer] = useState(
        localStorage.getItem('selectedCareer') || ""
    )

    const [skillRatings,setSkillRatings] = useState(
        JSON.parse(localStorage.getItem('skillRatings')) || {}
    )

    const [completedSkills,setCompletedSkills] = useState(
        JSON.parse(localStorage.getItem('completedSkills')) || []
    )

    const [progress, setProgress] = useState(0)

    const [githubData, setGithubData] = useState(null)

    const [weeklyReport, setWeeklyReport] = useState(
        JSON.parse(localStorage.getItem('weeklyReports')) || []
    )

    const [lastCompletedDate, setLastCompletedDate] = useState(
        localStorage.getItem('lastCompletedDate') || null 
    )

    const [streak, setStreak] = useState(
        parseInt(localStorage.getItem('streak')) || 0
    )

    return(
        <AppContext.Provider 
        value={
            {
            selectedCareer,
            setSelectedCareer,
            skillRatings,
            setSkillRatings,
            githubData,
            setGithubData,
            roadmap,
            setRoadmap,
            progress,
            setProgress,
            completedSkills,
            setCompletedSkills,
            weeklyReport,
            setWeeklyReport,
            streak,
            setStreak,
            lastCompletedDate,
            setLastCompletedDate
        }
        }>
            {children}
        </AppContext.Provider>
    )

}