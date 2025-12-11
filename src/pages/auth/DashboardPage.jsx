import { useEffect, useState } from "react";
import api from "../../api/axios";
import { LogOut, Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard({ admin }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [projectRes, skillRes, messageRes] = await Promise.all([
        api.get("/projects"),
        api.get("/skills"),
        api.get("/messages"),
      ]);

      setProjects(projectRes.data.data || projectRes.data);
      setSkills(skillRes.data.data || skillRes.data);
      setMessages(messageRes.data.data || messageRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center bg-white shadow p-4 mb-6 rounded-md">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        
        <div className="flex items-center gap-4">
          <span className="text-gray-700">
            Logged in as: <strong>{admin?.name}</strong>
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Projects Section */}
        <div className="bg-white p-4 rounded-md shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Projects</h2>
            <button className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              <Plus size={16} /> Add
            </button>
          </div>

          <ul className="space-y-3">
            {projects.length === 0 && <p>No projects yet.</p>}
            {projects.map((p) => (
              <li
                key={p.id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded border"
              >
                <span>{p.title}</span>
                <div className="flex gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills Section */}
        <div className="bg-white p-4 rounded-md shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Skills</h2>
            <button className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              <Plus size={16} /> Add
            </button>
          </div>

          <ul className="space-y-3">
            {skills.length === 0 && <p>No skills yet.</p>}
            {skills.map((s) => (
              <li
                key={s.id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded border"
              >
                <span>{s.name}</span>
                <div className="flex gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Messages Section */}
        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="font-bold text-lg mb-3">Messages</h2>

          <ul className="space-y-3">
            {messages.length === 0 && <p>No messages.</p>}
            {messages.map((m) => (
              <li
                key={m.id}
                className="bg-gray-50 p-3 rounded border"
              >
                <p className="font-semibold">{m.name}</p>
                <p className="text-sm text-gray-700">{m.email}</p>
                <p className="mt-1">{m.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
