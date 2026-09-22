import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">U</div>
          <span>UNISYNC</span>
        </div>

        <nav>
          <a className="active">🏠 Dashboard</a>
          <a>🔎 Lost & Found</a>
          <a>👨‍🏫 Faculty Locator</a>
          <a>🎭 Clubs & Societies</a>
          <a>🏛️ Hall Booking</a>
          <a>🗺️ Campus Map</a>
        </nav>

        <div className="sidebar-bottom">
          <a>⚙️ Settings</a>
          <a>🚪 Logout</a>
        </div>
      </aside>

      {/* Main content */}
      <main className="main">
        <header className="topbar">
          <div>
            <p className="welcome-small">Welcome back 👋</p>
            <h1>Good morning, Student!</h1>
          </div>

          <div className="profile">
            <div className="notification">🔔</div>
            <div className="avatar">S</div>
          </div>
        </header>

        {/* Welcome card */}
        <section className="welcome-card">
          <div>
            <p className="card-label">YOUR CAMPUS, CONNECTED</p>
            <h2>Everything you need,<br />in one place.</h2>
            <p>
              Discover events, find faculty, book halls,
              explore clubs and stay connected with campus life.
            </p>
            <button>Explore UNISYNC →</button>
          </div>

          <div className="card-symbol">U</div>
        </section>

        {/* Quick access */}
        <section>
          <div className="section-title">
            <h2>Quick Access</h2>
            <span>View all →</span>
          </div>

          <div className="module-grid">
            <div className="module-card">
              <div className="module-icon">🔎</div>
              <h3>Lost & Found</h3>
              <p>Find or report lost items around campus.</p>
            </div>

            <div className="module-card">
              <div className="module-icon">👨‍🏫</div>
              <h3>Faculty Locator</h3>
              <p>Find faculty members and their locations.</p>
            </div>

            <div className="module-card">
              <div className="module-icon">🎭</div>
              <h3>Clubs & Societies</h3>
              <p>Discover clubs and join campus communities.</p>
            </div>

            <div className="module-card">
              <div className="module-icon">🏛️</div>
              <h3>Hall Booking</h3>
              <p>Check availability and book campus halls.</p>
            </div>

            <div className="module-card">
              <div className="module-icon">🗺️</div>
              <h3>Campus Map</h3>
              <p>Explore buildings and navigate your campus.</p>
            </div>

            <div className="module-card">
              <div className="module-icon">🤖</div>
              <h3>UNISYNC AI</h3>
              <p>Ask questions and get help around campus.</p>
            </div>
          </div>
        </section>

        {/* Campus activity */}
        <section className="activity">
          <div className="section-title">
            <h2>What's Happening?</h2>
            <span>View all →</span>
          </div>

          <div className="activity-card">
            <div className="event-date">
              <strong>22</strong>
              <span>SEP</span>
            </div>

            <div>
              <h3>Welcome to UNISYNC</h3>
              <p>
                Your smart digital campus starts here. Explore
                everything UNISYNC has to offer.
              </p>
            </div>

            <button className="event-button">View</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;