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
              Secure Cloud Storage Platform
            </span>

            <h1 className="hero-title">
              Store,
              <br />
              Share &
              <br />
              <span>Access Files</span>
              <br />
              Anywhere
            </h1>

            <p className="hero-description">
              YuvNext is a secure cloud storage and file
              sharing platform built using the MERN Stack.
              Upload, organize and securely share your
              files from anywhere with a modern SaaS
              experience.
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

              {/* Upload */}

              <div className="hero-feature">

                <div className="hero-icon blue">

                  <FaCloudUploadAlt />

                </div>

                <div>

                  <h5>Secure Upload</h5>

                  <p>
                    Upload files instantly with cloud
                    storage support.
                  </p>

                </div>

              </div>

              <hr />

              {/* Share */}

              <div className="hero-feature">

                <div className="hero-icon green">

                  <FaShareAlt />

                </div>

                <div>

                  <h5>Smart Sharing</h5>

                  <p>
                    Share files instantly using secure
                    links and QR codes.
                  </p>

                </div>

              </div>

              <hr />

              {/* Security */}

              <div className="hero-feature">

                <div className="hero-icon dark">

                  <FaLock />

                </div>

                <div>

                  <h5>Enterprise Security</h5>

                  <p>
                    JWT authentication with secure cloud
                    storage protection.
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