import { useNavigate } from "react-router-dom";
import {
  FaCloud,
  FaShieldAlt,
  FaSignOutAlt
} from "react-icons/fa";

import "../styles/DashboardNavbar.css";

function DashboardNavbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (

    <header className="dashboard-navbar">

      <div className="container dashboard-navbar-container">

        {/* Left */}

        <div
          className="dashboard-logo"
          onClick={() => navigate("/dashboard")}
        >

          <div className="dashboard-logo-icon">

            <FaCloud />
          </div>

          <div>

            <h2>YuvNext</h2>
            <span>Cloud File Sharing System</span>
          </div>

        </div>

        {/* Right */}

        <div className="dashboard-right">

          <div className="dashboard-status">

            <div className="status-circle"></div>

            <FaShieldAlt />

            <span>Protected by Cloudinary</span>

          </div>

          <button
            className="logout-button"
            onClick={logout}
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </div>

    </header>

  );

}

export default DashboardNavbar;