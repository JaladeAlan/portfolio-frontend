import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      {projects.map((p) => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <p>{p.summary}</p>
        </div>
      ))}
    </div>
  );
}
