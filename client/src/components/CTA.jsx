import { Link } from "react-router-dom";
import "../styles/CTA.css";

function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card">
          <span className="cta-badge">
            Start Today
          </span>
          <h2>
            Manage Your Files with
            <br />
            YuvNext Cloud Storage
          </h2>
          
           <p>
  Upload, organize, and share your files securely
  from anywhere. YuvNext provides cloud storage,
  secure authentication, and a modern file management
  experience.
</p>

          <div className="cta-buttons">
            <Link
              to="/register"
              className="btn btn-light btn-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="btn btn-outline-light btn-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;