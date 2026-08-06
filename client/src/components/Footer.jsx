import "./../styles/Footer.css";

import {
  FaCloud,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer id="contact" className="footer">

      <div className="container">

        <div className="row gy-5">

          {/* Company */}
          <div className="col-lg-4">
            <div className="footer-brand">
              <FaCloud size={34} />
              <div>
                <h3>YuvNext</h3>

                <small>Cloud Storage Platform</small>

              </div>

            </div>
            <p>
              YuvNext is a secure cloud storage and smart
              file sharing platform built using the MERN Stack.
              It enables users to upload, manage, and securely
              share files from anywhere with an intuitive and
              modern user experience.
            </p>

          </div>

          {/* Product */}

          <div className="col-lg-2">

            <h5>Product</h5>
            <p>Home</p>
            <p>Features</p>
            <p>Pricing</p>
            <p>Dashboard</p>

          </div>

          {/* Features */}
          <div className="col-lg-3">

            <h5>Features</h5>

            <p>Secure File Upload</p>
            <p>Cloud Storage</p>
            <p>QR Code Sharing</p>
            <p>Fast Downloads</p>

          </div>

          {/* Contact */}
          <div className="col-lg-3">

            <h5>Contact</h5>

            <p>
              <FaEnvelope className="me-2" />
              yuvrajdhakal136@gmail.com
            </p>

            <p>
              <FaMapMarkerAlt className="me-2" />
              Kathmandu, Nepal
            </p>

            <div className="footer-social">

              <a
                href="https://github.com/Yuvraj-Dhakal"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/yuv-raj-dhakal-603514308"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>

            </div>

          </div>

        </div>

        <hr />

        <p className="footer-copy">
          © {new Date().getFullYear()} YuvNext Cloud Storage.
          All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;