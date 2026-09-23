import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentDashboard from "../pages/student/StudentDashboard";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import ClubDashboard from "../pages/club-admin/ClubDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/club-admin" element={<ClubDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;