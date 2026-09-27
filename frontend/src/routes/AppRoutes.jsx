import Login from "../pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import StudentAI from "../pages/student/StudentAI";
import StudentDashboard from "../pages/student/StudentDashboard";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import ClubDashboard from "../pages/club-admin/ClubDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import LostAndFound from "../pages/student/LostAndFound";
import CampusMap from "../pages/student/CampusMap";
import FacultyLocator from "../pages/student/FacultyLocator";
import Clubs from "../pages/student/Clubs";
import Events from "../pages/student/Events";
import HallBooking from "../pages/student/HallBooking";
import DigitalID from "../pages/student/DigitalID";
import Achievements from "../pages/student/Achievements";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Protected Student Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/lost-found"
          element={
            <ProtectedRoute>
              <LostAndFound />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/map"
          element={
            <ProtectedRoute>
              <CampusMap />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/faculty"
          element={
            <ProtectedRoute>
              <FacultyLocator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/clubs"
          element={
            <ProtectedRoute>
              <Clubs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/hall-booking"
          element={
            <ProtectedRoute>
              <HallBooking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/digital-id"
          element={
            <ProtectedRoute>
              <DigitalID />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/achievements"
          element={
            <ProtectedRoute>
              <Achievements />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/ai"
          element={
            <ProtectedRoute>
              <StudentAI />
            </ProtectedRoute>
          }
        />

        {/* Other portals */}
        <Route
          path="/faculty"
          element={<FacultyDashboard />}
        />

        <Route
          path="/club-admin"
          element={<ClubDashboard />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;