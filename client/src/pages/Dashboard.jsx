import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import DashboardNavbar from "../components/DashboardNavbar";
import StatsCards from "../components/StatsCards";
import UploadCard from "../components/UploadCard";
import SearchBar from "../components/SearchBar";
import FileCard from "../components/FileCard";

import "../styles/Dashboard.css";
function Dashboard() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetchFiles();
  }, []);

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
      console.log(err);
      toast.error("Unable to load files.");
    }
  };
  const uploadFile = async () => {
    if (!file) {
      toast.warning("Please choose a file.");
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

      toast.success("Upload successful");
      setFile(null);
      const input = document.getElementById("fileInput");
      if (input) input.value = "";
      fetchFiles();
    } catch (err) {
      toast.error("Upload failed.");
    }
  };
  const downloadFile = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:5000/api/files/download/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );

    // Get filename from response header
    let filename = "download";

    const disposition =
      response.headers["content-disposition"];

    if (disposition) {
      const match = disposition.match(/filename="(.+)"/);
      if (match) filename = match[1];
    }

    // Create download
    const url = window.URL.createObjectURL(response.data);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    toast.success("Download started.");
  } catch (err) {
    console.log(err);
    toast.error("Download failed.");
  }
};
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
      toast.success("File deleted");
      fetchFiles();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Delete failed."
      );
    }
  };
  const filteredFiles = files.filter((f) =>
    f.originalName.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="dashboard-page">
      <DashboardNavbar />
      <main className="dashboard-main container">
        <section className="dashboard-section">
          <StatsCards files={files} />
        </section>
        <section className="dashboard-section">
          <UploadCard
            file={file}
            setFile={setFile}
            uploadFile={uploadFile}
          />
        </section>
        <section className="dashboard-section">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </section>
        <section className="dashboard-section">
          <div className="row g-4">
            {filteredFiles.map((file) => (
              <div
                className="col-lg-6"
                key={file._id}
              >
                <FileCard
                  file={file}
                  downloadFile={downloadFile}
                  deleteFile={deleteFile}
                />
              </div>

            ))}

            {files.length === 0 && (
              <div className="col-12">
                <div className="empty-state">
                  <i className="bi bi-folder2-open"></i>
                  <h2>No Files Uploaded</h2>
                  <p>
                    Upload your first file to start using
                    YuvNext Cloud Storage.
                  </p>
                </div>

              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;