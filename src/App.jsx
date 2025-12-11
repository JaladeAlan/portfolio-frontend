import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./api/axios";

// Public Pages
import Home from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import Contact from "./pages/ContactPage";

// Admin
import AdminLogin from "./pages/auth/LoginPage";
import AdminDashboard from "./pages/auth/DashboardPage";

// Layout
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Protected Route
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <AdminLogin />;
}

export default function App() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api
        .get("/admin/me")
        .then((res) => setAdmin(res.data.admin))
        .catch(() => {
          localStorage.removeItem("token");
          setAdmin(null);
        });
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">

        {/* Navbar shows on public pages only */}
        {!admin && <Navbar />}

        <main className="flex-grow">
          <Routes>

            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailsPage />} />
            <Route path="/contact" element={<Contact />} />

            {/* ADMIN AUTH */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* PROTECTED ADMIN AREA */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard admin={admin} />
                </ProtectedRoute>
              }
            />

            {/* 404 fallback */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </main>

        {!admin }
      </div>
    </Router>
  );
}
