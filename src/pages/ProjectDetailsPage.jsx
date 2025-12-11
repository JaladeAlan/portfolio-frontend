import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/projects/${id}`)
      .then((res) => setProject(res.data.project)) 
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading project...</p>;
  if (!project)
    return <p className="text-center text-red-500 mt-10">Project not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 sm:p-8">

        {/* Back button at the top */}
        <Link
          to="/projects"
          className="mb-6 inline-block px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition transform hover:scale-105 duration-300"
        >
          ← Back to Projects
        </Link>

        {/* Project Image */}
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-64 sm:h-80 object-cover mb-6"
          />
        ) : (
          <div className="w-full h-64 sm:h-80 bg-gray-200 mb-6"></div>
        )}

        {/* Title & Stack */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{project.title}</h1>
        <p className="text-gray-500 mb-4">{project.stack}</p>

        {/* Summary */}
        <p className="text-gray-700 mb-4 font-semibold">{project.summary}</p>

        {/* Description */}
        <p className="text-gray-600 mb-6 whitespace-pre-line">{project.description}</p>

        {/* Links */}
        <div className="flex flex-wrap gap-4 mb-6">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-colors font-semibold"
            >
              GitHub
            </a>
          )}
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-colors font-semibold"
            >
              Live Site
            </a>
          )}
        </div>

        {/* Dates */}
        {/* <p className="text-gray-400 text-sm">
          Created: {new Date(project.created_at).toLocaleDateString()} | Updated:{" "}
          {new Date(project.updated_at).toLocaleDateString()}
        </p> */}
      </div>
    </div>
  );
}
