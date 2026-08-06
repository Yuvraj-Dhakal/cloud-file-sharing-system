import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../config/api";

import "../styles/Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    setLoading(true);
    try {
      await api.post("/api/auth/register", {
        name,
        email,
        password,
      });
      toast.success(
        "Account created successfully!"
      );
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed."
      );
    }
    setLoading(false);
  };
  return (
    <div className="register-page">
      <div className="register-card">
        <div className="brand">
          <h2>YuvNext</h2>
        </div>
        <h3 className="register-title">
          Create Your Account
        </h3>
        <p className="register-subtitle">
          Start storing and sharing your files securely.
        </p>
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Email Address
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              minLength={6}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary register-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Creating Account...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <div className="register-footer">
          <p className="mt-4">
            Already have an account?
            <Link
              to="/login"
              className="ms-2"
            >
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;