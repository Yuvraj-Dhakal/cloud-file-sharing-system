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
    title: "Cloud Storage",
    description:
      "Store your files securely in the cloud and access them anytime, anywhere.",
  },
  {
    icon: FaQrcode,
    color: "#10B981",
    title: "QR Code Sharing",
    description:
      "Generate QR codes instantly for quick and secure file sharing.",
  },
  {
    icon: FaLock,
    color: "#F97316",
    title: "Secure Authentication",
    description:
      "JWT authentication and Google Login keep your account protected.",
  },
  {
    icon: FaLink,
    color: "#7C3AED",
    title: "Smart Sharing",
    description:
      "Share files using secure links with future support for password protection and expiration.",
  },
  {
    icon: FaChartPie,
    color: "#EC4899",
    title: "Storage Analytics",
    description:
      "Monitor your storage usage, uploaded files, and account statistics.",
  },
  {
    icon: FaMobileAlt,
    color: "#06B6D4",
    title: "Responsive Design",
    description:
      "Optimized for desktop, tablet, and mobile devices with a modern SaaS interface.",
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
            YuvNext combines modern cloud storage,
            secure sharing, and a clean user experience
            into one powerful platform.
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

                  <h4>{feature.title}</h4>

                  <p>{feature.description}</p>

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