export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="container mx-auto px-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Branding */}
          <div>
            <h2 className="text-xl font-bold text-white">Ayodeji Alalade</h2>
            <p className="mt-3 text-gray-400 text-sm">
              Full Stack Developer — Laravel & React  
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#projects" className="hover:text-white">Projects</a></li>
              <li><a href="#skills" className="hover:text-white">Skills</a></li>
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-white font-semibold mb-3">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/" target="_blank" className="hover:text-white">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/" target="_blank" className="hover:text-white">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:email@example.com" className="hover:text-white">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm">
          © {year} Ayodeji Alalade — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
