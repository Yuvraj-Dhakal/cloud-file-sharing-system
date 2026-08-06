import { Link } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaLock,
  FaShareAlt,
} from "react-icons/fa";

import "../styles/Hero.css";

function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT */}
          <div className="col-lg-6">
            <span className="hero-badge">
              Secure Cloud File Sharing Platform
            </span>
            <h1 className="hero-title">
              Store,
              <br />
              Manage &
              <br />
              <span>Share Files</span>
              <br />
              Anywhere
            </h1>

            <p className="hero-description">
              YuvNext is a modern cloud file sharing system
              that allows you to securely upload, manage,
              preview and share your files from anywhere.
              Built with MERN Stack, Cloudinary storage,
              and secure authentication.
            </p>

            <div className="hero-buttons">
              <Link
                to="/register"
                className="btn btn-primary btn-lg"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="btn btn-outline-dark btn-lg"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* RIGHT */}

          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className="hero-card">
              <div className="hero-feature">
                <div className="hero-icon blue">
                  <FaCloudUploadAlt />
                </div>
                <div>

                  <h5>Cloud File Upload</h5>
                  <p>
                    Upload images, videos and documents
                    securely with cloud storage support.
                  </p>

                </div>
              </div>
              <hr />

              <div className="hero-feature">
                <div className="hero-icon green">
                  <FaShareAlt />
                </div>

                <div>
                  <h5>Easy File Sharing</h5>
                  <p>
                    Share your files quickly with secure
                    links and accessible file management.
                  </p>
                </div>
              </div>
              <hr />
              <div className="hero-feature">
                <div className="hero-icon dark">
                  <FaLock />
                </div>
                <div>
                  <h5>Secure Authentication</h5>

                  <p>
                    Protected accounts with JWT security
                    and Google authentication support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;