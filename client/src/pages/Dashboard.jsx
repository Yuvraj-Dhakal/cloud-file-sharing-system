import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
function Dashboard() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchFiles();
  }, []);

  // ======================
  // GET FILES
  // ======================
  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/files",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFiles(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  // ======================
  // UPLOAD FILE
  // ======================
  const uploadFile = async () => {
    if (!file) {
      alert("Select file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/files/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Uploaded successfully");

      setFile(null);

      fetchFiles();
    } catch (err) {
      console.log("UPLOAD ERROR:", err);
      alert("Upload failed");
    }
  };

  // ======================
  // DOWNLOAD FILE
  // ======================
  const downloadFile = async (id, originalName) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/files/download/${id}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([res.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", originalName);

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log("DOWNLOAD ERROR:", err);
      alert("Download failed");
    }
  };

  // ======================
  // DELETE FILE
  // ======================
  const deleteFile = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/files/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Deleted successfully");

      fetchFiles();
    } catch (err) {
      console.log("DELETE ERROR:", err);
      alert("Delete failed");
    }
  };

  // ======================
  // LOGOUT
  // ======================
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1> Admin Dashboard</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadFile}
        style={{ marginLeft: "10px" }}
      >
        Upload
      </button>

      <hr />

      <h2>Your Files</h2>

      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        files.map((f) => (
          <div
            key={f._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h4>📄 {f.originalName}</h4>

            <p>Size: {f.size} bytes</p>

            <button
              onClick={() =>
                downloadFile(
                  f._id,
                  f.originalName
                )
              }
            >
              Download
            </button>

            <button
              onClick={() => deleteFile(f._id)}
              style={{
                marginLeft: "10px",
                color: "red",
              }}
            >
              Delete
            </button>

            <div style={{ marginTop: "10px" }}>
  <p>Share Link:</p>

  <input
    type="text"
    readOnly
    value={`http://localhost:5000/api/files/share/${f.shareId}`}
    style={{
      width: "100%",
      padding: "8px",
    }}
  />

  <br />
  <br />

  <button
  onClick={() => {
    navigator.clipboard.writeText(
      `http://localhost:5000/api/files/share/${f.shareId}`
    );
    alert("Link copied!");
  }}
>
  Copy Link
</button>

<br />
<br />

<p>QR Code:</p>

<QRCodeCanvas
  value={`http://localhost:5000/api/files/share/${f.shareId}`}
  size={150}
/>
</div>
          </div>
        ))
      )}

      <br />

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;