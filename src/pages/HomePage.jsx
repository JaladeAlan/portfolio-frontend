import { useEffect, useState } from "react";
import api from "../api/axios";
import Footer from "../components/common/Footer"; 

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/projects?limit=3")
      .then((res) => setProjects(res.data || []))
      .catch(() => setProjects(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full overflow-x-hidden max-w-full flex flex-col min-h-screen">
      
      {/* HERO SECTION */}
      <section className="flex-1 min-h-screen flex items-center justify-center text-center
        bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-20">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Hi, I'm <span className="text-blue-400">Joseph Alalade</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Full-Stack Developer specializing in
            <span className="text-blue-400"> Laravel</span> &
            <span className="text-blue-400"> React</span>. I build scalable APIs and
            modern frontend apps.
          </p>
          <a
          href="#projects"
          className="
            bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg inline-block 
            transition transform hover:bg-yellow-400 hover:text-gray-900 hover:scale-105 duration-300
            hover-glow
          "
        >
          View My Work
        </a>

        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">About Me</h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            I’m a full stack developer passionate about building powerful
            API-driven applications. I work with Laravel, React, MySQL, TailwindCSS,
            and modern DevOps tools. My focus is clean architecture,
            maintainability, and great UI experiences.
          </p>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section
        id="skills"
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-full">
            {[
              "Laravel",
              "React",
              "MySQL",
              "REST API",
              "Tailwind CSS",
              "Git & GitHub",
              "JWT Auth",
              "Server Deployment",
            ].map((skill) => (
              <div
                key={skill}
                className="p-4 sm:p-5 bg-white shadow rounded-lg text-gray-700 text-sm sm:text-base"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section
        id="projects"
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            Featured Projects
          </h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-center text-gray-500">No projects available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-full">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-100 shadow rounded-lg overflow-hidden"
                >
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 sm:h-48 bg-gray-300"></div>
                  )}
                  <div className="p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
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
      <section
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center bg-gray-900 text-white"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Let's Work Together
        </h2>
        <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-xl mx-auto">
          Need a website, API, or full-stack system? I’m available for freelance work.
        </p>
        <a
          href="/contact"
          className="
            bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg inline-block 
            transition transform hover:bg-yellow-400 hover:text-gray-900 hover:scale-105 duration-300
            hover-glow
          "
        >
          Contact Me
        </a>

      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
