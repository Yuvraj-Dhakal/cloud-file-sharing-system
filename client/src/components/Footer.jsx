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
              <small>Cloud File Sharing System</small>
              </div>

            </div>
              <p>
  YuvNext is a secure cloud file sharing system
  built with React, Node.js, Express, MongoDB,
  and Cloudinary. It allows users to upload,
  manage, and share files securely from anywhere.
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
<p>File Management</p>
<p>Secure Authentication</p>

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
  © {new Date().getFullYear()} YuvNext Cloud File Sharing System.
  All Rights Reserved.
</p>

      </div>

    </footer>
  );
}

export default Footer;