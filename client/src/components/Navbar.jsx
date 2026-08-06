import { Link } from "react-router-dom";
import { FaCloud, FaArrowRight } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg yuv-navbar fixed-top">
      <div className="container">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center"
        >
          <div className="brand-icon">
            <FaCloud />
          </div>

          <div className="ms-3">
            <div className="brand-title">
              YuvNext
            </div>

            <div className="brand-subtitle">
              Secure Cloud Storage
            </div>
          </div>
        </Link>

        {/* Mobile Button */}
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <a href="#home" className="nav-link">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a href="#features" className="nav-link">
                Features
              </a>
            </li>

            <li className="nav-item">
              <a href="#pricing" className="nav-link">
                Pricing
              </a>
            </li>

            <li className="nav-item">
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </li>

          </ul>

          {/* Right Buttons */}
          <div className="navbar-buttons">

            <Link
              to="/login"
              className="login-btn"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="register-btn"
            >
              Get Started

              <FaArrowRight />
            </Link>

          </div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;