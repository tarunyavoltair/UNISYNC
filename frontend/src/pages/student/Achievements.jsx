import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { get } from "../../services/api";

function Achievements() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const students = await get("/students");

        const currentStudent = students.find(
          (item) => item.studentId === "STU001"
        );

        setStudent(currentStudent);
      } catch (error) {
        console.error("Failed to load student achievements:", error);
      }
    };

    loadStudent();
  }, []);

  const totalXP = student ? student.xp : 0;

  const currentLevel = Math.floor(totalXP / 100) + 1;
  const currentLevelStartXP = (currentLevel - 1) * 100;
  const nextLevelXP = currentLevel * 100;

  const progress =
    ((totalXP - currentLevelStartXP) /
      (nextLevelXP - currentLevelStartXP)) *
    100;

  const xpToNextLevel = nextLevelXP - totalXP;

  const achievementDefinitions = [
    {
      icon: "🌅",
      title: "Early Bird",
      description: "Started your campus journey early.",
      xp: 50,
    },
    {
      icon: "📅",
      title: "Event Explorer",
      description: "Participated in campus events.",
      xp: 100,
    },
    {
      icon: "🏛️",
      title: "Club Member",
      description: "Joined a campus club.",
      xp: 100,
    },
    {
      icon: "💻",
      title: "Coding Explorer",
      description: "Participated in a coding activity.",
      xp: 100,
    },
    {
      icon: "🏆",
      title: "Competition Star",
      description: "Participated in a college competition.",
      xp: 250,
    },
    {
      icon: "🌟",
      title: "Campus Champion",
      description: "Reached 2000 XP through campus activities.",
      xp: 500,
    },
  ];

  const unlockedBadges = student ? student.badges : [];

  const achievements = achievementDefinitions.map((achievement) => ({
    ...achievement,
    unlocked: unlockedBadges.includes(achievement.title),
  }));

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <h1>🏆 XP & Achievements</h1>

          <p>
            Track your campus participation, earn XP and unlock achievements.
          </p>

          {!student ? (
            <p>Loading achievement data...</p>
          ) : (
            <>
              {/* XP SUMMARY */}

              <section className="xp-summary">
                <div className="xp-card">
                  <div className="xp-icon">⭐</div>
                  <h2>{totalXP}</h2>
                  <p>Total XP</p>
                </div>

                <div className="xp-card">
                  <div className="xp-icon">🏅</div>
                  <h2>Level {currentLevel}</h2>
                  <p>Current Level</p>
                </div>

                <div className="xp-card">
                  <div className="xp-icon">🎯</div>
                  <h2>{xpToNextLevel}</h2>
                  <p>XP to Next Level</p>
                </div>

                <div className="xp-card">
                  <div className="xp-icon">🏆</div>
                  <h2>{unlockedBadges.length}</h2>
                  <p>Achievements Unlocked</p>
                </div>
              </section>

              {/* LEVEL PROGRESS */}

              <section className="level-progress">
                <div className="level-header">
                  <div>
                    <h2>Level {currentLevel}</h2>
                    <p>
                      Keep participating to reach the next level!
                    </p>
                  </div>

                  <strong>
                    {totalXP} / {nextLevelXP} XP
                  </strong>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                    }}
                  ></div>
                </div>

                <p className="next-level-text">
                  {xpToNextLevel} XP needed for Level{" "}
                  {currentLevel + 1}
                </p>
              </section>

              {/* ACHIEVEMENTS */}

              <section className="achievements-section">
                <h2>🏅 Achievements & Badges</h2>

                <div className="achievements-grid">
                  {achievements.map((achievement, index) => (
                    <div
                      className={`achievement-card ${
                        achievement.unlocked
                          ? "unlocked"
                          : "locked"
                      }`}
                      key={index}
                    >
                      <div className="achievement-icon">
                        {achievement.icon}
                      </div>

                      <div className="achievement-content">
                        <h3>{achievement.title}</h3>

                        <p>{achievement.description}</p>

                        <span className="achievement-xp">
                          +{achievement.xp} XP
                        </span>

                        <span
                          className={
                            achievement.unlocked
                              ? "badge-unlocked"
                              : "badge-locked"
                          }
                        >
                          {achievement.unlocked
                            ? "✓ Unlocked"
                            : "🔒 Locked"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* XP HISTORY */}

              <section className="xp-history">
                <h2>📈 Recent XP Activity</h2>

                <div className="xp-history-list">
                  <div className="xp-history-item">
                    <div>
                      <h3>Current XP from campus activities</h3>
                      <p>Stored in your UNISYNC student profile</p>
                    </div>

                    <strong>{totalXP} XP</strong>
                  </div>
                </div>
              </section>

              {/* HOW TO EARN XP */}

              <section className="earn-xp-section">
                <h2>🚀 Ways to Earn XP</h2>

                <div className="earn-xp-grid">
                  <div>
                    <span>🏛️</span>
                    <h3>Join Clubs</h3>
                    <p>Join campus clubs and communities.</p>
                  </div>

                  <div>
                    <span>📅</span>
                    <h3>Attend Events</h3>
                    <p>
                      Participate in campus events and workshops.
                    </p>
                  </div>

                  <div>
                    <span>🤝</span>
                    <h3>Volunteer</h3>
                    <p>
                      Contribute to college activities and volunteering.
                    </p>
                  </div>

                  <div>
                    <span>🏆</span>
                    <h3>Competitions</h3>
                    <p>
                      Participate in competitions and challenges.
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Achievements;