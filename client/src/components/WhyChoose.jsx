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
    title: "Enterprise Security",
    text: "Your files are protected using JWT authentication with secure cloud storage.",
  },
  {
    icon: <FaBolt />,
    title: "Fast File Sharing",
    text: "Generate shareable links and QR codes instantly for seamless access.",
  },
  {
    icon: <FaCloud />,
    title: "Cloud Powered",
    text: "Built with MongoDB, Cloudinary, React, Node.js and Express for scalability.",
  },
  {
    icon: <FaUsers />,
    title: "Designed for Everyone",
    text: "Perfect for students, freelancers, teachers and professionals.",
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
            YuvNext is designed to make storing,
            managing and sharing files simple,
            secure and accessible from anywhere.
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