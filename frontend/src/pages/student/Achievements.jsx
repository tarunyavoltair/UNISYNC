import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Achievements() {
  const totalXP = 1250;
  const currentLevel = 5;
  const nextLevelXP = 1500;
  const progress = (totalXP / nextLevelXP) * 100;

  const achievements = [
    {
      icon: "💻",
      title: "Coding Explorer",
      description: "Participated in a coding activity.",
      xp: 100,
      unlocked: true,
    },
    {
      icon: "🏛️",
      title: "Club Member",
      description: "Joined your first campus club.",
      xp: 100,
      unlocked: true,
    },
    {
      icon: "📅",
      title: "Event Participant",
      description: "Attended a campus event.",
      xp: 150,
      unlocked: true,
    },
    {
      icon: "🤝",
      title: "Campus Contributor",
      description: "Participated in a volunteering activity.",
      xp: 200,
      unlocked: true,
    },
    {
      icon: "🏆",
      title: "Competition Star",
      description: "Participated in a college competition.",
      xp: 250,
      unlocked: false,
    },
    {
      icon: "🌟",
      title: "Campus Champion",
      description: "Reach 2000 XP through campus activities.",
      xp: 500,
      unlocked: false,
    },
  ];

  const xpHistory = [
    {
      activity: "Joined Coding Club",
      date: "September 20, 2026",
      xp: "+100 XP",
    },
    {
      activity: "Attended Tech Workshop",
      date: "September 18, 2026",
      xp: "+150 XP",
    },
    {
      activity: "Participated in Campus Event",
      date: "September 15, 2026",
      xp: "+100 XP",
    },
    {
      activity: "Volunteering Activity",
      date: "September 10, 2026",
      xp: "+200 XP",
    },
  ];

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
              <h2>{nextLevelXP - totalXP}</h2>
              <p>XP to Next Level</p>
            </div>

            <div className="xp-card">
              <div className="xp-icon">🏆</div>
              <h2>
                {achievements.filter((item) => item.unlocked).length}
              </h2>
              <p>Achievements Unlocked</p>
            </div>
          </section>

          {/* LEVEL PROGRESS */}

          <section className="level-progress">
            <div className="level-header">
              <div>
                <h2>Level {currentLevel}</h2>
                <p>Keep participating to reach the next level!</p>
              </div>

              <strong>
                {totalXP} / {nextLevelXP} XP
              </strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="next-level-text">
              {nextLevelXP - totalXP} XP needed for Level{" "}
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
                    achievement.unlocked ? "unlocked" : "locked"
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
              {xpHistory.map((item, index) => (
                <div className="xp-history-item" key={index}>
                  <div>
                    <h3>{item.activity}</h3>
                    <p>{item.date}</p>
                  </div>

                  <strong>{item.xp}</strong>
                </div>
              ))}
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
                <p>Participate in campus events and workshops.</p>
              </div>

              <div>
                <span>🤝</span>
                <h3>Volunteer</h3>
                <p>Contribute to college activities and volunteering.</p>
              </div>

              <div>
                <span>🏆</span>
                <h3>Competitions</h3>
                <p>Participate in competitions and challenges.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Achievements;