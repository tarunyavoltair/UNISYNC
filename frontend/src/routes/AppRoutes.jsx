import Login from "../pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

        <Route
          path="/student"
          element={<StudentDashboard />}
        />
        <Route path="/student/lost-found" element={<LostAndFound />} />
        <Route path="/student/map" element={<CampusMap />} />
        <Route path="/student/faculty" element={<FacultyLocator />} />
        <Route path="/student/clubs" element={<Clubs />} />
        <Route path="/student/events" element={<Events />} />
        <Route path="/student/hall-booking" element={<HallBooking />} />
        <Route path="/student/digital-id" element={<DigitalID />} />
        <Route path="/student/achievements" element={<Achievements />} />
        <Route path="/student/ai" element={<StudentAI />} />
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