import { FaCloudUploadAlt, FaFolderOpen } from "react-icons/fa";
import "../styles/UploadCard.css";

function UploadCard({
  file,
  setFile,
  uploadFile,
}) {
  return (
    <div className="upload-card">

      <div className="upload-header">

        <div className="upload-header-icon">
          <FaCloudUploadAlt />
        </div>

        <div className="upload-header-text">
          <h3>Upload New File</h3>
          <p>Securely upload documents, images and videos.</p>
        </div>

      </div>

      <label
        htmlFor="fileInput"
        className="upload-dropzone"
      >

        <FaFolderOpen className="drop-icon" />

        <div className="drop-content">

          <h4>
            {file ? file.name : "Choose a file"}
          </h4>

          <span>
            Drag & Drop or click to browse
          </span>

        </div>

        <input
          id="fileInput"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

      </label>

      <button
        className="upload-btn"
        onClick={uploadFile}
      >

        <FaCloudUploadAlt />

        Upload File

      </button>

    </div>
  );
}

export default UploadCard;