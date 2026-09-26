import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function DigitalID() {
  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <h1>🪪 Digital Student ID</h1>

          <p>
            Your digital campus identity for accessing student services and
            campus activities.
          </p>

          <section className="digital-id-section">
            <div className="digital-id-card">
              <div className="id-header">
                <div>
                  <h2>UNISYNC</h2>
                  <p>SMART CAMPUS PORTAL</p>
                </div>

                <div className="id-status">
                  ACTIVE
                </div>
              </div>

              <div className="id-body">
                <div className="student-avatar">
                  👤
                </div>

                <div className="student-details">
                  <h2>Tarunya Voltair</h2>

                  <p>
                    <strong>Student ID:</strong> UNI2026001
                  </p>

                  <p>
                    <strong>Department:</strong> Computer Science
                  </p>

                  <p>
                    <strong>Year:</strong> III Year
                  </p>

                  <p>
                    <strong>Email:</strong> student@college.edu
                  </p>
                </div>

                <div className="qr-placeholder">
                  <div className="qr-box">
                    ▦
                  </div>

                  <p>Scan for Verification</p>
                </div>
              </div>

              <div className="id-footer">
                <span>Valid Student ID</span>
                <span>UNISYNC Campus</span>
              </div>
            </div>
          </section>

          <section className="id-features">
            <h2>🔐 Digital ID Features</h2>

            <div className="id-feature-grid">
              <div className="id-feature-card">
                <span>📚</span>
                <h3>Library Access</h3>
                <p>
                  Use your digital ID for library entry and services.
                </p>
              </div>

              <div className="id-feature-card">
                <span>📅</span>
                <h3>Event Check-in</h3>
                <p>
                  Scan your ID during campus events and activities.
                </p>
              </div>

              <div className="id-feature-card">
                <span>🏛️</span>
                <h3>Club Membership</h3>
                <p>
                  Connect your student identity with club memberships.
                </p>
              </div>

              <div className="id-feature-card">
                <span>🎫</span>
                <h3>Campus Access</h3>
                <p>
                  Use your digital identity for authorized campus facilities.
                </p>
              </div>
            </div>
          </section>

          <section className="id-security">
            <h2>🛡️ ID Security</h2>

            <p>
              Your digital identity can be verified using the QR code. Actual
              verification and authentication will be connected to the
              UNISYNC backend later.
            </p>

            <button className="verify-button">
              Verify Digital ID
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}

export default DigitalID;