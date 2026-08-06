import {
  FaCloudUploadAlt,
  FaQrcode,
  FaLock,
  FaLink,
  FaChartPie,
  FaMobileAlt,
} from "react-icons/fa";

import "../styles/Features.css";

const features = [
  {
    icon: FaCloudUploadAlt,
    color: "#2563EB",
    title: "Cloud File Storage",
    description:
      "Upload and store images, videos, and documents securely using cloud storage powered by Cloudinary.",
  },
  {
    icon: FaQrcode,
    color: "#10B981",
    title: "Easy File Sharing",
    description:
      "Share your uploaded files easily with secure access links and convenient file management.",
  },
  {
    icon: FaLock,
    color: "#F97316",
    title: "Secure Authentication",
    description:
      "JWT authentication and Google Login protect user accounts and private files.",
  },
  {
    icon: FaLink,
    color: "#7C3AED",
    title: "File Management",
    description:
      "Manage uploaded files with organized storage, file details, download, and delete options.",
  },
  {
    icon: FaChartPie,
    color: "#EC4899",
    title: "Smart File Organization",
    description:
      "Automatically organize files based on type including images, videos, documents, and other files.",
  },
  {
    icon: FaMobileAlt,
    color: "#06B6D4",
    title: "Responsive Interface",
    description:
      "Access YuvNext through a modern responsive interface optimized for desktop, tablet, and mobile devices.",
  },
];

function Features() {
  return (
    <section id="features" className="features-section">

      <div className="container">

        <div className="section-header">

          <span className="section-badge">
            Features
          </span>

          <h2>
            Everything You Need for Secure File Sharing
          </h2>

          <p>
            YuvNext provides secure cloud storage,
            file management, and sharing features
            through a modern and user-friendly platform.
          </p>

        </div>


        <div className="row">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <div
                className="col-lg-4 col-md-6 mb-4"
                key={index}
              >

                <div className="feature-card">

                  <div
                    className="feature-icon"
                    style={{
                      background: feature.color,
                    }}
                  >
                    <Icon size={36} />
                  </div>


                  <h4>
                    {feature.title}
                  </h4>


                  <p>
                    {feature.description}
                  </p>


                </div>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}

export default Features;