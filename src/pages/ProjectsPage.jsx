import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/projects")
      .then((res) => setProjects(res.data || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 mt-8">Projects</h1>
        <p className="text-gray-600 text-base sm:text-lg">
          A collection of my projects — web apps, APIs, and full-stack systems.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => {
            const imageUrl = project.image_url || `${import.meta.env.VITE_API_BASE_URL}/${project.image}`;

            return (
              <div
                key={project.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200"></div>
                )}

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{project.title}</h3>
                    <p className="text-gray-500 text-sm mb-2">{project.stack}</p>
                    <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-auto flex space-x-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()} // prevent card click
                        className="text-gray-700 hover:text-yellow-400 transition-colors font-semibold"
                      >
                        GitHub
                      </a>
                    )}
                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="text-blue-500 hover:text-yellow-400 transition-colors font-semibold"
                      >
                        Live Site
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
