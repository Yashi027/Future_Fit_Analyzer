import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [roadmap, setRoadmap] = useState(
        JSON.parse(localStorage.getItem('roadmap')) || []
    );

    const [selectedCareer, setSelectedCareer] = useState(
        localStorage.getItem('selectedCareer') || ""
    );

    const [skillRatings, setSkillRatings] = useState(
        JSON.parse(localStorage.getItem('skillRatings')) || {}
    );

    const [completedSkills, setCompletedSkills] = useState(
        JSON.parse(localStorage.getItem('completedSkills')) || []
    );

    const [progress, setProgress] = useState(0);

    const [githubData, setGithubData] = useState(
        JSON.parse(localStorage.getItem('githubData')) || null
    );

    const [weeklyProgress, setWeeklyProgress] = useState(
        JSON.parse(localStorage.getItem('weeklyProgress')) || []
    );

    const [lastCompletedDate, setLastCompletedDate] = useState(
        localStorage.getItem('lastCompletedDate') || null
    );

    const [streak, setStreak] = useState(
        parseInt(localStorage.getItem('streak')) || 0
    );

    const fetchGithubData = async (username) => {
        try {
            const res = await fetch(`https://api.github.com/users/${username}`);
            const repos = await fetch(`https://api.github.com/users/${username}/repos`);

            const userData = await res.json();
            const repoData = await repos.json();

            if (!res.ok || !repos.ok) {
                setGithubData(null);
                localStorage.removeItem('githubData');
                throw new Error('User Not Found');
            }

            const score = (userData.public_repos * 2) + (userData.followers * 5);

            const language_counts = {};
            repoData.forEach(repo => {
                if (repo.language) {
                    language_counts[repo.language] =
                        (language_counts[repo.language] || 0) + 1;
                }
            });

            const syncMap = {
                "JavaScript": "JavaScript",
                "TypeScript": "JavaScript",
                "HTML": "HTML",
                "CSS": "CSS",
                "Python": "Python",
                "Java": "Java"
            };

            const newRatings = { ...skillRatings };

            Object.keys(language_counts).forEach(lang => {
                const skillname = syncMap[lang];
                if (skillname) {
                    const repoCount = language_counts[lang];

                    let autoRating = 1;
                    if (repoCount > 5) autoRating = 5;
                    else if (repoCount >= 3) autoRating = 4;
                    else if (repoCount === 2) autoRating = 3;
                    else if (repoCount === 1) autoRating = 2;

                    if (!newRatings[skillname] || autoRating > newRatings[skillname]) {
                        newRatings[skillname] = autoRating;
                    }
                }
            });

            setSkillRatings(newRatings);

            const summary = {
                name: userData.name,
                avatar: userData.avatar_url,
                repoCount: userData.public_repos,
                followers: userData.followers,
                score: Math.min(score, 100),
                profile_url: userData.html_url,
                location: userData.location,
                languages: language_counts
            };

            setGithubData(summary);
            localStorage.setItem("githubData", JSON.stringify(summary));

        } catch (error) {
            console.log(`Error: ${error}`);
            throw error;
        }
    };

    const toggleSkill = (skillName) => {
        const alreadyDone = completedSkills.find(s => s.name === skillName);

        if (alreadyDone) {
            const updated = completedSkills.filter(s => s.name !== skillName);
            setCompletedSkills(updated);
            return;
        }

        const today = new Date();
        const todayString = today.toDateString();

        const newEntry = {
            name: skillName,
            completedAt: today.toISOString()
        };

        const updatedSkills = [...completedSkills, newEntry];
        setCompletedSkills(updatedSkills);

        if (!lastCompletedDate) {
            setStreak(1);
        } else {
            const lastDate = new Date(lastCompletedDate);
            const diffTime = today - lastDate;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if (todayString === lastCompletedDate) {
                console.log("Streak Maintained");
            } else if (diffDays === 1) {
                setStreak(prev => prev + 1);
            } else {
                setStreak(1);
            }
        }

        setLastCompletedDate(todayString);
    };

    const generateRoadmap = () => {
        if (!selectedCareer) return;

        const careerSkills = {
            frontend: ["HTML", "CSS", "JavaScript", "React", "Redux"],
            backend: ["Node.js", "Express", "MongoDB", "SQL", "API Design"],
            fullstack: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDb"]
        };

        const skills = careerSkills[selectedCareer] || [];

        const generated = skills.map(skill => {
            const rating = skillRatings[skill] || 0;

            let priority = "Low";
            if (rating <= 2) priority = "High";
            else if (rating === 3) priority = "Medium";

            return {
                name: skill,
                difficulty: rating <= 2 ? "Beginner" :
                            rating === 3 ? "Intermediate" : "Advanced",
                priority
            };
        });

        setRoadmap(generated);
        localStorage.setItem('roadmap', JSON.stringify(generated));
    };

    useEffect(() => {
        if (roadmap.length > 0) {
            const relevant = completedSkills.filter(cs =>
                roadmap.some(r => r.name === cs.name)
            );

            const calculatedProgress = (relevant.length / roadmap.length) * 100;
            setProgress(Math.round(calculatedProgress));
        }
    }, [completedSkills, roadmap]);

    useEffect(() => {
        generateRoadmap();
        localStorage.setItem("selectedCareer", selectedCareer);
    }, [selectedCareer]);

    useEffect(() => {
        generateRoadmap();
        localStorage.setItem("skillRatings", JSON.stringify(skillRatings));
    }, [skillRatings]);

    useEffect(() => {
        localStorage.setItem("roadmap", JSON.stringify(roadmap));
    }, [roadmap]);

    useEffect(() => {
        localStorage.setItem("streak", streak);
    }, [streak]);

    useEffect(() => {
        localStorage.setItem("completedSkills", JSON.stringify(completedSkills));
    }, [completedSkills]);

    useEffect(() => {
        if (lastCompletedDate) {
            const today = new Date();
            const lastDate = new Date(lastCompletedDate);
            const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

            if (diffDays > 1) setStreak(0);
        }
        localStorage.setItem("lastCompletedDate", lastCompletedDate);
    }, [lastCompletedDate]);

    useEffect(() => {
        localStorage.setItem("weeklyProgress", JSON.stringify(weeklyProgress));
    }, [weeklyProgress]);

    return (
        <AppContext.Provider value={{
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
            setLastCompletedDate,
            toggleSkill,
            generateRoadmap,
            fetchGithubData
        }}>
            {children}
        </AppContext.Provider>
    );
};