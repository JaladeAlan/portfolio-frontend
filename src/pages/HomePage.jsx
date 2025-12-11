import { useEffect, useState } from "react";
import api from "../api/axios";

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured projects
  useEffect(() => {
    api.get("/projects?limit=3")
      .then((res) => setProjects(res.data.projects || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="">

      {/* HERO SECTION */}
      <section className="min-h-[80vh] flex items-center justify-center text-center px-6 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hi, I'm <span className="text-blue-400">Joseph Alalade</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Full-Stack Developer specializing in  
            <span className="text-blue-400"> Laravel</span> &  
            <span className="text-blue-400"> React</span>.
            I build scalable APIs and modern frontend apps.
          </p>

          <a
            href="#projects"
            className="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-lg font-semibold"
          >
            View My Work
          </a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            I’m a full stack developer passionate about building powerful API-driven
            applications. I work with Laravel, React, MySQL, TailwindCSS, and modern
            DevOps tools. My focus is clean architecture, maintainability, and great UI experiences.
          </p>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Skills</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-700">
            <div className="p-5 bg-white shadow rounded-lg">Laravel</div>
            <div className="p-5 bg-white shadow rounded-lg">React</div>
            <div className="p-5 bg-white shadow rounded-lg">MySQL</div>
            <div className="p-5 bg-white shadow rounded-lg">REST API</div>
            <div className="p-5 bg-white shadow rounded-lg">Tailwind CSS</div>
            <div className="p-5 bg-white shadow rounded-lg">Git & GitHub</div>
            <div className="p-5 bg-white shadow rounded-lg">JWT Auth</div>
            <div className="p-5 bg-white shadow rounded-lg">Server Deployment</div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="projects" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Featured Projects</h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-center text-gray-500">No projects available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-100 shadow rounded-lg overflow-hidden"
                >
                  {/* Thumbnail */}
                  {project.image ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-300"></div>
                  )}

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {project.summary}
                    </p>

                    <a
                      href={`/projects/${project.id}`}
                      className="text-blue-500 hover:text-blue-600 font-semibold"
                    >
                      View Project →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-20 px-6 text-center bg-gray-900 text-white">
        <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
        <p className="text-gray-300 mb-8">
          Need a website, API, or full-stack system? I’m available for freelance work.
        </p>

        <a
          href="/contact"
          className="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-lg font-semibold"
        >
          Contact Me
        </a>
      </section>
    </div>
  );
}
