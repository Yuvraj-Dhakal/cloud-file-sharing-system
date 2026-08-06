import {
  FaShieldAlt,
  FaBolt,
  FaCloud,
  FaUsers,
} from "react-icons/fa";

import "../styles/WhyChoose.css";
const reasons = [
  {
    icon: <FaShieldAlt />,
    title: "Secure File Protection",
    text: "Your files are protected using JWT authentication and secure cloud storage integration.",
  },
  {
    icon: <FaBolt />,
    title: "Fast File Management",
    text: "Upload, download, search, and manage your files through a simple and modern dashboard.",
  },
  {
    icon: <FaCloud />,
    title: "Cloud Powered Storage",
    text: "Built with React, Node.js, Express, MongoDB, and Cloudinary for reliable file storage.",
  },
  {
    icon: <FaUsers />,
    title: "Built for Everyone",
    text: "Designed for students, freelancers, teachers, and professionals who need secure file sharing.",
  },
];

function WhyChoose() {
  return (
    <section className="why-section">

      <div className="container">

        <div className="section-header">

          <span className="section-badge">
            Why YuvNext
          </span>

          <h2>
            Built for Modern File Sharing
          </h2>

          <p>
           YuvNext makes file storage and sharing
  simple, secure, and accessible through
  a modern cloud-based platform.
          </p>

        </div>

        <div className="row">

          {reasons.map((item, index) => (

            <div
              className="col-lg-3 col-md-6 mb-4"
              key={index}
            >

              <div className="why-card">

                <div className="why-icon">
                  {item.icon}
                </div>

                <h4>{item.title}</h4>

                <p>{item.text}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyChoose;