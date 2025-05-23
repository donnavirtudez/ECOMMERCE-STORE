const teamMembers = [
  {
    name: "Alexander Fernandez",
    role: "Project Manager",
    imageUrl: "../assets/team/FERNANDEZ.jpg",
    socialLink: "https://www.instagram.com/_ajiiiii/",
  },
  {
    name: "Donna Virtudez",
    role: "Database Manager",
    imageUrl: "../assets/team/PAU.png",
    socialLink: "https://www.instagram.com/dddoughna/",
  },
  {
    name: "Kurt Macaranas",
    role: "UI Designer",
    imageUrl: "../assets/team/MACARANAS.png",
    socialLink: "https://www.instagram.com/macskurt/",
  },
  {
    name: "Liezl Quelang",
    role: "Documentation Writer",
    imageUrl: "../assets/team/QUELANG.png",
    socialLink: "https://www.instagram.com/aeliedd/",
  },
  {
    name: "Matthew Bides",
    role: "Backend Developer",
    imageUrl: "../assets/team/BIDES.png",
    socialLink: "https://www.instagram.com/matt_bides/",
  },
  {
    name: "Jessica Dimailig",
    role: "Documentation Writer",
    imageUrl: "../assets/team/DIMAILIG.png",
    socialLink: "https://www.instagram.com/2612jesscah/",
  },
];

const OurTeam = () => {
  return (
    <section className="bg-white py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold text-gray-800">Our Team</h2>
          <p className="mt-4 text-gray-600 text-lg">
            A skilled team turning our vision into reality.
          </p>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center text-center rounded-lg"
            >
              <img
                className="w-32 h-32 rounded-full object-cover mb-6"
                src={member.imageUrl}
                alt={member.name}
              />
              <h3 className="text-xl font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-gray-500">{member.role}</p>
              <div className="space-x-3">
                <a
                  href={member.socialLink}
                  className="text-gray-700 hover:text-[#4E71FF] transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
