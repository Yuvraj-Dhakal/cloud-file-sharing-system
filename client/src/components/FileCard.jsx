import { useState } from "react";
import api from "../config/api";
import { QRCodeCanvas } from "qrcode.react";

import {
  FaCopy,
  FaDownload,
  FaTrash,
  FaQrcode,
  FaTimes,
  FaFileImage,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileArchive,
  FaFileVideo,
  FaFileAlt,
  FaCalendarAlt,
  FaCloudDownloadAlt,
} from "react-icons/fa";

import { toast } from "react-toastify";

import "../styles/FileCard.css";
const IMAGE_TYPES = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
];

const VIDEO_TYPES = [
  "mp4",
  "avi",
  "mov",
  "mkv",
  "webm",
];

const WORD_TYPES = [
  "doc",
  "docx",
];

const EXCEL_TYPES = [
  "xls",
  "xlsx",
  "csv",
];

const ZIP_TYPES = [
  "zip",
  "rar",
  "7z",
];
function FileCard({
  file,
  downloadFile,
  deleteFile,
}) {

  const [showQR, setShowQR] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000";

  const shareLink =
    `${API_URL}/api/files/share/${file.shareId}`;
    const formatSize = (bytes) => {

  if (bytes < 1024) {
    return bytes + " B";
  }

  if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + " KB";
  }

  if (bytes < 1024 * 1024 * 1024) {
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  }

  return (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";
};
const extension =
  file.originalName
    ?.split(".")
    .pop()
    ?.toLowerCase() || "";
    const canPreview =
  file.mimeType?.startsWith("image/") ||
  file.mimeType?.startsWith("video/");

  /* file icon */

const getIcon = () => {

  if (IMAGE_TYPES.includes(extension)) {
    return <FaFileImage />;
  }

  if (VIDEO_TYPES.includes(extension)) {
    return <FaFileVideo />;
  }

  if (extension === "pdf") {
    return <FaFilePdf />;
  }

  if (WORD_TYPES.includes(extension)) {
    return <FaFileWord />;
  }

  if (EXCEL_TYPES.includes(extension)) {
    return <FaFileExcel />;
  }

  if (ZIP_TYPES.includes(extension)) {
    return <FaFileArchive />;
  }

  return <FaFileAlt />;

};

/* COPY SHARE LINK*/

const copyLink = async () => {

  try {

    await navigator.clipboard.writeText(shareLink);

    toast.success("Share link copied.");

  } catch (err) {

    toast.error("Unable to copy link.");

  }

};

/*===========format date=====*/

const uploadDate = file.createdAt
  ? new Date(file.createdAt).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  : "Unknown";

/* ====================================== PREVIEW =====*/ 


const handlePreview = async () => {

  if (!canPreview) {
    toast.info("Preview is available only for images and videos.");
    return;
  }

  try {

    const token = localStorage.getItem("token");
    const res = await api.get(
  `/api/files/preview/${file._id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    window.open(
      res.data.url,
      "_blank",
      "noopener,noreferrer"
    );

  } catch (err) {
    console.error(err);
    toast.error(
      err.response?.data?.message ||
      "Unable to preview file."
    );

  }

};
return (

  <div className="premium-file-card">

    {/* =========================== HEADER=========================== */}
       
    <div className="premium-header">
      <div className="premium-icon">
        {getIcon()}
      </div>
      <div className="premium-title">
        <h4 title={file.originalName}>
          {file.originalName}
        </h4>
        <div className="file-meta">
          <span className="file-badge">
            {extension ? extension.toUpperCase() : "FILE"}
          </span>
          <span>
            {formatSize(file.size || 0)}
          </span>
        </div>
      </div>
    </div>

    {/* ===========================FILE PREVIEW=========================== */}
        
    

    <div
      className={`file-preview ${canPreview ? "clickable" : ""}`}
      onClick={canPreview ? handlePreview : undefined}
      role={canPreview ? "button" : undefined}
      tabIndex={canPreview ? 0 : -1}
      onKeyDown={(e) => {
        if (
          canPreview &&
          (e.key === "Enter" || e.key === " ")
        ) {
          handlePreview();
        }

      }}
    >
      {file.mimeType?.startsWith("image/") ? (
       <img
  src={file.fileUrl}
  alt={file.originalName}
  loading="lazy"
  onError={(e) => {
    e.target.src = "/image-placeholder.png";
  }}
/>
      ) : file.mimeType?.startsWith("video/") ? (
        <video
  src={file.fileUrl}
  muted
  playsInline
  preload="metadata"
  controls={false}
  disablePictureInPicture
  controlsList="nodownload noplaybackrate"
  onContextMenu={(e) => e.preventDefault()}
/>

      ) : extension === "pdf" ? (
        <div className="document-preview pdf-preview">
          <FaFilePdf />
          <span>PDF</span>
          <small>Download to view</small>
        </div>
      ) : WORD_TYPES.includes(extension) ? (
        <div className="document-preview word-preview">
          <FaFileWord />
          <span>{extension.toUpperCase()}</span>
          <small>Download to view</small>
        </div>

      ) : EXCEL_TYPES.includes(extension) ? (

        <div className="document-preview excel-preview">
          <FaFileExcel />
          <span>{extension.toUpperCase()}</span>
          <small>Download to view</small>
        </div>
      ) : ZIP_TYPES.includes(extension) ? (

        <div className="document-preview zip-preview">
          <FaFileArchive />
          <span>{extension.toUpperCase()}</span>
          <small>Download to extract</small>
        </div>

      ) : (

        <div className="document-preview">
          <FaFileAlt />
          <p>Preview Not Available</p>
        </div>
      )}
    </div>

        {/* ===========================FILE DETAILS=======*/}

    <div className="file-details">

      <div>
        <FaCalendarAlt />
        <span>{uploadDate}</span>
      </div>
      <div>
        <FaCloudDownloadAlt />
        <span>
          {file.downloadCount ?? 0} Downloads
        </span>
      </div>
    </div>

    {/* =================  SHARE LINK==================================== */}
    
    <div className="premium-share">
      <input
        value={shareLink}
        readOnly
      />
      <button
        onClick={copyLink}
        title="Copy Share Link"
      >
        <FaCopy />
      </button>
    </div>

    {/* ===========================ACTION BUTTONS =========================== */}
  
    <div className="premium-buttons">
      <button
        className="download-btn"
        onClick={() => downloadFile(file._id)}
      >
        <FaDownload />
        Download
      </button>
      <button
        className="delete-btn"
        onClick={() => setConfirmDelete(true)}
      >
        <FaTrash />
        Delete
      </button>
    </div>

    {/* =========================== DELETE CONFIRMATION========== */}
    
       

    {confirmDelete && (
      <div className="delete-box">
        <p>
          Are you sure you want to permanently delete this file?
        </p>
        <div className="delete-actions">
          <button
            className="yes-btn"
            onClick={() => {
              deleteFile(file._id);
              setConfirmDelete(false);
            }}
          >

            Delete
          </button>
          <button
            className="cancel-btn"
            onClick={() => setConfirmDelete(false)}
          >
            Cancel
          </button>
        </div>
      </div>

    )}

    
        {/* ===========================QR BUTTON =========================== */}

   
    <button
      className="qr-btn"
      onClick={() => setShowQR(!showQR)}
    >

      {showQR ? <FaTimes /> : <FaQrcode />}
      {showQR
        ? " Hide QR Code"
        : " Show QR Code"}

    </button>

    {/* ===========================QR CODE========================== */}
        
    {showQR && (
      <div className="qr-area">
        <QRCodeCanvas
          value={shareLink}
          size={140}
        />
      </div>
    )}
  </div>

);

}

export default FileCard;