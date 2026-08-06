import {
  FaFolderOpen,
  FaHdd,
  FaCloudUploadAlt,
  FaShieldAlt,
} from "react-icons/fa";

import "../styles/StatsCards.css";

function StatsCards({ files }) {

  const totalFiles = files.length;

  const totalSize = files.reduce(
    (sum, file) => sum + file.size,
    0
  );

  const formatSize = (bytes) => {

    if (bytes < 1024)
      return bytes + " B";

    if (bytes < 1024 * 1024)
      return (bytes / 1024).toFixed(2) + " KB";

    if (bytes < 1024 * 1024 * 1024)
      return (bytes / (1024 * 1024)).toFixed(2) + " MB";

    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  };

  return (

    <div className="row g-4">

      {/* Total Files */}

      <div className="col-xl-3 col-md-6">

        <div className="stats-card stats-blue">

          <div className="stats-icon">

            <FaFolderOpen />

          </div>

          <div className="stats-info">

            <span>Total Files</span>

            <h2>{totalFiles}</h2>

            <small>Files Stored</small>

          </div>

        </div>

      </div>

      {/* Storage */}

      <div className="col-xl-3 col-md-6">

        <div className="stats-card stats-green">

          <div className="stats-icon">

            <FaHdd />

          </div>

          <div className="stats-info">

            <span>Storage Used</span>

            <h2>{formatSize(totalSize)}</h2>

            <small>Cloud Usage</small>

          </div>

        </div>

      </div>

      {/* Upload */}

      <div className="col-xl-3 col-md-6">

        <div className="stats-card stats-purple">

          <div className="stats-icon">

            <FaCloudUploadAlt />

          </div>

          <div className="stats-info">

            <span>Uploads</span>

            <h2>{totalFiles}</h2>

            <small>Successful Uploads</small>

          </div>

        </div>

      </div>

      {/* Security */}

      <div className="col-xl-3 col-md-6">

        <div className="stats-card stats-orange">

          <div className="stats-icon">

            <FaShieldAlt />

          </div>

          <div className="stats-info">

            <span>Security</span>

            <h2>100%</h2>

            <small>Protected</small>

          </div>

        </div>

      </div>

    </div>

  );

}

export default StatsCards;