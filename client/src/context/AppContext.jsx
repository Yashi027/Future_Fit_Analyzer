import { createContext, useEffect, useState } from "react";

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

    const [weeklyProgress, setWeeklyProgress] = useState(
        JSON.parse(localStorage.getItem('weeklyProgress')) || []
    )

    const [lastCompletedDate, setLastCompletedDate] = useState(
        localStorage.getItem('lastCompletedDate') || null 
    )

    const [streak, setStreak] = useState(
        parseInt(localStorage.getItem('streak')) || 0
    )

    useEffect(() => {
        if(roadmap.length>0){
            const calculatedProgress = (completedSkills.length/roadmap.length)*100;
            setProgress(Math.round(calculatedProgress))
        }
    },[completedSkills,roadmap])

    useEffect(() => {
        localStorage.setItem("selectedCareer",selectedCareer)
    },[selectedCareer])

    useEffect(() => {
        localStorage.setItem("skillRatings",JSON.stringify(skillRatings))
    },[skillRatings])

    useEffect(() => {
        localStorage.setItem("roadmap",JSON.stringify(roadmap))
    },[roadmap])

    useEffect(() => {
        localStorage.setItem("streak",streak)
    },[streak])

    useEffect(() => {
        localStorage.setItem("completedSkills",JSON.stringify(completedSkills))
    },[completedSkills])

    useEffect(() => {
        localStorage.setItem("lastCompletedDate",lastCompletedDate)
    },[lastCompletedDate])

    useEffect(() => {
        localStorage.setItem("weeklyProgress",JSON.stringify(weeklyProgress))
    },[weeklyProgress])

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
            weeklyProgress,
            setWeeklyProgress,
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