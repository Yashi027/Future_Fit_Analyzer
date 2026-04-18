import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [currentGithubUser, setCurrentGithubUser] = useState(
        localStorage.getItem("currentGithubUser") || null
    );

    const [roadmap, setRoadmap] = useState(
        JSON.parse(localStorage.getItem('roadmap')) || []
    );

    const [selectedCareer, setSelectedCareer] = useState(
        localStorage.getItem('selectedCareer') || ""
    );

    const [skillRatings, setSkillRatings] = useState(() => {
        const storedUser = localStorage.getItem("currentGithubUser");
        if (!storedUser) return {};
        return JSON.parse(localStorage.getItem(`skillRatings_${storedUser}`)) || {};
    });

    const [progress, setProgress] = useState(0);

    const [githubData, setGithubData] = useState(
        JSON.parse(localStorage.getItem('githubData')) || null
    );

    const [weeklyProgress, setWeeklyProgress] = useState(
        JSON.parse(localStorage.getItem('weeklyProgress')) || []
    );

    const [streak, setStreak] = useState(
        parseInt(localStorage.getItem('streak')) || 0
    );

    const fetchGithubData = async (username) => {
        try {
            const res = await fetch(`https://api.github.com/users/${username}`);
            const repos = await fetch(`https://api.github.com/users/${username}/repos`);
            const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public`);

            const eventsData = await eventsRes.json();
            const userData = await res.json();
            const repoData = await repos.json();

            const last7days = Array(7).fill(0);
            if (eventsRes.ok && Array.isArray(eventsData)){
            eventsData.forEach(event => {
                if (event.type === "PushEvent") {
                    const eventDate = new Date(event.created_at);
                    const today = new Date();

                    const diffTime = today.getTime() - eventDate.getTime();

                    const diffDays = Math.floor(
                        diffTime / (1000 * 60 * 60 * 24)
                    );

                    if (diffDays >= 0 && diffDays < 7) {
                        last7days[6 - diffDays] += event.payload.commits?.length || 1;
                    }
                }
            });
        }

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

            const newRatings = {};

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

            setWeeklyProgress(last7days);
            setGithubData(summary);
            localStorage.setItem("githubData", JSON.stringify(summary));
            setCurrentGithubUser(username);
            localStorage.setItem("currentGithubUser", username);

            const existingRatings = JSON.parse(
                localStorage.getItem(`skillRatings_${username}`)
            );

            if (existingRatings) {
                setSkillRatings(existingRatings);
            } else {
                setSkillRatings(newRatings);
                localStorage.setItem(
                    `skillRatings_${username}`,
                    JSON.stringify(newRatings)
                );
            }
            updateStreak();

        } catch (error) {
            console.log(`Error: ${error}`);
            throw error;
        }
    };


    const generateRoadmap = () => {
        if (!selectedCareer) return;

        const careerSkills = {
            frontend: ["HTML", "CSS", "JavaScript", "React", "Redux"],
            backend: ["NodeJs", "Express", "MongoDb", "SQL", "API_Design"],
            fullstack: ["HTML", "CSS", "JavaScript", "React", "NodeJs", "MongoDb"]
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

    const updateStreak = () => {
        const today = new Date().toDateString();

        const lastDate = localStorage.getItem("lastActiveDate");

        if (!lastDate) {
            setStreak(1);
            localStorage.setItem("lastActiveDate", today);
            return;
        }

        const prev = new Date(lastDate);
        const curr = new Date(today);

        const diffDays = Math.floor(
            (curr - prev) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 0) return;

        if (diffDays === 1) {
            setStreak(prev => prev + 1);
        } else {
            setStreak(1);
        }

        localStorage.setItem("lastActiveDate", today);
    };

    useEffect(() => {
        if (roadmap.length > 0) {
            const completedCount = roadmap.filter(
                skill => skillRatings[skill.name] === 5
            ).length;

            const calculatedProgress = (completedCount / roadmap.length) * 100;
            setProgress(Math.round(calculatedProgress));
        } else {
            setProgress(0);
        }
    }, [roadmap, skillRatings]);

    useEffect(() => {
        generateRoadmap();
        localStorage.setItem("selectedCareer", selectedCareer);
    }, [selectedCareer]);

    useEffect(() => {
        if (currentGithubUser) {
            const stored = JSON.parse(
                localStorage.getItem(`skillRatings_${currentGithubUser}`)
            );
            if (stored) {
                setSkillRatings(stored);
            }
        }
    }, [currentGithubUser]);

    useEffect(() => {
        if (currentGithubUser) {
            localStorage.setItem(
                `skillRatings_${currentGithubUser}`,
                JSON.stringify(skillRatings)
            );
        }
    }, [skillRatings, currentGithubUser]);

    useEffect(() => {
        localStorage.setItem("roadmap", JSON.stringify(roadmap));
    }, [roadmap]);

    useEffect(() => {
        localStorage.setItem("streak", streak);
    }, [streak]);

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
            weeklyProgress,
            setWeeklyProgress,
            streak,
            setStreak,
            generateRoadmap,
            fetchGithubData
        }}>
            {children}
        </AppContext.Provider>
    );
};